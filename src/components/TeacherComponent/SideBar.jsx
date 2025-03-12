import React, { useState } from 'react';
import {
  HiHome,
  HiOutlineHome,
  HiSquares2X2,
  HiUserGroup,
  HiCalendarDays,
  HiChatBubbleOvalLeftEllipsis,
  HiCog6Tooth,
  HiWrenchScrewdriver,
} from 'react-icons/hi2';

const SideBar = ({ isSidebarOpen }) => {
  const [activeMenu, setActiveMenu] = useState('Dashboard');

  const menuItems = [
    { name: 'Dashboard', icon: <HiOutlineHome />, activeIcon: <HiHome /> },
    { name: 'Classrooms', icon: <HiSquares2X2 />, activeIcon: <HiSquares2X2 /> },
    { name: 'Students', icon: <HiUserGroup />, activeIcon: <HiUserGroup /> },
    { name: 'Timetable', icon: <HiCalendarDays />, activeIcon: <HiCalendarDays /> },
    { name: 'Billing & Recharge', icon: <HiChatBubbleOvalLeftEllipsis />, activeIcon: <HiChatBubbleOvalLeftEllipsis /> },
    { name: 'Settings', icon: <HiCog6Tooth />, activeIcon: <HiCog6Tooth /> },
    { name: 'Add-Ons', icon: <HiWrenchScrewdriver />, activeIcon: <HiWrenchScrewdriver /> },
  ];

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
  };

  return (
    <div
      className={`bg-white text-gray-700 h-full border-r border-gray-300 transition-all duration-300 mt-6 ${
        isSidebarOpen ? 'w-[4.8vw]' : 'w-64' // Reversed: Now w-16 when open, w-64 when closed
      }`}
    >
      <ul className="flex flex-col">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={`flex items-center h-14 cursor-pointer ${
              activeMenu === item.name
                ? 'bg-sky-100 text-blue-600'
                : 'hover:bg-gray-100 text-gray-700'
            } ${isSidebarOpen ? 'justify-center' : ''}`} // Reversed: justify-center when open
            onClick={() => handleMenuClick(item.name)}
          >
            <span
              className={`text-xl ${
                isSidebarOpen ? '' : 'mr-3' // Reversed: mr-3 when closed
              }`}
            >
              {activeMenu === item.name ? item.activeIcon : item.icon}
            </span>
            {!isSidebarOpen && <span>{item.name}</span>} {/* Reversed: Show text when closed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;