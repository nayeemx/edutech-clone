import logo from "../../assets/logo-white.png";
import Dropdown from "../Dropdown/Dropdown";
const Footer = () => {
  return (
    <>
      <div className="bg-[#3e4a67] text-white relative h-[60vh] top-[33vh]">
        <div className="w-10/12 mx-auto relative top-[17vh]">
          <div className="grid grid-cols-5 gap-8">
            <div className="flex flex-col gap-4">
              <img src={logo} alt="" className="w-[11vw]" />

              <div>
                <Dropdown />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Company
              </h3>
              <ul className="mt-4 space-y-4">
                <li className="m-0 leading-[1.6]">
                  <a
                    href="#"
                    className="text-base text-gray-300 hover:text-blue-600"
                  >
                    News / Blog
                  </a>
                </li>
                <li className="m-0 leading-[1.6]">
                  <a
                    href="#"
                    className="text-base text-gray-300 hover:text-blue-600"
                  >
                    Contact Us
                  </a>
                </li>
                <li className="m-0 leading-[1.6]">
                  <a
                    href="#"
                    className="text-base text-gray-300 hover:text-blue-600"
                  >
                    Careers
                  </a>
                </li>
                <li className="m-0 leading-[1.6]">
                  <a
                    href="#"
                    className="text-base text-gray-300 hover:text-blue-600"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Products
              </h3>
              <ul className="mt-4 space-y-4">
                <li className="m-0 leading-[1.6]">
                  <a
                    href="#"
                    className="text-base text-gray-300 hover:text-blue-600"
                  >
                    Edutechs LMS
                  </a>
                </li>
                <li className="m-0 leading-[1.6]">
                  <a
                    href="#"
                    className="text-base text-gray-300 hover:text-blue-600"
                  >
                    Edutechs AI{" "}
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500 text-white">
                      NEW
                    </span>
                  </a>
                </li>
                <li className="m-0 leading-[1.6]">
                  <a
                    href="#"
                    className="text-base text-gray-300 hover:text-blue-600"
                  >
                    Sentinel - Student Safety
                  </a>
                </li>
                <li className="m-0 leading-[1.6]">
                  <a
                    href="#"
                    className="text-base text-gray-300 hover:text-blue-600"
                  >
                    Bulk SMS Gateway
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Use Cases
              </h3>
              <ul className="mt-4 space-y-4">
                <li className="m-0 leading-[1.6]">
                  <a
                    href="#"
                    className="text-base text-gray-300 hover:text-blue-600"
                  >
                    Education Management
                  </a>
                </li>
                <li className="m-0 leading-[1.6]">
                  <a
                    href="#"
                    className="text-base text-gray-300 hover:text-blue-600"
                  >
                    Attendance Automation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Community
              </h3>
              <ul className="mt-4 space-y-4">
                <li className="m-0 leading-[1.6]">
                  <a
                    href="#"
                    className="text-base text-gray-300 hover:text-blue-600"
                  >
                    Facebook
                  </a>
                </li>
                <li className="m-0 leading-[1.6]">
                  <a
                    href="#"
                    className="text-base text-gray-300 hover:text-blue-600"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-[6rem]">
            <ul className="flex gap-8">
              <li className="text-[#9da8bb]">© Edutechs </li>
              <li className="text-[#9da8bb] cursor-pointer">
                Terms of Service
              </li>
              <li className="text-[#9da8bb] cursor-pointer">Privacy Policy</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

import slogo from "../../assets/sentinal/client/sentinel-logo.png";
const Sfooter = () => {
  return (
    <>
    <footer className="bg-[#f2f3f4] pt-[15vh]">
      <div className="bg-[#131413]">
        <div className="w-10/12 mx-auto py-10 flex justify-between items-center text-white">
        <div>
        <img src={slogo} alt="" className="w-[18vw]" />
        </div>

        <div>
          <p className="text-lg font-normal">Sentinel is a product of Edutechs</p>
          <p className="text-xs font-semibold text-right">© 2025 Edutechs. All Rights Reserved</p>
        </div>
        </div>
      </div>
    </footer>
    </>
  );
};

const SmsFooter = () => {
  return (
    <>
    <Footer>
      hi
    </Footer>
    </>
  );
};

export { Sfooter, SmsFooter };

export default Footer;