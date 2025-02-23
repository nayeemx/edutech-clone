// ToggleSwitch.jsx

import { useState } from 'react';
import { motion } from 'framer-motion';

// Import your images here (assuming they are in src/assets)
import lightModeImage from '../../assets/sms/light-mode.png';
import darkModeImage from '../../assets/sms/dark-mode.png';
import banglaImage from '../../assets/sms/edutechs.app_ex_sms_.png'; // Renamed for clarity
import mobileAppImage from '../../assets/sms/mobile-view.png'; // Renamed for clarity

const ToggleSwitch = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isBangla, setIsBangla] = useState(false); // Renamed state variable
    const [isMobileApp, setIsMobileApp] = useState(false); // Renamed state variable

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
    const toggleBangla = () => setIsBangla(!isBangla); // Renamed toggle function
    const toggleMobileApp = () => setIsMobileApp(!isMobileApp); // Renamed toggle function

    //variants
    const imageVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    };

    return (
        <div className={`flex flex-col md:items-center md:justify-between md:flex-row p-8 text-gray-800`}>
            {/* Toggle Section */}
            <div className="flex flex-col gap-4 w-[30%]">
                {/* Dark Mode Toggle */}
                <h2 className='text-3xl font-normal'>Designed with your needs in mind</h2>
                <div className="flex items-center justify-between gap-4 bg-white px-4 py-3 rounded-xl">
                    <span className='mr-1 text-xl'>Dark Mode</span>
                    <motion.button
                        className={`w-12 h-6 rounded-full p-1 flex items-center ${
                            isDarkMode ? 'bg-gray-300 justify-end' : 'bg-[#808080] justify-start'
                        }`}
                        onClick={toggleDarkMode}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.div
                            className="w-4 h-4 rounded-full bg-white"
                            layout
                            transition={{ type: "spring", stiffness: 700, damping: 30 }}
                        />
                    </motion.button>
                </div>

                {/* Bangla Toggle */}
                <div className="flex items-center justify-between gap-4 bg-white px-4 py-3 rounded-xl">
                    <span className='mr-1 text-xl'>বাংলা</span>
                    <motion.button
                        className={`w-12 h-6 rounded-full p-1 flex items-center ${
                            isBangla ? 'bg-gray-300 justify-end' : 'bg-[#808080] justify-start'
                        }`}
                        onClick={toggleBangla}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.div
                            className="w-4 h-4 rounded-full bg-white"
                            layout
                            transition={{ type: "spring", stiffness: 700, damping: 30 }}
                        />
                    </motion.button>
                </div>

                {/* Mobile App Toggle */}
                <div className="flex items-center justify-between gap-4 bg-white px-4 py-3 rounded-xl">
                    <span className='mr-1 text-xl'>Mobile App</span>
                    <motion.button
                        className={`w-12 h-6 rounded-full p-1 flex items-center ${
                            isMobileApp ? 'bg-gray-300 justify-end' : 'bg-[#808080] justify-start'
                        }`}
                        onClick={toggleMobileApp}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.div
                            className="w-4 h-4 rounded-full bg-white"
                            layout
                            transition={{ type: "spring", stiffness: 700, damping: 30 }}
                        />
                    </motion.button>
                </div>
            </div>

            {/* Image Display Area */}
            <div className="flex overflow-hidden relative w-[60%] rounded-2xl">
                {/* Default/Light Mode and Dark Mode Image (Combined Logic) */}
                <motion.img
                    src={isDarkMode ? darkModeImage : lightModeImage}
                    alt={isDarkMode ? "Dark Mode" : "Light Mode"}
                    className=" w-[45vw] object-cover rounded-2xl"   //  Removed 'absolute inset-0'
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                />

                {/* Bangla Image */}
                {isBangla && (
                    <motion.img
                        src={banglaImage}
                        alt="Bangla"
                        className="absolute inset-0 right-0 w-[45vw] object-contain rounded-2xl"
                        variants={imageVariants}
                        initial="hidden"
                        animate="visible"
                    />
                )}

                {/* Mobile App Image */}
                {isMobileApp && (
                    <motion.img
                        src={mobileAppImage}
                        alt="Mobile App"
                        className="absolute inset-0 w-[45vw] object-contain rounded-2xl"
                        variants={imageVariants}
                        initial="hidden"
                        animate="visible"
                    />
                )}
            </div>
        </div>
    );
};

export default ToggleSwitch;