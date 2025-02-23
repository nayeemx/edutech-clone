import { useState } from "react";
import { IoMdMail } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { IoLocationSharp } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiChat2Fill } from "react-icons/ri";

const ContactPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!email || !message) {
      toast.error("Please fill in all fields.");
      return;
    }

    toast.success("Message sent successfully!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setEmail("");
    setMessage("");
  };

  return (
    <>
      <section className="bg-[#f0f4fa] w-10/12 mt-32 p-20 rounded-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#313a52] my-8">
          Contact us for any of your queries
        </h1>
        {/* address */}
        <div className="mt-20 flex flex-col gap-3">
          <div className="flex items-center mb-2">
            <IoMdMail className="text-[1rem] text-[#313a52]" />
            <h1 className="text-[1rem] text-[#313a52] text-semibold font-semibold ml-4">
              ekram@edutechs.app
            </h1>
          </div>
          <div className="flex items-center mb-2">
            <IoCall className="text-[1rem] text-[#313a52]" />
            <h1 className="text-[1rem] text-[#313a52] text-semibold font-semibold ml-4">
              +880 17007 66174
            </h1>
          </div>
          <div className="flex items-center">
            <IoLocationSharp className="text-[1rem] text-[#313a52]" />
            <h1 className="text-[1rem] text-[#313a52] text-semibold font-semibold ml-4">
              Concord Royal Court 3rd Floor, Road 27 (old), Dhanmondi,
              Dhaka-1209
            </h1>
          </div>
        </div>

        {/* map */}
        <div className="flex justify-center mt-8">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d912.9575440003068!2d90.36948716955182!3d23.75343462616331!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf518757b90f%3A0x51753b69925e6300!2sConcord%20Royal%20Court!5e0!3m2!1sen!2sbd!4v1739076882308!5m2!1sen!2sbd"
            width="800"
            height="400"
            style={{ border: '4px solid white' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full max-w-full rounded-lg" // Added rounded-lg here
          ></iframe>
        </div>

        {/* message */}
        <div className="mt-8">
          <div className="flex items-center justify-between my-8 gap-8">
            <span className="before:block before:h-[2px] before:bg-gray-200 before:w-[25.8vw]" />
            <h1 className="text-lg text-nowrap font-bold text-[#93a1b8]">
            or directly send us a message
            </h1>
            <span className="after:block after:h-[2px] after:bg-gray-200 after:w-[25.8vw]" />
          </div>
          <input
            type="email"
            placeholder="Email / Phone"
            className="w-full px-4 py-2 border-2 border-slate-300 hover:border-sky-500 focus:border-sky-500 focus:outline focus:outline-sky-500 rounded-lg mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            placeholder="Message"
            className="w-full h-52 border-2 p-2 border-slate-300 hover:border-sky-500 focus:border-sky-500 focus:outline focus:outline-sky-500 rounded-lg mb-4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <div className="flex justify-center mt-8">
          <button
            className="w-11/12 px-4 py-4 bg-[#038fde] text-2xl font-semibold text-white rounded-full transition-transform duration-450 hover:translate-y-[-8px] hover:shadow-[#038fde] hover:shadow-lg"
            onClick={handleSend}
          >
            Send
          </button>
          </div>
        </div>
      </section>
      <ToastContainer />

      <div>
          <p className="fixed right-[0.6vw] top-[34rem] bg-blue-500 p-[10px] w-[4vw] h-[8.6vh] z-10 rounded-full">
          <RiChat2Fill className="text-white text-4xl -rotate-[9deg] relative top-[0.4vh] left-[0.3vw]" />
          </p>
        </div>
    </>
  );
};

export default ContactPage;