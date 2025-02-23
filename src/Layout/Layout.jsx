import { Outlet, useLocation } from "react-router"
import NavBar from "../components/NavBar/NavBar"
import Footer from "../components/Footer/Footer"
import { useEffect } from "react";

const Layout = () => {
  const location = useLocation();
  
  useEffect(() => {
    const path = location.pathname;

    if (path === "/"){
      document.title = "Edutechs";
    } else if (path === "/home"){
      document.title = "Edutechs || Home";
    }
  }, [location]);
  return (
    <div>
        <NavBar />
        <main>
            <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default Layout