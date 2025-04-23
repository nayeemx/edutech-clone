import { useState, useEffect } from "react";
import { RiMenuFold4Fill, RiMenuUnfold4Fill, RiUserFill, RiChat2Fill } from "react-icons/ri";
import Logo from "../../assets/teacher/logo-white.png";
import { useAuth } from "../../provider/AuthProvider"; // Double-check this path!
import { db } from "../../firebase/firebase.config";
import SideBar from "../../components/TeacherComponent/SideBar";
import HeaderRight from "../../components/TeacherComponent/HeaderRight";
import { Link } from "react-router";

const Loggs = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const { user } = useAuth();
  const [logs, setLogs] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (user) {
      const userRef = db.ref(`users/${user.uid}`); // Correct path to user data
      userRef.on("value", (snapshot) => {
        const data = snapshot.val();
        setUserData(data);
      });
      return () => userRef.off("value");
    } else {
      setUserData(null);
    }
  }, [user]);

  // to show logss
  useEffect(() => {
    const fetchLogs = async () => {
      const usersSnapshot = await db.ref("users").once("value");
      const usersData = usersSnapshot.val();

      const logsArray = [];

      if (usersData) {
        const userEntries = Object.entries(usersData);

        for (const [uid, userInfo] of userEntries) {
          const tasksSnapshot = await db.ref(`tasks/${uid}`).once("value");
          const tasksData = tasksSnapshot.val();

          if (tasksData) {
            Object.entries(tasksData).forEach(([taskId, task]) => {
              logsArray.push({
                userName: userInfo.name || "Unknown",
                priority: task.priority || "N/A",
                taskTitle: task.title || "Untitled",
                createdAt: task.created_at || "N/A",
                updatedAt: task.updated_at || "N/A",
              });
            });
          }
        }
      }

      setLogs(logsArray);
    };

    fetchLogs();
  }, []);

  return (
    <>
      <section>
        {/* header */}
        <div className="h-20 w-full flex justify-between items-center">
          <div
            className={`h-20 ${isSidebarOpen ? "w-[5vw] justify-center" : "w-[20vw] px-4"
              } border-r-2 border-gray-200 flex items-center justify-between transition-all duration-300`}
          >
            <button onClick={toggleSidebar} className="text-2xl">
              {isSidebarOpen ? <RiMenuFold4Fill /> : <RiMenuUnfold4Fill />}
            </button>

            <div className={`${isSidebarOpen ? "hidden" : "block"} ml-4`}>
              <Link to='/'>
                <img src={Logo} alt="Logo" />
              </Link>
            </div>
          </div>
          <div className="w-full h-20 justify-center content-center">
            <HeaderRight />
          </div>
        </div>
        {/* content */}
        <div className="h-[calc(100vh-5rem)] flex gap-3">
          {/* sidebar */}
          <div className="border-r-2 border-gray-200">
            {userData && (
              <div
                className={`flex ${isSidebarOpen ? "flex-row" : ""
                  }`}
              >
                <section>
                  <div className={`${isSidebarOpen ? "w-[4.7vw]" : "w-[16.9vw]"} transition-all duration-300`}>
                    <div className={`h-20 ${isSidebarOpen ? "hidden" : "w-[16.9vw] flex items-center gap-2"} relative left-[1vw] transition-all duration-300`}>
                      <div className="rounded-full h-12 w-[4.5vw] bg-gray-300 flex items-center justify-center">
                        {/* Assuming you don't have photoURL, use default avatar */}
                        <RiUserFill className="h-8 w-8 text-gray-600" />
                      </div>
                      <div className={`${isSidebarOpen ? "text-center mt-2" : ""}`}>
                        {/* Use 'name' and 'accountType' from your database structure */}
                        <div className="text-lg font-semibold">{userData.name}</div>
                        <div className="text-sm text-gray-600">
                          {userData.accountType}
                        </div>
                      </div>
                    </div>
                    <SideBar isSidebarOpen={isSidebarOpen} />
                  </div>
                </section>
              </div>
            )}
          </div>
          {/* data */}
          <div className={`${isSidebarOpen ? "w-[100vw]" : "w-[82.4%]"} 
          h-[calc(100vh-5rem)] overflow-y-auto transition-all duration-300`}>
            {/* Logs Table Section */}
        <section className="w-[76%] absolute left-[20vw] h-[calc(92vh-5rem)] transition-all duration-300 p-4">
          <h2 className="text-xl font-bold mb-4">Logs</h2>
          <div className="bg-white rounded shadow h-[58vh] overflow-y-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-200 text-left">
              <thead>
                <tr className="bg-gray-100 text-sm text-gray-700">
                  <th className="border border-gray-200 px-4 py-2">SL</th>
                  <th className="border border-gray-200 px-4 py-2">User Name</th>
                  <th className="border border-gray-200 px-4 py-2">Task Priority</th>
                  <th className="border border-gray-200 px-4 py-2">Task Title</th>
                  <th className="border border-gray-200 px-4 py-2">Created At</th>
                  <th className="border border-gray-200 px-4 py-2">Updated At</th>
                </tr>
              </thead>
              <tbody>
                {logs.length === 0 ? (
                  <tr>
                    <td className="px-4 py-3 text-center text-gray-500" colSpan={5}>
                      No logs found.
                    </td>
                  </tr>
                ) : (
                  logs.map((log, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50 text-sm">
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">{log.userName}</td>
                      <td className="border px-4 py-2">{log.priority}</td>
                      <td className="border px-4 py-2">{log.taskTitle}</td>
                      <td className="border px-4 py-2">{log.createdAt}</td>
                      <td className="border px-4 py-2">{log.updatedAt}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
          </div>
        </div>
      </section>

      <section className="bg-white absolute bottom-0 left-0 p-[1rem] font-medium w-full text-center border-t-2 border-gray-200">
        <p>Copyright Edutechs © 2025 Teacher V69.60</p>
      </section>

      {/* Chat Icon */}
      <div>
        <p className="fixed right-[1.4vw] top-[39rem] bg-blue-500 p-[10px] w-[4vw] h-[8.6vh] z-10 rounded-full">
          <RiChat2Fill className="text-white text-4xl -rotate-[9deg] relative top-[0.4vh] left-[0.3vw]" />
        </p>
      </div>
    </>
  );
};

export default Loggs;