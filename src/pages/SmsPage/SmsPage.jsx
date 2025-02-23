import { SmsnavBar } from "../../components/NavBar/NavBar";
import { useRef, useState, useEffect } from 'react'; // Import useRef here
import cover from "../../assets/sms/hero-bg.png";
import coverchild from "../../assets/sms/h-sms-img.png";
import InfiniteTextSlider from "../../components/SmsComponent/InfiniteTextSlider";
import TopFeatures from "../../components/SmsComponent/TopFeatures";
import ImageInfiniteSlider from "../../components/SmsComponent/ImageInfiniteSlider";
import setp1 from "../../assets/sms/step-1.png";
import TestimonialSlider from "../../components/SmsComponent/TestimonialSlider";
import ToggleSwitch from "../../components/SmsComponent/ToggleSwitch";
import morefeature from "../../assets/sms/more-features.png";
import contactimage from "../../assets/sms/contactUS.webp";
import SmsFooter from "../../components/Footer/SmsFooter";
import { FaArrowUp } from "react-icons/fa"; // Import the up arrow icon
import { motion } from "framer-motion"; //for animation
import { RiChat2Fill } from "react-icons/ri";

const SmsPage = () => {
  const stickyOffset = 300;
  const featuresRef = useRef(null);
  const contactRef = useRef(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false); // State for button visibility

  const scrollToSection = (sectionId) => {
    const ref = {
      features: featuresRef,
      contact: contactRef,
    }[sectionId];

    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll to top function
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
  
    //  event listener for scroll
    useEffect(() => {
      const handleScroll = () => {
        // Show the button if the user has scrolled down a certain amount (e.g., 300px)
        if (window.scrollY > 300) {
          setShowScrollToTop(true);
        } else {
          setShowScrollToTop(false);
        }
      };
  
      window.addEventListener("scroll", handleScroll);
  
      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount
  return (
    <>
      <SmsnavBar
        stickyOffset={stickyOffset}
        scrollToSection={scrollToSection}
      />
      {/* Give the divs IDs that match the scrollToSection calls */}
      <div className="relative w-full h-[94.6vh] bg-blue-200">
        {" "}
        {/* Main Container */}
        {/* Background Image */}
        <img
          src={cover}
          alt="Hero Background"
          className="absolute top-0 left-0 w-full object-cover object-center"
        />
        {/* Overlay Content (Text and Buttons) */}
        <div className="absolute left-0 right-0 bottom-0 mx-auto w-10/12 flex items-center justify-between">
          <div className="text-white">
            {" "}
            {/* Constrain text width */}
            <h1 className="w-[25vw] text-4xl font-normal mb-4">
              Experience <span className="text-black">The Most Advanced</span> Bulk SMS Gateway
            </h1>
            <p className="text-xl font-semibold mb-8">
              Tailor Made for Education
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-6 rounded-md font-semibold transition duration-300 transform hover:-translate-y-1"
              >
                Get Started
              </a>
              <a
                href="#"
                className="bg-transparent text-black hover:shadow-2xl hover:rounded py-2 px-6 font-normal transition duration-300 transform hover:-translate-y-1"
              >
                Try It Out
              </a>
            </div>
          </div>

          <div className="">
            <img src={coverchild} alt="" className="w-[46vw]" />
          </div>
        </div>
      </div>

      <section>
      <div className="flex items-center justify-between w-9/12 mx-auto h-[18vh]">
      <div>
        <p className="text-2xl font-normal">Our <br />
        Clients</p>
      </div>

      <div className="w-[90%] max-w-4xl px-4">
        <InfiniteTextSlider />
      </div>
    </div>
      </section>

      <section ref={featuresRef} id="features" className="py-[8vh] bg-[#f5f5f5]">
        <div className="w-9/12 mx-auto">
        <TopFeatures />
        </div>
      </section>

      <section className="bg-[#54a5ef]">
        <div className="w-8/12 grid grid-cols-3 gap-4 py-20 mx-auto">
          <div>
            <p className="text-5xl font-normal text-white">995 +</p>
            <p className="font-normal text-white text-2xl">Registered Teachers</p>
          </div>
          <div>
          <div>
            <p className="text-5xl font-normal text-white">50600+</p>
            <p className="font-normal text-white text-2xl">Messages Sent</p>
          </div>
          </div>
          <div>
          <div>
            <p className="text-5xl font-normal text-white">74+</p>
            <p className="font-normal text-white text-2xl">Enrolled Institutions</p>
          </div>
          </div>
        </div>
      </section>

      <section className="py-[8vh] bg-[#f5f5f5]">
      <div>
      <ImageInfiniteSlider
        imageWidth={500}
        imageHeight={350}
        animationDuration={12}
      />
    </div>
      </section>

      <section className="w-8/12 mx-auto py-[8vh]">
      <h3 className="text-2xl font-normal text-center">Get Started with 3 Easy Steps</h3>
        <div className="py-6 grid grid-cols-3 gap-8">

        <div className="p-8 rounded-3xl bg-[#f5f5f5]">
          <div>
            <img src={setp1} alt="" className="w-[16vw]" />
          </div>
          <div className="bg-[#038fde] w-[4vw] h-10 relative right-[2.2vw] bottom-[28vh] rounded-tr-xl rounded-br-xl">
            <p className="absolute text-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">1</p>
          </div>
          <div>
            <p className="text-lg font-normal text-center text-[#038fde]">Create a new account</p>
            <p className="text-sm font-semibold text-center">Click the login button then choose new account. Enter your details to create a account.</p>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-[#f5f5f5]">
          <div>
            <img src={setp1} alt="" className="w-[16vw]" />
          </div>
          <div className="bg-[#038fde] w-[4vw] h-10 relative right-[2.3vw] bottom-[28vh] rounded-tr-xl rounded-br-xl">
            <p className="absolute text-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">2</p>
          </div>
          <div>
            <p className="text-lg font-normal text-center text-[#038fde]">Buy SMS</p>
            <p className="text-sm font-semibold text-center">Click on the sms managment tab and click recharge.</p>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-[#f5f5f5]">
          <div>
            <img src={setp1} alt="" className="w-[16vw]" />
          </div>
          <div className="bg-[#038fde] w-[4vw] h-10 relative right-[2.3vw] bottom-[28vh] rounded-tr-xl rounded-br-xl">
            <p className="absolute text-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">3</p>
          </div>
          <div>
            <p className="text-lg font-normal text-center text-[#038fde]">Send Your First SMS</p>
            <p className="text-sm font-semibold text-center">Click on the send SMS button on your dashboard and you’re set!</p>
          </div>
        </div>
        </div>
      </section>

      <section className="bg-[#f5f5f5] py-10">
        <h2 className="text-3xl font-normal text-center">Client Testimonial</h2>

        <div>
          <TestimonialSlider />
        </div>
      </section>

      <section className="bg-[#d9d9d9] py-10">
        <div className="w-10/12 mx-auto">
        <ToggleSwitch />
        </div>
      </section>

      <section className="bg-[#28303f] text-center text-white py-[15vh]">
        <div className="w-8/12 mx-auto flex flex-col items-center">
        <h1 className="text-5xl font-normal">
        Want more features?
        </h1>

        <p className="text-xl font-semibold w-[80%]">Transform your account into a full fledged learning management system. Take roll call, manage payments, schedule events and more.</p>

        <img src={morefeature} alt="" />
        </div>
      </section>

      <section className="py-[14vh] border-b-2 border-dashed border-[#8e8d98]">
      <div className="w-8/12 mx-auto">
        {/* Main Heading */}
      <h1 className="text-center text-3xl font-bold mb-8 text-gray-800">Pricing Plans</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Non-Masking Card */}
        <div className="bg-[#54a5ef] p-6 rounded-2xl text-white relative overflow-hidden">
          <h2 className="text-2xl font-semibold mb-2">Non-Masking</h2>
          <p className="mb-4 text-gray-100">The non masking package allows you to send messages from a random number</p>
          <p className="text-4xl font-bold mb-6">0.43 tk <span className="text-lg">/SMS</span></p>
          <button className="w-full bg-white hover:bg-[#54a5ef] text-[#54a5ef] hover:text-[#545454] hover:border-2 hover:border-[#545454] border-2 border-white py-2 px-6 rounded font-normal transition duration-200">Get Started</button>

        </div>

        {/* Masking Card */}
        <div className="bg-gray-100 p-6 rounded-2xl relative overflow-hidden">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">Masking</h2>
          <p className="mb-4 text-gray-600">The masking package allows you to send messages from your institution name</p>
          <p className="text-4xl font-bold mb-6 text-gray-800">0.60 tk <span className="text-lg">/SMS</span></p>
          <button className="w-full bg-[#545454] text-white py-2 px-6 rounded font-semibold hover:text-black transition duration-200">Get Started</button>
        </div>
      </div>
    </div>
      </section>

      <section className="w-10/12 mx-auto py-[14vh]" ref={contactRef} id="contact">
      <div>
        <div className="text-center">
        <h1 className="text-4xl font-normal mb-4 text-gray-800">Contact Us</h1>
        <p className="text-gray-600 mb-8 font-semibold">We are here to make your Life Easier</p>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Side: Image and Text */}
        <div className="flex flex-col justify-between items-center">
          <div>
            <img src={contactimage} alt="Contact Us Illustration" className="w-[25vw] rounded-lg" />
          </div>
          <div className='mt-2'>
            <p className="text-gray-700 mb-4 text-3xl text-center">You will be hearing from us within 24 Hours</p>
             <div className='flex gap-4 justify-between text-sm'>
                <p className="text-gray-600">Email <a href="mailto:ekram@edutechs.app">ekram@edutechs.app</a></p>
                <p className="text-gray-600">Phone <a href="tel:+8801781996174">+88 01781996174</a></p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Get in Touch</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" id="name" name="name" placeholder="e.g John Doe" className="mt-1 block w-full px-3 py-2 bg-[#fdfdfd] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                <input type="tel" id="phone" name="phone" placeholder="e.g 01700766172" className="mt-1 block w-full px-3 py-2 bg-[#fdfdfd] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email</label>
              <input type="email" id="email" name="email" placeholder="e.g cotact@gmail.com" className="mt-1 block w-full px-3 py-2 bg-[#fdfdfd] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Type Message</label>
              <textarea id="message" name="message" rows="4" placeholder="Message..." className="mt-1 block w-full px-3 py-2 bg-[#fdfdfd] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"></textarea>
            </div>
            <button type="submit" className="w-full py-2 px-4 bg-[#5e75e4] text-[#fdfdfd] font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition duration-200">Send Message</button>
          </form>
        </div>
      </div>
    </div>
      </section>

      <div>
          <p className="fixed right-[0.6vw] top-[34rem] bg-blue-500 p-[10px] w-[4vw] h-[8.6vh] z-10 rounded-full">
          <RiChat2Fill className="text-white text-4xl -rotate-[9deg] relative top-[0.4vh] left-[0.3vw]" />
          </p>
        </div>

      {/* Scroll to Top Button */}
      {/* Conditionally render the button */}
      {showScrollToTop && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 left-8 z-50 bg-[#474848] text-white p-2 rounded"
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }} // Initial state (hidden and slightly below)
          animate={{ opacity: 1, y: 0 }} // Animation to visible and final position
          transition={{ duration: 0.3 }} // Transition duration
        >
          <FaArrowUp size={18} />
        </motion.button>
      )}

      <SmsFooter />
    </>
  );
};

export default SmsPage;