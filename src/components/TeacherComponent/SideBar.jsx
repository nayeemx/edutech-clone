import { useAuth } from "../../provider/AuthProvider"; 
import { db } from "../../firebase/firebase.config";
import { useEffect, useState } from "react";
import {
  HiHome,
  HiOutlineHome,
  HiSquares2X2,
  HiOutlineSquares2X2,
  HiOutlineUserGroup,
  HiUserGroup,
  HiCalendarDays,
  HiChatBubbleOvalLeftEllipsis,
  HiCog6Tooth,
  HiOutlineWrenchScrewdriver,
  HiWrenchScrewdriver,
} from 'react-icons/hi2';
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { RxCalendar } from "react-icons/rx"; 
import { FaUserCircle } from "react-icons/fa";
import { LuSettings } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const [userData, setUserData] = useState(null);
  const [activeMenu, setActiveMenu] = useState("Dashboard"); // Default active
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const userRef = db.ref(`users/${user.uid}`);
      userRef.on("value", (snapshot) => {
        const data = snapshot.val();
        setUserData(data);
      });
      return () => userRef.off("value");
    } else {
      setUserData(null);
    }
  }, [user]);

  const menuItems = [
    { name: 'Dashboard', icon: <HiOutlineHome />, activeIcon: <HiHome />, path: '/teacher' },
    { name: 'Classrooms', icon: <HiOutlineSquares2X2 />, activeIcon: <HiSquares2X2 /> },
    { name: 'Students', icon: <HiOutlineUserGroup />, activeIcon: <HiUserGroup /> },
    { name: 'Timetable', icon: <RxCalendar />, activeIcon: <HiCalendarDays /> },
    { name: 'Billing & Recharge', icon: <IoChatbubbleEllipsesOutline />, activeIcon: <HiChatBubbleOvalLeftEllipsis /> },
    { name: 'Settings', icon: <LuSettings />, activeIcon: <HiCog6Tooth /> },
    { name: 'Add-Ons', icon: <HiOutlineWrenchScrewdriver />, activeIcon: <HiWrenchScrewdriver />, path: '/addons' },
  ];

  const handleMenuClick = (item) => {
    setActiveMenu(item.name);
    if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <aside className={`w-full md:w-[30vw] lg:w-[20vw] 2xl:w-[19vw] bg-white h-auto p-0 md:p-0 flex flex-col md:gap-4 shadow-md transition-all duration-300`}>

      {/* User Info */}
      <div className="flex items-center gap-4 p-4 md:p-0 md:px-1 lg:px-[1.2vw] xl:p-[0.4vw]">
        <FaUserCircle className="text-6xl md:text-5xl xl:text-5xl text-gray-400" />
        <div className="break-words">
          {userData ? (
            <div className="text-left">
              <h2 className="text-lg font-semibold text-gray-800 text-balance">{userData.name}</h2>
              <p className="text-sm text-gray-500">{userData.accountType}</p>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Loading user...</p>
          )}
        </div>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-1 md:gap-4 p-4 md:p-0">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleMenuClick(item)}
            className={`flex items-center gap-4 px-4 lg:px-[1.2vw] py-2 md:py-5 rounded-md transition text-left w-full ${
              activeMenu === item.name
                ? "bg-blue-100 text-blue-600 font-semibold"
                : "text-gray-700 hover:bg-blue-50"
            }`}
          >
            <span className="text-2xl flex-shrink-0">
              {activeMenu === item.name ? item.activeIcon : item.icon}
            </span>
            <span className="text-sm md:text-xl">{item.name}</span>
          </button>
        ))}
      </nav>

    </aside>
  );
};

export default SideBar;