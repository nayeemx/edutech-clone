import { useState, useEffect } from "react";
import { RiMenuFold4Fill, RiMenuUnfold4Fill, RiUserFill } from "react-icons/ri";
import Logo from "../../assets/teacher/logo-white.png";
import { useAuth } from "../../provider/AuthProvider"; // Double-check this path!
import { db } from "../../firebase/firebase.config";
import SideBar from "../../components/TeacherComponent/SideBar";
import HeaderRight from "../../components/TeacherComponent/HeaderRight";
import { Link } from "react-router";
import { RiChat2Fill } from "react-icons/ri";
import ToDo from "../../components/TeacherComponent/ToDo";

const Teacher = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const { user } = useAuth();

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

  return (
    <>
      <section>
        {/* header */}
        <div className="h-20 w-full flex justify-between items-center">
          <div
            className={`h-20 ${
              isSidebarOpen ? "w-[5vw] justify-center" : "w-[21vw] px-4"
            } border-r-2 border-gray-200 flex items-center justify-between transition-all duration-300`}
          >
            <button onClick={toggleSidebar} className="text-2xl">
              {isSidebarOpen ? <RiMenuFold4Fill /> : <RiMenuUnfold4Fill />}
            </button>

            <div className={`${isSidebarOpen ? "hidden" : "block"} ml-4`}>
              <Link to="/">
                <img src={Logo} alt="Logo" />
              </Link>
            </div>
          </div>
          <div className="w-full h-20 justify-center content-center">
            <HeaderRight />
          </div>
        </div>

        {/* content */}
        <div className="h-[calc(100vh-5rem)] flex">
          {/* sidebar */}
          <div
            className={`${
              isSidebarOpen ? "w-[5vw]" : "w-[20vw] px-4"
            } transition-all duration-300 flex`}
          >
            {userData && (
              <div className={`flex ${isSidebarOpen ? "flex-row" : ""}`}>
                <section>
                  <div
                    className={`${
                      isSidebarOpen ? "w-[4.8vw]" : "w-[14.2vw]"
                    } transition-all duration-300`}
                  >
                    <div
                      className={`h-20 ${
                        isSidebarOpen
                          ? "hidden"
                          : "w-[14.2vw] flex items-center gap-2"
                      } transition-all duration-300`}
                    >
                      <div className="rounded-full h-12 w-[4vw] bg-gray-300 flex items-center justify-center">
                        {/* Assuming you don't have photoURL, use default avatar */}
                        <RiUserFill className="h-8 w-8 text-gray-600" />
                      </div>
                      <div
                        className={`${isSidebarOpen ? "text-center mt-2" : ""}`}
                      >
                        {/* Use 'name' and 'accountType' from your database structure */}
                        <div className="text-lg font-semibold">
                          {userData.name}
                        </div>
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

          <section className="w-[76%] absolute left-[20vw] h-[calc(92vh-5rem)] overflow-y-auto transition-all duration-300">
            <ToDo />
          </section>

          <div className="w-[76%] h-[calc(100vh-5rem)] overflow-y-auto transition-all duration-300">
            {/* footer area */}
            <section className="bg-white absolute bottom-0 right-0 p-[1rem] font-medium w-full text-center">
              <p>Copyright Edutechs © 2025 Teacher V69.60</p>
            </section>
            {/* footer area */}

            {/* Chat Icon */}
            <div>
              <p className="relative right-[1.4vw] top-[39rem] bg-blue-500 p-[10px] w-[4vw] h-[8.6vh] z-10 rounded-full">
                <RiChat2Fill className="text-white text-4xl -rotate-[9deg] relative top-[0.4vh] left-[0.3vw]" />
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Teacher;