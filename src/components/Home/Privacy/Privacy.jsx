import Privacyimg from "../../../assets/privacy.png";
const Privacy = () => {
  return (
    <>
      <div className="flex items-center justify-around bg-white relative top-[30vh]">
        <div className="w-[30%] justify-items-end">
            <img src={Privacyimg} alt="" className="w-[50%] my-[10vh]" />
        </div>
        <div className="w-[30%]">
            <h1 className="text-4xl font-bold py-6">
            Privacy first—always</h1>
          <p>
          Our users’ personal data is kept confidential and will never be shared
          with anyone without their explicit permission.
          </p>
        </div>
      </div>
    </>
  );
};

export default Privacy;
