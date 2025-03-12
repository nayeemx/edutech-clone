import { useState, useRef, useEffect } from 'react';
import { FiSearch, FiSun, FiMoon } from 'react-icons/fi'; // Import icons
import { BD, US } from "country-flag-icons/react/3x2";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AiFillThunderbolt } from "react-icons/ai";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth } from '../../provider/AuthProvider'; // Import useAuth

const HeaderRight = () => {
    const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode
    const [language, setLanguage] = useState("English");
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedFlag, setSelectedFlag] = useState(<US className="w-6 h-auto" />);
    const dropdownRef = useRef(null);
    const navigate = useNavigate(); // Get the navigate function
    const { signOut } = useAuth(); // Get the signOut function

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        setShowDropdown(false);
        setSelectedFlag(lang === "English" ? <US className="w-6 h-auto" /> : <BD className="w-6 h-auto" />);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        //  Add logic to actually change the theme of your application here.
        //  This typically involves adding/removing a class to the <body> or root element.
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
        } else {
            document.documentElement.classList.add('dark');
        }
    };

    const handleLogout = async () => {
        try {
            await signOut();
            navigate('/auth/login'); // Redirect to login page after successful logout
        } catch (error) {
            console.error("Logout failed:", error);
            // Optionally show an error message to the user
        }
    };

    return (
        <>
            <section className="flex items-center justify-between">
                <div className='ml-4'>
                    <div className="relative mr-4">
                        <input
                            type="text"
                            placeholder="Search in app for students ..."
                            className={`w-[20vw] px-4 py-2 pr-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-700 border-gray-300'}`}

                        />
                        <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                <div>
                    {/* Language Dropdown */}
                    <div className="absolute top-[4vh] right-[11vw] flex items-center gap-6">
                        <div className="relative inline-block text-left" ref={dropdownRef}>
                            <div>
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    type="button"
                                    className="inline-flex justify-center items-center gap-2 w-full text-sm font-medium text-gray-700"
                                    id="options-menu"
                                    aria-haspopup="true"
                                    aria-expanded={showDropdown}
                                >
                                    {selectedFlag}
                                    <span className="relative">{language}</span>
                                    <MdKeyboardArrowDown className="text-lg" />
                                </button>
                            </div>

                            {showDropdown && (
                                <div className="origin-top-right absolute right-0 mt-2 w-[8vw] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                    <div
                                        className="py-1"
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="options-menu"
                                    >
                                        <button
                                            onClick={() => handleLanguageChange("English")}
                                            className="flex items-center gap-4 px-4 py-2 text-sm text-gray-700 hover:text-gray-900 w-full text-left"
                                            role="menuitem"
                                        >
                                            <US className="w-6 h-auto" />
                                            <span>English</span>
                                        </button>
                                        <button
                                            onClick={() => handleLanguageChange("Bangla")}
                                            className="flex items-center gap-4 px-4 py-2 text-sm text-gray-700 hover:text-gray-900 w-full text-left"
                                            role="menuitem"
                                        >
                                            <BD className="w-6 h-auto" />
                                            <span>Bangla</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className='flex items-center gap-8 mr-8'>
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

                    <div>
                        <AiFillThunderbolt />
                    </div>

                    <div>
                        {/* Logout Button */}
                        <button onClick={handleLogout} className="focus:outline-none cursor-pointer">
                            <RiLogoutCircleRLine />
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HeaderRight;