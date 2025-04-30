import React, { useState, useEffect, useRef, useCallback } from "react";
import { auth, db } from "../../firebase/firebase.config";
import { format } from 'date-fns';
import dayjs from 'dayjs';
import { FaExclamationTriangle, FaPalette, FaRegCalendarAlt } from 'react-icons/fa';
import { IconContext } from "react-icons";
import { BsPinAngleFill, BsPinFill, BsGripVertical, BsTrash } from "react-icons/bs";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import Tasks from "./Tasks"; // Assuming Tasks component exists and receives props
import TodoReport from "../../components/TeacherComponent/TodoReport";

const ToDo = () => {
    // --- State Declarations ---
    const [userName, setUserName] = useState("");
    const [isTaskExpanded, setIsTaskExpanded] = useState(false);
    const [title, setTitle] = useState("");
    const [tasks, setTasks] = useState([]); // All existing tasks
    const [dateRange, setDateRange] = useState([{ startDate: null, endDate: null, key: 'selection' }]);
    const [priority, setPriority] = useState("");
    const [color, setColor] = useState(null);
    const [pin, setPin] = useState(false);
    const [currentTasks, setCurrentTasks] = useState([{ name: '', completed: false, isSubtask: false }]); // Tasks being edited
    const [loading, setLoading] = useState(true);
    const [isPriorityOpen, setIsPriorityOpen] = useState(false);
    const [isColorOpen, setIsColorOpen] = useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState(null);

    // --- Refs ---
    const taskCardRef = useRef(null);
    const taskInputRefs = useRef([]);
    const priorityDropdownRef = useRef(null);
    const colorDropdownRef = useRef(null);
    const calendarRef = useRef(null);
    const dateButtonRef = useRef(null);

    // --- Constants ---
    const priorityOptions = [
        { value: "high", label: "High", color: 'red' },
        { value: "medium", label: "Medium", color: 'goldenrod' },
        { value: "low", label: "Low", color: 'green' },
    ];
    const colorOptions = [
        '#FFF', '#fecaca', '#fffbe0', '#bbf7d0', '#bfdbfe', '#e9d5ff', '#fbcfe8', '#d1d5db',
        '#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51', '#d62828', '#457b9d',
        '#a8dadc', '#6c5b7b', '#355c7d', '#f67280'
    ];
    const priorityColors = { high: 'red', medium: 'goldenrod', low: 'green' };

    // --- Toggles ---
    const togglePriority = (e) => { e.stopPropagation(); setIsPriorityOpen(v => !v); setIsColorOpen(false); setIsCalendarOpen(false); };
    const toggleColor = (e) => { e.stopPropagation(); setIsColorOpen(v => !v); setIsPriorityOpen(false); setIsCalendarOpen(false); };
    const toggleCalendar = (e) => { e.stopPropagation(); setIsCalendarOpen(v => !v); setIsPriorityOpen(false); setIsColorOpen(false); };

    // --- Effects ---
    // Sync taskInputRefs
    useEffect(() => {
        taskInputRefs.current = Array(currentTasks.length).fill().map((_, i) => taskInputRefs.current[i] || React.createRef());
    }, [currentTasks.length]);

    // Auth and Data Fetching
    useEffect(() => {
        const unsubscribeAuth = auth.onAuthStateChanged((user) => {
            let tasksListener = null; // Variable to hold the listener unsubscribe function
            if (user) {
                const userId = user.uid;
                db.ref(`users/${userId}`).once("value")
                    .then((snapshot) => setUserName(snapshot.val()?.name || user.displayName || user.email || "User"))
                    .catch(() => setUserName(user.displayName || user.email || "User"));

                const tasksRef = db.ref(`tasks/${userId}`);
                 // Assign the listener function to the variable
                tasksListener = tasksRef.on("value", (snapshot) => {
                    const data = snapshot.val() || {};
                    const tasksArray = Object.entries(data).map(([id, task]) => ({
                        id, ...task, Task: Array.isArray(task.Task) ? task.Task : [] // Ensure Task is array
                    }));
                    tasksArray.sort((a, b) => {
                        if (a.pin !== b.pin) return a.pin ? -1 : 1;
                        const order = { high: 1, medium: 2, low: 3 };
                        return (order[a.priority] || 4) - (order[b.priority] || 4);
                     });
                    setTasks(tasksArray);
                    setLoading(false);
                }, (error) => { console.error("Error fetching tasks:", error); setLoading(false); });

            } else {
                setUserName(""); setTasks([]); setLoading(false);
                if (tasksListener) { // Detach listener if user logs out while it's active
                     db.ref(`tasks/${auth.currentUser?.uid}`).off("value", tasksListener);
                 }
            }

             // Cleanup function for the auth listener
             return () => {
                 unsubscribeAuth(); // Unsubscribe auth listener
                 if (tasksListener) { // Detach Firebase listener if component unmounts while user is logged in
                     db.ref(`tasks/${auth.currentUser?.uid}`).off("value", tasksListener);
                 }
             };
        });
         // Initial call in case the component mounts after auth state is already set
         return () => unsubscribeAuth(); // Ensure cleanup on unmount

    }, []); // Empty dependency array: runs once on mount


    // --- Logging Function (Memoized) ---
    const logAction = useCallback(async (action, taskId = null, details = {}) => {
        const userId = auth.currentUser?.uid;
        if (!userId) return;
        const logEntry = { action, taskId, userId, timestamp: dayjs().toISOString(), details };
        try {
            await db.ref(`logs/${userId}`).push(logEntry);
            console.log("Action logged:", logEntry);
        } catch (error) { console.error("Error logging:", error); }
    }, []); // Depends only on auth context potentially changing, but firebase sdk handles that

    // --- Save/Update Task (Memoized) ---
    const handleSaveTask = useCallback(async () => {
        const userId = auth.currentUser?.uid;
        if (!userId) { console.error("No user"); return; }

        const tasksToSave = currentTasks.filter(task => task.name.trim() !== '');
        const hasContent = title.trim() || tasksToSave.length > 0 || priority || color !== null || pin || dateRange[0]?.startDate;

        if (!hasContent) { console.log("Task empty, not saving."); return; }

        const now = dayjs().format();
        const taskData = {
            title: title.trim(), Task: tasksToSave, priority: priority || "", color: color || null, pin,
            from_date: dateRange[0]?.startDate ? format(dateRange[0].startDate, 'yyyy-MM-dd') : null,
            to_date: dateRange[0]?.endDate ? format(dateRange[0].endDate, 'yyyy-MM-dd') : null,
            updated_at: now
        };

        try {
            if (editingTaskId) {
                await db.ref(`tasks/${userId}/${editingTaskId}`).update(taskData);
                await logAction('update_task', editingTaskId, { title: taskData.title });
                console.log('Task updated:', editingTaskId);
            } else {
                taskData.created_at = now;
                const newTaskRef = await db.ref(`tasks/${userId}`).push(taskData);
                await logAction('create_task', newTaskRef.key, { title: taskData.title });
                console.log('Task saved:', newTaskRef.key);
            }
            // Let resetInputs handle clearing the form
        } catch (error) {
            console.error("Error saving:", error);
            await logAction('save_error', editingTaskId, { error: error.message });
        }
     // Dependencies: state values read inside
    }, [ title, currentTasks, dateRange, priority, color, pin, editingTaskId, logAction]);

    // --- Reset Inputs (Memoized - dependencies removed as setters are stable) ---
    const resetInputs = useCallback(() => {
        setIsTaskExpanded(false);
        setTitle("");
        setCurrentTasks([{ name: '', completed: false, isSubtask: false }]);
        setPriority("");
        setColor(null);
        setPin(false);
        setDateRange([{ startDate: null, endDate: null, key: "selection" }]);
        setEditingTaskId(null);
        setShowPriorityDropdown(false);
        setShowColorDropdown(false);
        setIsCalendarOpen(false);
    }, []); // Empty dependency array because setters are stable

    // --- Click Outside Logic (Using Memoized Functions) ---
    useEffect(() => {
        function handleClickOutside(event) {
             let shouldReset = true;
             // Check if click is inside any dropdown/calendar or their trigger buttons
             if (priorityDropdownRef.current?.contains(event.target) || event.target.closest('button[data-priority-toggle]')) { shouldReset = false; }
             if (colorDropdownRef.current?.contains(event.target) || event.target.closest('button[data-color-toggle]')) { shouldReset = false; }
             if (calendarRef.current?.contains(event.target) || dateButtonRef.current?.contains(event.target)) { shouldReset = false; }

            // Close specific dropdowns if click is outside them
             if (priorityDropdownRef.current && !priorityDropdownRef.current.contains(event.target) && !event.target.closest('button[data-priority-toggle]')) { setIsPriorityOpen(false); }
             if (colorDropdownRef.current && !colorDropdownRef.current.contains(event.target) && !event.target.closest('button[data-color-toggle]')) { setIsColorOpen(false); }
             if (calendarRef.current && !calendarRef.current.contains(event.target) && dateButtonRef.current && !dateButtonRef.current.contains(event.target)) { setIsCalendarOpen(false); }

            // Handle click outside the main task card only if shouldReset is true
            if (taskCardRef.current && !taskCardRef.current.contains(event.target) && shouldReset) {
                if (isTaskExpanded) {
                    handleSaveTask();
                }
                resetInputs(); // Reset the form state
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
     // Dependencies now include the stable memoized functions
    }, [taskCardRef, isTaskExpanded, handleSaveTask, resetInputs]);


    // --- Other Handlers ---
    const handlePriorityChange = (value) => { setPriority(value); setIsPriorityOpen(false); };
    const handleColorChange = (value) => { setColor(value); setIsColorOpen(false); };
    const handlePinToggle = (e) => { e.stopPropagation(); setPin(!pin); };

    const handleTaskChange = (index, value) => {
        const updatedTasks = [...currentTasks];
        updatedTasks[index].name = value;
        setCurrentTasks(updatedTasks);
    };

    const handleAddTask = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const lastTaskIsSubtask = currentTasks[currentTasks.length - 1]?.isSubtask || false;
            const newTasks = [...currentTasks, { name: '', completed: false, isSubtask: lastTaskIsSubtask }];
            setCurrentTasks(newTasks);
            setTimeout(() => {
                const newTaskIndex = newTasks.length - 1;
                if (taskInputRefs.current[newTaskIndex]?.current) {
                    taskInputRefs.current[newTaskIndex].current.focus();
                }
            }, 0);
        }
    };

     const handleDeleteCurrentTask = (index) => {
        const updatedTasks = currentTasks.filter((_, i) => i !== index);
          setCurrentTasks(updatedTasks.length > 0 ? updatedTasks : [{ name: '', completed: false, isSubtask: false }]);
      };


    const handleTaskComplete = (index) => {
        const updated = [...currentTasks];
        updated[index].completed = !updated[index].completed;
        setCurrentTasks(updated);
    };

    const toggleSubtask = (i) => {
        const updated = [...currentTasks];
        updated[i].isSubtask = !updated[i].isSubtask;
        setCurrentTasks(updated);
    };

    const handleDateRangeChange = (item) => {
     setDateRange([item.selection]);
    };

    const handleDeleteExistingTask = async (taskId, e) => {
        e.stopPropagation();
        const userId = auth.currentUser?.uid;
        if (!userId) return;
        
        try {
            // Get the full task data for detailed logging
            const taskSnapshot = await db.ref(`tasks/${userId}/${taskId}`).once('value');
            const taskData = taskSnapshot.val() || {};
            
            // Log the deletion with comprehensive data
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
            
            // After logging, delete the task
            await db.ref(`tasks/${userId}/${taskId}`).remove();
            console.log(`Task ${taskId} deleted.`);
            
        } catch (error) {
            console.error("Error deleting task:", error);
            await logAction('delete_error', taskId, { error: error.message });
        }
    };


    // Edit Task Prep
    const handleEdit = (task) => {
        setEditingTaskId(task.id);
        setTitle(task.title || "");
        const taskItems = Array.isArray(task.Task)
                         ? task.Task.map(t => ({...t}))
                         : [{ name: "", completed: false, isSubtask: false }];
        setCurrentTasks(taskItems.length > 0 ? taskItems : [{ name: "", completed: false, isSubtask: false }]);
        setPriority(task.priority || "");
        setColor(task.color || null);
        setPin(task.pin || false);
        setDateRange([{
            startDate: task.from_date ? dayjs(task.from_date).toDate() : null,
            endDate: task.to_date ? dayjs(task.to_date).toDate() : null,
            key: "selection"
        }]);
        setIsTaskExpanded(true);
        // Ensure dropdowns are closed when starting an edit
        setShowPriorityDropdown(false);
        setShowColorDropdown(false);
        setIsCalendarOpen(false);
    };


    // --- Render ---
    return (
      <div>
        <main className="p-4 w-full mx-auto">
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center mb-4">
            <div>
              <h3 className="text-2xl font-semibold">To Do List</h3>
            </div>
            <div className="p-4 text-xl font-semibold">
              <span className="font-normal">Welcome</span>
              {userName ? `, ${userName}!` : "Loading..."}
            </div>
          </div>

          <div>
                <TodoReport />
            </div>

          <section className="rounded-lg p-4 shadow-lg mb-4">
            {!isTaskExpanded ? (
              <input
                type="text"
                placeholder="+ Add Task"
                className="cursor-pointer my-6 p-3 border-2 border-gray-300 rounded-lg w-full font-bold text-gray-500 hover:bg-gray-50"
                onClick={() => setIsTaskExpanded(true)}
              />
            ) : (
              <div
                ref={taskCardRef}
                className="p-4 border-2 border-gray-300 rounded-lg w-full bg-white shadow-lg mb-4"
              >
                <input
                  type="text"
                  placeholder="Title"
                  className="p-2 border border-gray-300 rounded-lg w-full mb-3 text-lg font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <div className="space-y-2 mb-4">
                  {currentTasks.map((task, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-2 ${
                        task.isSubtask ? "ml-8" : ""
                      }`}
                    >
                      <span
                        className="cursor-move text-gray-400 hover:text-gray-600"
                        onClick={() => toggleSubtask(index)}
                        title="Toggle Subtask"
                      >
                        {" "}
                        <BsGripVertical />{" "}
                      </span>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleTaskComplete(index)}
                        className="mr-2 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <input
                        type="text"
                        placeholder="Task Item"
                        value={task.name}
                        onChange={(e) =>
                          handleTaskChange(index, e.target.value)
                        }
                        onKeyDown={handleAddTask}
                        // Assign ref using the index
                        ref={(el) =>
                          (taskInputRefs.current[index] = { current: el })
                        } // Correct ref assignment
                        className="p-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {(currentTasks.length > 1 || task.name.trim()) && (
                        <button
                          onClick={() => handleDeleteCurrentTask(index)}
                          className="ml-2 text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-100"
                        >
                          <BsTrash />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200 relative">
                  {/* calender */}
                  <div className="relative">
                    <button
                      ref={dateButtonRef}
                      onClick={toggleCalendar}
                      className="p-2 rounded-lg md:border-2 md:border-gray-300 flex items-center gap-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <FaRegCalendarAlt />
                      <span className="hidden sm:inline">
                        {dateRange[0]?.startDate
                          ? `${format(dateRange[0].startDate, "MMM d")}${
                              dateRange[0]?.endDate &&
                              !dayjs(dateRange[0].startDate).isSame(
                                dateRange[0].endDate,
                                "day"
                              )
                                ? ` - ${format(dateRange[0].endDate, "MMM d")}`
                                : ""
                            }`
                          : "Select Date"}
                      </span>
                    </button>
                    {isCalendarOpen && (
                      <div
                        ref={calendarRef}
                        className="absolute left-0 top-full mt-2 z-20 bg-white shadow-xl rounded-lg border border-gray-200"
                      >
                        <DateRange
                          onChange={handleDateRangeChange}
                          ranges={dateRange}
                          months={2}
                          direction="horizontal"
                          showDateDisplay={false}
                          rangeColors={["#3b82f6"]}
                        />
                      </div>
                    )}
                  </div>
                  {/* priority */}
                  <div className="relative">
                    <button
                      data-priority-toggle
                      onClick={togglePriority}
                      className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <IconContext.Provider
                        value={{
                          size: "1.2em",
                          color: priority
                            ? priorityColors[priority]
                            : "text-gray-500",
                        }}
                      >
                        {" "}
                        <FaExclamationTriangle />{" "}
                      </IconContext.Provider>
                    </button>
                    {isPriorityOpen && (
                      <div
                        ref={priorityDropdownRef}
                        className="absolute top-full mt-2 w-[28vw] md:w-[11vw] lg:w-[9vw] xl:w-[6vw] bg-white border border-gray-200 rounded shadow-lg z-20"
                      >
                        {priorityOptions.map((p, index) => (
                          <button
                            key={index}
                            onClick={() => handlePriorityChange(p.value)}
                            className="block w-full text-left py-2 px-4 hover:bg-gray-100 text-sm capitalize"
                          >
                            {" "}
                            {p.label}{" "}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* color */}
                  <div className="relative">
                    <button
                      data-color-toggle
                      onClick={toggleColor}
                      className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <IconContext.Provider
                        value={{
                          size: "1.2em",
                          color: color || "text-gray-500",
                        }}
                      >
                        {" "}
                        <FaPalette />{" "}
                      </IconContext.Provider>
                    </button>
                    {isColorOpen && (
                      <div
                        ref={colorDropdownRef}
                        className="absolute top-full mt-2 p-2 bg-white border border-gray-200 rounded shadow-lg z-20 w-[38vw] md:w-[19vw] lg:w-[15vw] xl:w-[10vw] grid grid-cols-4 gap-2"
                      >
                        {colorOptions.map((c, i) => (
                          <button
                            key={i}
                            onClick={() => handleColorChange(c)}
                            style={{ backgroundColor: c }}
                            className={`w-6 h-6 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 ${
                              color === c
                                ? "ring-2 ring-blue-600 ring-offset-1"
                                : ""
                            }`}
                            aria-label={`Color ${c}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  {/* pin */}
                  <button
                    onClick={handlePinToggle}
                    className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <IconContext.Provider
                      value={{
                        size: "1.2em",
                        color: pin ? "text-yellow-500" : "text-gray-500",
                      }}
                    >
                      {pin ? <BsPinFill /> : <BsPinAngleFill />}
                    </IconContext.Provider>
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* Display existing tasks using Tasks component */}
          <Tasks
            tasks={tasks}
            onEdit={handleEdit}
            onDelete={handleDeleteExistingTask}
            logAction={logAction}
          />
        </main>
      </div>
    );
};

export default ToDo;