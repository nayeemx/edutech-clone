import { useEffect, useState } from "react";
import Logo from "../../assets/teacher/logo-white.png";
import HeaderRight from "../../components/TeacherComponent/HeaderRight";
import SideBar from "../../components/TeacherComponent/SideBar";
import { Link } from "react-router";
import { useAuth } from "../../provider/AuthProvider";
import { db } from "../../firebase/firebase.config";
import { format } from "date-fns";
// ions
import { RiMenuFold4Fill, RiMenuUnfold4Fill } from "react-icons/ri";
// import { RiChat2Fill } from "react-icons/ri";

const Loggs = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();
  const [logs, setLogs] = useState([]);
  const [usersData, setUsersData] = useState({});

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Load all users' data for name mapping
  useEffect(() => {
    const usersRef = db.ref("users");

    usersRef.on("value", (snapshot) => {
      const data = snapshot.val() || {};
      setUsersData(data);
    });

    return () => usersRef.off("value");
  }, []);

  // Real-time logs listener
  useEffect(() => {
    const logsRef = db.ref("logs");

    logsRef.on("value", (snapshot) => {
      const logsData = snapshot.val() || {};
      const logsArray = [];

      // Process logs by user ID
      for (const [userId, userLogs] of Object.entries(logsData)) {
        const userName = usersData[userId]?.name || "Unknown User";

        // Process individual log entries
        for (const [logId, logEntry] of Object.entries(userLogs)) {
          // Format the timestamp
          let formattedTime = "N/A";
          if (logEntry.timestamp) {
            try {
              const date = new Date(logEntry.timestamp);
              formattedTime = format(date, "yyyy-MM-dd HH:mm:ss");
            } catch (e) {
              console.error("Error formatting date:", e);
            }
          }

          // Create a formatted description based on log entry type
          let description = "";

          switch (logEntry.action) {
            case "create_task":
              description = `Created task "${
                logEntry.details?.title || "Untitled"
              }"`;
              break;
            case "update_task":
              if (logEntry.details?.originalTitle && logEntry.details?.title) {
                description = `Updated task title from "${logEntry.details.originalTitle}" to "${logEntry.details.title}"`;
              } else if (logEntry.details?.pin !== undefined) {
                description = logEntry.details.pin
                  ? `Pinned task "${logEntry.details.title || "Untitled"}"`
                  : `Unpinned task "${logEntry.details.title || "Untitled"}"`;
              } else if (logEntry.details?.priority) {
                description = `Changed priority to "${
                  logEntry.details.priority
                }" for task "${logEntry.details.title || "Untitled"}"`;
              } else if (logEntry.details?.color) {
                description = `Changed color to "${
                  logEntry.details.color
                }" for task "${logEntry.details.title || "Untitled"}"`;
              } else if (logEntry.details?.dates) {
                description = `Updated dates for task "${
                  logEntry.details.title || "Untitled"
                }"`;
              } else if (logEntry.details?.subtask) {
                if (typeof logEntry.details.subtask === "object") {
                  description = `Updated subtask name from "${logEntry.details.subtask.original}" to "${logEntry.details.subtask.updated}"`;
                } else if (logEntry.details.completed !== undefined) {
                  description = logEntry.details.completed
                    ? `Marked subtask "${logEntry.details.subtask}" as completed`
                    : `Marked subtask "${logEntry.details.subtask}" as incomplete`;
                } else {
                  description = `Updated subtask "${logEntry.details.subtask}"`;
                }
              } else if (logEntry.details?.action === "mark_all_completed") {
                description = `Marked all subtasks as completed for task "${
                  logEntry.details.title || "Untitled"
                }"`;
              } else {
                description = `Updated task "${
                  logEntry.details?.title || "Untitled"
                }"`;
              }
              break;
            case "delete_task":
              description = `Deleted task "${
                logEntry.details?.title || "Untitled"
              }"`;
              break;
            default:
              description = `${logEntry.action} for task "${
                logEntry.details?.title || "Untitled"
              }"`;
              break;
          }

          // Add to logs array
          logsArray.push({
            id: logId,
            userName,
            userId,
            taskId: logEntry.taskId,
            action: logEntry.action,
            details: logEntry.details,
            description,
            timestamp: logEntry.timestamp,
            formattedTime,
          });
        }
      }

      // Sort logs by timestamp (newest first)
      logsArray.sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp);
      });

      setLogs(logsArray);
    });

    // Clean up the listener when the component unmounts
    return () => logsRef.off("value");
  }, [usersData]); // Re-run this effect when usersData changes

  return (
    <>
      <main className="flex flex-col h-full">
        {/* header */}
        <section>
          <div className="h-[30vh] md:h-20 w-full flex flex-col md:flex-row justify-between items-center">
            {/* logo */}
            <div
              className={`h-20 ${
                isSidebarOpen
                  ? "w-[5vw] xl:w-[4vw] 2xl:w-[3.8vw] justify-center"
                  : "md:w-[25vw] lg:w-[20.1vw] xl:w-[16.4%] my-2 px-4"
              } border-r-2 border-transparent md:border-gray-200 flex items-center justify-between transition-all duration-300`}
            >
              {/* button */}
              <button
                onClick={toggleSidebar}
                className="text-2xl hidden lg:block cursor-pointer"
              >
                {isSidebarOpen ? <RiMenuFold4Fill /> : <RiMenuUnfold4Fill />}
              </button>
              {/* logo */}
              {/* <img src={Logo} alt="Logo" className="h-[8.4vh] mx-auto md:px-1 md:mt-3" /> */}
              <div className={`${isSidebarOpen ? "hidden" : "block"} ml-4`}>
                <Link to="/">
                  <img src={Logo} alt="Logo" />
                </Link>
              </div>
            </div>
            {/* header right */}
            <div
              className={`w-full md:w-[75%] lg:w-[80%] xl:w-[86%] h-full flex flex-col md:flex-row items-center justify-between transition-all duration-300 ${
                isSidebarOpen ? "lg:w-[100%] xl:w-[100%]" : "block"
              }`}
            >
              <HeaderRight />
            </div>
          </div>
        </section>

        {/* content */}
        <section className="flex-grow">
          <div className="h-full lg:h-[113.8vh] xl:h-[111vh] 2xl:h-[97.3vh] flex flex-col md:flex-row">
            <div
              className={`transition-all duration-300 ${
                isSidebarOpen
                  ? "w-[4.7vw] xl:w-[3.8vw] 2xl:w-[3.6vw]"
                  : "w-full md:w-[25%] xl:w-[16%] lg:w-[20%] 2xl:w-[15.81vw]"
              }`}
            >
              <SideBar />
            </div>

            {/* content */}
            <div className="w-full md:w-[75%] xl:w-[86%] lg:w-[80%] bg-gray-200 flex flex-col h-full">
              <div
                className={`p-2 flex-grow h-screen md:h-[100.6vh] lg:h-[85vh] ${
                  isSidebarOpen
                    ? "lg:w-[95.3vw] xl:w-[96.2vw] 2xl:w-[95.4vw]"
                    : "block"
                }`}
              >
                {/* addons container */}
                <div
                  className={`${isSidebarOpen ? "" : "w-full xl:w-[82vw]"} 
                h-full overflow-y-auto transition-all duration-300`}
                >
                  {/* addons part */}
                  <div className="flex flex-col md:flex-row items-center justify-center xl:justify-start lg:justify-start md:justify-start gap-4">
                    {/* data */}
                    <div
                      className={`${isSidebarOpen ? "w-[100vw]" : "w-full"} 
          h-[calc(100vh-5rem)] overflow-y-auto transition-all duration-300`}
                    >
                      {/* Logs Table Section */}
                      <section>
                        <h2 className="text-xl font-bold mb-4">
                          Activity Logs
                        </h2>

                        {/* Filters can be added here if needed */}

                        <div className="bg-white rounded shadow h-[76vh] overflow-y-auto">
                          <table className="min-w-full table-auto border-collapse border border-gray-200 text-left">
                            <thead>
                              <tr className="bg-gray-100 text-sm text-gray-700">
                                <th className="border border-gray-200 px-4 py-2">
                                  SL
                                </th>
                                <th className="border border-gray-200 px-4 py-2">
                                  User
                                </th>
                                <th className="border border-gray-200 px-4 py-2">
                                  Action
                                </th>
                                <th className="border border-gray-200 px-4 py-2">
                                  Description
                                </th>
                                <th className="border border-gray-200 px-4 py-2">
                                  Timestamp
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {logs.length === 0 ? (
                                <tr>
                                  <td
                                    className="px-4 py-3 text-center text-gray-500"
                                    colSpan={5}
                                  >
                                    No logs found.
                                  </td>
                                </tr>
                              ) : (
                                logs.map((log, index) => (
                                  <tr
                                    key={log.id}
                                    className="border-b hover:bg-gray-50 text-sm"
                                  >
                                    <td className="border border-gray-200 px-4 py-2">
                                      {index + 1}
                                    </td>
                                    <td className="border border-gray-200 px-4 py-2">
                                      {log.userName}
                                    </td>
                                    <td className="border border-gray-200 px-4 py-2">
                                      <span
                                        className={`px-2 py-1 rounded text-xs ${
                                          log.action === "create_task"
                                            ? "bg-green-200 text-green-800"
                                            : log.action === "update_task"
                                            ? "bg-blue-200 text-blue-800"
                                            : log.action === "delete_task"
                                            ? "bg-red-200 text-red-800"
                                            : "bg-gray-200 text-gray-800"
                                        }`}
                                      >
                                        {log.action.replace("_", " ")}
                                      </span>
                                    </td>
                                    <td className="border border-gray-200 px-4 py-2">
                                      {log.description}
                                    </td>
                                    <td className="border border-gray-200 px-4 py-2">
                                      {log.formattedTime}
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
              {/* footer */}
              <div
                className={`h-20 ${
                  isSidebarOpen
                    ? "lg:w-[95.3vw] xl:w-[96.2vw] 2xl:w-[95.4vw]"
                    : "block"
                }`}
              >
                <section className="bg-white border-l border-gray-200 relative h-full p-[1rem] font-medium text-center w-full">
                  <p>Copyright Edutechs © 2025 Teacher V69.60</p>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Loggs;