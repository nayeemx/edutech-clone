// src/components/NavBar/NavBar.jsx
import { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Image } from "antd";
import Logo from "../../assets/logo.png";
import Card1im1 from "../../assets/card1image1.png";
import Card1im2 from "../../assets/card1image2.png";
import Card2im1 from "../../assets/card2im1.png";
import Card2im2 from "../../assets/card2im2.png";
import { MdWbSunny } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import star from "../../assets/eduai/star4.png";
import { useAuth } from "../../provider/AuthProvider"; // Import useAuth

const NavBar = () => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isCard1Hovered, setIsCard1Hovered] = useState(false);
  const [isCard2Hovered, setIsCard2Hovered] = useState(false);
  const { user, signOut } = useAuth(); // Get user and signOut
  const navigate = useNavigate();     //for navigate after signout


  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/") //go to home page
      // Optionally, you could show a success message here using Ant Design's message API
    } catch (error) {
      console.error("Error signing out:", error);
      // In a production app, display an error message to the user
    }
  };

  return (
    <>
      <div className="bg-gray-100 sticky top-0 z-50">
        <div className="w-10/12 mx-auto p-4 flex flex-col">
          <div className="justify-center">
            <Link to="/">
              <img src={Logo} alt="" className="w-32" />
            </Link>
          </div>

          <div>
            <ul className="text-center my-4">
              <li className="relative">
                <button
                  className="hover:text-blue-500"
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                  onMouseEnter={() => setIsProductsOpen(true)}
                >
                  Products{" "}
                  <motion.svg
                    className="inline-block h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    animate={{ rotate: isProductsOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </button>

                <AnimatePresence>
                  {isProductsOpen && (
                    <motion.div
                      className="absolute top-full left-0 w-fit bg-white border border-gray-200 rounded-xl shadow-lg mt-4"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      onMouseLeave={() => setIsProductsOpen(false)}
                    >
                      <div className="flex p-4 space-x-4">
                        {/* 1st card */}
                        <Link to="/sentinal">
                          <Card
                            hoverable
                            style={{
                              width: 300,
                              height: 225,
                              position: "relative",
                            }}
                            onMouseEnter={() => setIsCard1Hovered(true)}
                            onMouseLeave={() => setIsCard1Hovered(false)}
                          >
                            <Suspense
                              fallback={
                                <div style={{ width: 200, height: 125 }}>
                                  Loading...
                                </div>
                              }
                            >
                              <Image
                                preview={false}
                                src={isCard1Hovered ? Card1im2 : Card1im1}
                                width={"300px"} // Use percentage to fill the card width
                                style={{
                                  position: "relative",
                                  width: "300px",
                                  height: "223.3px",
                                  backgroundColor: isCard1Hovered
                                    ? "#f5faf6"
                                    : "#e9f3ee", // Change background color on hover
                                  borderRadius: "3%",
                                  overflow: "hidden",
                                  bottom: "3.4vh",
                                  left: "-25px",
                                  transition: "background-color 0.3s ease", // Add a smooth transition
                                }}
                              />
                            </Suspense>

                            {/* Add a semi-transparent background */}
                            <div className="absolute top-0 left-0 w-full p-4 text-white">
                              <h4 className="text-lg font-bold text-[#2eb263]">
                                Sentinel
                              </h4>
                              <p className="text-sm text-[#505350]">
                                Ensure student safety with entry/exit tracking
                                with instant notification
                              </p>
                            </div>
                          </Card>
                        </Link>

                        {/* 2nd card */}
                        <Link to="/sms" target="_blank">
                          <Card
                            hoverable
                            style={{
                              width: 300,
                              height: 225,
                              position: "relative",
                              backgroundColor: isCard2Hovered
                                ? "#f5faf6"
                                : "#e9f3ee", // Change background color on hover
                              transition: "background-color 0.3s ease", // Add a smooth transition
                            }}
                            onMouseEnter={() => setIsCard2Hovered(true)}
                            onMouseLeave={() => setIsCard2Hovered(false)}
                          >
                            <Suspense
                              fallback={
                                <div style={{ width: 300, height: 125 }}>
                                  Loading...
                                </div>
                              }
                            >
                              <Image
                                preview={false}
                                src={isCard2Hovered ? Card2im2 : Card2im1}
                                width={"200px"} // Use percentage to fill the card width
                                style={{
                                  position: "relative",
                                  width: "180px%",
                                  height: "94px",
                                  borderRadius: "3%",
                                  top: "15vh", // Adjust vertical position as needed
                                  left: "4.81vw",
                                  objectFit: "cover", // Ensure image covers the area
                                }}
                              />
                            </Suspense>

                            {/* Add a semi-transparent background */}
                            <div className="absolute top-0 left-0 w-full p-4 text-white">
                              <h4 className="text-lg font-bold text-[#2eb263]">
                                Bukl SMS Gateway
                              </h4>
                              <p className="text-sm text-[#505350]">
                                Ensure student safety with entry/exit tracking
                                with instant notification
                              </p>
                            </div>
                          </Card>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
              <li className="hover:text-blue-500">
                <Link to="/blog">Blog</Link>
              </li>
              <li className="hover:text-blue-500">
                <Link to="/pricing">Pricing</Link>
              </li>
              <li className="hover:text-blue-500">
                <Link to="/contact">Contact</Link>
              </li>
              <li className="hover:text-blue-500">
                <Link to="/eduai">
                  <div className="flex items-center justify-center gap-2">
                    <p>Edutechs AI</p>
                    <img src={star} alt="" className="w-5 h-5" />
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          <div className="">
            <button className="text-[1.8rem]">
              <MdWbSunny />
            </button>

            {/* Conditionally render based on user */}
            {user ? (
              <>
                <span className="text-gray-600">
                  Logged in as: {user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="text-[1.4rem] cursor-pointer py-1 px-6 rounded-full bg-red-500 hover:bg-red-700 border-2 border-red-500 hover:border-red-700 text-white"
                >
                  <p className="relative">Logout</p>
                </button>
              </>
            ) : (
              <>
                <Link to="/auth/login">
                  <button className="text-[1.4rem] cursor-pointer py-1 px-6 rounded-full border-2 border-blue-500 hover:bg-blue-200 text-blue-500 hover:text-blue-800">
                    <p className="relative">Login</p>
                  </button>
                </Link>
                <Link to="/auth/sign-up">
                  <button className="text-[1.4rem] cursor-pointer py-1 px-6 rounded-full bg-blue-500 hover:bg-blue-800 border-2 border-blue-500 hover:border-blue-800 text-white">
                    <p className="relative">Sign Up</p>
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

import slogo from '../../assets/sentinal/Sentinel-Logo-Original.svg';

const SnavBar = ({ scrollToSection, activeSection }) => {
    return (
        <section className="bg-[#f2f3f4] border-2 border-[#e8e8e8] p-4 sticky top-0 z-50 space-x-4">
            <div className="w-10/12 z-50 flex justify-between items-center mx-auto">
                <div>
                    <img src={slogo} alt="" />
                </div>
                <div>
                    <button
                        className={`px-4 py-2 rounded ${
                            activeSection === 'products' ? 'bg-[#edeeef]' : ''
                        }`}
                        onClick={() => scrollToSection('products')}
                    >
                        Products
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${
                            activeSection === 'pricing' ? 'bg-[#edeeef]' : ''
                        }`}
                        onClick={() => scrollToSection('pricing')}
                    >
                        Pricing
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${
                            activeSection === 'clients' ? 'bg-[#edeeef]' : ''
                        }`}
                        onClick={() => scrollToSection('clients')}
                    >
                        Clients
                    </button>
                </div>
            </div>
        </section>
    );
};

// SmsnavBar.jsx
import { useEffect, useRef } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import Smslogo from "../../assets/logo-white.png";

const SmsnavBar = ({ stickyOffset, scrollToSection }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [language, setLanguage] = useState('English');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => { setScrollPosition(window.scrollY); };
    window.addEventListener('scroll', handleScroll);
    return () => { window.removeEventListener('scroll', handleScroll); };
  }, []);

  useEffect(() => {
    setIsSticky(scrollPosition > stickyOffset);
  }, [scrollPosition, stickyOffset]);

  const toggleDropdown = () => { setIsDropdownOpen(!isDropdownOpen); };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => { document.removeEventListener('mousedown', handleClickOutside); };
  }, []);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <nav
        className={`py-4 px-6 flex items-center justify-between ${
          isSticky
            ? 'fixed top-0 w-full z-50 bg-[#54a5ef]' // Sticky state color removed: transition-all duration-300
            : 'fixed top-0 w-full z-50' // Initial state: fixed, transparent
        }`}
      >
        <div className="mx-auto w-9/12">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="/" className="text-xl font-bold">
                <img src={Smslogo} alt="" className="w-36 h-9" />
              </a>
            </div>

            <div className="flex-grow hidden md:flex justify-center space-x-8">
              <button onClick={() => scrollToSection('features')}>Features</button>
              <button onClick={() => scrollToSection('contact')}>Contact</button>
            </div>

            <div className="flex items-center space-x-4" ref={dropdownRef}>
              {/* lanuage */}
              <div className="relative inline-block text-left">
                <button
                  type="button"
                  onClick={toggleDropdown}
                  className="inline-flex justify-center items-center w-full rounded-md hover:shadow-md px-4 py-2 text-sm font-medium"
                >
                  {language}
                  {isDropdownOpen ? (
                    <FaAngleUp className="ml-2" />
                  ) : (
                    <FaAngleDown className="ml-2" />
                  )}
                </button>
                {isDropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-[6.5vw] rounded-md shadow-lg">
                    <div
                      className=""
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <button
                        onClick={() => handleLanguageChange('English')}
                        className={`block px-4 py-2 text-sm ${
                          language === 'English'
                            ? 'text-white'
                            : 'text-white'
                        } bg-[#4a5f87] hover:bg-[#038fde] hover:text-white w-full text-left`}
                        role="menuitem"
                      >
                        English
                      </button>
                      <button
                        onClick={() => handleLanguageChange('Bangla')}
                        className={`block px-4 py-2 text-sm ${
                          language === 'Bangla'
                            ? 'text-white'
                            : 'text-white'
                        } bg-[#4a5f87] hover:bg-[#038fde] hover:text-white w-full text-left`}
                        role="menuitem"
                      >
                        Bangla
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <Link to="/login">
              <button className="bg-[#28303f] hover:bg-[#0971e0] text-white font-bold py-2 px-4 rounded-lg cursor-pointer">
                Login
              </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar; // Export NavBar as the default
export { SnavBar, SmsnavBar }; // Export SnavBar as a named export