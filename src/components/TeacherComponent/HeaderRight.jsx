import { FiSearch, FiSun, FiMoon } from 'react-icons/fi';
import { MdKeyboardArrowDown } from "react-icons/md";
import { AiFillThunderbolt } from "react-icons/ai";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../provider/AuthProvider';
import { BD, US } from "country-flag-icons/react/3x2"; // Country Flags
import { useState, useRef, useEffect } from 'react';

const HeaderRight = () => {
    const { signOut } = useAuth();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = async () => {
        try {
            await signOut();
            navigate('/auth/login');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const handleLanguageSelect = (language) => {
        setSelectedLanguage(language);
        setIsDropdownOpen(false); // Close dropdown after selecting
    };

    const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
    
        useEffect(() => {
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, []);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
        } else {
            document.documentElement.classList.add('dark');
        }
    };

    return (
        <>
            <header className="w-full h-full flex flex-col justify-between md:flex-row md:items-center">
                <div>
                    {/* search */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search in app for students ..."
                            className="w-[92vw] relative left-[2vw] md:left-[0.6vw] md:w-[37.3vw] lg:w-[30vw] xl:w-[25vw] px-4 py-2 my-2 pr-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700 border-gray-300 placeholder-gray-400"
                        />
                        <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                <div className="flex items-center justify-center gap-2 md:mr-2">
                    {/* Language Dropdown */}
                    <div className="relative inline-block text-left" ref={dropdownRef}>
                        <div>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="inline-flex justify-center w-[32vw] md:w-[14vw] lg:w-[10vw] xl:w-[8vw] 2xl:w-[7vw] rounded-md border border-gray-300 shadow-sm p-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                            >
                                {selectedLanguage === 'English' ? <US className="w-5 h-5 mr-2" /> : <BD className="w-5 h-5 mr-2" />}
                                {selectedLanguage}
                                <MdKeyboardArrowDown className="text-lg" />
                            </button>
                        </div>

                        {isDropdownOpen && (
                            <div className="origin-top-right absolute left-0 mt-2 w-[34vw] md:w-[14vw] lg:w-[10vw] xl:w-[8vw] 2xl:w-[7vw] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                    <button
                                        onClick={() => handleLanguageSelect('English')}
                                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem"
                                    >
                                        <US className="w-5 h-5 mr-2" />
                                        English
                                    </button>
                                    <button
                                        onClick={() => handleLanguageSelect('Bangla')}
                                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem"
                                    >
                                        <BD className="w-5 h-5 mr-2" />
                                        Bangla
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        {/* Dark Mode Toggle */}
                        <button
                            onClick={toggleDarkMode}
                            className={`${isDarkMode ? 'text-gray-700' : 'text-gray-700'}`}
                            aria-label="Toggle Dark Mode"
                        >
                            {isDarkMode ? <FiMoon className="w-5 h-5" /> : <FiSun className="w-5 h-5" />}

                        </button>
                    </div>

                    {/* thunder icon */}
                    <div>
                        <AiFillThunderbolt />
                    </div>

                    {/* logout icon */}
                    <div>
                        <button onClick={handleLogout} className="focus:outline-none cursor-pointer">
                            <RiLogoutCircleRLine />
                        </button>
                    </div>
                </div>
            </header>
        </>
    );
};

export default HeaderRight;