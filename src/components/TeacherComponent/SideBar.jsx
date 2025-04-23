import { useEffect, useState } from 'react';
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
import { NavLink, useLocation } from 'react-router-dom';

const SideBar = ({ isSidebarOpen }) => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState('Dashboard');

  const menuItems = [
    { name: 'Dashboard', icon: <HiOutlineHome />, activeIcon: <HiHome />, path: '/teacher' },
    { name: 'Classrooms', icon: <HiSquares2X2 />, activeIcon: <HiSquares2X2 /> },
    { name: 'Students', icon: <HiUserGroup />, activeIcon: <HiUserGroup /> },
    { name: 'Timetable', icon: <HiCalendarDays />, activeIcon: <HiCalendarDays /> },
    { name: 'Billing & Recharge', icon: <HiChatBubbleOvalLeftEllipsis />, activeIcon: <HiChatBubbleOvalLeftEllipsis /> },
    { name: 'Settings', icon: <HiCog6Tooth />, activeIcon: <HiCog6Tooth /> },
    { name: 'Add-Ons', icon: <HiWrenchScrewdriver />, activeIcon: <HiWrenchScrewdriver />, path: '/addons' },
  ];

  useEffect(() => {
    // Sync active menu based on current path
    const matchedItem = menuItems.find(item => item.path && location.pathname.startsWith(item.path));
    if (matchedItem) {
      setActiveMenu(matchedItem.name);
    }
  }, [location.pathname]);

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
  };

  return (
    <div
      className={`bg-white text-gray-700 h-full transition-all duration-300 mt-6 ${
        isSidebarOpen ? 'w-[4.7vw]' : 'w-[16.9vw]'
      }`}
    >
      <ul className="flex flex-col">
        {menuItems.map((item) => {
          const isActive = activeMenu === item.name;

          const commonClasses = `flex items-center h-[7vh] cursor-pointer ${
            isActive ? 'bg-sky-100 text-blue-600' : 'hover:bg-gray-100 text-gray-700'
          } ${isSidebarOpen ? 'justify-center' : 'px-4'}`;

          const iconEl = (
            <span className={`text-xl ${isSidebarOpen ? '' : 'mx-3'}`}>
              {isActive ? item.activeIcon : item.icon}
            </span>
          );

          const labelEl = !isSidebarOpen && <span>{item.name}</span>;

          if (item.path) {
            return (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  onClick={() => handleMenuClick(item.name)}
                  className={commonClasses}
                >
                  {iconEl}name
                  {labelEl}
                </NavLink>
              </li>
            );
          }

          return (
            <li
              key={item.name}
              onClick={() => handleMenuClick(item.name)}
              className={commonClasses}
            >
              {iconEl}
              {labelEl}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideBar;