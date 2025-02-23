import gimage1 from "../../../assets/gimage/1.png";
import gimage2 from "../../../assets/gimage/2.png";
import gimage3 from "../../../assets/gimage/before/1.png";
import gimage4 from "../../../assets/gimage/3.png";
import gimage5 from "../../../assets/gimage/before/2.png";
import gimage6 from "../../../assets/gimage/4.png";
import gimage7 from "../../../assets/gimage/5.png";
import gimage8 from "../../../assets/gimage/6.png";
import gimage9 from "../../../assets/gimage/before/3.png";
import gimage10 from "../../../assets/gimage/7.png";
import gimage11 from "../../../assets/gimage/before/4.png";
import gimage12 from "../../../assets/gimage/8.png";
import gimage13 from "../../../assets/gimage/9.png";
import gimage14 from "../../../assets/gimage/10.png";
const GalaryImage = () => {
  return (
    <>
      <div className="mt-30 w-[70vw] justify-self-center">
        {/* block 1 */}
        <div className="grid grid-cols-3 justify-items-center">
          <div>
            <img src={gimage1} alt="" />
          </div>

          <div
            className="relative w-[500px] mt-20 before:content-[''] before:absolute before:left-[0] before:w-[34%] top-[20.45vh]
          before:top-[20.47vh;] before:h-full before:bg-no-repeat before:bg-contain before:z-[-1] before:rotate-0"
          >
            {/* Use the actual <img> tag here */}
            <img src={gimage3} alt="" className="w-full h-auto" />
          </div>

          <div className="flex flex-col gap-4">
            <img src={gimage2} alt="" className="w-[4rem]" />
            <h1 className="font-bold text-2xl">Manage Like a Pro!</h1>
            <p>
              Your students, parents, staff, and moderators have their own
              accounts which they can use to see attendance, payments, and
              assessment status.
            </p>
          </div>
        </div>
        {/* block 1 */}

        {/* block 2 */}
        <div className="grid grid-cols-3 justify-items-center">
          <div className="flex flex-col gap-4 mt-6">
            <img src={gimage4} alt="" className="w-[4rem]" />
            <h1 className="font-bold text-2xl">Automate Payments</h1>
            <p>
              Manage fees, payments, reminders and invoices seamlessly to stay
              on top of all your expenses and receivables with insightful
              financial reports.
            </p>
          </div>

          <div
            className="relative w-[38vw] m-0 before:content-[''] before:absolute before:-left-[4vw] before:w-[34%] top-[10vh]
          before:top-[20.47vh;] before:h-full before:bg-no-repeat before:bg-contain before:z-[-1] before:rotate-0"
          >
            {/* Use the actual <img> tag here */}
            <img src={gimage5} alt="" className="w-full h-auto" />
          </div>

          <div className="block z-10">
            <img src={gimage6} alt="" className="w-[85%]" />
          </div>
        </div>
        {/* block 2 */}

        {/* block 3 */}
        <div className="grid grid-cols-3 justify-items-center">
          <div className="block z-10 justify-items-end">
            <img src={gimage7} alt="" className="w-[85%] -mr-[1.24vw]" />
          </div>

          <div
            className="relative w-[38vw] m-0 before:content-[''] before:absolute before:-left-[4vw] before:w-[34%] top-[22vh]
          before:top-[20.47vh;] before:h-full before:bg-no-repeat before:bg-contain before:z-[-1] before:rotate-0"
          >
            {/* Use the actual <img> tag here */}
            <img src={gimage9} alt="" className="w-full h-auto" />
          </div>

          <div className="flex flex-col gap-4 mt-6">
            <img src={gimage8} alt="" className="w-[4rem]" />
            <h1 className="font-bold text-2xl">Ensure Student Safety</h1>
            <p>
              Track student and staff check in/out, send notification SMS to
              parents and ensure safety for students.
            </p>
          </div>
        </div>
        {/* block 3 */}

        {/* block 4 */}
        <div className="grid grid-cols-3 justify-items-center mt-20">
          <div className="flex flex-col gap-4 mt-6">
            <img src={gimage10} alt="" className="w-[4rem]" />
            <h1 className="font-bold text-2xl">Track Performance</h1>
            <p>
              Get detailed progress report of your students’ performance
              including assessments and attendance.
            </p>
          </div>

          <div
            className="relative w-[36vw] mt-[1vh] before:content-[''] before:absolute before:-left-[2vw] before:w-[34%] top-[25vh]
          before:top-[20.47vh;] before:h-full before:bg-no-repeat before:bg-contain before:z-[-1] before:rotate-0"
          >
            {/* Use the actual <img> tag here */}
            <img src={gimage11} alt="" className="w-full h-auto" />
          </div>

          <div className="block z-10">
            <img src={gimage12} alt="" className="w-[75%]" />
          </div>
        </div>
        {/* block 4 */}

        {/* block 5 */}
        <div className="flex justify-between gap-20 relative top-[14vh]">
          <div>
            <img
              src={gimage13}
              alt=""
              className="w-[55%] justify-self-center mt-[4vh]"
            />
          </div>

          <div className="flex flex-col gap-4 w-[40vw] justify-center">
            <img src={gimage14} alt="" className="w-[4rem]" />
            <h1 className="font-bold text-2xl">
              Build the classroom of your dreams
            </h1>
            <p>
              Your students, parents, staff, and moderators have their own
              accounts which they can use to see attendance, payments, and
              assessment status.
            </p>
          </div>
        </div>
        {/* block 5 */}
      </div>
    </>
  );
};

export default GalaryImage;