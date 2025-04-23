// app.jsx
import { createBrowserRouter, Outlet } from "react-router-dom";
import Layout from "./Layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import BlogPage from "./pages/BlogPage/BlogPage";
import RfidPage from "./pages/BlogPage/RfidPage";
import EduPay from "./pages/BlogPage/EduPay";
import Admission from "./pages/BlogPage/Admission";
import Tagging from "./pages/BlogPage/Tagging";
import Sentinal from "./pages/BlogPage/Sentinal";
import PricingPage from "./pages/PricingPage/PricingPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import EduAi from "./pages/EduAi/EduAi";
import NotfoundPage from "./pages/NotfoundPage/NotfoundPage";
import SentinalPage from "./pages/SentinalPage/SentinalPage";
import SmsPage from "./pages/SmsPage/SmsPage";
import CaseStudy from "./pages/CaseStudy/CaseStudy";
import AuthLayout from "./Layout/AuthLayout";
import LoggingPage from './pages/LoggingPage/LoggingPage';
import SignupPage from './pages/SignupPage/SignupPage';
import ForgotPass from './pages/LoggingPage/ForgotPass';
import Teacher from "./pages/Teacher/Teacher"; // Import
import Admin from "./pages/Admin/Admin";       // Import
import Business from "./pages/Business/Business";  // Import
import AddonsPage from "./pages/Teacher/AddonsPage";
// import ToDo from "./components/TeacherComponent/ToDo";
import TodoContainer from "./components/TeacherComponent/TodoContainer";
import Loggs from "./components/TeacherComponent/Loggs";

// Export the router!
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> }, // Use 'index' for the root
      { path: "home", element: <HomePage /> },
      { path: "blog", element: <BlogPage /> },
      { path: "blog/rfid", element: <RfidPage /> },
      { path: "blog/edupay", element: <EduPay /> },
      { path: "blog/admission", element: <Admission /> },
      { path: "blog/tag", element: <Tagging /> },
      { path: "blog/sentinal-blog", element: <Sentinal /> },
      { path: "casestudy", element: <CaseStudy /> },
      { path: "pricing", element: <PricingPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "eduai", element: <EduAi /> },
    ],
  },
  { path: "sentinal", element: <SentinalPage /> },
  { path: "sms", element: <SmsPage /> },
  { path: "auth", element: <AuthLayout />,
    children: [
      { path: "/auth/login", element: <LoggingPage /> },
      { path: "/auth/sign-up", element: <SignupPage /> },
      { path: "/auth/forgotPass", element: <ForgotPass /> },
    ] ,
  },
  { path: "teacher", element: <Teacher /> },   // Add route
  { path: "admin", element: <Admin /> },      // Add route
  { path: "business", element: <Business /> }, // Add route
  { path: "addons", element: <AddonsPage /> }, // Add route
  {path: "todo", element: <TodoContainer />},
  { path: "loggs", element: <Loggs /> },
  { path: "*", element: <NotfoundPage /> }, // not found page
]);