import { BiLinkAlt } from "react-icons/bi";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import the CSS
import { Link } from "react-router";
import { RiChat2Fill } from "react-icons/ri";
import img1 from "../../assets/nb/1.png";
import img2 from "../../assets/nb/2.png";
import img3 from "../../assets/nb/3.png";
import img5 from "../../assets/nb/5.png";
import img6 from "../../assets/nb/6.png";
import { MdOutlineDateRange } from "react-icons/md";
import { GoClock } from "react-icons/go";
import student from "../../assets/1720685576716-Quill-picture-news.png";
import profile from "../../assets/1720685744649-Quill-picture-news.png";
import tag from "../../assets/1720685822061-Quill-picture-news.png";
import tagdetail from "../../assets/1720685866933-Quill-picture-news.png";
import tagprofile from "../../assets/1720686012438-Quill-picture-news.png";
import findtag from "../../assets/1720686093492-Quill-picture-news.png";

const Tagging = () => {
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
            <h1 className="text-3xl">Global Student Tagging</h1>
            <button
              onClick={copyLink}
              className="ml-2 p-[0.3rem] bg-[#fafafa] rounded-full focus:outline-none relative bottom-[1vh]"
              title="Copy Link"
            >
              <BiLinkAlt className="text-lg text-[#545454]" />
            </button>
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
                July 1, 2024
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className=" text-[#6b7280]">
                <GoClock />
              </span>
              <span className="relative top-[0.5vh] text-[#6b7280]">
                2m Read
              </span>
            </div>
          </div>

          <div>
            <img src={img5} alt="" className="my-6 rounded-md" />

            <p className="font-semibold text-[#6b7280]">
              Presenting new global search feature and student tagging. Now you
              can easily create your own custom tags for your students and
              organise and manage them accordingly.
            </p>

            <p className="font-semibold text-[#6b7280] my-[10vh]">
              How to use this amazing new feature? Here's a couple of steps and
              highlights. But first a sneak-peak of what it looks like:
            </p>
          </div>

          <div className="mt-[10vh]">
            <p className="text-[#535353]">Sneak Peak:</p>
            <img src={student} alt="" />
          </div>

          <div className="text-[#535353]">
            <p className="underline my-[10vh]">STEPS ON HOW TO DO THIS:</p>
            <p className="mb-2">
              Step 1: Click on a student profile and click on Add Tags Button
            </p>
            <img src={profile} alt="" />

            <p className="mt-8 mb-2">
              Step 2: From this popup pick your tag to add. You can pick the
              color of tag as well
            </p>
            <img src={tag} alt="" />

            <p className="mt-[10vh] mb-2">
              Step 3: When selecting tag name, you can see your previous added
              tags and even add new tags for future use
            </p>
            <img src={tagdetail} alt="" />
            <p className="mt-[10vh] mb-2">
              Step 4: Your tags are now added and implemented for this student.
              You can click on the cross beside a tag to remove them as well.
            </p>
            <img src={tagprofile} alt="" />
            <p className="mt-[10vh] mb-2">
              Step 5: Final Step! You can now use both local and global search
              fields to instantly access this student by their tags.
            </p>
            <img src={findtag} alt="" />
            <p className="my-[10vh] font-semibold text-[#6b7280]">
              We hope this new student tagging feature will be helpful for you
              and enable you to customise your business management exactly the
              way you want it. For suggestions / help please contact us through
              the chat-box on your bottom-left.
            </p>
            <p className="my-[10vh] font-semibold text-[#6b7280]">
              Thank you for sticking with Edutechs!
            </p>
            <p className="text-[#6b7280] font-semibold">
              Written by Author M. Ekram
            </p>
          </div>
        </div>
      </section>
      <section className="w-10/12 mx-auto">
        <div className="grid grid-cols-3 gap-10">
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

        <div>
          <p className="fixed right-[0.6vw] top-[34rem] bg-blue-500 p-[10px] w-[4vw] h-[8.6vh] z-10 rounded-full">
          <RiChat2Fill className="text-white text-4xl -rotate-[9deg] relative top-[0.4vh] left-[0.3vw]" />
          </p>
        </div>
      </section>
    </>
  );
};

export default Tagging;