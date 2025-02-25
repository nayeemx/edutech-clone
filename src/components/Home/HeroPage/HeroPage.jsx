import Teacher from "../../../assets/teacher_badge.png";
import Student from "../../../assets/student_badge.png";
import Parents from "../../../assets/parent_badge.png";
import Admin from "../../../assets/school_leader_badge.png";

// Import the necessary icons from react-icons/fa (Font Awesome)
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const HeroPage = () => {
  // Function to generate the star rating display
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar key={`full-${i}`} className="text-yellow-400 text-2xl" />
      ); // Style with Tailwind CSS
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <FaStarHalfAlt key="half" className="text-yellow-400 text-2xl" />
      );
    }

    // Add empty stars to fill up to 5
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-300" />); // Style with Tailwind CSS
    }

    return stars;
  };

  // Example rating (you can replace this with dynamic data)
  const rating = 4.6; // example

  return (
    <>
      <div className="w-8/12 mx-auto mt-10 text-lg">
        <h1 className="text-[4rem] text-[#313a52] w-11/12 justify-self-center font-wrap font-bold text-center leading-[1.2]">
          Bringing Classrooms Together with Technology
        </h1>
        <p className="text-[1.6rem] font-semibold text-center mt-2 text-[#67758f]">
          without losing the human touch
        </p>

        <div className="w-8/12 mx-auto">
          <div className="flex items-center mt-[8vh]">
            <span className="before:block before:flex-grow before:h-[2px] before:bg-gray-200 before:w-[23vw]"></span>
            <span className="px-4 text-nowrap text-[#67758f]">for</span>
            <span className="after:block after:flex-grow after:h-[2px] after:bg-gray-200 after:w-[23vw]"></span>
          </div>

          {/* cards */}
          <div className="grid grid-cols-4 gap-[6vw] mt-10">
            {/* card 1 */}
            <div className="flex flex-col items-center p-2 rounded-2xl w-[12vw] border-2 border-[#d8e0eb] hover:translate-y-[-5px] transition-transform duration-300">
              <img src={Teacher} alt="" className="w-24" />
              <p className="font-bold text-1xl mt-4">Teacher</p>
            </div>

            <div className="flex flex-col items-center p-2 rounded-2xl w-[12vw] border-2 border-[#d8e0eb] hover:translate-y-[-5px] transition-transform duration-300">
              <img src={Student} alt="" className="w-24" />
              <p className="font-bold text-1xl mt-4">Student</p>
            </div>

            <div className="flex flex-col items-center p-2 rounded-2xl w-[12vw] border-2 border-[#d8e0eb] hover:translate-y-[-5px] transition-transform duration-300">
              <img src={Parents} alt="" className="w-24" />
              <p className="font-bold text-1xl mt-4">Parents</p>
            </div>

            <div className="flex flex-col items-center p-2 rounded-2xl w-[12vw] border-2 border-[#d8e0eb] hover:translate-y-[-5px] transition-transform duration-300">
              <img src={Admin} alt="" className="w-24" />
              <p className="font-bold text-1xl mt-4">Admin</p>
            </div>
          </div>

          {/* rating */}
          <div className="relative top-[1vh] mt-6">
            <div className="flex items-center justify-center my-4">
              {/* rating here */}
              {renderStars(rating)}
            </div>
          </div>

          <div>
            <ul className="flex justify-center my-6">
              <li> 46,000+ Users </li>
              <li className="">
                <span className="inline-block w-2 h-2 rounded-full mr-2"></span>
                3600+ Reviews
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroPage;