// src/components/TeacherComponent/Tasks.jsx
import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase/firebase.config";
import { format } from "date-fns";
import {
    BsPinAngleFill,
    BsTrash,
    BsCheckAll,
} from "react-icons/bs";

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

    return (
        <section className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task) => (
                <div
                    key={task.id}
                    className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
                    style={{ backgroundColor: task.color }}
                    onClick={(e) => {
                        if (e.defaultPrevented) return;
                        onEdit(task);
                    }}
                >
                    {/* Header */}
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                            <div className="w-[15vw] flex justify-between items-center">
                                <h3 className="text-lg font-semibold">{task.title}</h3>

                                <div className="flex items-center gap-2">
                                    {/* pin */}
                                    <div>
                                        {task.pin ? (
                                            <BsPinAngleFill className="text-blue-500" />
                                        ) : (
                                            <BsPinAngleFill className="text-gray-400" />
                                        )}
                                    </div>
                                    {/* badge */}
                                    <div>
                                        {task.priority && (
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs ${task.priority === "high"
                                                    ? "bg-red-200 text-red-800"
                                                    : task.priority === "medium"
                                                        ? "bg-yellow-200 text-yellow-800"
                                                        : "bg-green-200 text-green-800"
                                                    }`}
                                            >
                                                {task.priority}
                                            </span>
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
                                    className={`
                    ${!sub.isSubtask ? "font-semibold" : ""}
                    ${sub.completed ? "line-through" : ""}
                  `}
                                >
                                    {sub.name}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-between w-ful mt-4 pt-2 border-t-2">
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
                        <div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(task.id);
                                }}
                                className="text-red-500 hover:text-red-700 mt-4"
                            >
                                <BsTrash size={20} />
                            </button>
                        </div>
                    </div>

                </div>
            ))}
        </section>
    );
};

export default Tasks;