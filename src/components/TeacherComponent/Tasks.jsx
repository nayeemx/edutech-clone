import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import { auth, db } from "../../firebase/firebase.config";
import { format } from "date-fns";
import {
    BsPinAngleFill,
    BsPinFill,
    BsCheckAll,
} from "react-icons/bs";
import { IoColorPaletteSharp } from "react-icons/io5";
import { FaTrashCan, FaRankingStar } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GoArrowDownRight } from "react-icons/go";

// Create a separate component for the DatePicker
const TaskDatePicker = ({ taskId, initialStartDate, initialEndDate, onSave }) => {
    const [startDate, setStartDate] = useState(initialStartDate ? new Date(initialStartDate) : null);
    const [endDate, setEndDate] = useState(initialEndDate ? new Date(initialEndDate) : null);

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);

        // Only save when both dates are selected
        if (start && end) {
            onSave(taskId, start, end);
        }
    };

    return (
        <div
            className="date-picker-container mb-2"
            onClick={(e) => e.stopPropagation()}
        >
            <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                shouldCloseOnSelect={false}
                customInput={
                    <button className="text-sm">
                        {startDate && endDate ? (
                            <span className="text-gray-600 font-bold border border-slate-300 rounded px-2 py-1 w-full text-left">
                                {format(startDate, "MMM d")} – {format(endDate, "MMM d")}
                            </span>
                        ) : (
                            <div className="text-gray-400">Select Dates</div>
                        )}
                    </button>
                }
            />
        </div>
    );
};

