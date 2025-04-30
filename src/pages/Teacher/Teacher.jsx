import { useEffect, useState } from "react";
import Logo from "../../assets/teacher/logo-white.png";
import HeaderRight from "../../components/TeacherComponent/HeaderRight";
import SideBar from "../../components/TeacherComponent/SideBar";
import { RiMenuFold4Fill, RiMenuUnfold4Fill } from "react-icons/ri";
import { Link } from "react-router";
import LandingPage from "../../components/TeacherComponent/LandingPage"; // Import the LandingPage component
import MainContent from "../../components/TeacherComponent/MainContent";

const TodoContainer = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLandingPage, setShowLandingPage] = useState(true); // State to control LandingPage visibility

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Check if the "hideOnboarding" flag is set in localStorage
    const hideOnboarding = localStorage.getItem("hideOnboarding") === "true";
    setShowLandingPage(!hideOnboarding); // Show if not hidden
  }, []);
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
              } border-r-2 border-transparent md:border-gray-200 2xl:border-gray-200 flex items-center justify-between transition-all duration-300`}
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
              className={`border-r-2  transition-all duration-300 ${
                isSidebarOpen
                  ? "w-[4.7vw] xl:w-[3.8vw] 2xl:w-[3.6vw]"
                  : "w-full md:w-[25%] xl:w-[16%] lg:w-[20%] 2xl:w-[15.81vw]"
              }`}
            >
              <SideBar />
            </div>

            {/* content */}
            <div className="w-full md:w-[75%] xl:w-[86%] lg:w-[80%] flex flex-col h-full">
              <div
                className={`flex-grow h-screen md:h-[100.6vh] lg:h-[95.4vh] ${
                  isSidebarOpen
                    ? "lg:w-[95.3vw] xl:w-[96.2vw] 2xl:w-[95.4vw]"
                    : "block"
                }`}
              >
                <span>
                  {/* Conditionally render the LandingPage */}
                  {showLandingPage && <LandingPage />}
                </span>

                {/* teacher container */}
                <div
                  className={`${
                    isSidebarOpen ? "w-[95.4vw]" : "w-full"
                  } h-[calc(98.4vh-5rem)] overflow-y-auto transition-all duration-300`}
                >
                  <MainContent />
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

export default TodoContainer;
