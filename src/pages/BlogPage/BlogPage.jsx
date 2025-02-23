import { Link } from "react-router";
import img1 from "../../assets/nb/1.png";
import img2 from "../../assets/nb/2.png";
import img3 from "../../assets/nb/3.png";
import img5 from "../../assets/nb/5.png";
import img6 from "../../assets/nb/6.png";
import { RiChat2Fill } from "react-icons/ri";
import { Input } from 'antd';

const BlogPage = () => {
  return (
    <>
      <section className="h-[170vh] w-10/12 mx-auto">
        <div className="flex items-center justify-between my-20">
          <h1 className="text-4xl font-bold">Latest News & Updates</h1>
          <span className="w-[26vw]">
          <Input placeholder="Basic usage" 
          className="p-4 border-2 border-slate-300 hover:border-slate-500 focus:border-sky-500 focus:outline focus:outline-sky-500 rounded-lg" />
          </span>
        </div>
        {/* Cards */}
        <div>
          <div className="grid grid-cols-3 gap-4">
            {/* card 1 */}
            <Link to="/blog/rfid" target="_blank">
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
                <h2 className="text-lg font-semibold mb-2">
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
            <Link to="/blog/edupay" target="_blank">
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
                <h2 className="text-lg font-semibold mb-2">
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
            <Link to="/blog/admission" target="_blank">
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
                <h2 className="text-lg font-semibold mb-2">
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
            {/* card 4 */}
            <Link to="/blog/tag" target="_blank">
            <div className="w-full p-4 hover:translate-y-[-5px] transition-transform duration-300 my-4 bg-white rounded-4xl border-2 border-slate-300 cursor-pointer">
              {/* Image Container */}
              <div className="relative w-full pb-[56.25%]">
                <img
                  src={img5}
                  alt="Offline Scanning"
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
                />
              </div>
              {/* Content */}
              <div className="p-4">
                <span className="bg-[#fff3e0] text-gray-800 px-4 py-2 rounded-full text-sm mb-2 inline-block border-2 border-[#ff9800]">
                  <p className="font-semibold text-[#ff9800]">Announcement</p>
                </span>
                <h2 className="text-lg font-semibold mb-2">
                  Global Student Tagging
                </h2>
                <p className="text-gray-600 mb-4">
                  Presenting new global search feature and student tagging. Now
                  you can easily create your own...
                </p>
                <div className="flex justify-between text-gray-500 border-t-2 border-slate-300 mt-[8.8vh] pt-2">
                  <span>Jul 1, 2024</span>
                  <span>2m Read</span>
                </div>
              </div>
            </div>
            </Link>
            {/* card 5 */}
            <Link to="/blog/sentinal-blog" target="_blank">
            <div className="w-full p-4 hover:translate-y-[-5px] transition-transform duration-300 my-4 bg-white rounded-4xl border-2 border-slate-300 cursor-pointer">
              {/* Image Container */}
              <div className="relative w-full pb-[56.25%]">
                <img
                  src={img6}
                  alt="Offline Scanning"
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
                />
              </div>
              {/* Content */}
              <div className="p-4">
                <span className="bg-[#fff3e0] text-gray-800 px-4 py-2 rounded-full text-sm mb-2 inline-block border-2 border-[#ff9800]">
                  <p className="font-semibold text-[#ff9800]">Announcement</p>
                </span>
                <h2 className="text-lg font-semibold mb-2">
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
        </div>

        <div>
          <span className="w-1/12 relative bottom-[4vh] text-nowrap p-2 rounded-md mx-auto flex justify-center mt-10 border-2 border-gray-400">Load More</span>
        </div>

        <div>
          <p className="fixed right-[0.6vw] top-[34rem] bg-blue-500 p-[10px] w-[4vw] h-[8.6vh] z-10 rounded-full">
          <RiChat2Fill className="text-white text-4xl -rotate-[9deg] relative top-[0.4vh] left-[0.3vw]" />
          </p>
        </div>
      </section>
    </>
  );
};

export default BlogPage;