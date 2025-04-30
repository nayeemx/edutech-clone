import { useState } from "react";
import Logo from "../../assets/teacher/logo-white.png";
import HeaderRight from "../../components/TeacherComponent/HeaderRight";
import SideBar from "../../components/TeacherComponent/SideBar";
import { Link } from "react-router";
// ions
import { RiMenuFold4Fill, RiMenuUnfold4Fill, RiUserFill } from "react-icons/ri";
import { FaClipboardList } from "react-icons/fa";
import { SiTodoist } from "react-icons/si";
import { RiChat2Fill } from "react-icons/ri";

const AddonsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
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
                className={`p-2 flex-grow h-screen md:h-[100.6vh] lg:h-[95.4vh] ${
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
                    {/* <ToDo /> */}
                    <div className="w-[84vw] xl:w-[30vw] lg:w-[28vw] md:w-[30vw] h-[32vh] xl:h-[28vh] lg:h-[32vh] md:h-[32vh] bg-blue-500 rounded-2xl shadow-lg p-6">
                      <div className="gap-6 text-white">
                        <div className="flex items-center gap-4 mb-4">
                          <span>
                            <SiTodoist className="text-[3.6rem]" />
                          </span>
                          <p className="text-4xl font-medium">Todo</p>
                        </div>
                        <p>Click to see the logs information of users</p>
                        <Link to="/todo">
                          <div className="flex justify-end">
                            <p className="text-lg font-semibold text-center my-2 bg-white text-blue-600 rounded-xl shadow hover:bg-blue-100 transition px-4">
                              Open
                            </p>
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* logs */}
                    <div className="w-[84vw] xl:w-[30vw] lg:w-[28vw] md:w-[30vw] h-[32vh] xl:h-[28vh] lg:h-[32vh] md:h-[32vh] bg-blue-500 rounded-2xl shadow-lg p-6">
                      <div className="gap-6 text-white">
                        <div className="flex items-center gap-4 mb-4">
                          <span>
                            <FaClipboardList className="text-[3.6rem]" />
                          </span>
                          <p className="text-4xl font-medium">Logs</p>
                        </div>
                        <p>Click to see the logs information of users</p>
                        <Link to="/loggs">
                          <div className="flex justify-end">
                            <p className="text-lg font-semibold text-center my-2 bg-white text-blue-600 rounded-xl shadow hover:bg-blue-100 transition px-4">
                              Open
                            </p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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

export default AddonsPage;