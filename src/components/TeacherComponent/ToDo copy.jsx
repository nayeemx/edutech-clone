import React, { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "../../provider/AuthProvider"; // Import the useAuth hook
import { db } from "../../firebase/firebase.config"; // Import Firebase database reference
import {
  Spin,
  Input,
  Select,
  DatePicker,
  Button,
  Checkbox,
  Tooltip,
  Popover,
} from "antd"; // Using Ant Design components for UI consistency
import * as echarts from "echarts";
import {
  SearchOutlined,
  FilterOutlined,
  PlusOutlined,
  PushpinOutlined,
  DeleteOutlined,
  CheckSquareOutlined,
  BgColorsOutlined,
  FlagOutlined,
  CloseOutlined,
  InfoCircleOutlined, // For db connection status
} from "@ant-design/icons";
import dayjs from "dayjs"; // For date handling with Ant Design

const { RangePicker } = DatePicker;

const ToDo = () => {
  const { user, loading: authLoading } = useAuth(); // Access authentication state
  const [todos, setTodos] = useState([]);
  const [dbLoading, setDbLoading] = useState(true); // Loading state specifically for DB fetch
  const [newTodo, setNewTodo] = useState({
    title: "",
    items: [],
    startDate: dayjs().format("YYYY-MM-DD"), // Use dayjs format
    endDate: null,
    color: "", // Corresponds to CSS class or hex
    priority: "Medium",
    pinned: false,
  });
  const [isCreating, setIsCreating] = useState(false);
  const [newItemText, setNewItemText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    priority: [],
    colors: [],
    status: "Status",
    dateRange: [null, null], // [start, end] using dayjs objects
  });
  const [showFilters, setShowFilters] = useState(true);
  const [isDatabaseConnected, setIsDatabaseConnected] = useState(null); // null: unknown, true: connected, false: disconnected

  const chartRef = useRef(null);
  const myChart = useRef(null); // Store chart instance

  // --- Database Connection Check ---
  useEffect(() => {
    const connectedRef = db.ref(".info/connected");
    const listener = connectedRef.on("value", (snapshot) => {
      const isConnected = snapshot.val();
      setIsDatabaseConnected(isConnected);
      console.log(
        "Database Connection Status:",
        isConnected ? "Connected" : "Disconnected"
      );
    });
    // Cleanup listener on unmount
    return () => connectedRef.off("value", listener);
  }, []);

  // --- Firebase Data Fetching ---
  useEffect(() => {
    if (!user) {
      setTodos([]); // Clear todos if user logs out
      setDbLoading(false);
      return;
    }

    setDbLoading(true);
    const todosRef = db.ref(`todos/${user.uid}`);

    const listener = todosRef.on(
      "value",
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Convert Firebase object to array, adding the key as 'id'
          const todosArray = Object.entries(data).map(([id, value]) => ({
            id,
            ...value,
            // Ensure items is always an array, even if empty in Firebase
            items: value.items || [],
            // Ensure dates are strings for consistency if needed, though dayjs can handle them
            startDate: value.startDate,
            endDate: value.endDate,
          }));
          setTodos(todosArray);
        } else {
          setTodos([]); // No todos found for this user
        }
        setDbLoading(false);
      },
      (error) => {
        console.error("Firebase read failed:", error);
        setDbLoading(false);
        // TODO: Add user feedback for read error
      }
    );

    // Cleanup listener on unmount
    return () => todosRef.off("value", listener);
  }, [user]); // Rerun when user changes

  // --- Chart Update ---
  useEffect(() => {
    if (chartRef.current && todos.length >= 0 && !dbLoading) {
      // Update chart even if todos is empty
      const totalLists = todos.length;
      const completedLists = todos.filter(isCardCompleted).length;
      // In Progress: Not fully completed, but has at least one item checked
      const inProgressLists = todos.filter(
        (todo) =>
          !isCardCompleted(todo) && todo.items.some((item) => item.completed)
      ).length;

      const option = {
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: "List Status",
            type: "pie",
            radius: ["60%", "80%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 5,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: { show: false },
            emphasis: {
              label: { show: false }, // Keep center clean
            },
            labelLine: { show: false },
            data: [
              {
                value: completedLists,
                name: "Completed",
                itemStyle: { color: "#038fde" },
              }, // Tailwind green-400
              {
                value: inProgressLists,
                name: "In Progress",
                itemStyle: { color: "#FBBF24" },
              }, // Tailwind amber-400
              {
                value: totalLists - completedLists - inProgressLists,
                name: "Not Started",
                itemStyle: { color: "#F87171" },
              }, // Tailwind red-400 (or another color)
              // Alternative: Use orange for total, green segment for completed part? Match image more closely
            ],
          },
        ],
      };

      // Initialize or update chart
      if (!myChart.current) {
        myChart.current = echarts.init(chartRef.current);
      }
      myChart.current.setOption(option);

      // Resize chart on window resize
      const handleResize = () => myChart.current?.resize();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        // Don't dispose here if you want chart to persist across re-renders
        // myChart.current?.dispose(); -> causes issues on fast updates
      };
    } else if (myChart.current) {
      // Clear chart if no data or loading
      myChart.current.clear();
    }
  }, [todos, dbLoading]); // Rerun when todos or loading state change

  // --- Utility Functions ---
  const getPriorityStyles = (priority) => {
    switch (priority) {
      case "High":
        return {
          tag: "bg-red-100 text-red-600 border border-red-200",
          bar: "bg-red-500",
          dot: "text-red-500",
        };
      case "Medium":
        return {
          tag: "bg-yellow-100 text-yellow-600 border border-yellow-200",
          bar: "bg-yellow-500",
          dot: "text-yellow-500",
        };
      case "Low":
        return {
          tag: "bg-green-100 text-green-600 border border-green-200",
          bar: "bg-green-500",
          dot: "text-green-500",
        };
      default:
        return {
          tag: "bg-gray-100 text-gray-600 border border-gray-200",
          bar: "bg-gray-500",
          dot: "text-gray-500",
        };
    }
  };

  const colorOptions = [
    // Tailwind background color classes
    { name: "Default", value: "" }, // No background, inherits parent
    { name: "Yellow", value: "bg-yellow-500" }, // Match image better
    { name: "Green", value: "bg-green-500" },
    { name: "Blue", value: "bg-blue-500" },
    { name: "Purple", value: "bg-purple-500" },
    { name: "Red", value: "bg-red-500" },
    { name: "Pink", value: "bg-pink-500" },
    { name: "Gray", value: "bg-gray-500" },
  ];

  const priorityOptions = [
    { name: "High", value: "High" },
    { name: "Medium", value: "Medium" },
    { name: "Low", value: "Low" },
  ];

  const isCardCompleted = useCallback((todo) => {
    return todo.items.length > 0 && todo.items.every((item) => item.completed);
  }, []);

  const getCardProgress = useCallback((todo) => {
    if (!todo.items || todo.items.length === 0) return 0;
    const completed = todo.items.filter((item) => item.completed).length;
    return Math.round((completed / todo.items.length) * 100);
  }, []);

  // --- CRUD Operations ---

  const addNewItem = () => {
    if (newItemText.trim()) {
      setNewTodo((prev) => ({
        ...prev,
        items: [
          ...prev.items,
          {
            // Use timestamp for temporary unique ID during creation
            id: `temp-${Date.now()}`,
            text: newItemText.trim(),
            completed: false,
          },
        ],
      }));
      setNewItemText("");
    }
  };

  const saveTodo = () => {
    if (!user || !newTodo.title.trim()) return; // Need user and title

    const todoData = {
      ...newTodo,
      items: newTodo.items.map((item) => ({
        // Remove temporary ID
        text: item.text,
        completed: item.completed,
      })),
      createdAt: firebase.database.ServerValue.TIMESTAMP, // Use server timestamp
    };

    db.ref(`todos/${user.uid}`)
      .push(todoData)
      .then(() => {
        // Reset form
        setNewTodo({
          title: "",
          items: [],
          startDate: dayjs().format("YYYY-MM-DD"),
          endDate: null,
          color: "",
          priority: "Medium",
          pinned: false,
        });
        setNewItemText("");
        setIsCreating(false);
      })
      .catch((error) => {
        console.error("Error saving todo:", error);
        // TODO: Add user feedback for save error
      });
  };

  const updateTodo = (todoId, updates) => {
    if (!user) return;
    db.ref(`todos/${user.uid}/${todoId}`)
      .update(updates)
      .catch((error) => console.error("Error updating todo:", error));
  };

  const toggleItemCompletion = (todoId, itemIndex) => {
    if (!user) return;
    // Find the specific todo in the local state to get current item status
    const todo = todos.find((t) => t.id === todoId);
    if (!todo || !todo.items || itemIndex < 0 || itemIndex >= todo.items.length)
      return;

    const currentItem = todo.items[itemIndex];
    const updates = {};
    // Firebase path uses the index for arrays
    updates[`items/${itemIndex}/completed`] = !currentItem.completed;

    db.ref(`todos/${user.uid}/${todoId}`)
      .update(updates)
      .catch((error) => console.error("Error toggling item:", error));
  };

  const toggleCardCompletion = (todoId) => {
    if (!user) return;
    const todo = todos.find((t) => t.id === todoId);
    if (!todo || !todo.items || todo.items.length === 0) return;

    const currentlyAllCompleted = isCardCompleted(todo);
    const newCompletedStatus = !currentlyAllCompleted;

    // Create an updated items array
    const updatedItems = todo.items.map((item) => ({
      ...item,
      completed: newCompletedStatus,
    }));

    updateTodo(todoId, { items: updatedItems });
  };

  const deleteTodo = (todoId) => {
    if (!user) return;
    db.ref(`todos/${user.uid}/${todoId}`)
      .remove()
      .catch((error) => console.error("Error deleting todo:", error));
  };

  const handleCreateInputChange = (e) => {
    const { name, value } = e.target;
    setNewTodo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateDateChange = (dates) => {
    setNewTodo((prev) => ({
      ...prev,
      startDate: dates
        ? dayjs(dates[0]).format("YYYY-MM-DD")
        : dayjs().format("YYYY-MM-DD"),
      endDate: dates && dates[1] ? dayjs(dates[1]).format("YYYY-MM-DD") : null,
    }));
  };

  const handleCreatePriorityChange = (value) => {
    setNewTodo((prev) => ({ ...prev, priority: value }));
  };

  const handleCreateColorChange = (value) => {
    setNewTodo((prev) => ({ ...prev, color: value }));
  };

  const handleCreatePinToggle = () => {
    setNewTodo((prev) => ({ ...prev, pinned: !prev.pinned }));
  };

  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      let newFilters = { ...prev };
      if (type === "priority") {
        newFilters.priority = value;
      } else if (type === "colors") {
        const currentColors = prev.colors || [];
        if (currentColors.includes(value)) {
          newFilters.colors = currentColors.filter((c) => c !== value);
        } else {
          newFilters.colors = [...currentColors, value];
        }
      } else if (type === "Status") {
        newFilters.status = value;
      } else if (type === "dateRange") {
        newFilters.dateRange = value; // value should be [dayjs, dayjs] or null
      }
      return newFilters;
    });
  };

  const clearFilters = () => {
    setFilters({
      priority: [],
      colors: [],
      status: "Status",
      dateRange: [null, null],
    });
    setSearchTerm("");
  };

  // --- Filtering Logic ---
  const filteredTodos = todos.filter((todo) => {
    // Search term filter
    const searchMatch =
      searchTerm === "" ||
      todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (todo.items &&
        todo.items.some((item) =>
          item.text.toLowerCase().includes(searchTerm.toLowerCase())
        ));

    // Priority filter
    const priorityMatch =
      filters.priority.length === 0 || filters.priority.includes(todo.priority);

    // Color filter
    const colorMatch =
      filters.colors.length === 0 || filters.colors.includes(todo.color);

    // Status filter
    let statusMatch = true;
    if (filters.status === "completed") {
      statusMatch = isCardCompleted(todo);
    } else if (filters.status === "active") {
      // Active means not fully completed
      statusMatch = !isCardCompleted(todo);
    } else if (filters.status === "inProgress") {
      // In progress means some items checked but not all
      statusMatch =
        !isCardCompleted(todo) && todo.items.some((item) => item.completed);
    } else if (filters.status === "notStarted") {
      // Not started means no items checked
      statusMatch = todo.items.every((item) => !item.completed);
    }

    // Date range filter (checks if todo's start date falls within the range)
    let dateMatch = true;
    const filterStart = filters.dateRange?.[0];
    const filterEnd = filters.dateRange?.[1];
    if (filterStart && filterEnd) {
      const todoStart = dayjs(todo.startDate);
      // Inclusive check: start <= todoStart <= end
      dateMatch =
        todoStart.isSame(filterStart, "day") ||
        (todoStart.isAfter(filterStart, "day") &&
          todoStart.isBefore(filterEnd, "day")) ||
        todoStart.isSame(filterEnd, "day");
    } else if (filterStart) {
      const todoStart = dayjs(todo.startDate);
      dateMatch =
        todoStart.isSame(filterStart, "day") ||
        todoStart.isAfter(filterStart, "day");
    } else if (filterEnd) {
      const todoStart = dayjs(todo.startDate);
      dateMatch =
        todoStart.isSame(filterEnd, "day") ||
        todoStart.isBefore(filterEnd, "day");
    }

    return (
      searchMatch && priorityMatch && colorMatch && statusMatch && dateMatch
    );
  });

  // Sort todos: pinned first, then by creation date (newest first)
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    // Assuming createdAt is a timestamp
    return (b.createdAt || 0) - (a.createdAt || 0);
  });

  // --- Loading and Auth Check ---
  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-xl text-gray-600">
          Please log in to manage your To-Do lists.
        </h1>
        <p className="text-sm text-gray-500 mt-4">
          Database Connection:{" "}
          {isDatabaseConnected === null ? (
            "Checking..."
          ) : isDatabaseConnected ? (
            <span className="text-green-500">Connected</span>
          ) : (
            <span className="text-red-500">Disconnected</span>
          )}
        </p>
      </div>
    );
  }

  // Calculate dashboard stats from the original 'todos' array before filtering
  const totalLists = todos.length;
  const completedListsCount = todos.filter(isCardCompleted).length;
  const inProgressListsCount = todos.filter(
    (todo) =>
      !isCardCompleted(todo) && todo.items.some((item) => item.completed)
  ).length;

  const highPriorityCount = todos.filter((t) => t.priority === "High").length;
  const mediumPriorityCount = todos.filter(
    (t) => t.priority === "Medium"
  ).length;
  const lowPriorityCount = todos.filter((t) => t.priority === "Low").length;
  const totalPriorityCount =
    highPriorityCount + mediumPriorityCount + lowPriorityCount; // Could be less than total if some have no priority

  const upcomingTodos = todos
    .filter(
      (todo) => todo.endDate && dayjs(todo.endDate).isAfter(dayjs(), "day")
    ) // Filter for future end dates
    .sort((a, b) => dayjs(a.endDate).valueOf() - dayjs(b.endDate).valueOf()) // Sort by nearest deadline
    .slice(0, 3); // Take top 3

  // --- Render Component ---
  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-full">
      {/* Dashboard Section */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Stats Card 1: Overview */}
        <div className="bg-white rounded-lg shadow p-4 flex flex-col">
          <h3 className="text-base font-medium text-gray-700 mb-3">
            Task Overview
          </h3>
          <div className="flex items-center justify-around flex-grow mb-3">
            <div className="h-[100px] w-full mx-auto" ref={chartRef}>
              {dbLoading && (
                <div className="flex justify-center items-center h-full">
                  <Spin />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Card 2: Priority */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-base font-medium text-gray-700 mb-4">
            Priority Breakdown
          </h3>
          <div className="space-y-3">
            {["High", "Medium", "Low"].map((prio) => {
              const count =
                prio === "High"
                  ? highPriorityCount
                  : prio === "Medium"
                  ? mediumPriorityCount
                  : lowPriorityCount;
              const styles = getPriorityStyles(prio);
              const percentage =
                totalPriorityCount > 0 ? (count / totalPriorityCount) * 100 : 0;
              return (
                <div key={prio}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-600">
                      {prio} Priority
                    </span>
                    <span className="text-sm font-semibold text-gray-800">
                      {count}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className={`${styles.bar} h-1.5 rounded-full`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Card 3: Upcoming Deadlines */}
        <div className="bg-white rounded-lg shadow p-4 h-[28vh] overflow-y-auto">
          <h3 className="text-base font-medium text-gray-700 mb-4">
            Upcoming Deadlines
          </h3>
          <div className="space-y-2">
            {dbLoading ? (
              <div className="text-center">
                <Spin size="small" />
              </div>
            ) : upcomingTodos.length > 0 ? (
              upcomingTodos.map((todo) => {
                const styles = getPriorityStyles(todo.priority);
                const progress = getCardProgress(todo);
                return (
                  <div
                    key={todo.id}
                    className="flex items-center p-1.5 hover:bg-gray-50 rounded"
                  >
                    <Tooltip title={todo.priority + " Priority"}>
                      <span className={`mr-3 text-lg ${styles.dot}`}>•</span>
                    </Tooltip>
                    <div className="flex-1 overflow-hidden mr-2">
                      <div
                        className="text-sm font-medium text-gray-800 truncate"
                        title={todo.title}
                      >
                        {todo.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        Due: {dayjs(todo.endDate).format("MMM D, YYYY")}
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-blue-600">
                      {progress}%
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-4 text-sm text-gray-500">
                No upcoming deadlines.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          {/* left */}
          <div>
            {/* Search Bar */}
            <div>
              <Input
                prefix={<SearchOutlined className="text-gray-400" />}
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-auto flex-grow"
                allowClear
              />
            </div>
          </div>
          {/* Filter Panel */}
          <div>
            {showFilters && (
              <div className="flex items-center gap-4">
                {/* Priority Filter */}
                {/* priority */}
                <div>
                  <Select
                    value={filters.priority}
                    onChange={(value) => handleFilterChange("priority", value)}
                    size="small"
                    style={{ width: 120 }}
                    options={[
                      { value: "High", label: "High" },
                      { value: "Medium", label: "Medium" },
                      { value: "Low", label: "Low" },
                    ]}
                    placeholder="Priority"
                  />
                </div>

                  {/* status */}
                <div>
                  <Select
                    value={filters.status}
                    onChange={(value) => handleFilterChange("status", value)}
                    size="small"
                    style={{ width: 120 }}
                    options={[
                      { value: "inProgress", label: "In Progress" },
                      { value: "completed", label: "Completed" },
                      { value: "notStarted", label: "Not Started" },
                    ]}
                  />
                </div>

                {/* Date Filter */}
                <div className="my-2">
                  {/* <span className="text-sm font-medium mr-2">Date Range (Start):</span> */}
                  <RangePicker
                    size="small"
                    value={filters.dateRange}
                    onChange={(dates) => handleFilterChange("dateRange", dates)}
                    allowClear
                  />
                </div>

                <div>
                  <Button danger size="small" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>

                <div>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsCreating(true)}
                    className="w-full"
                  >
                    Add Task List
                  </Button>
                </div>
              </div>
            )}
          </div>
          {/* Filter Panel */}
        </div>

        {/* Create Todo Card */}
        {isCreating && (
          <div className="mb-6 p-4 bg-white rounded-lg shadow">
            <Input
              placeholder="List Title"
              name="title"
              value={newTodo.title}
              onChange={handleCreateInputChange}
              className="mb-3 text-lg font-medium"
              variant="borderless" // Use Antd variant
            />
            <div className="space-y-2 mb-4 max-h-40 overflow-y-auto pr-2">
              {newTodo.items.map((item, index) => (
                <div key={item.id} className="flex items-center group">
                  <Checkbox
                    checked={item.completed}
                    onChange={() => {
                      setNewTodo((prev) => ({
                        ...prev,
                        items: prev.items.map((i, idx) =>
                          idx === index ? { ...i, completed: !i.completed } : i
                        ),
                      }));
                    }}
                    className="mr-2"
                  />
                  <Input
                    value={item.text}
                    variant="borderless"
                    onChange={(e) => {
                      setNewTodo((prev) => ({
                        ...prev,
                        items: prev.items.map((i, idx) =>
                          idx === index ? { ...i, text: e.target.value } : i
                        ),
                      }));
                    }}
                    className={`flex-1 ${
                      item.completed ? "line-through text-gray-500" : ""
                    }`}
                  />
                  <Button
                    type="text"
                    danger
                    size="small"
                    icon={<CloseOutlined />}
                    onClick={() => {
                      setNewTodo((prev) => ({
                        ...prev,
                        items: prev.items.filter((_, idx) => idx !== index),
                      }));
                    }}
                    className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
            {/* Add Item Input */}
            <div className="flex items-center mb-4">
              <Checkbox disabled className="mr-2 invisible" />{" "}
              {/* Placeholder for alignment */}
              <Input
                placeholder="+ Add item"
                value={newItemText}
                variant="borderless"
                onChange={(e) => setNewItemText(e.target.value)}
                onPressEnter={addNewItem}
                className="flex-1 italic text-gray-500"
              />
              <Button
                type="primary"
                shape="circle"
                icon={<PlusOutlined />}
                size="small"
                onClick={addNewItem}
                disabled={!newItemText.trim()}
                className="ml-2"
              />
            </div>

            {/* Options: Date, Priority, Color, Pin */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-4 mt-4">
              <div className="flex flex-wrap items-center gap-4">
                <Tooltip title="Set Start/End Date">
                  <RangePicker
                    size="small"
                    value={
                      newTodo.startDate
                        ? [
                            dayjs(newTodo.startDate),
                            newTodo.endDate ? dayjs(newTodo.endDate) : null,
                          ]
                        : null
                    }
                    onChange={handleCreateDateChange}
                    allowClear
                  />
                </Tooltip>
                <Tooltip title="Set Priority">
                  <Select
                    value={newTodo.priority}
                    onChange={handleCreatePriorityChange}
                    size="small"
                    style={{ width: 100 }}
                    options={priorityOptions.map((opt) => ({
                      value: opt.value,
                      label: opt.name,
                    }))}
                  />
                </Tooltip>
                <Tooltip title="Set Color">
                  <Select
                    value={newTodo.color}
                    onChange={handleCreateColorChange}
                    size="small"
                    style={{ width: 100 }}
                    allowClear
                    placeholder="Color"
                    options={colorOptions.map((opt) => ({
                      value: opt.value,
                      label: (
                        <div className="flex items-center">
                          <span
                            className={`inline-block w-3 h-3 rounded-full mr-2 ${
                              opt.value || "border bg-white"
                            }`}
                          ></span>
                          {opt.name}
                        </div>
                      ),
                    }))}
                  />
                </Tooltip>
                <Tooltip title={newTodo.pinned ? "Unpin" : "Pin to top"}>
                  <Button
                    icon={<PushpinOutlined />}
                    type={newTodo.pinned ? "primary" : "text"}
                    onClick={handleCreatePinToggle}
                    ghost={newTodo.pinned}
                  />
                </Tooltip>
              </div>
              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <Button onClick={() => setIsCreating(false)}>Cancel</Button>
                <Button
                  type="primary"
                  onClick={saveTodo}
                  disabled={!newTodo.title.trim()}
                >
                  Save List
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Todo Cards Section */}
      {dbLoading ? (
        <div className="text-center py-10">
          <Spin size="large" />
        </div>
      ) : sortedTodos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedTodos.map((todo) => {
            const progress = getCardProgress(todo);
            const allCompleted = isCardCompleted(todo);
            const priorityStyles = getPriorityStyles(todo.priority);
            const cardColor = todo.color || "bg-white"; // Use defined color or white

            // Define Popover content here for cleaner JSX
            const colorPopoverContent = (
              <div className="grid grid-cols-4 gap-1 p-1">
                {colorOptions.map((opt) => (
                  <Tooltip key={opt.value} title={opt.name}>
                    <div
                      className={`w-5 h-5 rounded-full cursor-pointer ${
                        opt.value || "border bg-white"
                      } ${
                        todo.color === opt.value
                          ? "ring-2 ring-offset-1 ring-blue-700"
                          : ""
                      }`}
                      onClick={() => updateTodo(todo.id, { color: opt.value })}
                    ></div>
                  </Tooltip>
                ))}
              </div>
            );

            const priorityPopoverContent = (
              <div className="space-y-1 p-1">
                {priorityOptions.map((opt) => (
                  <div
                    key={opt.value}
                    className={`flex items-center p-1 hover:bg-gray-100 rounded cursor-pointer ${
                      todo.priority === opt.value ? "font-semibold" : ""
                    }`}
                    onClick={() => updateTodo(todo.id, { priority: opt.value })}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        getPriorityStyles(opt.value).bar
                      } mr-2`}
                    ></span>
                    <span className="text-xs">{opt.name}</span>
                  </div>
                ))}
              </div>
            );

            return (
              <div
                key={todo.id}
                className={`rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col ${cardColor}`}
              >
                <div className="p-4 flex-grow">
                  {/* Card Header: Title, Pin, Priority */}
                  <div className="flex items-start justify-between mb-2 gap-2">
                    <h3 className="text-base font-semibold text-gray-800 flex-1 break-words mr-1">
                      {todo.title}
                    </h3>
                    <div className="flex items-center flex-shrink-0 space-x-2">
                      {todo.pinned && (
                        <Tooltip title="Pinned">
                          <PushpinOutlined className="text-yellow-500 text-sm" />
                        </Tooltip>
                      )}
                      <Tooltip title={todo.priority + " Priority"}>
                        <span
                          className={`text-xs px-1.5 py-0.5 rounded-full ${priorityStyles.tag} font-medium`}
                        >
                          {todo.priority}
                        </span>
                      </Tooltip>
                    </div>

                    {/* card check box */}
                    <div>
                      {/* Card Completion Checkbox (as requested by image) */}
                      <Tooltip
                        title={
                          allCompleted
                            ? "Mark as Incomplete"
                            : "Mark all as Complete"
                        }
                      >
                        <Checkbox
                          checked={allCompleted}
                          onChange={() => toggleCardCompletion(todo.id)}
                          className="ml-2 custom-card-checkbox" // Add custom class if needed for styling
                          // Disable if no items? Maybe not needed if toggleCardCompletion handles it.
                          disabled={!todo.items || todo.items.length === 0}
                        />
                        {/* Style this checkbox to look like the drawn box if needed */}
                      </Tooltip>
                    </div>
                    {/* card check box */}
                  </div>
                  {/* Dates */}
                  <div className="text-xs text-gray-500 mb-3">
                    {dayjs(todo.startDate).format("MMM D, YYYY")}
                    {todo.endDate &&
                      ` - ${dayjs(todo.endDate).format("MMM D, YYYY")}`}
                  </div>
                  {/* Todo Items */}
                  <div className="space-y-1.5 mb-4 max-h-32 overflow-y-auto pr-1">
                    {todo.items && todo.items.length > 0 ? (
                      todo.items.map((item, index) => (
                        <div key={index} className="flex items-start">
                          <Checkbox
                            checked={item.completed}
                            onChange={() =>
                              toggleItemCompletion(todo.id, index)
                            }
                            className="mr-2 mt-0.5 flex-shrink-0"
                          />
                          <span
                            className={`text-sm leading-tight ${
                              item.completed
                                ? "line-through text-gray-500"
                                : "text-gray-700"
                            }`}
                          >
                            {item.text}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-400 italic">
                        No items yet.
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer: Progress, Actions, Completion Check */}
                <div className="px-4 py-3 border-t border-gray-200 bg-opacity-50 flex items-center justify-between gap-2">
                  {/* Progress Bar */}
                  <div className="w-1/2">
                    <div className="flex justify-between mb-0.5">
                      <span className="text-xs text-gray-500">Progress</span>
                      <span className="text-xs font-medium text-blue-600">
                        {progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div
                        className="bg-blue-500 h-1 rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Action Icons */}
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Popover
                      content={colorPopoverContent}
                      title="Change Color"
                      trigger="click"
                      placement="top"
                    >
                      <Tooltip title="Change Color">
                        <Button
                          type="text"
                          size="small"
                          icon={<BgColorsOutlined className="text-base" />}
                        />
                      </Tooltip>
                    </Popover>
                    <Popover
                      content={priorityPopoverContent}
                      title="Change Priority"
                      trigger="click"
                      placement="top"
                    >
                      <Tooltip title="Change Priority">
                        <Button
                          type="text"
                          size="small"
                          icon={<FlagOutlined className="text-base" />}
                        />
                      </Tooltip>
                    </Popover>
                    <Tooltip title={todo.pinned ? "Unpin" : "Pin"}>
                      <Button
                        type="text"
                        size="small"
                        icon={
                          <PushpinOutlined
                            className={`text-base ${
                              todo.pinned ? "text-yellow-500" : ""
                            }`}
                          />
                        }
                        onClick={() =>
                          updateTodo(todo.id, { pinned: !todo.pinned })
                        }
                      />
                    </Tooltip>
                    <Tooltip title="Delete List">
                      <Button
                        type="text"
                        danger
                        size="small"
                        icon={<DeleteOutlined className="text-base" />}
                        onClick={() => deleteTodo(todo.id)}
                      />
                    </Tooltip>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // Empty State
        <div className="text-center py-12 text-gray-500">
          <CheckSquareOutlined className="text-5xl mb-4" />
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            {searchTerm ||
            filters.priority.length > 0 ||
            filters.colors.length > 0 ||
            filters.status !== "Status" ||
            filters.dateRange[0] ||
            filters.dateRange[1]
              ? "No tasks match your filters"
              : "No tasks yet!"}
          </h3>
          <p>
            {searchTerm ||
            filters.priority.length > 0 ||
            filters.colors.length > 0 ||
            filters.status !== "Status" ||
            filters.dateRange[0] ||
            filters.dateRange[1]
              ? "Try adjusting your search or filters."
              : 'Click "Add Task List" to get started.'}
          </p>
        </div>
      )}

      {/* Footer with DB Status */}
      <div className="mt-8 text-center text-xs text-gray-400">
        Database:{" "}
        {isDatabaseConnected === null ? (
          "Checking..."
        ) : isDatabaseConnected ? (
          <span className="text-green-500 inline-flex items-center">
            <InfoCircleOutlined className="mr-1" />
            Connected
          </span>
        ) : (
          <span className="text-red-500 inline-flex items-center">
            <InfoCircleOutlined className="mr-1" />
            Disconnected
          </span>
        )}
      </div>
    </div>
  );
};

// Need to import firebase for the ServerValue timestamp
import firebase from "firebase/compat/app";
import "firebase/compat/database";

export default ToDo;