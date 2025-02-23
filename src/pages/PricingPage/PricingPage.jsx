import Acronym from "../../components/Acronym/Acronym";
import { FaCheck } from "react-icons/fa6";
import Tables from "../../components/Tables/Tables";
import { Link } from "react-router";
import { RiChat2Fill } from "react-icons/ri";

const PricingPage = () => {
  return (
    <>
      <section className="relative bottom-[8vh] w-full h-[155vh] bg-[#f0f4ff]">
        <div className="w-7/12 mx-auto relative top-[14vh]">
          <div className="text-[1.6rem] font-bold text-blue-600 text-center">
            Pricing
          </div>
          <div className="text-[1.6rem] font-bold text-center">
            Start for free and upgrade when you need it
          </div>

          {/* card */}
          <div className="grid grid-cols-2 w-8/12 mx-auto gap-4 my-14">
            {/* card1 */}
            <div className="border-[1px] border-b-gray-500 bg-white rounded-2xl p-6">
              <div className="border-b-2 border-amber-600 pb-4 leading-[1.7]">
                <p className="text-[#676e80] text-lg font-bold">Lite</p>
                <p className="text-[#67758f] text-sm font-semibold">Recommended for most institutions</p>
              </div>

              <div className="border-b-2 border-amber-600 my-6 leading-[1.7]">
                <div>
                <p className="text-6xl text-[#313a52] font-bold">৳0</p>
                <p className="text-sm text-[#67758f]">Per student per month</p>
                </div>
              </div>

              {/* card description */}
              <div className="my-4 flex gap-2 items-center">
                <span>
                <FaCheck />
                </span>
                <span className="text-sm font-semibold text-[#313a52]">
                    Unlimited students, teachers & classrooms
                    </span>
              </div>

              <div className="my-4 flex gap-2 items-center">
                <span>
                <FaCheck />
                </span>
                <span className="text-sm font-semibold text-[#313a52]">Up to 2 moderators with limited privilege control</span>
              </div>

              <div className="my-4 flex gap-2 items-center">
                <span>
                <FaCheck />
                </span>
                <span className="text-sm font-semibold text-[#313a52]">Attendance & payment management</span>
              </div>

              <div className="my-4 flex gap-2 items-center">
                <span>
                <FaCheck />
                </span>
                <span className="text-sm font-semibold text-[#313a52]">Assessments & report cards</span>
              </div>

              <div className="my-4 flex gap-2 items-center">
                <span>
                <FaCheck />
                </span>
                <span className="text-sm font-semibold text-[#313a52]">Online admissions & payment collection</span>
              </div>

              <div className="my-4 flex gap-2 items-center">
                <span>
                <FaCheck />
                </span>
                <span className="text-sm font-semibold text-[#313a52]">Online class, video courses & file sharing</span>
              </div>

              <div className="my-4 flex gap-2 items-center">
                <span>
                <FaCheck />
                </span>
                <span className="text-sm font-semibold text-[#313a52]">Dynamic SMS alerts
                <span className="text-sm font-semibold text-[#93a1b8]">(*sms charge applicable)</span></span>
              </div>

              <div className="my-4 flex gap-2 items-center">
                <span>
                <FaCheck />
                </span>
                <span className="text-sm font-semibold text-[#313a52]">20+ add-ons</span>
              </div>

              <button
            className="w-full px-4 py-2 bg-[#038fde] border-2 border-[#038fde] relative top-[3.4vh] my-6 text-2xl font-semibold text-white rounded-full transition-transform duration-450 hover:translate-y-[-8px] hover:shadow-[#038fde] hover:shadow-lg"
          >
            Start For Free
          </button>
            </div>
            {/* card2 */}
            <div className="border-[1px] border-b-gray-500 bg-white rounded-lg p-3">
              <div className="border-b-2 border-amber-600 pb-4 leading-[1.7]">
              <p className="text-blue-500 text-lg font-bold">Pro</p>
              <p className="text-[#67758f] text-sm font-semibold">For the advanced needs of large institutions</p>
              </div>

              <div className="border-b-2 border-amber-600 my-6 leading-[1.7]">
                <div>
                <p className="text-6xl text-[#313a52] font-bold">৳20</p>
                <p className="text-sm text-[#67758f]">Per student per month</p>
                </div>
              </div>

              {/* card description */}
              <div className="my-4 flex gap-2 items-center">
              <span className="text-sm font-semibold text-[#313a52]">
                    Everything in Lite, plus
                    </span>
              </div>

              <div className="my-4 flex gap-2 items-center">
                <span>
                <FaCheck />
                </span>
                <span>Unlimited moderators with full privilege control</span>
              </div>

              <div className="my-4 flex gap-2 items-center">
                <span>
                <FaCheck />
                </span>
                <span>30 days data-loss protection</span>
              </div>

              <div className="my-4 flex gap-2 items-center">
                <span>
                <FaCheck />
                </span>
                <span>Stakeholder revenue splitting</span>
              </div>

              <div className="my-4 flex gap-2 items-center">
                <span>
                <FaCheck />
                </span>
                <span>Multi-currency support</span>
              </div>

              <div className="my-4 flex gap-2 items-center">
                <span>
                <FaCheck />
                </span>
                <span>Activity tracking, business insights & analytics</span>
              </div>

              <div className="my-4 flex gap-2 items-center">
                <span>
                <FaCheck />
                </span>
                <span>Basic cyber vulnerability testing</span>
              </div>

              <button
            className="w-full px-4 py-2 bg-white my-6 text-2xl font-semibold text-[#038fde] rounded-full transition-transform duration-450 hover:translate-y-[-8px] hover:shadow-[#038fde] hover:shadow-lg border-2 border-[#038fde] relative top-[10.4vh]"
          >
            Upgrade
          </button>
            </div>
          </div>
        </div>
      </section>
      <section className="h-[90vh]">
        <div className="w-8/12 mx-auto">
            <Tables />
        </div>
      </section>
      <div className="bg-[#f0f4ff] relative top-[40vh]">
        {/* container */}
        <div className="w-10/12 mx-auto">
          {/* faq */}
          <div className="relative top-[10vh]">
            <div className="my-10">
              <h1 className="text-4xl font-bold text-[#313a52]">FAQ</h1>
            </div>
            <div>
              {/* acronym */}
              <Acronym />
              {/* acronym */}
            </div>
          </div>
          {/* start */}
          <div className="mx-auto mt-[10rem] flex flex-col relative z-10">
            <div className="h-[40vh] flex items-center px-10 py-[4rem] gap-[6vw] bg-blue-600 rounded-3xl">
              <div className="">
                <h1 className="text-4xl font-bold text-white text-nowrap">
                  Give your classroom the upgrade it deserves
                </h1>
              </div>
              <div className="">
              <Link to="/signup">
              <button className="text-blue-600 text-xl px-[5vw] py-4 rounded-4xl bg-white cursor-pointer">
                <p className="relative top-[0.8vh]">Start For Free</p>
              </button>
              </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
          <p className="fixed right-[0.6vw] top-[34rem] bg-blue-500 p-[10px] w-[4vw] h-[8.6vh] z-10 rounded-full">
          <RiChat2Fill className="text-white text-4xl -rotate-[9deg] relative top-[0.4vh] left-[0.3vw]" />
          </p>
        </div>
    </>
  );
};

export default PricingPage;