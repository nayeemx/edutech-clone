import { Link } from "react-router-dom";
import img1 from "../../../assets/nb/1.png";
import img2 from "../../../assets/nb/2.png";
import img3 from "../../../assets/nb/3.png";
import img4 from "../../../assets/nb/4.png";
const NewsCase = () => {
  return (
    <>
      <div className="bg-[#f0f4ff] relative top-[40vh]">
        {/* container */}
        <div className="w-10/12 mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold py-6">News / Blog</h1>

            <span className="text-blue-500 font-semibold">
              <Link to="/blog">View All</Link>
            </span>
          </div>

          {/* cards */}
          <div className="grid grid-cols-3 gap-4">
            {/* card 1 */}
            <Link to="/blog/rfid">
            <div className="w-full p-4 hover:translate-y-[-5px] transition-transform duration-300 my-4 bg-white rounded-4xl border-2 border-slate-300 cursor-pointer">
              {/* Image Container */}
              <div className="relative w-full pb-[56.25%]">
                <img
                  src={img1}
                  alt="Offline Scanning"
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
                />
              </div>
              {/* Content */}
              <div className="p-4">
                <span className="bg-[#fff3e0] text-gray-800 px-4 py-2 rounded-full text-sm mb-2 inline-block border-2 border-[#ff9800]">
                  <p className="font-semibold text-[#ff9800]">Announcement</p>
                </span>
                <h2 className="text-lg mb-2">
                  Adding Offline Scanning Support for Sentinel RFID Scanners
                </h2>
                <p className="text-gray-600 mb-4">
                  When we set out to develop our Sentinel RFID Scanners, our
                  goal was to provide institutions...
                </p>
                <div className="flex justify-between text-gray-500 border-t-2 border-slate-300 mt-8 pt-2">
                  <span>Dec 15, 2024</span>
                  <span>7m Read</span>
                </div>
              </div>
            </div>
            </Link>
            {/* card 2 */}
            <Link to="blog/edupay">
            <div className="w-full p-4 hover:translate-y-[-5px] transition-transform duration-300 my-4 bg-white rounded-4xl border-2 border-slate-300 cursor-pointer">
              {/* Image Container */}
              <div className="relative w-full pb-[56.25%]">
                <img
                  src={img2}
                  alt="Offline Scanning"
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
                />
              </div>
              {/* Content */}
              <div className="p-4">
                <span className="bg-[#fff3e0] text-gray-800 px-4 py-2 rounded-full text-sm mb-2 inline-block border-2 border-[#ff9800]">
                  <p className="font-semibold text-[#ff9800]">Announcement</p>
                </span>
                <h2 className="text-lg mb-2">
                  EduPay: Gateway to Hassle-Free Payments for Institutions
                </h2>
                <p className="text-gray-600 mb-4">
                  We are excited to announce the launch of our new online
                  payment feature, EduPay. Designed...
                </p>
                <div className="flex justify-between text-gray-500 border-t-2 border-slate-300 mt-8 pt-2">
                  <span>Aug 4, 2024</span>
                  <span>8m Read</span>
                </div>
              </div>
            </div>
            </Link>
            {/* card 3 */}
            <Link to="blog/admission">
            <div className="w-full p-4 hover:translate-y-[-5px] transition-transform duration-300 my-4 bg-white rounded-4xl border-2 border-slate-300 cursor-pointer">
              {/* Image Container */}
              <div className="relative w-full pb-[56.25%]">
                <img
                  src={img3}
                  alt="Offline Scanning"
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
                />
              </div>
              {/* Content */}
              <div className="p-4">
                <span className="bg-[#fff3e0] text-gray-800 px-4 py-2 rounded-full text-sm mb-2 inline-block border-2 border-[#ff9800]">
                  <p className="font-semibold text-[#ff9800]">Announcement</p>
                </span>
                <h2 className="text-lg mb-2">
                  Streamline Student Enrollments with Our New Online Admission
                  Add-on
                </h2>
                <p className="text-gray-600 mb-4">
                  We are thrilled to announce the launch of our new Online
                  Admission feature, designed to...
                </p>
                <div className="flex justify-between text-gray-500 border-t-2 border-slate-300 mt-8 pt-2">
                  <span>Jul 29, 2024</span>
                  <span>5m Read</span>
                </div>
              </div>
            </div>
            </Link>
          </div>

          {/* case studies */}
          <div className="mx-auto mt-[10rem] flex flex-col">
            <h1 className="text-4xl font-bold my-6">Case Studies</h1>
            <div className="flex items-center px-10 py-[4rem] bg-white rounded-3xl">
              <div className="w-1/4 mr-8">
                <img
                  src={img4}
                  alt="Edbase Logo"
                  className="w-full rounded-full"
                />
              </div>
              <div className="w-3/4">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                  Modernizing & Scaling The Operation of Edbase
                </h1>
                <p className="text-gray-600 mb-6">
                  Edbase, a leading after-school education institute with 2,100+
                  active students, 20+ teachers, and numerous stakeholders,
                  needed a comprehensive set of innovative solutions to
                  seamlessly transition from slow manual processes to a modern
                  digital platform
                </p>
                <Link to="/casestudy">
                <button className="text-blue-600 border-2 border-blue-600 hover:translate-y-[-5px] transition-transform duration-300 hover:shadow-xl hover:shadow-blue-200 rounded-full text-xl p-4">
                  <p className="relative top-[0.64vh]">View Detailed Case Study</p>
                </button>
                </Link>
              </div>
            </div>
          </div>

          {/* start */}
          <div className="mx-auto mt-[10rem] flex flex-col relative z-10">
            <div className="flex items-center px-10 py-[4rem] gap-[6vw] bg-blue-600 rounded-3xl">
              <div className="">
                <h1 className="text-4xl text-white text-nowrap">
                  Give your classroom the upgrade it deserves
                </h1>
              </div>
              <div className="">
                <Link to="/login">
                <button className="text-blue-600 px-[5vw] cursor-pointer py-4 rounded-4xl bg-white text-xl">
                  <p className="relative top-[0.64vh]">Start For Free</p>
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsCase;
