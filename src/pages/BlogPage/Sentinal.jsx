import { BiLinkAlt } from "react-icons/bi";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import the CSS
import { Link } from "react-router";
import { MdOutlineDateRange } from "react-icons/md";
import { GoClock } from "react-icons/go";
import { RiChat2Fill } from "react-icons/ri";
import img1 from "../../assets/nb/1.png";
import img2 from "../../assets/nb/2.png";
import img3 from "../../assets/nb/3.png";
import img5 from "../../assets/nb/5.png";
import img6 from "../../assets/nb/6.png";

const Sentinal = () => {
  const [copied, setCopied] = useState(false); //  still useful for visual feedback *next to the icon*.
  
    const copyLink = () => {
      const currentURL = window.location.href;
  
      navigator.clipboard
        .writeText(currentURL)
        .then(() => {
          setCopied(true); // Keep for the inline "Copied!" message
          setTimeout(() => setCopied(false), 2000);
  
          // Show a toast notification
          toast.success("Link copied to clipboard!", {
            position: "top-center", // Or any other position you prefer
            autoClose: 3000, // Close after 3 seconds (adjust as needed)
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
          // Show an error toast
          toast.error("Failed to copy link!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    };
  return (
    <>
      <ToastContainer /> {/* Add the ToastContainer at the top level */}
      <section className="w-6/12 mx-auto p-6 border-2 border-[#e8e8e8] rounded-lg my-[10vh]">
        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl">
              Introducing Sentinel: Revolutionizing Attendance Automation for
              Education and Beyond
            </h1>
            <button
              onClick={copyLink}
              className="ml-2 p-[0.3rem] bg-[#fafafa] rounded-full focus:outline-none relative bottom-[1vh]"
              title="Copy Link"
            >
              <BiLinkAlt className="text-lg text-[#545454]" />
            </button>
          </div>
        </div>

        <div className="flex flex-1 gap-2 items-center">
          <div>
            <button className="bg-[#fffbe6] px-4 py-1 rounded-md border-2 border-[#ffe58f] text-[#d48806]">
              <p className="relative text-xs top-[0.5vh]">
                Product Announcement
              </p>
            </button>
          </div>

          <div className="flex items-center gap-4 px-4 border-l-2 border-r-2 border-[#f0f0f0]">
            <span className="text-[#545454]">
              <MdOutlineDateRange />
            </span>
            <span className="relative top-[0.5vh] text-[#6b7280]">
              January 1, 2024
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className=" text-[#6b7280]">
              <GoClock />
            </span>
            <span className="relative top-[0.5vh] text-[#6b7280]">5m Read</span>
          </div>
        </div>

        <div>
          <img src={img6} alt="" className="mt-6" />

          <p className="text-[#6b7280] font-semibold mt-[8vh]">
            We are thrilled to announce the launch of our latest innovation,
            Sentinel—a cutting-edge attendance automation system designed to
            streamline and enhance the attendance tracking process in
            educational institutions and businesses alike.
          </p>

          <p className="text-3xl my-[10vh] text-[#535353]">What is Sentinel?</p>

          <p className="text-[#6b7280] font-semibold">
            Sentinel is a state-of-the-art attendance automation system that
            leverages advanced technology to ensure accurate and efficient
            attendance tracking. Our system offers three versatile methods for
            recording attendance:
          </p>

          <ul className="list-inside pl-5 my-6 leading-[1.3]">
            {/* Use a custom marker with a span */}
            <li className="flex text-[#6b7280]">
              <span className="inline-block h-[0.8vh] w-[0.46vw] rounded-full border border-gray-700 mt-1.5 mr-2"></span>
              <p className="font-semibold">
                <span className="font-normal mr-2">Face-Scans:</span>
                Utilizing the latest facial recognition technology, Sentinel
                ensures swift and secure attendance marking with just a glance.
              </p>
            </li>
            <li className="flex text-[#6b7280]">
              <span className="inline-block h-[0.8vh] w-[0.56vw] rounded-full border border-gray-700 mt-1.5 mr-2"></span>
              <p className="font-semibold">
                <span className="font-normal mr-2">QR Code Scans:</span>
                Each individual is assigned a unique QR code, which can be
                scanned quickly and easily to record attendance.
              </p>
            </li>
            <li className="flex text-[#6b7280]">
              <span className="inline-block h-[0.8vh] w-[0.56vw] rounded-full border border-gray-700 mt-1.5 mr-2"></span>
              <p className="font-semibold">
                <span className="font-normal mr-2">NFC Card Scans:</span>
                For those who prefer a traditional method, NFC cards provide a
                reliable and straightforward way to mark attendance.
              </p>
            </li>
          </ul>

          <h1 className="text-2xl mt-[10vh] text-[#535353]">Key Features</h1>

          <div className="mt-[5vh]">
            <p className="text-[#6b7280]">1. Versatility:</p>
            <p className="text-[#6b7280] mt-2 font-semibold">
              Sentinel is primarily designed for the education market, making
              student attendance tracking hassle-free. However, its flexible
              design allows it to be seamlessly integrated into any business
              environment, catering to a variety of attendance tracking needs.
            </p>
          </div>

          <div className="my-[5vh]">
            <p className="text-[#6b7280]">2. Affordability:</p>
            <p className="text-[#6b7280] mt-2 font-semibold">
              We believe that cutting-edge technology should be accessible to
              all. Sentinel is priced affordably, ensuring that educational
              institutions and businesses of all sizes can benefit from our
              advanced system without straining their budgets.
            </p>
          </div>

          <div className="my-[5vh]">
            <p className="text-[#6b7280]">3. Ease of Use:</p>
            <p className="text-[#6b7280] mt-2 font-semibold">
              User experience is at the forefront of Sentinel's design. Our
              intuitive interface ensures that both administrators and users can
              adopt and use the system with minimal training. The setup process
              is straightforward, and the system integrates smoothly with
              existing infrastructure.
            </p>
          </div>

          <div className="my-[5vh]">
            <p className="text-[#6b7280]">4. Enhanced Security:</p>
            <p className="text-[#6b7280] mt-2 font-semibold">
              Security is a top priority with Sentinel. Our facial recognition
              technology and encrypted QR codes ensure that attendance data is
              protected from unauthorized access, providing peace of mind to
              administrators and users alike.
            </p>
          </div>

          <h1 className="text-4xl mt-[10vh] text-[#535353]">
            Why Choose Sentinel?
          </h1>

          <p className="text-[#535757] my-[6vh]">
            For Educational Institutions:
          </p>

          <ul className="list-inside pl-5 my-6 leading-[1.3]">
            {/* Use a custom marker with a span */}
            <li className="flex text-[#6b7280]">
              <span className="inline-block h-[0.8vh] w-[0.36vw] rounded-full border border-gray-700 mt-1.5 mr-2"></span>
              <p className="font-semibold">
                <span className="font-normal mr-2">Improved Accuracy:</span>
                Eliminate manual errors and ensure accurate attendance records.
              </p>
            </li>
            <li className="flex text-[#6b7280]">
              <span className="inline-block h-[0.8vh] w-[0.36vw] rounded-full border border-gray-700 mt-1.5 mr-2"></span>
              <p className="font-semibold">
                <span className="font-normal mr-2">Time-Saving:</span>
                Automate the attendance process, freeing up valuable time for
                educators.
              </p>
            </li>
            <li className="flex text-[#6b7280]">
              <span className="inline-block h-[0.8vh] w-[0.5vw] rounded-full border border-gray-700 mt-1.5 mr-2"></span>
              <p className="font-semibold">
                <span className="font-normal mr-2">Enhanced Engagement: </span>
                Modernize your institution with cutting-edge technology that
                resonates with tech-savvy students.
              </p>
            </li>
          </ul>

          <p className="text-[#535757] my-[6vh]">For Businesses:</p>

          <ul className="list-inside pl-5 my-6 leading-[1.3]">
            {/* Use a custom marker with a span */}
            <li className="flex text-[#6b7280]">
              <span className="inline-block h-[0.8vh] w-[0.38vw] rounded-full border border-gray-700 mt-1.5 mr-2"></span>
              <p className="font-semibold">
                <span className="font-normal mr-2">
                  Streamlined Operations:{" "}
                </span>
                Simplify attendance tracking for employees, visitors, and
                contractors.
              </p>
            </li>
            <li className="flex text-[#6b7280]">
              <span className="inline-block h-[0.8vh] w-[0.36vw] rounded-full border border-gray-700 mt-1.5 mr-2"></span>
              <p className="font-semibold">
                <span className="font-normal mr-2">Increased Efficiency: </span>
                Reduce administrative workload and improve overall productivity.
              </p>
            </li>
            <li className="flex text-[#6b7280]">
              <span className="inline-block h-[0.8vh] w-[0.4vw] rounded-full border border-gray-700 mt-1.5 mr-2"></span>
              <p className="font-semibold">
                <span className="font-normal mr-2">Scalability: </span>
                Whether you are a small business or a large enterprise, Sentinel
                scales to meet your needs.
              </p>
            </li>
          </ul>

          <h1 className="text-3xl mt-[10vh] text-[#535353]">
            Join the Future of Attendance Tracking
          </h1>

          <p className="text-[#6b7280] my-[6vh] font-semibold">
            Sentinel is more than just an attendance system; it’s a step towards
            a smarter, more efficient future. Say goodbye to outdated, manual
            attendance processes and embrace the ease and accuracy of Sentinel.
          </p>

          <p className="text-[#6b7280] my-[6vh] font-semibold">
            We invite you to experience the future of attendance automation. For
            more information, demos, and pricing details, visit our website or
            contact our sales team today.
          </p>

          <p className="text-[#535757] text-sm my-[6vh]">
            Stay ahead with Sentinel—where innovation meets simplicity.
          </p>

          <p className="border-2 border-dashed border-[#535353] w-10/12" />

          <p className="text-[#6b7280] my-[6vh] font-semibold">
            Ready to transform your attendance tracking? Explore Sentinel now
            and see the difference it can make for your institution or business.
          </p>

          <p className="text-[#6b7280] font-semibold">Written by Author M. Ekram</p>
        </div>
      </section>
      <section>
        <div className="w-10/12 mx-auto">
          <div className="grid grid-cols-3 gap-8">
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
                    Presenting new global search feature and student tagging.
                    Now you can easily create your own...
                  </p>
                  <div className="flex justify-between text-gray-500 border-t-2 border-slate-300 mt-8 pt-2">
                    <span>Jul 1, 2024</span>
                    <span>2m Read</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
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

export default Sentinal;