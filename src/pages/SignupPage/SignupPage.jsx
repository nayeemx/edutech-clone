import { useState, useRef, useEffect } from "react";
import { RiChat2Fill } from "react-icons/ri";
import logo from "../../assets/logo-white.png"; // Make sure path is correct
import { MdWbSunny } from "react-icons/md"; // Import MdLockOutline
import { BD, US } from "country-flag-icons/react/3x2";
import { MdKeyboardArrowDown } from "react-icons/md";
import {
  MailOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd"; // Import Select
import { Link } from "react-router-dom";
import { RxPerson } from "react-icons/rx";
import { AiOutlineBank } from "react-icons/ai";
import { AiOutlinePhone } from "react-icons/ai";
import { AiFillLock } from "react-icons/ai";

const SignupPage = () => {
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

  const customPlaceholderStyle = {
    "::placeholder": {
      color: "#bfbfbf",
    },
    ":-ms-input-placeholder": {
      color: "#bfbfbf",
    },
    "::-ms-input-placeholder": {
      color: "#bfbfbf",
    },
  };

  const { Option } = Select; // Destructure Option from Select

  return (
    <>
      <section className="bg-[#f5f5f5] h-[107vh] flex justify-center items-center relative">
        {/* Language Dropdown and Chatbot (Same as Login Page) */}
        <div>
          {/* Language Dropdown */}
          <div className="absolute top-2 right-4 flex items-center gap-6">
            <div className="relative inline-block text-left" ref={dropdownRef}>
              <div>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  type="button"
                  className="inline-flex justify-center items-center gap-2 w-full px-4 py-2 text-sm font-medium text-gray-700"
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

        {/* Main Form Area */}
        <div className="relative">
          <div className="w-[55vw] h-auto mx-auto rounded-lg shadow-lg bg-white">
            {" "}
            {/* Adjusted height to h-auto */}
            <div className="flex">
              {/* Left Column (Logo) */}
              <div className="bg-[#0077d9] w-1/2 p-8 rounded-l-lg flex items-center justify-center">
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
                <h1 className="text-2xl font-normal text-[#3e416d]">Hello!</h1>
                <p className="text-[#545454] font-semibold mb-4">
                  Create Your New Edutechs Account
                </p>

                {/* Form */}
                <Form
                  name="signup"
                  onFinish={onFinish}
                  style={{ maxWidth: 360 }}
                  layout="vertical"
                >
                  <Form.Item
                    name="accountType"
                    label={
                      <span className="text-[#3e416d] font-bold">
                        Choose Account Type
                      </span>
                    } //Added Label
                    initialValue="teacher" // Set initial value to "teacher"
                    rules={[
                      {
                        message: "Please select an account type!",
                      },
                    ]}
                  >
                    <Select>
                      <Option value="teacher">Teacher</Option>
                      <Option value="admin">Admin</Option>
                      <Option value="business">Business</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="name"
                    label={
                      <span className="text-[#3e416d] font-bold">Name</span>
                    } // Added Label
                    rules={[
                      {
                        message: "Please input your name!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<RxPerson className="text-[#545454]" />}
                      placeholder="Jane Foster"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      style={{
                        backgroundColor: "#f5f5f5",
                        ...customPlaceholderStyle,
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="institutionName"
                    label={
                      <span className="text-[#3e416d] font-bold">
                        Institution Name
                      </span>
                    }
                    rules={[
                      {
                        message: "Please input your institution name!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<AiOutlineBank className="text-[#545454]" />}
                      placeholder="ABC Academy"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      style={{
                        backgroundColor: "#f5f5f5",
                        ...customPlaceholderStyle,
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="phone"
                    label={
                      <span className="text-[#3e416d] font-bold">Phone</span>
                    }
                    rules={[
                      {
                        message: "Please input your phone number!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<AiOutlinePhone className="text-[#545454]" />}
                      placeholder="+8801700766173"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      style={{
                        backgroundColor: "#f5f5f5",
                        ...customPlaceholderStyle,
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    label={
                      <span className="text-[#3e416d] font-bold">Email</span>
                    }
                    rules={[
                      {
                        type: "email",
                        message: "The input is not a valid email!",
                      },
                      {
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
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    label={
                      <span className="text-[#3e416d] font-bold">Password</span>
                    } // Added Label
                    rules={[
                      {
                        message: "Please input your Password!",
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<AiFillLock className="text-[#545454]" />}
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
                      }}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      block
                      type="primary"
                      htmlType="submit"
                      className="mt-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      style={{
                        backgroundColor: "#038fde",
                        borderColor: "#038fde",
                      }}
                    >
                      Sign Up
                    </Button>
                  </Form.Item>
                </Form>

                <div className="mt-2 flex justify-between">
                  <Link to="/forgotpass">
                    <button className="text-sm text-[#038fde] cursor-pointer">
                      Forgot Password
                    </button>
                  </Link>

                  <Link to="/login">
                    <button className="text-sm text-[#038fde]">Sign In</button>
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

export default SignupPage;