const Tasks = ({ onEdit, onDelete, logAction }) => {
    const [tasks, setTasks] = useState([]);
    const [dropdownOpenId, setDropdownOpenId] = useState(null);

    // Subscribe to Firebase and load tasks
    useEffect(() => {
        const unlistenAuth = auth.onAuthStateChanged((user) => {
            if (!user) return;
            const tasksRef = db.ref(`tasks/${user.uid}`);

            tasksRef.on("value", (snapshot) => {
                const data = snapshot.val() || {};
                const arr = Object.entries(data).map(([id, t]) => ({
                    id,
                    ...t,
                    from_date: t.from_date || null,
                    to_date: t.to_date || null,
                }));

                // Sort pinned first, then by priority
                arr.sort((a, b) => {
                    if (a.pin && !b.pin) return -1;
                    if (!a.pin && b.pin) return 1;
                    const order = { high: 1, medium: 2, low: 3 };
                    return (order[a.priority] || 4) - (order[b.priority] || 4);
                });

                setTasks(arr);
            });

            return () => tasksRef.off();
        });

        return () => unlistenAuth();
    }, []);

    // Compute completion percentage
    const getProgress = (subTasks = []) => {
        if (!subTasks.length) return 0;
        const done = subTasks.filter((t) => t.completed).length;
        return Math.round((done / subTasks.length) * 100);
    };

    // Mark all subtasks as completed
    const handleToggleAll = async (taskId, subTasks) => {
        const uid = auth.currentUser?.uid;
        if (!uid) return;
        const newSubTasks = subTasks.map((st) => ({ ...st, completed: true }));

        try {
            await db.ref(`tasks/${uid}/${taskId}/Task`).set(newSubTasks);

            // Get task title for logging
            const taskSnapshot = await db.ref(`tasks/${uid}/${taskId}`).once('value');
            const taskData = taskSnapshot.val() || {};

            // Log action
            await logAction('update_task', taskId, {
                title: taskData.title || 'Task',
                action: 'mark_all_completed'
            });

            setTasks((prev) =>
                prev.map((task) =>
                    task.id === taskId ? { ...task, Task: newSubTasks } : task
                )
            );
        } catch (error) {
            console.error("Error marking all subtasks:", error);
        }
    };

    // Toggle one subtask
    const handleToggleOne = async (taskId, idx, newVal) => {
        const uid = auth.currentUser?.uid;
        if (!uid) return;
        const refSub = db.ref(`tasks/${uid}/${taskId}/Task`);
        const snap = await refSub.once("value");
        const subTasks = snap.val() || [];
        subTasks[idx] = { ...subTasks[idx], completed: newVal };

        try {
            await refSub.set(subTasks);

            // Get task title for logging
            const taskSnapshot = await db.ref(`tasks/${uid}/${taskId}`).once('value');
            const taskData = taskSnapshot.val() || {};

            // Log action
            await logAction('update_task', taskId, {
                title: taskData.title || 'Task',
                subtask: subTasks[idx].name,
                completed: newVal
            });

            setTasks((prev) =>
                prev.map((task) =>
                    task.id === taskId ? { ...task, Task: subTasks } : task
                )
            );
        } catch (error) {
            console.error("Error toggling subtask:", error);
        }
    };

    // pin/unpin
    const handleTogglePin = async (taskId, currentPin) => {
        const uid = auth.currentUser?.uid;
        if (!uid) return;
        try {
            await db.ref(`tasks/${uid}/${taskId}`).update({ pin: !currentPin });

            // Get task title for logging
            const taskSnapshot = await db.ref(`tasks/${uid}/${taskId}`).once('value');
            const taskData = taskSnapshot.val() || {};

            // Log action
            await logAction('update_task', taskId, {
                title: taskData.title || 'Task',
                pin: !currentPin
            });

            setTasks((prev) =>
                prev.map((task) =>
                    task.id === taskId ? { ...task, pin: !currentPin } : task
                )
            );
        } catch (error) {
            console.error("Error toggling pin:", error);
        }
    };

    // priority
    const [openPriorityDropdown, setOpenPriorityDropdown] = useState({
        taskId: null,
        type: null // 'header' or 'menu'
    });
    const togglePriorityDropdown = (e, taskId, type) => {
        e.stopPropagation();
        setOpenPriorityDropdown(prev =>
            prev.taskId === taskId && prev.type === type
                ? { taskId: null, type: null }
                : { taskId, type }
        );
    };

    const handlePriorityChange = async (e, taskId, newPriority) => {
        e.stopPropagation();
        const uid = auth.currentUser?.uid;
        if (!uid) return;
        try {
            await db.ref(`tasks/${uid}/${taskId}`).update({ priority: newPriority });

            // Get task title for logging
            const taskSnapshot = await db.ref(`tasks/${uid}/${taskId}`).once('value');
            const taskData = taskSnapshot.val() || {};

            // Log action
            await logAction('update_task', taskId, {
                title: taskData.title || 'Task',
                priority: newPriority
            });

            setTasks((prev) =>
                prev.map((task) =>
                    task.id === taskId ? { ...task, priority: newPriority } : task
                )
            );
            setOpenPriorityDropdown({ taskId: null, type: null });
        } catch (error) {
            console.error("Error updating priority:", error);
        }
    };

    // for color
    const [openColorDropdownId, setOpenColorDropdownId] = useState(null);

    const toggleColorDropdown = (e, taskId) => {
        e.stopPropagation(); // Prevent triggering edit mode
        setOpenColorDropdownId((prevId) => (prevId === taskId ? null : taskId));
    };

    const handleColorChange = async (e, taskId, newColor) => {
        e.stopPropagation(); // Prevent triggering edit mode
        const uid = auth.currentUser?.uid;
        if (!uid) return;
        try {
            await db.ref(`tasks/${uid}/${taskId}`).update({ color: newColor });

            // Get task title for logging
            const taskSnapshot = await db.ref(`tasks/${uid}/${taskId}`).once('value');
            const taskData = taskSnapshot.val() || {};

            // Log action
            await logAction('update_task', taskId, {
                title: taskData.title || 'Task',
                color: newColor
            });

            setTasks((prev) =>
                prev.map((task) =>
                    task.id === taskId ? { ...task, color: newColor } : task
                )
            );
            setOpenColorDropdownId(null); // Close the dropdown
        } catch (error) {
            console.error("Error updating color:", error);
        }
    };

    // search and filter
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPriority, setSelectedPriority] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");

    const getFilteredTasks = () => {
        return tasks.filter((task) => {
            // Filter by search query
            const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());

            // Filter by priority
            const matchesPriority = selectedPriority ? task.priority === selectedPriority : true;

            // Determine task status
            const totalSubTasks = task.Task?.length || 0;
            const completedSubTasks = task.Task?.filter((t) => t.completed).length || 0;
            let status = "not started";
            if (completedSubTasks === totalSubTasks && totalSubTasks > 0) {
                status = "completed";
            } else if (completedSubTasks > 0) {
                status = "in progress";
            }

            // Filter by status
            const matchesStatus = selectedStatus ? status === selectedStatus : true;

            return matchesSearch && matchesPriority && matchesStatus;
        });
    };

    useEffect(() => {
        const handleClickOutside = () => {
            setDropdownOpenId(null);
            setOpenPriorityDropdown({ taskId: null, type: null }); // Correct pattern
            setOpenColorDropdownId(null);
        };

        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, []);

    // inline editing
    // title
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");
    // subtask
    const [editingSubtask, setEditingSubtask] = useState(null);
    const [editedSubtaskName, setEditedSubtaskName] = useState("");

    // to save title
    const handleTitleSave = async (taskId) => {
        if (!editedTitle.trim()) return;
        const uid = auth.currentUser?.uid;
        try {
            // Get the original title for logging
            const taskSnapshot = await db.ref(`tasks/${uid}/${taskId}`).once('value');
            const taskData = taskSnapshot.val() || {};
            const originalTitle = taskData.title || 'Unknown Task';

            // Update the title
            await db.ref(`tasks/${uid}/${taskId}`).update({ title: editedTitle });

            // Log action with both old and new title
            await logAction('update_task', taskId, {
                title: editedTitle,
                originalTitle: originalTitle
            });

            setTasks((prev) => prev.map((t) =>
                t.id === taskId ? { ...t, title: editedTitle } : t
            ));
            setEditingTaskId(null);
        } catch (error) {
            console.error("Error updating title:", error);
        }
    };

    // to save subtask
    const handleSubtaskSave = async (taskId, idx) => {
        if (!editedSubtaskName.trim()) return;

        const uid = auth.currentUser?.uid;
        try {
            // Get the original subtask data for logging
            const taskSnapshot = await db.ref(`tasks/${uid}/${taskId}`).once('value');
            const taskData = taskSnapshot.val() || {};
            const originalSubtask = taskData.Task && taskData.Task[idx] ? taskData.Task[idx].name : 'Unknown Subtask';

            // Update Firebase
            const subtaskRef = db.ref(`tasks/${uid}/${taskId}/Task/${idx}`);
            await subtaskRef.update({ name: editedSubtaskName });

            // Log action
            await logAction('update_task', taskId, {
                title: taskData.title || 'Task',
                subtask: {
                    original: originalSubtask,
                    updated: editedSubtaskName,
                    index: idx
                }
            });

            // Update local state
            setTasks((prev) =>
                prev.map((t) =>
                    t.id === taskId
                        ? {
                            ...t,
                            Task: t.Task.map((s, i) =>
                                i === idx ? { ...s, name: editedSubtaskName } : s
                            )
                        }
                        : t
                )
            );

            setEditingSubtask(null);
        } catch (error) {
            console.error("Error updating subtask:", error);
        }
    };

    // add more feature in subtask
    const handleRemoveSubtask = async (taskId, subtaskIndex) => {
        const updatedTask = { ...tasks.find((task) => task.id === taskId) };
        updatedTask.Task.splice(subtaskIndex, 1);

        try {
            await db.ref(`tasks/${auth.currentUser?.uid}/${taskId}/Task`).set(updatedTask.Task);
            setTasks((prev) =>
                prev.map((task) =>
                    task.id === taskId ? { ...task, Task: updatedTask.Task } : task
                )
            );
        } catch (error) {
            console.error("Error removing subtask:", error);
        }
    };

    const handleAddSubtask = async (taskId, index) => {
        const updatedTask = { ...tasks.find((task) => task.id === taskId) };
        updatedTask.Task.splice(index, 0, { name: '', completed: false, isSubtask: true });

        try {
            await db.ref(`tasks/${auth.currentUser?.uid}/${taskId}/Task`).set(updatedTask.Task);
            setTasks((prev) =>
                prev.map((task) =>
                    task.id === taskId ? { ...task, Task: updatedTask.Task } : task
                )
            );
            setEditingSubtask({ taskId, index });
            setEditedSubtaskName('');
        } catch (error) {
            console.error("Error adding subtask:", error);
        }
    };

    //    convert task/subtask to subtask/task mode

    const handleToggleSubtask = async (taskId, idx, newIsSubtask) => {
        const uid = auth.currentUser?.uid;
        if (!uid) return;

        try {
            // Fetch the current subtasks
            const refSub = db.ref(`tasks/${uid}/${taskId}/Task`);
            const snap = await refSub.once("value");
            const subTasks = snap.val() || [];

            // Update the isSubtask property
            subTasks[idx] = { ...subTasks[idx], isSubtask: newIsSubtask };

            // Save the updated subtasks to Firebase
            await refSub.set(subTasks);

            // Log the action
            const taskSnapshot = await db.ref(`tasks/${uid}/${taskId}`).once('value');
            const taskData = taskSnapshot.val() || {};
            await logAction('update_task', taskId, {
                title: taskData.title || 'Task',
                subtask: {
                    name: subTasks[idx].name,
                    isSubtask: newIsSubtask,
                },
            });

            // Update the local state
            setTasks((prev) =>
                prev.map((task) =>
                    task.id === taskId ? { ...task, Task: subTasks } : task
                )
            );
        } catch (error) {
            console.error("Error toggling subtask:", error);
        }
    };

    // Handle date saving
    const handleDateSave = async (taskId, startDate, endDate) => {
        const uid = auth.currentUser?.uid;
        if (!uid) return;

        try {
            // Get task data for logging and comparison
            const taskSnapshot = await db.ref(`tasks/${uid}/${taskId}`).once('value');
            const taskData = taskSnapshot.val() || {};

            // Create update object with the dates that exist
            const updateData = {};
            if (startDate) updateData.from_date = startDate.toISOString();
            if (endDate) updateData.to_date = endDate.toISOString();

            // Check if dates have changed
            const fromDateChanged = updateData.from_date !== taskData.from_date;
            const toDateChanged = updateData.to_date !== taskData.to_date;

            // Only proceed if dates have changed
            if (fromDateChanged || toDateChanged) {
                await db.ref(`tasks/${uid}/${taskId}`).update(updateData);

                // Log action
                await logAction('update_task', taskId, {
                    title: taskData.title || 'Task',
                    dates: {
                        from: {
                            original: taskData.from_date || null,
                            updated: updateData.from_date || null
                        },
                        to: {
                            original: taskData.to_date || null,
                            updated: updateData.to_date || null
                        }
                    }
                });

                // Update local state to match what was saved
                setTasks(prev => prev.map(t =>
                    t.id === taskId ? {
                        ...t,
                        from_date: startDate ? startDate.toISOString() : null,
                        to_date: endDate ? endDate.toISOString() : null
                    } : t
                ));

                console.log(`Updated dates for task ${taskId}`);
            }
        } catch (error) {
            console.error("Error saving dates:", error);
        }
    };

    const handleDeleteTask = async (taskId, e) => {
        e.stopPropagation();
        const uid = auth.currentUser?.uid;
        if (!uid) return;

        try {
            // Get the task data for detailed logging before deletion
            const taskSnapshot = await db.ref(`tasks/${uid}/${taskId}`).once('value');
            const taskData = taskSnapshot.val() || {};

            // Log deletion with comprehensive task data
            await logAction('delete_task', taskId, {
                title: taskData.title || 'Unknown Task',
                taskData: {
                    priority: taskData.priority || null,
                    color: taskData.color || null,
                    pin: taskData.pin || false,
                    from_date: taskData.from_date || null,
                    to_date: taskData.to_date || null,
                    subtasks_count: taskData.Task ? taskData.Task.length : 0,
                    completed_subtasks: taskData.Task ? taskData.Task.filter(t => t.completed).length : 0
                }
            });

            // Now call the parent component's onDelete function to actually delete the task
            onDelete(taskId, e);

        } catch (error) {
            console.error("Error preparing task deletion:", error);
        }
    };

    return (
        <>
            {/* filter */}
            <section className="flex flex-col lg:flex-row gap-4 py-10 border-t-2 border-gray-200">
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border rounded w-full p-2 mb-2"
                />

                {/* Filters */}
                <div className="flex gap-4 mb-2.5">
                    {/* Priority Filter */}
                    <select
                        value={selectedPriority}
                        onChange={(e) => setSelectedPriority(e.target.value)}
                        className="p-2 border rounded w-1/2"
                    >
                        <option value="">All Priorities</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>

                    {/* Status Filter */}
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="p-2 border rounded w-1/2"
                    >
                        <option value="">All Statuses</option>
                        <option value="not started">Not Started</option>
                        <option value="in progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
            </section>
            {/* data */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getFilteredTasks().map((task) => (
                    <div
                        key={task.id}
                        className="bg-white rounded-lg shadow-md p-4 cursor-pointer flex flex-col justify-between h-[50vh] overflow-y-auto"
                        style={{ backgroundColor: task.color || "#ffffff" }}
                        onClick={(e) => {
                            // Don't trigger edit if clicking on the date picker or other interactive elements
                            if (e.target.closest('.date-picker-container') || e.defaultPrevented) return;
                            onEdit(task);
                        }}
                    >
                        {/* top part */}
                        <div className="flex flex-col justify-between">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-[66vw] lg:w-[20vw] xl:w-[23vw] 2xl:w-[24vw] md:w-[28vw] 2xs:w-[70vw] 3xs:w-[74vw] flex justify-between items-center">
                                        {/* Inside the task card's header */}
                                        {/* title */}
                                        {editingTaskId === task.id ? (
                                            <input
                                                type="text"
                                                value={editedTitle}
                                                onChange={(e) => setEditedTitle(e.target.value)}
                                                onBlur={() => handleTitleSave(task.id)}
                                                onKeyPress={(e) => e.key === 'Enter' && handleTitleSave(task.id)}
                                                autoFocus
                                                className="text-lg font-semibold border-0 focus:outline-none"
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        ) : (
                                            <h3
                                                className="text-sm font-semibold cursor-text"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Add this line
                                                    setEditingTaskId(task.id);
                                                    setEditedTitle(task.title);
                                                }}
                                            >
                                                {task.title}
                                            </h3>
                                        )}

                                        <div className="flex items-center gap-2">
                                            {/* pin */}
                                            <div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Prevent triggering the edit mode
                                                        handleTogglePin(task.id, task.pin);
                                                    }}
                                                >
                                                    {task.pin
                                                        ? <BsPinAngleFill className="text-red-500 hover:text-red-700 text-lg cursor-pointer" /> :
                                                        <BsPinFill className="text-slate-600 hover:text-slate-800 text-lg cursor-pointer" />}
                                                </button>
                                            </div>
                                            {/* badge */}
                                            <div>
                                                {task.priority && (
                                                    <div className="relative">
                                                        <button
                                                            onClick={(e) => togglePriorityDropdown(e, task.id, 'header')}
                                                            className={`px-2 py-1 rounded-md text-sm ${task.priority === "high"
                                                                ? "bg-red-200 text-red-800"
                                                                : task.priority === "medium"
                                                                    ? "bg-yellow-200 text-yellow-800"
                                                                    : "bg-green-200 text-green-800"
                                                                }`}
                                                        >
                                                            {task.priority}
                                                        </button>
                                                        {openPriorityDropdown.taskId === task.id &&
                                                            openPriorityDropdown.type === 'header' && (
                                                                <div className="absolute mt-1 bg-white border rounded shadow z-10">
                                                                    {["high", "medium", "low"].map((level) => (
                                                                        <button
                                                                            key={level}
                                                                            onClick={(e) => handlePriorityChange(e, task.id, level)}
                                                                            className={`block px-4 py-2 text-sm w-full text-left ${level === "high"
                                                                                ? "hover:bg-red-100 rounded-t-sm"
                                                                                : level === "medium"
                                                                                    ? "hover:bg-yellow-100"
                                                                                    : "hover:bg-green-100 rounded-b-sm"
                                                                                }`}
                                                                        >
                                                                            {level.charAt(0).toUpperCase() + level.slice(1)}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            )}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Mark All icon only */}
                                            <div className="">
                                                <BsCheckAll
                                                    size={22}
                                                    className="cursor-pointer mr-2"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleToggleAll(task.id, task.Task);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Date Range - Using the TaskDatePicker component */}
                            <TaskDatePicker
                                taskId={task.id}
                                initialStartDate={task.from_date}
                                initialEndDate={task.to_date}
                                onSave={handleDateSave}
                            />

                            {/* Mark All & Subtasks */}
                            <div>
                                {/* Individual sub‑tasks */}
                                {task.Task?.map((sub, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center mb-1 group"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {/* Toggle Task/Subtask Button */}
                                        <button
                                            className="text-green-500 hover:text-green-700 opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleToggleSubtask(task.id, idx, !sub.isSubtask);
                                            }}
                                        >
                                            {sub.isSubtask ? '↗' : <GoArrowDownRight className="bg-gray-400 rounded-md text-white font-md mr-2" />} {/* Icon to indicate toggle */}
                                        </button>
                                        <input
                                            type="checkbox"
                                            checked={sub.completed}
                                            onChange={(e) => handleToggleOne(task.id, idx, e.target.checked)}
                                            className={`border-2 border-red-300 ${sub.isSubtask
                                                ? "mr-10 cursor-pointer relative left-[1.6vw] bg-orange-200"
                                                : "mr-4 cursor-pointer"
                                                }`}
                                        />
                                        {editingSubtask?.taskId === task.id && editingSubtask.index === idx ? (
                                            <input
                                                type="text"
                                                value={editedSubtaskName}
                                                onChange={(e) => setEditedSubtaskName(e.target.value)}
                                                onBlur={() => handleSubtaskSave(task.id, idx)}
                                                onKeyPress={(e) => e.key === 'Enter' && handleSubtaskSave(task.id, idx)}
                                                autoFocus
                                                className={`${sub.completed ? 'line-through' : ''} 
                                                focus:outline-none p-1 
                                                ${!sub.isSubtask ? 'font-semibold' : ''}`}
                                                style={{
                                                    border: '2px solid #4CAF50', // Custom border color
                                                    borderRadius: '4px', // Optional: Rounded corners
                                                    width: '40%', // Custom width
                                                }}
                                            />
                                        ) : (
                                            <span
                                                className={`${!sub.isSubtask ? 'font-semibold text-[1.08rem]' : 'text-[1.2rem]'} 
                                                ${sub.completed ? 'line-through' : ''}
                                                cursor-text`}
                                                onClick={() => {
                                                    setEditingSubtask({ taskId: task.id, index: idx });
                                                    setEditedSubtaskName(sub.name);
                                                }}
                                            >
                                                {sub.name}
                                            </span>
                                        )}
                                        {/* Remove Subtask Button (Visible on Hover) */}
                                        <div 
                                        className={`ml-2 relative text-xl font-medium leading-[0.8] ${
                                            editingSubtask?.taskId === task.id && editingSubtask.index === idx
                                                ? ""
                                                : "bottom-[0.3vh]"
                                        }`}>
                                            <button
                                                className="text-gray-500 hover:text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRemoveSubtask(task.id, idx);
                                                }}
                                            >
                                                x
                                            </button>
                                            {/* Add Subtask Button (Inline) */}
                                            <button
                                                className="ml-2 text-gray-500 hover:text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleAddSubtask(task.id, idx + 1); // Add below the current subtask
                                                }}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* bottom part */}
                        <div className="flex items-center justify-between w-full mt-4 pt-2 border-t-2 border-gray-400 relative">
                            {/* Progress Bar */}
                            <div className="flex flex-col w-full py-2">
                                <div className="flex items-center gap-2 w-full">
                                    <span className="w-full">Progress</span>
                                    <span className="w-full text-end text-blue-500">{getProgress(task.Task)}%</span>
                                </div>
                                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full transition-all duration-300"
                                        style={{
                                            width: `${getProgress(task.Task)}%`,
                                            backgroundColor: "#3b82f6",
                                        }}
                                    />
                                </div>
                            </div>

                            {/* 3-dot menu */}
                            <div className="relative">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setDropdownOpenId((prev) => (prev === task.id ? null : task.id));
                                    }}
                                    className="text-gray-600 hover:text-black"
                                >
                                    <BsThreeDotsVertical className="relative text-[1.3rem] top-[0.3vh] cursor-pointer" />
                                </button>

                                {dropdownOpenId === task.id && (
                                    <div
                                        className="absolute right-[0.6vw] bottom-[3.5vh] bg-white border rounded shadow z-20 4xl:w-[1.92vw]"
                                        onClick={(e) => e.stopPropagation()} // prevent click bubbling
                                    >
                                        {/* Priority button (same one already used) */}
                                        <div className="p-2">
                                            <button
                                                onClick={(e) => togglePriorityDropdown(e, task.id, 'menu')}
                                                className={`w-full text-left p-2 rounded text-sm ${task.priority === "high"
                                                    ? "bg-red-200 text-red-800"
                                                    : task.priority === "medium"
                                                        ? "bg-yellow-200 text-yellow-800"
                                                        : "bg-green-200 text-green-800"
                                                    }`}
                                            >
                                                <FaRankingStar />
                                            </button>
                                            {openPriorityDropdown.taskId === task.id &&
                                                openPriorityDropdown.type === 'menu' && (
                                                    <div className="mt-1 bg-white border rounded shadow z-10 absolute right-[12vw] bottom-[15vh] 3xs:right-[11vw] md:right-[4.3vw] xl:right-[3vw] 2xl:right-[2.7vw]">
                                                        {["high", "medium", "low"].map((level) => (
                                                            <button
                                                                key={level}
                                                                onClick={(e) => handlePriorityChange(e, task.id, level)}
                                                                className={`block px-4 py-2 text-sm w-full text-left ${level === "high"
                                                                    ? "hover:bg-red-100 rounded-t-sm"
                                                                    : level === "medium"
                                                                        ? "hover:bg-yellow-100"
                                                                        : "hover:bg-green-100 rounded-b-sm"
                                                                    }`}
                                                            >
                                                                {level.charAt(0).toUpperCase() + level.slice(1)}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                        </div>

                                        {/* Color picker button (same one already used) */}
                                        <div className="p-2">
                                            <button
                                                onClick={(e) => toggleColorDropdown(e, task.id)}
                                                className="w-full text-left px-2 p-2 rounded text-sm bg-gray-200 hover:bg-gray-300"
                                            >
                                                <IoColorPaletteSharp />
                                            </button>
                                            {openColorDropdownId === task.id && (
                                                <div className="mt-1 bg-white border rounded shadow z-10 max-h-[150px] overflow-y-scroll absolute right-[12vw] bottom-[10vh] 3xs:right-[11vw] md:right-[5vw] lg:right-[4vw] xl:right-[3vw] 2xl:right-[2.8vw]">
                                                    {[
                                                        { name: "Red", value: "#fff0f1bd" },
                                                        { name: "Yellow", value: "#fffff08f" },
                                                        { name: "Green", value: "#e7ffe985" },
                                                        { name: "Blue", value: "#deedff61" },
                                                        { name: "Steel Blue", value: "#e7ecf2b3" },
                                                        { name: "Gray", value: "#ebebeb78" },
                                                    ].map((color) => (
                                                        <button
                                                            key={color.value}
                                                            onClick={(e) => handleColorChange(e, task.id, color.value)}
                                                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-200 flex items-center gap-2"
                                                        >
                                                            <span
                                                                className="inline-block w-4 h-4 rounded-full"
                                                                style={{ backgroundColor: color.value }}
                                                            ></span>
                                                            {color.name}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Delete button (same one already used) */}
                                        <button
                                            onClick={(e) => {
                                                handleDeleteTask(task.id, e);
                                                setDropdownOpenId(null);
                                            }}
                                            className="w-full py-2 px-2 text-center text-sm text-red-600 hover:bg-red-50"
                                        >
                                            <FaTrashCan className="inline text-center" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                {getFilteredTasks().length === 0 && (
                    <div className="col-span-3 text-center py-8 text-gray-500">
                        No tasks found matching your filters
                    </div>
                )}
            </section>
        </>
    );
};

export default Tasks;