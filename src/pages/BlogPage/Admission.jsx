import { Link } from "react-router-dom";
import img1 from "../../assets/nb/1.png";
import img2 from "../../assets/nb/2.png";
import img3 from "../../assets/nb/3.png";
import img5 from "../../assets/nb/5.png";
import img6 from "../../assets/nb/6.png";
import { BiLinkAlt } from "react-icons/bi";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import the CSS
import { MdOutlineDateRange } from "react-icons/md";
import { GoClock } from "react-icons/go";
import sharelink from "../../assets/sharelink.png";
import submission from "../../assets/1722261339973-Quill-picture-news.png";
import acceptpayment from "../../assets/1722261358338-Quill-picture-news.png";
import completepayment from "../../assets/1722261375449-Quill-picture-news.png";
import { RiChat2Fill } from "react-icons/ri";

const Admission = () => {
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
          <div className="flex items-center">
            <h1 className="text-3xl">
              Streamline Student Enrollments with Our New Online Admission
              Add-on
            </h1>
            <button
              onClick={copyLink}
              className="ml-2 p-[0.3rem] bg-[#fafafa] rounded-full focus:outline-none relative bottom-[3vh]"
              title="Copy Link"
            >
              <BiLinkAlt className="text-lg text-[#545454]" />
            </button>
          </div>
          <div className="flex flex-1 gap-2 items-center">
            <div>
              <button className="bg-[#fffbe6] px-4 py-1 rounded-md border-2 border-[#ffe58f] text-[#d48806]">
                <p className="relative top-[0.5vh]">Product Announcement</p>
              </button>
            </div>

            <div className="flex items-center gap-4 px-4 border-l-2 border-r-2 border-[#f0f0f0]">
              <span className="text-[#545454]">
                <MdOutlineDateRange />
              </span>
              <span className="relative top-[0.5vh] text-[#6b7280]">
                July 29, 2024
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className=" text-[#6b7280]">
                <GoClock />
              </span>
              <span className="relative top-[0.5vh] text-[#6b7280]">
                5m Read
              </span>
            </div>
          </div>
        </div>

        <div>
          <img src={img3} alt="" className="my-6 rounded-md" />
        </div>

        <div>
          <p className="text-[#6b7280] my-10">
            We are thrilled to announce the launch of our new Online Admission
            feature, designed to streamline the student admission process for
            teachers and educational institutions. This new tool simplifies
            everything from information collection to payment, making admissions
            more efficient and user-friendly. Here’s a comprehensive guide on
            how to use this exciting new feature:
          </p>

          <div>
            <div>
              <h1 className="text-3xl my-6 text-[#535353]">
                Step-by-Step Guide to Using the Online Admission Feature
              </h1>
              <h1 className="text-3xl my-6 text-[#535353]">
                Step 1: Share the Admission Link
              </h1>
            </div>

            <div>
              <img src={sharelink} alt="" />
              <p className="text-[#6b7280] my-10">
                The first step in the online admission process is to share the
                admission link with potential students and guardians. This link
                can be easily generated and distributed through email, social
                media, or any other communication platform.
              </p>
            </div>
          </div>

          <div className="my-20">
            <h1 className="text-3xl mb-2 text-[#535353]">
              Step 2: Review Submissions
            </h1>

            <div>
              <img src={submission} alt="" className="my-4" />
              <p className="text-[#6b7280] text-justify">
                Once the admission forms are submitted, teachers can review each
                submission. This step is crucial for ensuring that all required
                information is provided and free from errors. The form includes
                all necessary details that the student or guardian needs to fill
                out, including personal information, previous academic records,
                and any additional information required by the institution.
              </p>
            </div>
          </div>

          <div className="my-20">
            <h1 className="text-3xl mb-2 text-[#535353]">
              Step 3: Accept for Payment
            </h1>

            <div>
              <img src={acceptpayment} alt="" />
              <p className="text-[#6b7280] font-semibold mt-6">
                After reviewing the submissions, teachers can proceed to accept
                the application for payment. Here’s how it works:
              </p>
              <ul className="list-inside pl-5 my-6 leading-[1.3]">
                {/* Use a custom marker with a span */}
                <li className="flex text-[#6b7280]">
                  <span className="inline-block h-[0.8vh] w-[0.46vw] rounded-full border border-gray-700 mt-1.5 mr-2"></span>
                  <p className="font-semibold">
                    <span className="font-normal mr-2">
                      Assign a Classroom:
                    </span>
                    Based on the provided information, the teacher assigns the
                    student to the appropriate classroom.
                  </p>
                </li>
                <li className="flex text-[#6b7280]">
                  <span className="inline-block h-[0.8vh] w-[0.56vw] rounded-full border border-gray-700 mt-1.5 mr-2"></span>
                  <p className="font-semibold">
                    <span className="font-normal mr-2">
                      Select Payment Options:
                    </span>
                    The teacher selects one or more payment options, including
                    any special one-time fees or tuition fees for one or more
                    months.
                  </p>
                </li>
                <li className="flex text-[#6b7280]">
                  <span className="inline-block h-[0.8vh] w-[0.56vw] rounded-full border border-gray-700 mt-1.5 mr-2"></span>
                  <p className="font-semibold">
                    <span className="font-normal mr-2">Send Payment Link:</span>
                    By pressing "accept for payment," an SMS is sent to the
                    student or guardian's phone with a congratulatory message
                    and an online payment link.
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div className="my-20">
            <h1 className="text-3xl text-[#535353]">
              Final Step: Completing the Payment and Enrollment
            </h1>

            <img src={completepayment} alt="" className="my-2" />

            <div>
              <p className="text-[#6b7280] font-semibold my-2">
                Once the student or guardian receives the SMS, they can click on
                the payment link to complete the pre-selected payments. After
                the payment is successfully processed, the student is
                automatically enrolled in the designated classroom.
                Additionally, the student or guardian is redirected to their
                student account, which is automatically logged in for immediate
                access to their academic information.
              </p>

              <p className="text-[#535353] text-4xl my-[15vh]">
                Benefits of the Online Admission Feature
              </p>

              <ul className="list-inside pl-5 my-6 leading-[1.3]">
                {/* Use a custom marker with a span */}
                <li className="flex text-[#6b7280]">
                  <span className="inline-block h-[0.8vh] w-[0.46vw] rounded-full border border-gray-700 mt-1.5 mr-2"></span>
                  <p className="font-semibold">
                    <span className="font-normal mr-2">Efficiency:</span>
                    Simplifies the admission process into three easy steps,
                    saving time for both teachers and students.
                  </p>
                </li>
                <li className="flex text-[#6b7280]">
                  <span className="inline-block h-[0.8vh] w-[0.36vw] rounded-full border border-gray-700 mt-1.5 mr-2"></span>
                  <p className="font-semibold">
                    <span className="font-normal mr-2">Accuracy:</span>
                    Allows for careful review of submitted information to
                    minimize errors.
                  </p>
                </li>
                <li className="flex text-[#6b7280]">
                  <span className="inline-block h-[0.8vh] w-[0.46vw] rounded-full border border-gray-700 mt-1.5 mr-2"></span>
                  <p className="font-semibold">
                    <span className="font-normal mr-2">Convenience:</span>
                    Enables online payment and automatic enrollment, making the
                    process seamless and hassle-free.
                  </p>
                </li>
                <li className="flex text-[#6b7280]">
                  <span className="inline-block h-[0.8vh] w-[0.36vw] rounded-full border border-gray-700 mt-1.5 mr-2"></span>
                  <p className="font-semibold">
                    <span className="font-normal mr-2">Communication:</span>
                    Keeps students and guardians informed with timely SMS
                    notifications.
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {/* end speech */}
          <div className="my-20">
            <div>
              <p className="text-[#6b7280] font-semibold">
                We are confident that this new feature will greatly enhance the
                admission process, making it more efficient and user-friendly.
                We encourage all teachers and educational institutions to take
                full advantage of the Online Admission feature to streamline
                their enrollment process.
              </p>
              <p className="text-[#6b7280] font-semibold my-[10vh]">
                For further information or support, please feel free to call our
                helpline or send us a message over live chat on our website.
              </p>
              <p className="text-[#6b7280] font-semibold relative top-[5vh]">
                Written by Author Salamun Kawlam
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-10/12 mx-auto">
        <div>
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
            {/* card 4 */}
            <Link to="/blog/tag" target="_blank">
              <div className="w-full p-4 h-[74vh] hover:translate-y-[-5px] transition-transform duration-300 my-4 bg-white rounded-4xl border-2 border-slate-300 cursor-pointer">
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
          <p className="fixed right-[0.6vw] top-[34rem] bg-blue-500 p-[10px] w-[4vw] h-[8.6vh] z-10 rounded-full">
          <RiChat2Fill className="text-white text-4xl -rotate-[9deg] relative top-[0.4vh] left-[0.3vw]" />
          </p>
        </div>
      </section>
    </>
  );
};

export default Admission;