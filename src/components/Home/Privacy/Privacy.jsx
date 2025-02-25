import Privacyimg from "../../../assets/privacy.png";
const Privacy = () => {
  return (
    <>
      <section className="bg-white">
      <div className="w-8/12 mx-auto flex items-center justify-around relative top-[35vh]">
        <div className="w-[30%] justify-items-end">
            <img src={Privacyimg} alt="" className="w-[50%] my-[10vh]" />
        </div>

        <div className="w-[38%]">
            <h1 className="text-4xl font-bold py-6">
            Privacy first—always</h1>
          <p>
          Our users’ personal data is kept confidential and will never be shared
          with anyone without their explicit permission.
          </p>
        </div>
      </div>
      </section>
    </>
  );
};

export default Privacy;
