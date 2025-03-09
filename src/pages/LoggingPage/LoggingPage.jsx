// src/pages/LoggingPage/LoggingPage.jsx
import { useState, useRef, useEffect } from "react";
import { RiChat2Fill } from "react-icons/ri";
import logo from "../../assets/logo-white.png";
import { MdWbSunny } from "react-icons/md";
import { BD, US } from "country-flag-icons/react/3x2";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoIosLock } from "react-icons/io";
import { MailOutlined, EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/AuthProvider";
import { db } from "../../firebase/firebase.config"; // Import the database
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";


const LoggingPage = () => {
  const [language, setLanguage] = useState("English");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFlag, setSelectedFlag] = useState(<US className="w-6 h-auto" />);
  const dropdownRef = useRef(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { signIn } = useAuth(); // Still needed for initial auth check
  const navigate = useNavigate();
  const [form] = Form.useForm();


   const customPlaceholderStyle = {
    "::placeholder": { color: "#bfbfbf" },
    ":-ms-input-placeholder": { color: "#bfbfbf" },
    "::-ms-input-placeholder": { color: "#bfbfbf" },
  };

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

  const onFinish = async (values) => {
    try {
      // 1. Sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;


      if (!user) {
        message.error("Login failed. Please check your credentials.");
        return;
      }

      // 2. Fetch user data from Realtime Database
      const snapshot = await db.ref(`users/${user.uid}`).get();
      if (snapshot.exists()) {
        const userData = snapshot.val();
        const accountType = userData.accountType;

        // 3. Redirect based on accountType
        if (accountType === "teacher") {
          navigate("/teacher");
        } else if (accountType === "admin") {
          navigate("/admin");
        } else if (accountType === "business") {
          navigate("/business");
        } else {
          navigate("/"); // Default fallback
        }
      } else {
        console.error("User data not found in database.");
        message.error("Login failed. User data not found."); // Handle missing data
      }
      message.success("Logged in successfully!");

    } catch (error) {
      console.error("Login error:", error);
      message.error(error.message);
    }
  };
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
      message.error('Please fill in all the required fields correctly.')
    };

  return (
   <section className="bg-[#f5f5f5] h-screen flex justify-center items-center relative">
        <div>
          {/* Language Dropdown */}
          <div className="absolute top-2 right-4 flex items-center gap-6">
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
                  <span className="relative top-[0.4vh]">{language}</span>
                  <MdKeyboardArrowDown className="text-lg" />
                </button>
              </div>

              {showDropdown && (
                <div className="origin-top-right absolute right-0 mt-2 w-[8vw] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
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
            <span>
              <MdWbSunny className="text-2xl" />
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="w-[55vw] h-[65vh] mx-auto rounded-lg shadow-lg bg-white">
            <div className="flex">
              {/* Left Column (Logo) */}
              <div className="bg-[#0077d9] w-1/2 h-[65vh] p-8 rounded-l-lg flex items-center justify-center">
                <Link to="/">
                  <img
                    src={logo}
                    alt="Edutechs Logo"
                    className="w-auto h-auto max-h-[80px] cursor-pointer "
                  />
                </Link>
              </div>

              {/* Right Column (Form) */}
              <div className="w-1/2 p-8">
                <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
                <p className="text-gray-600 mb-6">
                  Log-in to your Edutechs Account
                </p>

                {/* login form */}
                <div>
           <Form
              form={form}
              name="login"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed} // Add this
              style={{ maxWidth: 360 }}
              autoComplete="off"
            >
              <Form.Item
                name="email"
                rules={[
                  { type: "email", message: "The input is not a valid email!" },
                  { required: true, message: "Please input your Email!" },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="text-[#545454]" />}
                  placeholder="example@gmail.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  style={{ backgroundColor: "#f5f5f5", ...customPlaceholderStyle }}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input.Password
                  prefix={<IoIosLock className="text-[#545454]" />}
                  placeholder="Password"
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  style={{ backgroundColor: "#f5f5f5", ...customPlaceholderStyle }}
                />
              </Form.Item>

              <Form.Item>
                <Button block type="primary" htmlType="submit" className="py-2 px-4 rounded focus:outline-none focus:shadow-outline" style={{ backgroundColor: "#038fde", borderColor: "#038fde" }}>
                  Sign in
                </Button>
              </Form.Item>
            </Form>
                </div>

                <div className="mt-4 flex justify-between">
                  <Link to="/auth/forgotpass">
                    <button className="text-sm text-[#038fde] cursor-pointer">
                      Forgot Password
                    </button>
                  </Link>
                  <Link to="/auth/sign-up">
                    <button className="text-sm text-[#038fde] cursor-pointer">
                      Sign Up
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chatbot Icon */}
        <div className="fixed bottom-4 right-4">
          <p className="bg-blue-500 p-[10px] w-[4vw] h-[8.6vh] z-10 rounded-full">
            <RiChat2Fill className="text-white text-4xl -rotate-[9deg] relative top-[0.4vh] left-[0.3vw]" />
          </p>
        </div>
      </section>
  );
};

export default LoggingPage;