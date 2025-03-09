// Layout.jsx (Simplified Title Update)
import { Outlet, useLocation } from "react-router"
import NavBar from "../components/NavBar/NavBar"
import Footer from "../components/Footer/Footer"
import { useEffect } from "react";

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    // Use a map or switch statement for cleaner title setting
    const titleMap = {
      "/": "Edutechs",
      "/home": "Edutechs || Home",
      "/blog": "Edutechs || Blog",
      "/blog/rfid": "Edutechs || RFID",
      "/blog/edupay": "Edutechs || EduPay",
      "/blog/admission": "Edutechs || Admission",
      "/blog/tag": "Edutechs || Tagging",
      "/blog/sentinal-blog": "Edutechs || Sentinal Blog",
      "/casestudy": "Edutechs || Case Study",
      "/pricing": "Edutechs || Pricing",
      "/contact": "Edutechs || Contact",
      "/eduai": "Edutechs || EduAi",
      "/sentinal": "Edutechs || Sentinal",
      "/sms": "Edutechs || SMS",
      "/auth/login": "Edutechs || Login",
      "/auth/sign-up": "Edutechs || Sign Up",
      "/auth/forgotPass": "Edutechs || Forgot Password",
    };

    document.title = titleMap[location.pathname] || "Edutechs"; // Default title
  }, [location.pathname]); // Depend on pathname ONLY

  return (
    <div>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;