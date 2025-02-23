import image1 from "../../../assets/galaryimages/1.jpg";
import image2 from "../../../assets/galaryimages/2.jpg";
import image3 from "../../../assets/galaryimages/3.jpg";
import image4 from "../../../assets/galaryimages/4.jpg";
import image5 from "../../../assets/galaryimages/5.jpg";
import image6 from "../../../assets/galaryimages/6.jpg";
import image7 from "../../../assets/galaryimages/7.jpg";
import image8 from "../../../assets/galaryimages/8.jpg";
import image9 from "../../../assets/galaryimages/9.jpg";

const Galary = () => {
  return (
    <>
    <div className="grid grid-cols-5 gap-4 mt-20">
        <div>
            <img src={image1} alt="" className="mb-6 w-[326px] rounded-4xl" />
            <img src={image2} alt="" className="w-[326px] rounded-4xl"/>
        </div>

        <div className="mt-[4rem]">
            <img src={image3} alt="" className="mb-6 w-[326px] rounded-4xl" />
            <img src={image4} alt="" className="w-[326px] rounded-4xl"/>
        </div>

        <div className="mt-[5rem]">
            <img src={image5} alt="" className="mb-6 w-[326px] rounded-4xl" />
            <div className="w-[290px] rounded-4xl bg-gray-100 p-4">
                <p className="text-[1.6rem] font-bold text-wrap text-center py-[5vh]">Build a Classroom 10 years ahead of your Competition</p>
            </div>
        </div>

        <div className="mt-[4rem]">
            <img src={image6} alt="" className="mb-6 w-[326px] rounded-4xl" />
            <img src={image7} alt="" className="w-[326px] rounded-4xl"/>
        </div>

        <div>
            <img src={image8} alt="" className="mb-6 w-[326px] rounded-4xl" />
            <img src={image9} alt="" className="w-[326px] rounded-4xl"/>
        </div>
    </div>
    </>
  );
}

export default Galary;