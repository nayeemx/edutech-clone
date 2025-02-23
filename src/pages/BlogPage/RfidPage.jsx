import { Link } from "react-router-dom";
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
import rfidlg from "../../assets/sentinal/sentiblog.png";
import { RiChat2Fill } from "react-icons/ri";

const RfidPage = () => {
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
      <section className="w-7/12 mx-auto p-6 border-2 border-[#e8e8e8] rounded-lg my-[10vh]">
        <div>
          <div className="flex items-center">
            <h1 className="text-3xl">
              Adding Offline Scanning Support for Sentinel RFID Scanners
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
                <p className="relative top-[0.5vh]">Product Upgrade</p>
              </button>
            </div>

            <div className="flex items-center gap-4 px-4 border-l-2 border-r-2 border-[#f0f0f0]">
              <span className="text-[#545454]">
                <MdOutlineDateRange />
              </span>
              <span className="relative top-[0.5vh] text-[#6b7280]">
                December 15, 2024
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className=" text-[#6b7280]">
                <GoClock />
              </span>
              <span className="relative top-[0.5vh] text-[#6b7280]">
                7m Read
              </span>
            </div>
          </div>
        </div>

        <div>
          <img src={rfidlg} alt="" className="my-6 rounded-md" />
        </div>

        <div>
          <p className="text-[#6b7280]">
            When we set out to develop our Sentinel RFID Scanners, our goal was
            to provide institutions with a seamless, reliable, and smart
            attendance management solution. Over time, we learned that true
            reliability doesn’t just mean working when everything is perfect—it
            means adapting to the inevitable challenges of the real world, like
            unstable internet connections and power interruptions. Today, we’re
            sharing the journey of how we added robust offline scanning support
            to Sentinel RFID Scanners and solved the challenges faced by our
            users.
          </p>

          {/* step 1 */}
          <div>
            <h1 className="text-3xl my-6 text-[#535353]">
              Step 1: Initial System <span>-</span> Fully Dependent on Internet
            </h1>

            <div>
              <p className="text-[#6b7280]">
                In the earliest version of our system, the Sentinel RFID
                Scanners were fully dependent on an active internet connection
                to function.
              </p>
              <ul className="list-inside pl-5 space-y-2 my-4">
                {/* Use a custom marker with a span */}
                <li className="flex text-[#6b7280]">
                  <span className="inline-block h-1.5 w-1.5 rounded-full border border-gray-700 mr-2"></span>
                  If the internet was unavailable, users couldn’t scan their
                  cards.
                </li>
                <li className="flex text-[#6b7280]">
                  <span className="inline-block h-1.5 w-1.5 rounded-full border border-gray-700 mr-2"></span>
                  If the scanner failed to connect to the cloud due to a network
                  issue, the system would throw an error, and users would have
                  to scan again.
                </li>
              </ul>
              <p className="text-[#6b7280] w-[80%]">
                It became clear that the system needed to support offline
                functionality to provide a seamless user experience.
              </p>
            </div>
          </div>
          {/* step 2 */}
          <div className="my-20">
            <h1 className="text-3xl my-6 text-[#535353]">
              Step 2: Introducing Offline Scanning via RAM Buffer
            </h1>

            <div>
              <p className="text-[#6b7280]">
                To address the issue, we introduced a RAM buffer to temporarily
                store scanned card UIDs when the internet was unavailable.
              </p>
              <ul className="list-inside pl-5 space-y-2 my-4">
                {/* Use a custom marker with a span */}
                <li className="flex text-[#6b7280]">
                  <span className="inline-block h-1.5 w-1.5 rounded-full border border-gray-700 mr-2"></span>
                  Scans were now saved to the buffer, allowing users to continue
                  scanning even without an internet connection.
                </li>
                <li className="flex text-[#6b7280]">
                  <span className="inline-block h-1.5 w-1.5 rounded-full border border-gray-700 mr-2"></span>
                  If connection to the cloud failed, the system could retry
                  using the saved data instead of requiring users to scan again.
                </li>
              </ul>
              <p className="text-[#6b7280]">
                This marked a significant improvement, but there was still a
                limitation. Since the buffer used volatile RAM, any power loss
                or device restart would erase the stored data, leading to
                potential data loss.
              </p>
            </div>
          </div>
          {/* step 3 */}
          <div className="my-20">
            <h1 className="text-3xl my-6 text-[#535353]">
              Step 3: Moving the Buffer to System Flash
            </h1>

            <div>
              <p className="text-[#6b7280]">
                To prevent data loss during power outages, we moved the buffer
                from volatile RAM to the device’s system flash memory.
              </p>
              <ul className="list-inside pl-5 space-y-2 my-4">
                {/* Use a custom marker with a span */}
                <li className="flex text-[#6b7280]">
                  <span className="inline-block h-1.5 w-1.5 rounded-full border border-gray-700 mr-2"></span>
                  This change ensured that scanned card data were retained even
                  if the device lost power or was restarted.
                </li>
                <li className="flex text-[#6b7280]">
                  <span className="inline-block h-1.5 w-1.5 rounded-full border border-gray-700 mr-2"></span>
                  Users could confidently scan cards without worrying about
                  losing data.
                </li>
              </ul>
              <p className="text-[#6b7280]">
                However, there was still one major drawback: the system did not
                save the exact scan time. Instead, when the device reconnected
                to the internet and posted the data to the cloud, the upload
                time was used as the scan time. This caused inaccuracies in
                attendance records.
              </p>
            </div>
          </div>
          {/* step 4 */}
          <div className="my-20">
            <h1 className="text-3xl my-6 text-[#535353]">
              Step 4: Adding Timestamps to Scans
            </h1>

            <div>
              <p className="text-[#6b7280]">
                To address the issue of scan time inaccuracies, we upgraded the
                system to record timestamps for each scan.
              </p>
              <ul className="list-inside pl-5 space-y-2 my-4">
                {/* Use a custom marker with a span */}
                <li className="flex text-[#6b7280]">
                  <span className="inline-block h-1.5 w-1.5 rounded-full border border-gray-700 mr-2"></span>
                  When the device was powered on, the system synced time from
                  internet.
                </li>
                <li className="flex text-[#6b7280]">
                  <span className="inline-block h-1.5 w-1.5 rounded-full border border-gray-700 mr-2"></span>
                  The scanned card data and the corresponding timestamp were
                  saved to the flash buffer.
                </li>
              </ul>
              <p className="text-[#6b7280]">
                This eliminated concerns about incorrect timestamps and ensured
                that scans were recorded with accurate times, even when uploaded
                to the server later.
              </p>
              <p className="text-[#6b7280] mt-4">
                However, the system still had a limitation: if the device booted
                without an active internet connection, it couldn’t sync time,
                resulting in scans being saved without a timestamp.
              </p>
            </div>
          </div>
          {/* step 5 */}
          <div className="my-20">
            <h1 className="text-3xl my-6 text-[#535353]">
              Step 5: Adding an RTC Module for Complete Offline Functionality
            </h1>

            <div>
              <p className="text-[#6b7280]">
                To solve the time-sync issue once and for all, we integrated a
                Real-Time Clock (RTC) module into the Sentinel RFID Scanners.
              </p>
              <ul className="list-inside pl-5 space-y-2 my-4">
                {/* Use a custom marker with a span */}
                <li className="flex text-[#6b7280]">
                  <span className="inline-block h-1.5 w-1.5 rounded-full border border-gray-700 mr-2"></span>
                  The RTC module comes with its own internal battery, allowing
                  it to keep time independently, even during power outages or
                  device restarts.
                </li>
                <li className="flex text-[#6b7280]">
                  <span className="inline-block h-1.5 w-1.5 rounded-full border border-gray-700 mr-2"></span>
                  The device no longer requires an active internet connection at
                  boot to sync time.
                </li>
              </ul>
              <p className="text-[#6b7280]">
                This upgrade completed the offline scanning functionality,
                ensuring that all scans are saved with accurate timestamps,
                regardless of internet connectivity or power status.
              </p>
            </div>
          </div>

          {/* end speech */}
          <div className="my-20">
            <h1 className="text-3xl my-6 text-[#535353]">
              The Result: Reliable Offline Scanning
            </h1>

            <div>
              <p className="text-[#6b7280]">
                With these progressive enhancements, Sentinel RFID Scanners now
                provide:
              </p>
              <ul className="list-inside pl-5 space-y-2 my-4">
                {/* Use a custom marker with a span */}
                <li className="flex text-[#6b7280]">
                  <span className="inline-block h-1.5 w-1.5 rounded-full border border-gray-700 mr-2"></span>
                  Accurate Timestamps: Every scan is recorded with the correct
                  time, whether online or offline.
                </li>
                <li className="flex text-[#6b7280]">
                  <span className="inline-block h-1.5 w-1.5 rounded-full border border-gray-700 mr-2"></span>
                  Persistent Data Storage: Scan data and timestamps are securely
                  stored, even during power outages or restarts.
                </li>
                <li className="flex text-[#6b7280]">
                  <span className="inline-block h-1.5 w-1.5 rounded-full border border-gray-700 mr-2"></span>
                  Uninterrupted Scanning: Users can confidently scan cards
                  without worrying about internet availability.
                </li>
              </ul>
              <p className="text-[#6b7280]">
                By combining cutting-edge hardware with thoughtful software
                improvements, we’ve ensured that Sentinel RFID Scanners meet the
                needs of modern institutions—providing both reliability and ease
                of use in any environment.
              </p>
              <p className="text-[#6b7280] mt-[10vh]">
                At Edutechs, we’re committed to solving real-world problems
                through continuous iterations. This journey highlights how we
                continually listen to user feedback and refine our products to
                create solutions that truly make a difference.
              </p>
              <p className="text-[#6b7280] my-4">
                If you’d like to learn more about our scanners or explore how
                they can improve your institution’s attendance management, feel
                free to reach out to us anytime.
              </p>
              <p className="text-[#6b7280] relative top-[10vh]">
                Written by Author Salamun Kawlam
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div>
          <div className="grid grid-cols-3 gap-4 w-10/12 mx-auto">
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

export default RfidPage;