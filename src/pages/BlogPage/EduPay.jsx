import { Link } from "react-router-dom";
import img1 from "../../assets/nb/1.png";
import img3 from "../../assets/nb/3.png";
import img5 from "../../assets/nb/5.png";
import img6 from "../../assets/nb/6.png";
import { BiLinkAlt } from "react-icons/bi";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import the CSS
import { MdOutlineDateRange } from "react-icons/md";
import { GoClock } from "react-icons/go";
import edupayblog from "../../assets/sentinal/edupablog.png";
import edupayconfig from "../../assets/sentinal/1722750540502-Quill-picture-news.png";
import paymentlink from "../../assets/sentinal/1722750630478-Quill-picture-news.png";
import paymenthistory from "../../assets/sentinal/1722750656114-Quill-picture-news.png";
import transfer from "../../assets/sentinal/1722750689969-Quill-picture-news.png";
import withdraw from "../../assets/sentinal/1722750708858-Quill-picture-news.png";
import { RiChat2Fill } from "react-icons/ri";

const EduPay = () => {
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
              EduPay: Gateway to Hassle-Free Payments for Institutions
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
                August 4, 2024
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className=" text-[#6b7280]">
                <GoClock />
              </span>
              <span className="relative top-[0.5vh] text-[#6b7280]">
                8m Read
              </span>
            </div>
          </div>
        </div>

        <div>
          <img src={edupayblog} alt="" className="my-6 rounded-md" />
        </div>

        <div>
          <p className="text-[#6b7280] my-10">
            We are excited to announce the launch of our new online payment
            feature, EduPay. Designed to simplify and streamline the payment
            process for teachers, students, and guardians, EduPay ensures a
            hassle-free and efficient way to manage all financial transactions.
            Here’s everything you need to know about using EduPay and the
            benefits it brings to your institution.
          </p>

          <div>
            <div>
              <h1 className="text-[3.6rem] my-6 text-[#535353]">
                Step-by-Step Guide to Using EduPay
              </h1>
              <h1 className="text-3xl my-6 text-[#535353]">
                Setting Up Payment Configuration
              </h1>
            </div>

            <div>
              <img src={edupayconfig} alt="" />
              <p className="text-[#6b7280] my-10">
                The initial step is for the teacher to set up the payment
                configuration of a classroom. This involves defining the monthly
                tuition fee and any special one-time payments of the classroom
                such as admission fees, book fees, or mock exam fees. This setup
                is done only once during the classroom configuration and can be
                adjusted later as needed.
              </p>
            </div>
          </div>

          <div className="my-20">
            <h1 className="text-3xl mb-2 text-[#535353]">
              Step 1: Share the Payment Link
            </h1>

            <div>
              <p className="text-[#6b7280]">
                Teachers have two options to share payment links:
              </p>
              <img src={paymentlink} alt="" className="my-4" />
              <ul className="list-inside pl-5 my-6">
                {/* Use a custom marker with a span */}
                <li className="flex text-[#6b7280]">
                  <span className="inline-block h-[0.94vh] w-[2.5vw] rounded-full border border-gray-700 mt-1.5 mr-2"></span>
                  <p className="font-semibold">
                    <span className="font-normal mr-2">
                      General Payment Link:
                    </span>
                    This link is designed for broad use and can be printed as a
                    QR code on posters for easy access. When students or
                    guardians scan the QR code or visit the link, they will need
                    to search for their specific account. They can then review
                    unpaid payments, add or remove any payments as needed, and
                    proceed to payment. An OTP is only required if they want to
                    view past payment history or download past receipts. The
                    benefit of this link is that it can be used by all students,
                    making it convenient for institutions to distribute widely.
                  </p>
                </li>
                <li className="flex text-[#6b7280]">
                  <span className="inline-block h-[0.94vh] w-[2vw] rounded-full border border-gray-700 mt-1.5 mr-2"></span>
                  <p className="font-semibold">
                    <span className="font-normal mr-2">
                      Student-Specific Payment Link:
                    </span>
                    This personalized link takes students or guardians directly
                    to their account where they can review unpaid payments, make
                    adjustments by adding or removing payments if necessary, and
                    complete the payment. Additionally, they can view past
                    payments and download receipts without requiring an OTP. The
                    benefit of this link is that is it private and specific to
                    each student, making it more convenient and error-free.
                  </p>
                </li>
              </ul>
            </div>
          </div>
          {/* step 3 */}
          <div className="my-20">
            <h1 className="text-3xl text-[#535353]">
              Step 2: Review and Complete the Payment
            </h1>

            <div>
              <p className="text-[#6b7280] my-4">
                Students or guardians follow these steps to complete the
                payment:
              </p>
              <img src={paymenthistory} alt="" />
              <ul className="list-inside pl-5 my-6">
                {/* Use a custom marker with a span */}
                <li className="flex text-[#6b7280]">
                  <span className="inline-block h-[0.94vh] w-[2.5vw] rounded-full border border-gray-700 mt-1.5 mr-2"></span>
                  <p className="font-semibold">
                    <span className="font-normal mr-2">
                      General Payment Link:
                    </span>
                    After accessing the general payment link and finding their
                    account, students or guardians will see their pending
                    payments already pre-filled. They can review these payments,
                    add or remove any as necessary, and proceed to payment. If
                    they wish to view past payment history or download receipts,
                    they will need to request an OTP, which will be sent to the
                    phone number tied to their account. Once they enter the OTP,
                    they can access their full payment history.
                  </p>
                </li>
                <li className="flex text-[#6b7280]">
                  <span className="inline-block h-[0.94vh] w-[2vw] rounded-full border border-gray-700 mt-1.5 mr-2"></span>
                  <p className="font-semibold">
                    <span className="font-normal mr-2">
                      Student-Specific Payment Link:
                    </span>
                    When students or guardians use the student-specific payment
                    link, they are directly taken to their account with pending
                    payments already displayed. They can review, add, or remove
                    any payments if necessary, and proceed to payment.
                    Additionally, they can view past payments and download
                    receipts directly without needing an OTP, making the process
                    more private and convenient.
                  </p>
                </li>
              </ul>
              <p className="text-[#6b7280]">
                In both cases, the payment process is completed through
                SSLCommerz, allowing for a variety of payment methods including
                bKash, Nagad, card, and others.
              </p>
            </div>
          </div>

          <div className="my-20">
            <h1 className="text-3xl text-[#535353]">
              Step 3: Payment Confirmation and Updates
            </h1>

            <div>
              <p className="text-[#6b7280] my-2">
                Once the payment is complete, it is automatically transferred to
                the institution account's EduPay wallet and users can request to
                withdraw their wallet balance to any preferred account.
              </p>

              <h1 className="text-4xl my-6 text-[#535353] mt-[25vh]">
                How Payments are Managed and Withdrawn
              </h1>
              <p className="text-[#535353] text-3xl">
                Direct Transfers to Accounts
              </p>
              <img src={transfer} alt="" className="my-2" />
              <p className="text-[#6b7280] text-sm my-4">
                When a student or guardian completes a payment via EduPay:
              </p>
              <ul className="list-inside pl-5 my-6">
                {/* Use a custom marker with a span */}
                <li className="flex text-[#6b7280]">
                  <span className="inline-block h-[0.94vh] w-[0.5vw] rounded-full border border-gray-700 mt-1.5 mr-2"></span>
                  <p className="font-semibold">
                    The payment is processed through SSLCommerz.
                  </p>
                </li>
                <li className="flex text-[#6b7280]">
                  <span className="inline-block h-[0.94vh] w-[0.5vw] rounded-full border border-gray-700 mt-1.5 mr-2"></span>
                  <p className="font-semibold">
                    Funds are directly transferred to the institution’s wallet.
                  </p>
                </li>
                <li className="flex text-[#6b7280]">
                  <span className="inline-block h-[0.94vh] w-[0.7vw] rounded-full border border-gray-700 mt-1.5 mr-2"></span>
                  <p className="font-semibold">
                    The payment information is instantly recorded in the system,
                    updating the institution's financial records and the
                    student's payment history.
                  </p>
                </li>
              </ul>
              <p className="text-[#535353] text-3xl mt-[20vh]">
                Requesting a Withdrawal
              </p>

              <img src={withdraw} alt="" className="mt-6" />
              <ol className="list-decimal list-inside text-[#6b7280] mt-4">
                <li>
                  <span className="font-semibold">
                    <span className="text-[#535353] font-normal">
                      Wallet Access:
                    </span>{" "}
                    Inside the EduPay add-on, the current wallet balance is
                    displayed at the top, with a detailed transaction history at
                    the bottom.
                  </span>
                </li>
                <li>
                  <span className="font-semibold">
                    <span className="text-[#535353] font-normal">
                      Withdrawal Request:
                    </span>{" "}
                    A withdrawal request can be sent by clicking the "Withdraw"
                    button, choosing the desired method (bKash, bank transfer,
                    or cash), and providing the necessary details. The funds
                    will then be transferred to the selected account as per the
                    withdrawal request.
                  </span>
                </li>
              </ol>
            </div>
          </div>

          {/* end speech */}
          <div className="my-20">
            <h1 className="text-3xl mt-20 text-[#535353]">Benefits of eduPay</h1>

            <div>
              <ol className="list-decimal list-inside text-[#6b7280] mt-4">
                <li>
                  <span className="font-semibold">
                    <span className="text-[#535353] font-normal">
                      Instant Fund Transfer:
                    </span>{" "}
                    Payments made by students or guardians are instantly
                    transferred to the institution's wallet, ensuring immediate
                    access to funds.
                  </span>
                </li>
                <li>
                  <span className="font-semibold">
                    <span className="text-[#535353] font-normal">
                      Automatic Financial Record Updates:
                    </span>{" "}
                    Financial records, including payment summaries, money
                    manager, and financial insights, are automatically updated.
                    This eliminates the need for manual record-keeping, reducing
                    the chance of errors.
                  </span>
                </li>
                <li>
                  <span className="font-semibold">
                    <span className="text-[#535353] font-normal">
                    Convenience:
                    </span>{" "}
                    EduPay supports various payment methods such as bKash, Nagad, and cards, offering convenience and flexibility for students and guardians.
                  </span>
                </li>
                <li>
                  <span className="font-semibold">
                    <span className="text-[#535353] font-normal">
                    Increased Efficiency::
                    </span>{" "}
                    By automating the payment process, EduPay significantly reduces the administrative workload for institutions, minimizes errors, and saves time, allowing teachers and administrators to focus more on educational activities.
                  </span>
                </li>
              </ol>
              <p className="text-[#6b7280] my-[10vh]">
              We believe EduPay will significantly enhance the payment experience for teachers, students, and guardians, making financial management simpler and more efficient. We encourage all our users to take full advantage of this innovative feature to streamline their payment processes.
              </p>
              <p className="text-[#6b7280] my-[10vh]">
              For further information or support, please feel free to call our helpline or send us a message over live chat on our website.
              </p>
              <p className="text-[#6b7280] relative top-[5vh]">
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

export default EduPay;