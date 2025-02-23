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
import LoggingPage from "./pages/LoggingPage/LoggingPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import NotfoundPage from "./pages/NotfoundPage/NotfoundPage";
import SentinalPage from "./pages/SentinalPage/SentinalPage";
import SmsPage from "./pages/SmsPage/SmsPage";
import CaseStudy from "./pages/CaseStudy/CaseStudy";
import ForgotPass from "./pages/LoggingPage/ForgotPass";

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
      { path: "forgot-password", element: <ForgotPassword /> },
    ],
  },
  { path: "sentinal", element: <SentinalPage /> },
  { path: "sms", element: <SmsPage /> },
  { path: "login", element: <LoggingPage /> },
  { path: "forgotpass", element: <ForgotPass /> },
  { path: "signup", element: <SignupPage /> },
  { path: "*", element: <NotfoundPage /> }, // Put the wildcard route LAST
]);

// No need for a separate App component now.
// We directly export the router, and use it in main.jsx