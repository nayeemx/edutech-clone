import Img1 from "../../../assets/successcard/img1.jpg";
import Aveter1 from "../../../assets/successcard/avetar/laila.png";
import Img2 from "../../../assets/successcard/img2.jpg";
import Aveter2 from "../../../assets/successcard/avetar/refayet.png";
import Img3 from "../../../assets/successcard/img3.jpg";
import Aveter3 from "../../../assets/successcard/avetar/adeeb.png";
import Img4 from "../../../assets/successcard/img4.jpg";
import Aveter4 from "../../../assets/successcard/avetar/nadim-sir.png";
import Img5 from "../../../assets/successcard/img5.jpg";
import Aveter5 from "../../../assets/successcard/avetar/riaz.png";
const SuccessBlock = () => {
  return (
    <>
      <section className="bg-[#f0f4ff] relative top-[30vh] py-2">
        <h4 className="text-center text-3xl font-bold mt-8">Institutions on the path to Success</h4>

        <div className="my-[6rem] grid grid-cols-5 gap-4">
          {/* card 1 */}
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden relative">
            {/* Testimonial Content */}
            <img src={Img1} alt="" className="w-full h-[45vh] object-cover" />

            {/* Curved Shadow Effect */}
            <div className="absolute bottom-0 left-0 w-full h-6 -rotate-[1deg]">
              <div className="h-full bg-gradient-to-b from-transparent to-gray-400 rounded-b-xl skew-y-1"></div>
            </div>
          </div>

          {/* card 2 */}
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden relative">
            {/* Testimonial Content */}
            <div className="p-8">
              <div className="flex items-center mb-4">
                <img
                  className="h-12 w-12 rounded-full mr-4"
                  src={Aveter1} // Replace with actual image path
                  alt="Refayat Sir"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Laila Arjuman Banu
                  </h3>
                  <p className="text-gray-600">Principal, Mac Master School</p>
                </div>
              </div>
              <p className="text-gray-700">
                Great support and help. We are proud to be making the transition
                to enabling digital tools in our classrooms to make the lives of
                our teachers and students better!
              </p>
            </div>

            {/* Curved Shadow Effect */}
            <div className="absolute bottom-0 left-0 w-full h-6 -rotate-[1deg]">
              <div className="h-full bg-gradient-to-b from-transparent to-gray-400 rounded-b-xl skew-y-1"></div>
            </div>
          </div>

          {/* card 3 */}
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden relative">
            {/* Testimonial Content */}
            <img src={Img2} alt="" className="w-full h-[45vh] object-cover" />

            {/* Curved Shadow Effect */}
            <div className="absolute bottom-0 left-0 w-full h-6 -rotate-[1deg]">
              <div className="h-full bg-gradient-to-b from-transparent to-gray-400 rounded-b-xl skew-y-1"></div>
            </div>
          </div>

          {/* card 4 */}
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden relative">
            {/* Testimonial Content */}
            <div className="p-8">
              <div className="flex items-center mb-4">
                <img
                  className="h-12 w-12 rounded-full mr-4"
                  src={Aveter2} // Replace with actual image path
                  alt="Refayat Sir"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Refayat Sir
                  </h3>
                  <p className="text-gray-600">Teacher, Legends School</p>
                </div>
              </div>
              <p className="text-gray-700">
                Thank you for leading the continuous improvement of Edutechs
                which made our businesses smoother than before. May Edutechs
                become bigger and better over time. Profound regards.
              </p>
            </div>

            {/* Curved Shadow Effect */}
            <div className="absolute bottom-0 left-0 w-full h-6 -rotate-[1deg]">
              <div className="h-full bg-gradient-to-b from-transparent to-gray-400 rounded-b-xl skew-y-1"></div>
            </div>
          </div>

          {/* card 5 */}
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden relative">
            {/* Testimonial Content */}
            <img src={Img3} alt="" className="w-full h-[45vh] object-cover" />

            {/* Curved Shadow Effect */}
            <div className="absolute bottom-0 left-0 w-full h-6 -rotate-[1deg]">
              <div className="h-full bg-gradient-to-b from-transparent to-gray-400 rounded-b-xl skew-y-1"></div>
            </div>
          </div>

          {/* card 6 */}
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden relative">
            {/* Testimonial Content */}
            <div className="p-8">
              <div className="flex items-center mb-4">
                <img
                  className="h-12 w-12 rounded-full mr-4"
                  src={Aveter3} // Replace with actual image path
                  alt="Refayat Sir"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Adeeb Ahsan
                  </h3>
                  <p className="text-gray-600">Mathematics Teacher</p>
                </div>
              </div>
              <p className="text-gray-700">
                Very easy to use and irreplaceable for me especially during the
                Covid era when I was forced to transition my classrooms to a
                digital version.
              </p>
            </div>

            {/* Curved Shadow Effect */}
            <div className="absolute bottom-0 left-0 w-full h-6 -rotate-[1deg]">
              <div className="h-full bg-gradient-to-b from-transparent to-gray-400 rounded-b-xl skew-y-1"></div>
            </div>
          </div>

          {/* card 7 */}
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden relative">
            {/* Testimonial Content */}
            <img src={Img4} alt="" className="w-full h-[45vh] object-cover" />

            {/* Curved Shadow Effect */}
            <div className="absolute bottom-0 left-0 w-full h-6 -rotate-[1deg]">
              <div className="h-full bg-gradient-to-b from-transparent to-gray-400 rounded-b-xl skew-y-1"></div>
            </div>
          </div>

          {/* card 8 */}
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden relative">
            {/* Testimonial Content */}
            <div className="p-8">
              <div className="flex items-center mb-4">
                <img
                  className="h-12 w-12 rounded-full mr-4"
                  src={Aveter4} // Replace with actual image path
                  alt="Refayat Sir"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Engr. Md. Nadim
                  </h3>
                  <p className="text-gray-600">Mathematics Teacher, Edbase</p>
                </div>
              </div>
              <p className="text-gray-700">
                Created by my ex-students. They have made my classroom
                management much easier and have created all advanced custom
                features that I have asked for.
              </p>
            </div>

            {/* Curved Shadow Effect */}
            <div className="absolute bottom-0 left-0 w-full h-6 -rotate-[1deg]">
              <div className="h-full bg-gradient-to-b from-transparent to-gray-400 rounded-b-xl skew-y-1"></div>
            </div>
          </div>

          {/* card 9 */}
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden relative">
            {/* Testimonial Content */}
            <img src={Img5} alt="" className="w-full h-[45vh] object-cover" />

            {/* Curved Shadow Effect */}
            <div className="absolute bottom-0 left-0 w-full h-6 -rotate-[1deg]">
              <div className="h-full bg-gradient-to-b from-transparent to-gray-400 rounded-b-xl skew-y-1"></div>
            </div>
          </div>

          {/* card 10 */}
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden relative">
            {/* Testimonial Content */}
            <div className="p-8">
              <div className="flex items-center mb-4">
                <img
                  className="h-12 w-12 rounded-full mr-4"
                  src={Aveter5} // Replace with actual image path
                  alt="Refayat Sir"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Riaz Sir
                  </h3>
                  <p className="text-gray-600">Accounting Instructor</p>
                </div>
              </div>
              <p className="text-gray-700">
                Edutechs' new payment management feature has completely
                revolutionized my institute's payment handling. Previously,
                tracking payments, verifying records, and sending reminders were
                all challenges. Now, the process is effortless.
              </p>
            </div>

            {/* Curved Shadow Effect */}
            <div className="absolute bottom-0 left-0 w-full h-6 -rotate-[1deg]">
              <div className="h-full bg-gradient-to-b from-transparent to-gray-400 rounded-b-xl skew-y-1"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SuccessBlock;
