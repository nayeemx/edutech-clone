import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { auth, db } from "../../firebase/firebase.config";
import { format, isAfter } from "date-fns";

// Priority color mapping
const priorityColors = {
    high: "#ef4444",     // Red
    medium: "#eab308",   // Yellow
    low: "#22c55e",      // Green
};

const TodoReport = () => {
    const [tasks, setTasks] = useState([]);
    const [priorityCount, setPriorityCount] = useState({ high: 0, medium: 0, low: 0 });

    const pieChartRef = useRef(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) return;

            const taskRef = db.ref(`tasks/${user.uid}`);
            taskRef.on("value", (snapshot) => {
                const data = snapshot.val() || {};
                const formatted = Object.entries(data).map(([id, task]) => ({
                    id,
                    ...task,
                    from_date: task.from_date || null,
                    to_date: task.to_date || null,
                }));
                setTasks(formatted);
                updatePriorityCount(formatted);
            });

            return () => taskRef.off();
        });

        return () => unsubscribe();
    }, []);

    const updatePriorityCount = (taskList) => {
        const counts = { high: 0, medium: 0, low: 0 };
        taskList.forEach((task) => {
            if (task.priority === "high") counts.high++;
            else if (task.priority === "medium") counts.medium++;
            else if (task.priority === "low") counts.low++;
        });
        setPriorityCount(counts);
    };

    const generatePieChart = () => {
        let completed = 0, inProgress = 0, notStarted = 0;

        tasks.forEach((task) => {
            const total = task.Task?.length || 0;
            const done = task.Task?.filter((t) => t.completed).length || 0;

            if (total === 0 || done === 0) notStarted++;
            else if (done < total) inProgress++;
            else completed++;
        });

        return {
            tooltip: {},
            legend: {
                show: false,
            },
            series: [
                {
                    name: "Task Status",
                    type: "pie",
                    radius: ["40%", "70%"],
                    label: { show: false },
                    emphasis: {
                        label: {
                            show: false,
                            fontSize: 16,
                            fontWeight: "bold",
                        },
                    },
                    data: [
                        { value: completed, name: "Completed" },
                        { value: inProgress, name: "In Progress" },
                        { value: notStarted, name: "Not Started" },
                    ],
                    itemStyle: {
                        color: (params) =>
                            ["#22c55e", "#eab308", "#ef4444"][params.dataIndex],
                    },
                },
            ],
        };
    };

    useEffect(() => {
        if (pieChartRef.current) {
            const chart = echarts.init(pieChartRef.current);
            chart.setOption(generatePieChart());
            return () => chart.dispose();
        }
    }, [tasks]);

    const getUpcomingDeadlines = () => {
        const now = new Date();
        return tasks
            .filter((task) => task.to_date && isAfter(new Date(task.to_date), now))
            .sort((a, b) => new Date(a.to_date) - new Date(b.to_date));
    };

    const getBarWidth = (value) => {
        const max = Math.max(priorityCount.high, priorityCount.medium, priorityCount.low) || 1;
        return `${(value / max) * 100}%`;
    };

    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* 🔸 Task Status Pie Chart */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-4">
                    <h3 className="text-center font-semibold text-2xl mb-4">Task Status</h3>
                    <div ref={pieChartRef} style={{ height: 250 }} />
                </div>

                {/* 🔸 Priority Breakdown Block */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-4 h-[38vh] lg:h-[54vh]">
                    <h3 className="text-center font-semibold text-2xl mb-4">Priority Breakdown</h3>
                    <div className="space-y-4 relative top-[18%]">
                        {["high", "medium", "low"].map((level) => (
                            <div key={level}>
                                <div className="flex justify-between text-sm font-medium">
                                    <span className="capitalize">{level} Priority</span>
                                    <span>{priorityCount[level]}</span>
                                </div>
                                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-2 rounded-full"
                                        style={{
                                            width: getBarWidth(priorityCount[level]),
                                            backgroundColor: priorityColors[level],
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 🔸 Upcoming Deadlines */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-4">
                    <h3 className="text-center font-semibold mb-4">📅 Upcoming Deadlines</h3>
                    <ul className="divide-y divide-gray-200 max-h-[250px] overflow-y-auto">
                        {getUpcomingDeadlines().length === 0 ? (
                            <li className="text-center text-gray-500 py-4">
                                No upcoming deadlines
                            </li>
                        ) : (
                            getUpcomingDeadlines().map((task) => {
                                const total = task.Task?.length || 0;
                                const done = task.Task?.filter((t) => t.completed).length || 0;
                                const percent = total === 0 ? 0 : Math.round((done / total) * 100);

                                return (
                                    <li
                                        key={task.id}
                                        className="py-3 px-2 flex justify-between items-center"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span
                                                className="w-3 h-3 rounded-full mt-2"
                                                style={{
                                                    backgroundColor:
                                                        priorityColors[task.priority] || "#9ca3af",
                                                }}
                                            />
                                            <div className="flex flex-col">
                                                <span className="font-medium text-gray-800 truncate">
                                                    {task.title}
                                                </span>
                                                <div className="text-sm text-gray-500 flex items-center gap-2">
                                                    <span>{format(new Date(task.to_date), "PPP")}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-700">
                                                {percent}%
                                            </span>
                                        </div>
                                    </li>
                                );
                            })
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TodoReport;