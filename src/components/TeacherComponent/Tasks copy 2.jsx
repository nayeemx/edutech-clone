// src/components/TeacherComponent/Tasks.jsx
import { useState, useEffect } from "react";
import { auth, db } from "../../firebase/firebase.config";
import { format } from "date-fns";
import {
    BsPinAngleFill,
    BsPinFill,
    BsCheckAll,
} from "react-icons/bs";
import { IoColorPaletteSharp } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";

const Tasks = ({ onEdit, onDelete }) => {
    const [tasks, setTasks] = useState([]);

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
    const [openPriorityDropdownId, setOpenPriorityDropdownId] = useState(null);
    const togglePriorityDropdown = (e, taskId) => {
        e.stopPropagation(); // Prevent triggering edit mode
        setOpenPriorityDropdownId((prevId) => (prevId === taskId ? null : taskId));
    };

    const handlePriorityChange = async (e, taskId, newPriority) => {
        e.stopPropagation(); // Prevent triggering edit mode
        const uid = auth.currentUser?.uid;
        if (!uid) return;
        try {
            await db.ref(`tasks/${uid}/${taskId}`).update({ priority: newPriority });
            setTasks((prev) =>
                prev.map((task) =>
                    task.id === taskId ? { ...task, priority: newPriority } : task
                )
            );
            setOpenPriorityDropdownId(null); // Close the dropdown
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

    return (
        <>
            <section className="flex gap-4 my-4 pt-4 border-t-2 border-gray-200">
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 border rounded mb-4 w-full"
                />

                {/* Filters */}
                <div className="flex gap-4 mb-4">
                    {/* Priority Filter */}
                    <select
                        value={selectedPriority}
                        onChange={(e) => setSelectedPriority(e.target.value)}
                        className="p-2 border rounded"
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
                        className="p-2 border rounded"
                    >
                        <option value="">All Statuses</option>
                        <option value="not started">Not Started</option>
                        <option value="in progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
            </section>

            <section className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getFilteredTasks().map((task) => (
                    <div
                        key={task.id}
                        className="bg-white rounded-lg shadow-md p-2 cursor-pointer flex flex-col justify-between h-[50vh] overflow-y-auto"
                        style={{ backgroundColor: task.color || "#ffffff" }}
                        onClick={(e) => {
                            if (e.defaultPrevented) return;
                            onEdit(task);
                        }}
                    >
                        {/* top part */}
                        <div className="flex flex-col justify-between">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-[24vw] flex justify-between items-center">
                                        <h3 className="text-lg font-semibold">{task.title}</h3>

                                        <div className="flex items-center gap-2">
                                            {/* pin */}
                                            <div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Prevent triggering the edit mode
                                                        handleTogglePin(task.id, task.pin);
                                                    }}
                                                // className="text-blue-500 hover:text-blue-700"
                                                >
                                                    {task.pin
                                                        ? <BsPinAngleFill className="text-red-500 hover:text-red-700 cursor-pointer" /> :
                                                        <BsPinFill className="text-slate-600 hover:text-slate-800 cursor-pointer" />}
                                                </button>
                                            </div>
                                            {/* badge */}
                                            <div>
                                                {task.priority && (
                                                    <div className="relative">
                                                        <button
                                                            onClick={(e) => togglePriorityDropdown(e, task.id)}
                                                            className={`px-2 py-1 rounded-full text-xs ${task.priority === "high"
                                                                ? "bg-red-200 text-red-800"
                                                                : task.priority === "medium"
                                                                    ? "bg-yellow-200 text-yellow-800"
                                                                    : "bg-green-200 text-green-800"
                                                                }`}
                                                        >
                                                            {task.priority}
                                                        </button>
                                                        {openPriorityDropdownId === task.id && (
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
                                                    size={20}
                                                    className="cursor-pointer mr-2"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleToggleAll(task.id, task.Task);
                                                    }}
                                                />
                                                {/* <span className="text-sm">Mark All</span> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Date Range */}
                            {task.from_date && task.to_date && (
                                <p className="text-sm text-gray-600 mb-4">
                                    {format(new Date(task.from_date), "MMM d")} – {format(new Date(task.to_date), "MMM d")}
                                </p>
                            )}

                            {/* Mark All & Subtasks */}
                            <div className="ml-4 space-y-2">
                                {/* Individual sub‑tasks */}
                                {task.Task?.map((sub, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center mb-1"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={sub.completed}
                                            onChange={(e) => handleToggleOne(task.id, idx, e.target.checked)}
                                            className={
                                                sub.isSubtask ? "mr-8 cursor-pointer" : "mr-4 cursor-pointer"
                                            }
                                        />
                                        <span
                                            className={`${!sub.isSubtask ? "font-semibold" : ""} 
                                            ${sub.completed ? "line-through" : ""}`}>
                                            {sub.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* bottom part */}
                        <div className="flex items-center justify-between w-full mt-4 pt-2 border-t-2">
                            {/* Progress Bar */}
                            <div className="flex flex-col w-10/12">
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
                            {/* Delete Task */}
                            <div className="border-t border-gray-100">
                                <button
                                    onClick={(e) => { onDelete(task.id, e); setDropdownOpenId(null); }} // Pass event 'e'
                                    className="block w-full text-left py-2 px-4 text-sm text-red-600 hover:bg-red-50"
                                >
                                    <FaTrashCan size={20} />
                                </button>
                            </div>

                            {/* select color */}
                            <div className="relative w-[1.5vw] h-[3.5vh]">
                                <button
                                    onClick={(e) => toggleColorDropdown(e, task.id)}
                                    className="text-gray-700 hover:text-gray-900 text-[1.28rem] relative top-[0.9vh]"
                                >
                                    <IoColorPaletteSharp />
                                </button>
                                {openColorDropdownId === task.id && (
                                    <div className="bg-white border rounded shadow z-10 w-[8.2vw] h-[24vh] overflow-y-scroll absolute bottom-[3vh] right-[0.4vw]">
                                        {[
                                            { name: "Red", value: "lightpink" },
                                            { name: "Yellow", value: "lightyellow" },
                                            { name: "Green", value: "lightgreen" },
                                            { name: "Blue", value: "powderblue" },
                                            { name: "Steel Blue", value: "lightsteelblue" },
                                            { name: "Gray", value: "lightgray" },
                                        ].map((color) => (
                                            <button
                                                key={color.value}
                                                onClick={(e) => handleColorChange(e, task.id, color.value)}
                                                className="w-full text-left px-4 py-2 text-sm bg-gray-100 hover:bg-gray-300 flex items-center gap-2"
                                            >
                                                <span
                                                    className="inline-block w-4 h-4 mr-2 rounded-full"
                                                    style={{ backgroundColor: color.value }}
                                                ></span>
                                                <span>{color.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
};

export default Tasks;