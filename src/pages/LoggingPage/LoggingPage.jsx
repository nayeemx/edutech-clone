import { useState, useRef, useEffect } from "react";
import { RiChat2Fill } from "react-icons/ri";
import logo from "../../assets/logo-white.png";
import { MdWbSunny } from "react-icons/md";
import { BD, US } from "country-flag-icons/react/3x2";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoIosLock } from "react-icons/io";
import {
  MailOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Link } from "react-router";

const LoggingPage = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const [language, setLanguage] = useState("English");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFlag, setSelectedFlag] = useState(
    <US className="w-6 h-auto" />
  );
  const dropdownRef = useRef(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setShowDropdown(false);
    if (lang === "English") {
      setSelectedFlag(<US className="w-6 h-auto" />);
    } else if (lang === "Bangla") {
      setSelectedFlag(<BD className="w-6 h-auto" />);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Custom CSS for placeholder color (Best Approach)
  const customPlaceholderStyle = {
    "::placeholder": {
      color: "#bfbfbf", // Desired placeholder color
    },
    // For older browsers (optional, but good for compatibility):
    ":-ms-input-placeholder": {
      color: "#bfbfbf",
    },
    "::-ms-input-placeholder": {
      color: "#bfbfbf",
    },
  };

  return (
    <>
      <section className="bg-[#f5f5f5] h-screen flex justify-center items-center relative">
        <div>
          {/* Language Dropdown */}
          <div className="absolute top-2 right-4 flex items-center gap-6">
            <div className="relative inline-block text-left" ref={dropdownRef}>
              <div>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  type="button"
                  className="inline-flex justify-center items-center gap-2 w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  id="options-menu"
                  aria-haspopup="true"
                  aria-expanded={showDropdown}
                >
                  {selectedFlag}
                  <span>{language}</span>
                  <MdKeyboardArrowDown />
                </button>
              </div>

              {showDropdown && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
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
                    name="login"
                    initialValues={{
                      remember: true,
                    }}
                    style={{
                      maxWidth: 360,
                    }}
                    onFinish={onFinish}
                  >
                    <Form.Item
                      name="email"
                      rules={[
                        {
                          type: "email",
                          message: "The input is not a valid email!",
                        },
                        {
                          required: true,
                          message: "Please input your Email!",
                        },
                      ]}
                    >
                      <Input
                        prefix={<MailOutlined className="text-[#545454]" />}
                        placeholder="example@gmail.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        style={{
                          backgroundColor: "#f5f5f5",
                          ...customPlaceholderStyle,
                        }} // Combine styles
                      />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Password!",
                        },
                      ]}
                    >
                      <Input.Password
                        prefix={<IoIosLock className="text-[#545454]" />}
                        placeholder="Password"
                        iconRender={(visible) =>
                          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                        visibilityToggle={{
                          visible: passwordVisible,
                          onVisibleChange: setPasswordVisible,
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        style={{
                          backgroundColor: "#f5f5f5",
                          ...customPlaceholderStyle,
                        }} // Combine styles
                      />
                    </Form.Item>

                    <Form.Item>
                      <Button
                        block
                        type="primary"
                        htmlType="submit"
                        className="mt-[10vh] py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        style={{
                          backgroundColor: "#038fde",
                          borderColor: "#038fde",
                        }} // Add style prop
                      >
                        Sign in
                      </Button>
                    </Form.Item>
                  </Form>
                </div>

                <div className="mt-4 flex justify-between">
                  <Link to="/forgotpass">
                    <button className="text-sm text-[#038fde] cursor-pointer">
                      Forgot Password
                    </button>
                  </Link>
                  <Link to="/signup">
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
    </>
  );
};

export default LoggingPage;