import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa'; // Import the icons
import logo from '../../assets/sms/smslogo.png' // Replace with your actual logo path

const Footer = () => {
  return (
    <footer className="bg-[#28303f] text-white py-12 px-4">
      <div className="w-10/12 mx-auto justify-items-center grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and Description */}
        <div>
          <img src={logo} alt="Edutechs Logo" className="w-48 mb-4" /> {/* Adjust width as needed */}
          <p className="text-sm text-white font-semibold mb-4">
            Edutechs is our commitment to automate administrative and learning procedures by smart integrations and automations with popularly used Education Tools (Zoom, Google Classroom, etc) which will lead to time-savings and eventually hybridize classrooms.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-white p-3 bg-[#909090] rounded-full"><FaFacebookF /></a>
            <a href="#" className="text-white p-3 bg-[#909090] rounded-full"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Our Service */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Our Service</h3>
          <ul className="text-[#54a5ef]">
            <li><a href="#">SMS</a></li>
            <li><a href="#">WhatsApp</a></li>
            <li><a href="#">LMS</a></li>
            <li><a href="#">Custom LMS</a></li>
            <li><a href="#">School LMS</a></li>
            <li><a href="#">University LMS</a></li>
            <li><a href="#">Edu Digital Payments</a></li>
            <li><a href="#">Edu Auto Attendance</a></li>
          </ul>
        </div>

        {/* Usage */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Usage</h3>
          <ul className="text-gray-400">
            <li><a href="#" className="text-[#54a5ef]">Privacy Policy</a></li>
            <li><a href="#" className="text-[#54a5ef]">Terms of Service</a></li>
          </ul>
        </div>
      </div>
       {/* Copyright */}
      <div className="text-center mt-[16vh] text-white text-sm font-semibold">
        © {new Date().getFullYear()} Edutechs. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;