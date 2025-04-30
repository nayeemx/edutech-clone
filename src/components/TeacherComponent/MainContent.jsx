// MainContent.js
import React from "react";
import { RiChat2Fill } from "react-icons/ri";
import { BiMessageSquareDetail } from "react-icons/bi";
import { CgNotes } from "react-icons/cg";
import { LuClipboardCheck } from "react-icons/lu";
import { LiaClipboardListSolid } from "react-icons/lia";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { BsCheck2Square } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import biral from "../../assets/teacher/cat_emptyState.png";
import { useAuth } from "../../provider/AuthProvider";
import { db } from "../../firebase/firebase.config";
import { useState, useEffect } from "react";
import { Spin } from "antd";
import { FaCheck } from "react-icons/fa6";
import welcom from "../../assets/teacher/dashboard-top-widget-image.png";
import takapoysha from "../../assets/teacher/icons8-gold-64.png";

const MainContent = () => {
  const { user } = useAuth();
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const userRef = db.ref(`users/${user.uid}`);
      userRef
        .once("value")
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setUserName(userData.name);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
      setUserName(null);
    }
  }, [user]);

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      return "Good Morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  const buttons = [
    {
      text: "Send SMS",
      icon: BiMessageSquareDetail,
      className: "btn-send-sms",
    },
    {
      text: "Notice-Board",
      icon: HiOutlineCog6Tooth,
      className: "btn-notice-board",
    },
    {
      text: "Accept Payment",
      icon: BsCheck2Square,
      className: "btn-accept-payment",
    },
    {
      text: "Payment Summary",
      icon: CgNotes,
      className: "btn-payment-summary",
    },
    { text: "Take Roll", icon: LuClipboardCheck, className: "btn-take-roll" },
    {
      text: "Attendance Summary",
      icon: LiaClipboardListSolid,
      className: "btn-attendance-summary",
    },
  ];

  return (
    <div className="p-4 bg-gray-100 min-h-[86.9vh] relative">
      {/* Top and Bottom Sections remain unchanged */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center bg-white p-6 rounded-lg shadow-lg w-[99.2%]">
          <div className="place-content-center">
            <h2 className="text-xl font-semibold">
              {user ? `${getGreeting()} ${userName}!` : "Welcome!"}
            </h2>

            <p className="text-gray-600">
              {user
                ? "Welcome to your Edutechs Dashboard"
                : "Please log in to access your dashboard."}
            </p>

            {user && (
              <>
                <div className="mt-2">
                  <span className="text-gray-600">Profile Completed: </span>
                  <span className="text-green-500 font-semibold">100%</span>
                  <span> | </span>
                  <span className="text-gray-600">Expert</span>
                </div>

                <div className="flex items-center gap-4 my-4">
                  <div className="bg-green-500 h-2.5 rounded-full w-4/6"></div>

                  <span className="block bg-[#52c41a] p-1 rounded-full">
                    <FaCheck className="text-white text-xs" />
                  </span>
                </div>
              </>
            )}
          </div>

          <div className="mt-4">
            <img
              src={welcom}
              alt="Illustration"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg w-[99.2%]">
          <div className="flex items-center">
            <img src={takapoysha} alt="icon" className="w-8 h-8 mr-2" />

            <div>
              <h2 className="text-xl font-semibold flex items-center">
                EduPay Campaign
              </h2>
              <p className="text-gray-600 text-sm">Edutechs Team</p>
            </div>
          </div>
          <p className="text-gray-700 mt-2">
            Use EduPay to automate your money collections and avail a bulk 10%
            discount on all your future subscriptions. Completely free to use
            and becomes active at the BDT 2 Lakh EduPay disbursed range!
          </p>
          <button className="bg-sky-600 text-white px-4 py-2 rounded mt-10 w-full">
            Learn More
          </button>
        </div>
      </div>

      <section className="flex items-center w-full justify-between">
        {/* Middle Section (Buttons) - NOW CORRECTED */}
        <div className="grid grid-cols-2 gap-4 w-[49%] bg-white rounded-lg shadow-lg p-7">
          {buttons.map((button, index) => (
            <button
              key={index}
              className={`custom-button ${button.className}`} // Apply the base and specific classes
            >
              <span className="mr-2 text-[2rem]">
                {React.createElement(button.icon)}
              </span>
              <span>{button.text}</span>
              <span className="arrow-icon-container">
                <span className="overlay"></span>
                <FaArrowRight className="arrow-icon" />
              </span>
            </button>
          ))}
        </div>

        {/* Bottom Section (No Changes) */}
        <div className="w-[49.4%] px-[4vw] py-[4vh] bg-white rounded-lg shadow-lg h-[40vh] overflow-auto">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Upcoming Events</h2>
            <span className="cursor-pointer">↻</span>
            <button className="bg-sky-600 text-white px-4 py-2 rounded">
              New Event +
            </button>
          </div>
          <div className="text-center h-[28vh]">
            <img
              src={biral}
              alt=""
              className="w-[7.5vw] justify-self-center mt-[5vh]"
            />
            <p>Yay No Events! Add one?</p>
          </div>
        </div>
      </section>

      {/* Chat Icon */}
      <div>
        <p className="fixed right-[1.4vw] top-[39rem] bg-blue-500 p-[10px] w-[4vw] h-[8.6vh] z-10 rounded-full">
          <RiChat2Fill className="text-white text-4xl -rotate-[9deg] relative top-[0.4vh] left-[0.3vw]" />
        </p>
      </div>
    </div>
  );
};

export default MainContent;