// src/components/TeacherComponent/ToDo.jsx
import React, { useState, useEffect, useRef } from "react";
import { auth, db } from "../../firebase/firebase.config"; // compat-style exports
import { format } from "date-fns";
import dayjs from "dayjs";
import {
  BsPinAngleFill,
  BsPinFill,
  BsFillExclamationTriangleFill,
  BsPalette,
  BsGripVertical,
} from "react-icons/bs";

import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const ToDo = () => {
  const [userName, setUserName] = useState("");
  const [isTaskExpanded, setIsTaskExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [taskList, setTaskList] = useState(
    JSON.parse(localStorage.getItem("taskState"))?.isSubtask === true
      ? [{ name: "", completed: false, isSubtask: true }]
      : [{ name: "", completed: false, isSubtask: false }]
  );
  const [priority, setPriority] = useState("");
  const [color, setColor] = useState("");
  const [pin, setPin] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState([
    { startDate: null, endDate: null, key: "selection" },
  ]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingData, setEditingData] = useState(null);

  const taskCardRef = useRef(null);
  const newTaskInputRef = useRef(null);
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
  const [showColorDropdown, setShowColorDropdown] = useState(false);

  const priorityOptions = ["high", "medium", "low"];
  const colorOptions = [
    "powderblue",
    "lightpink",
    "lightyellow",
    "lightgray",
    "lightcoral",
    "lightgreen",
    "lightblue",
    "lightgoldenrodyellow",
    "lightsteelblue",
    "lightseagreen",
  ];

  // Load tasks from Firebase
  useEffect(() => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;
    const tasksRef = db.ref(`tasks/${userId}`);
    tasksRef.on("value", (snap) => {
      const data = snap.val() || {};
      const arr = Object.entries(data).map(([id, val]) => ({ id, ...val }));
      // pinned first, then by priority
      arr.sort((a, b) => (b.pin - a.pin) || ((a.priority || 3) - (b.priority || 3)));
      setTasks(arr);
    });
    return () => tasksRef.off();
  }, []);

  // Auto‐save on click outside
  useEffect(() => {
    const handler = (e) => {
      if (taskCardRef.current && !taskCardRef.current.contains(e.target)) {
        if (isTaskExpanded) saveTask();
        resetInputs();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isTaskExpanded, title, taskList, priority, color, pin, dateRange, editingTaskId]);

  const resetInputs = () => {
    setIsTaskExpanded(false);
    setTitle("");
    setTaskList([{ name: "", completed: false, isSubtask: false }]);
    setPriority("");
    setColor("");
    setPin(false);
    setShowDatePicker(false);
    setDateRange([{ startDate: null, endDate: null, key: "selection" }]);
    setEditingTaskId(null);
    setEditingData(null);
  };

  const saveTask = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;
    const now = dayjs().format();
    const taskObj = {
      title,
      Task: taskList,
      priority,
      color,
      pin,
      from_date: dateRange[0].startDate
        ? format(dateRange[0].startDate, "yyyy-MM-dd")
        : null,
      to_date: dateRange[0].endDate
        ? format(dateRange[0].endDate, "yyyy-MM-dd")
        : null,
      updated_at: now,
    };
    const hasContent =
      title ||
      taskList.some((t) => t.name.trim()) ||
      priority ||
      color ||
      pin;
    if (!hasContent) return;

    if (editingTaskId) {
      await db.ref(`tasks/${userId}/${editingTaskId}`).update(taskObj);
    } else {
      await db.ref(`tasks/${userId}`).push({ ...taskObj, created_at: now });
    }
  };

  const handleTaskChange = (i, val) => {
    const updated = [...taskList];
    updated[i].name = val;
    setTaskList(updated);
  };

  const handleAddTask = (e) => {
    if (e.key === "Enter") {
      const isSub = taskList[taskList.length - 1]?.isSubtask || false;
      const newList = [
        ...taskList,
        { name: "", completed: false, isSubtask: isSub },
      ];
      setTaskList(newList);
      localStorage.setItem("taskState", JSON.stringify({ isSubtask: isSub }));
      setTimeout(() => newTaskInputRef.current?.focus(), 0);
    }
  };

  const handleTaskComplete = (i) => {
    const updated = [...taskList];
    updated[i].completed = !updated[i].completed;
    setTaskList(updated);
  };

  const handleDelete = async (taskId) => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;
    await db.ref(`tasks/${userId}/${taskId}`).remove();
  };

  const handleEdit = (task) => {
    setEditingTaskId(task.id);
    setEditingData(task);
    setIsTaskExpanded(true);
    setTitle(task.title);
    setTaskList(task.Task);
    setPriority(task.priority);
    setColor(task.color);
    setPin(task.pin);
    setDateRange([
      {
        startDate: task.from_date ? new Date(task.from_date) : null,
        endDate: task.to_date ? new Date(task.to_date) : null,
        key: "selection",
      },
    ]);
  };

  const toggleSubtask = (i) => {
    const updated = [...taskList];
    updated[i].isSubtask = !updated[i].isSubtask;
    setTaskList(updated);
    localStorage.setItem(
      "taskState",
      JSON.stringify({ isSubtask: updated[i].isSubtask })
    );
  };

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">To Do List</h1>
        <p>Welcome, {userName}</p>
      </div>

      <section>
        {!isTaskExpanded ? (
          <div
            className="border p-3 rounded cursor-pointer"
            onClick={() => setIsTaskExpanded(true)}
          >
            + Add Task
          </div>
        ) : (
          <div
            ref={taskCardRef}
            className="border p-4 rounded shadow bg-white relative"
          >
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 w-full mb-2 rounded"
            />

            {taskList.map((t, i) => (
              <div key={i} className="flex items-center mb-2 gap-2">
                <BsGripVertical
                  className="cursor-move"
                  onClick={() => toggleSubtask(i)}
                />
                <input
                  ref={i === taskList.length - 1 ? newTaskInputRef : null}
                  value={t.name}
                  onChange={(e) => handleTaskChange(i, e.target.value)}
                  onKeyDown={handleAddTask}
                  className={`border p-2 rounded w-full ${
                    t.isSubtask ? "ml-8" : ""
                  }`}
                />
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => handleTaskComplete(i)}
                  className="ml-2"
                />
              </div>
            ))}

            <div className="flex flex-wrap gap-3 items-center mt-4">
              <button
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="border p-2 rounded"
              >
                📅
              </button>
              {showDatePicker && (
                <div className="absolute z-50 bg-white border rounded shadow p-2">
                  <div className="flex justify-end mb-2">
                    <button
                      onClick={() => setShowDatePicker(false)}
                      className="text-sm text-red-500"
                    >
                      Close ✖
                    </button>
                  </div>
                  <DateRange
                    editableDateInputs={true}
                    onChange={(ranges) => setDateRange([ranges.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dateRange}
                    showDateDisplay={false}
                    rangeColors={["#3b82f6"]}
                    minDate={new Date()}
                  />
                </div>
              )}

              {/* Priority dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
                  className="border p-2 rounded"
                >
                  <BsFillExclamationTriangleFill />
                </button>
                {showPriorityDropdown && (
                  <div className="absolute top-full mt-2 border p-2 bg-white shadow rounded">
                    {priorityOptions.map((p) => (
                      <div
                        key={p}
                        className="cursor-pointer p-1"
                        onClick={() => {
                          setPriority(p);
                          setShowPriorityDropdown(false);
                        }}
                      >
                        {p}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Color picker */}
              <div className="relative">
                <button
                  onClick={() => setShowColorDropdown(!showColorDropdown)}
                  className="border p-2 rounded"
                >
                  <BsPalette />
                </button>
                {showColorDropdown && (
                  <div className="absolute top-full mt-2 border p-2 bg-white shadow rounded">
                    {colorOptions.map((c) => (
                      <div
                        key={c}
                        className="cursor-pointer p-1"
                        onClick={() => {
                          setColor(c);
                          setShowColorDropdown(false);
                        }}
                      >
                        <span
                          style={{
                            backgroundColor: c,
                            display: "inline-block",
                            width: "20px",
                            height: "20px",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button onClick={() => setPin(!pin)} className="p-2">
                {pin ? <BsPinAngleFill /> : <BsPinFill />}
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Render saved tasks */}
      <section className="mt-6">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="p-4 mb-2 border rounded cursor-pointer"
            style={{ backgroundColor: task.color }}
            onClick={() => handleEdit(task)}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                {task.pin && <span title="Pinned">📌</span>}
                <h3 className="font-semibold">{task.title}</h3>
                {task.from_date && task.to_date && (
                  <span className="text-sm text-gray-700">
                    {format(new Date(task.from_date), "MMM d")} -{" "}
                    {format(new Date(task.to_date), "MMM d")}
                  </span>
                )}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(task.id);
                }}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
            {/* Render sub-tasks */}
            {task.Task?.map((t, i) => (
              <div key={i} className="ml-4 flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={t.completed}
                  readOnly
                  className="mr-2"
                />
                <span>{t.name}</span>
              </div>
            ))}
          </div>
        ))}
      </section>
    </main>
  );
};

export default ToDo;