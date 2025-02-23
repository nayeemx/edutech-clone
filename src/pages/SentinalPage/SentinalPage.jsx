// SentinalPage.js
import { useState, useRef, useEffect } from "react";
import { SnavBar } from "../../components/NavBar/NavBar";
import sentinalcontent from "../../assets/sentinal/sentinel-top-content.png";
import senticard_lite from "../../assets/sentinal/sentinel-card-lite.png";
import senticard_pro from "../../assets/sentinal/sentinel-card-pro.png";
import senticard_elit from "../../assets/sentinal/sentinel-card-elite.png";
import expensive from "../../assets/sentinal/sentinel-without-package.svg";
import cardimg from "../../assets/sentinal/sentinel-companion.svg";
import CheckoutModal from "../../components/checkoutModal/CheckoutModal";
import clsx from "clsx";
import table_sentinal from "../../assets/sentinal/Sentinel-Logo-Original.svg";
import zkt from "../../assets/sentinal/zkteco.svg";
import tips from "../../assets/sentinal/tipshoi.svg";
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { IoIosGlobe } from "react-icons/io";
import { BiLogoFacebookSquare } from "react-icons/bi";
import client1 from "../../assets/sentinal/client/tanzimulUmmahMadrasaLogo.png";
import client2 from "../../assets/sentinal/client/accountingByRefayatSir (Legends)Logo.png";
import client3 from "../../assets/sentinal/client/edbaseLogo.png";
import client4 from "../../assets/sentinal/client/edbridgeLogo.png";
import client5 from "../../assets/sentinal/client/educareHatekhariSchoolLogo.png";
import client6 from "../../assets/sentinal/client/holyPenInternationalSchoolLogo.png";
import client7 from "../../assets/sentinal/client/iTZAcademicCareLogo.png";
import client8 from "../../assets/sentinal/client/nooraniTalimulQuranMadrasaLogo.png";
import client9 from "../../assets/sentinal/client/universalIdealSchoolLogo.png";
import client10 from "../../assets/sentinal/client/albatrossEducationLogo.png";
import client11 from "../../assets/sentinal/client/MadrasatulIhsanAlIslamiaLogo.png";
import { RiChat2Fill } from "react-icons/ri";
import { Sfooter } from "../../components/Footer/Footer";

const SentinalPage = () => {
    // Use a single state for modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [initialQuantity, setInitialQuantity] = useState(1);
    const [productInfo, setProductInfo] = useState(null);  // Use a single state for product data
    const [lastClickedButton, setLastClickedButton] = useState(null);
    const quantityInputRef = useRef(null);

      const liteButtonRef = useRef(null);
  const proButtonRef = useRef(null);
  const eliteButtonRef = useRef(null);
  const basicButtonRef = useRef(null);
  const companionButtonRef = useRef(null); // Ref for the companion button


      const productData = {
        lite: {
          name: "Sentinel Lite",
          price: 15000,
          image: senticard_lite,
        },
        pro: {
          name: "Sentinel Pro",
          price: 25000,
          image: senticard_pro,
        },
        elite: {
          name: "Sentinel Elite",
          price: 40000,
          image: senticard_elit,
        },
        basic: {
          name: "Sentinel Hub Basic",
          price: 7500,
          image: expensive,
        },
        companion: {
          // Add companion product data
          name: "EduPass Scanner",
          price: 10000,
          image: cardimg,
        },
      };


  // Correctly open the modal and set product data
    const openModal = (productKey) => {
        setProductInfo(productData[productKey]);
        setInitialQuantity(1);
        setIsModalOpen(true); // Use the single state
        setLastClickedButton(productKey); // Correctly set last clicked button
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setProductInfo(null); // Clear product info on close
    };

    const productsRef = useRef(null);
      const pricingRef = useRef(null);
      const clientsRef = useRef(null);
      const [activeSection, setActiveSection] = useState('');
    
      const scrollToSection = (sectionId) => {
        const ref = {
          products: productsRef,
          pricing: pricingRef,
          clients: clientsRef,
        }[sectionId];
    
        if (ref && ref.current) {
          ref.current.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(sectionId);
        }
      };
    
      // Add a useEffect hook to handle clicks outside the navbar
      useEffect(() => {
        const handleClickOutside = (event) => {
          // Check if the click target is inside the navbar
          if (!event.target.closest('.sticky')) { // Use a class that's on your navbar
            setActiveSection('');
          }
        };
    
        // Add the event listener when the component mounts
        document.addEventListener('click', handleClickOutside);
    
        // Clean up the event listener when the component unmounts
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, []); // Empty dependency array ensures this runs only once on mount/unmount
  return (
    <>
      <SnavBar scrollToSection={scrollToSection} activeSection={activeSection} />

      <section className="bg-[#f2f3f4]">
        <div className="w-10/12 mx-auto text-center pt-[10vh]">
          <h1 className="text-4xl font-normal text-[#131413]">
            Ensure Student Safety with Sentinel
          </h1>
          <p className="text-[#131413] text-xl font-bold w-[46vw] justify-self-center mt-4">
            Track student and staff check in/out, send notification SMS to
            parents and ensure safety for student
          </p>
          <img src={sentinalcontent} alt="" className="w-1/2 mx-auto mt-12" />
        </div>
      </section>

      <section className="bg-[#f2f3f4] pt-[16vh]" ref={productsRef} id="products">
        <div className="w-10/12 mx-auto">
          <h1 className="text-4xl text-center">Product Tiers</h1>

          <p className="text-lg font-semibold text-[#8b8b8c] my-8 border-b-2 border-[#abaeab]">
            SENTINEL HUBS
          </p>

          <div className="grid grid-cols-3 gap-10">
            <div className="bg-white px-4 py-6 rounded-4xl">
              <img src={senticard_lite} alt="" />
              <h3 className="text-3xl font-normal text-[#2eb263] text-center mt-[6vh]">
                Lite
              </h3>
              <div className="text-center font-semibold text-[#545454]">
                <p>Scans QR</p>
                <p>4.8 inch 60hz display</p>
                <p>Avg speed: 25 scans/min</p>
                <p>1 year warranty</p>
              </div>
              <h1 className="text-3xl text-center font-normal text-[#131413] mt-[10vh]">
                15,000 BDT
              </h1>
              <button
                 ref={liteButtonRef}
                className={clsx(
                  "w-full text-[#131413] p-4 mt-[6vh] rounded-lg border-2 border-[#e0e1e0] hover:bg-[#e0e1e0] transition-colors duration-300",
                  {
                    "bg-[#e0e1e0] border-[#e0e1e0]":
                      lastClickedButton === "lite",
                  }
                )}
                onClick={() => openModal("lite")}
              >
                <span className="relative top-[0.5vh]">Buy Now</span>
              </button>
            </div>
            <div className="bg-white px-4 py-6 rounded-4xl">
              <img src={senticard_pro} alt="" />
              <h3 className="text-3xl font-normal text-[#2eb263] text-center mt-[6vh]">
                Pro
              </h3>
              <div className="text-center font-semibold text-[#545454]">
                <p>Scans QR</p>
                <p>6.4 inch 90hz display</p>
                <p>Avg speed: 60 scans/min</p>
                <p>BuyBack Program</p>
                <p>1 year warranty</p>
              </div>
              <h1 className="text-3xl text-center font-normal text-[#131413] mt-[6.5vh]">
                25,000 BDT
              </h1>
              <button
                ref={proButtonRef}
                className={clsx(
                  "w-full text-[#131413] p-4 mt-[6vh] rounded-lg border-2 border-[#e0e1e0] hover:bg-[#e0e1e0] transition-colors duration-300",
                  {
                    "bg-[#e0e1e0] border-[#e0e1e0]":
                      lastClickedButton === "pro",
                  }
                )}
                onClick={() => openModal("pro")}
              >
                <span className="relative top-[0.5vh]">Buy Now</span>
              </button>
            </div>
            <div className="bg-white px-4 py-6 rounded-4xl">
              <img src={senticard_elit} alt="" />
              <h3 className="text-3xl font-normal text-[#2eb263] text-center mt-[6vh]">
                Elite
              </h3>
              <div className="text-center font-semibold text-[#545454]">
                <p>Scans QR, RFID Card & Face</p>
                <p>6.6 inch 90hz display</p>
                <p>Avg speed: 60 scans/min</p>
                <p>Supports proximity face scan</p>
                <p>BuyBack Program</p>
                <p>1 year warranty</p>
              </div>
              <h1 className="text-3xl text-center font-normal text-[#131413] mt-[3vh]">
                40,000 BDT
              </h1>
           <button
                ref={eliteButtonRef}
                className={clsx(
                  "w-full text-white p-4 mt-[6vh] rounded-lg  border-2  hover:border-[#196237] hover:bg-[#196237] transition-colors duration-300",
                  {
                    "bg-[#196237] border-[#196237]":
                      lastClickedButton === "elite",
                    "bg-[#2eb263] border-[#2eb263]":
                      lastClickedButton !== "elite",
                  }
                )}
                onClick={() => openModal("elite")}
              >
                <span className="relative top-[0.5vh]">Buy Now</span>
              </button>
            </div>
          </div>

          <div className="border-2 border-[#e8e8e8] p-8 mt-[5vh] rounded-3xl bg-white">
            <div className="flex items-center gap-6">
              <div className="w-[10%]">
                <div>
                  <img src={expensive} alt="" className="w-full" />
                </div>
              </div>
              <div className="w-[90%]">
                <h2 className="font-normal text-[#505350] text-3xl">
                  Still too expensive?
                </h2>
                <h3 className="text-3xl font-normal text-[#2eb263] mt-1">
                  Use your own existing device with Sentinel Basic
                </h3>
                <p className="text-sm text-[#505350] font-semibold mt-2">
                  We will only charge you for the setup, integration and
                  software. You will have access to QR scan and even face scan
                  based on your device's specification and performance.
                </p>
                <button
                  ref={basicButtonRef}
                  className={clsx(
                    "hover:bg-[#e0e1e0] border border-[#e0e1e0] text-[#505350] font-normal py-2 px-4 rounded-lg mt-4 transition-colors duration-300",
                    {
                      "bg-[#e0e1e0] border-[#e0e1e0]":
                        lastClickedButton === "basic",
                      "bg-white": lastClickedButton !== "basic",
                    }
                  )}
                  onClick={() => openModal("basic")}
                >
                  Start Using at Just 7,500 BDT
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f2f3f4] py-[16vh]">
        <div className="w-10/12 mx-auto">
          <div className="mb-[8vh] pb-4 border-b-2 border-[#abaeab] text-[#545454]">
            <span>SENTINEL COMPANION</span>
          </div>
          <div className="flex flex-col md:flex-row items-center md:items-center bg-[#ededed] border-2 border-[#e8e8e8] rounded-3xl">
            <div className="md:w-2/4 mb-6 md:mb-0 md:mr-8">
              <img
                src={cardimg}
                alt="EduPass Scanner"
                className="w-full rounded-3xl"
              />
            </div>

            <div className="md:w-3/4">
              <h2 className="text-2xl font-normal text-[#505350]">Ultrafast</h2>
              <h3 className="text-2xl font-normal text-[#2eb263]">
                EduPass Scanner
              </h3>
              <p className="text-[#505350] my-1">
                Scans RFID Card  <span className="font-normal text-[#505350] border-l-2 border-r-2 border-[#abaeab] px-2">Avg Scan Speed: 300 scans/min</span>  1 year warranty
              </p>
              <p className="text-2xl font-bold text-gray-800">
                10,000 BDT
              </p>

              <button
                ref={companionButtonRef}
                className={clsx(
                  "text-[#131413] py-2 px-8 rounded-lg border-2 border-[#e0e1e0] hover:bg-[#e0e1e0] transition-colors duration-300",
                  {
                    "bg-[#e0e1e0] border-[#e0e1e0]":
                      lastClickedButton === "companion",
                  }
                )}
                onClick={() => openModal("companion")}
              >
                <span className="relative top-[0.5vh]" ref={pricingRef} id="pricing">Buy Now</span>
              </button>
            </div>
          </div>
        </div>

        {/* table here */}
        <div className="w-10/12 mx-auto mt-[20vh]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left font-bold py-2 px-4 w-4/12">
                  FEATURES / OFFERINGS
                </th>

                <div className="w-[16.46vw] border-t-2 border-l-2 border-r-2 rounded-t-2xl border-[#2eb263] relative left-[10vw]">
                <th className="text-left py-2 w-[16.46vw] bg-[#deece5] rounded-t-2xl">
                  <img
                    src={table_sentinal}
                    alt="Sentinel"
                    className="h-[40px] ml-3"
                  />
                </th>
                </div>

                <th className="text-left w-2/12 py-2 pl-2">
                  <img src={zkt} alt="ZKTeco" className="h-[40px]" />
                </th>
                <th className="text-left w-2/12 py-2">
                  <img src={tips} alt="tipshe" className="h-[40px]" />
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              <tr className="group">
                <td className="py-2 px-4">Ease of Use</td>

                <div className="group w-[16.46vw] border-l-2 border-r-2 border-[#2eb263] relative left-[10vw]">
                <td className="group w-[16.46vw] py-2 px-4 bg-[#e8f0ed] group-hover:bg-white">
                  <CheckCircleFilled style={{ color: 'green', fontSize: '20px' }} />
                </td>
                </div>

                <td className="py-2 px-4">
                  <CloseCircleFilled style={{ color: 'red', fontSize: '20px' }} />
                </td>
                <td className="py-2 px-4">
                  <CloseCircleFilled style={{ color: 'red', fontSize: '20px' }} />
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="group">
                <td className="py-2 px-4">User Limit</td>
                
                <div className="group w-[16.46vw] border-l-2 border-r-2 border-[#2eb263] relative left-[10vw]">
                <td className="group w-[16.46vw] py-2 px-4 bg-[#e8f0ed] group-hover:bg-white">
                  Unlimited
                </td>
                </div>

                <td className="py-2 px-4">1,000</td>
                <td className="py-2 px-4">20K</td>
              </tr>
              {/* Row 3 */}
              <tr className="group">
                <td className="py-2 px-4">History</td>

                <div className="group w-[16.46vw] border-l-2 border-r-2 border-[#2eb263] relative left-[10vw]">
                <td className="group w-[16.46vw] py-2 px-4 bg-[#e8f0ed] group-hover:bg-white">
                  Unlimited
                </td>
                </div>
                
                <td className="py-2 px-4">100K</td>
                <td className="py-2 px-4">500K</td>
              </tr>
              {/* Row 4 */}
              <tr className="group">
                <td className="py-2 px-4">Cloud Backup</td>

                <div className="group w-[16.46vw] border-l-2 border-r-2 border-[#2eb263] relative left-[10vw]">
                <td className="group w-[16.46vw] py-2 px-4 bg-[#e8f0ed] group-hover:bg-white">
                <CheckCircleFilled style={{ color: 'green', fontSize: '20px' }} />
                </td>
                </div>
                
                <td className="py-2 px-4">
                  <CloseCircleFilled style={{ color: 'red', fontSize: '20px' }} />
                </td>
                <td className="py-2 px-4">
                  <CheckCircleFilled style={{ color: 'green', fontSize: '20px' }} />
                </td>
              </tr>
              {/* Row 5 */}
              <tr className="group">
                <td className="py-2 px-4">BuyBack Program</td>
                
                <div className="group w-[16.46vw] border-l-2 border-r-2 border-[#2eb263] relative left-[10vw]">
                <td className="group w-[16.46vw] py-2 px-4 bg-[#e8f0ed] group-hover:bg-white">
                  <CheckCircleFilled style={{ color: 'green', fontSize: '20px' }} />
                </td>
                </div>

                <td className="py-2 px-4">
                  <CloseCircleFilled style={{ color: 'red', fontSize: '20px' }} />
                </td>
                <td className="py-2 px-4">
                  <CloseCircleFilled style={{ color: 'red', fontSize: '20px' }} />
                </td>
              </tr>
              {/* Row 6 */}
              <tr className="group">
                <td className="py-2 px-4">Battery Backup</td>
                
                <div className="group w-[16.46vw] border-l-2 border-r-2 border-[#2eb263] relative left-[10vw]">
                <td className="group w-[16.46vw] py-2.5 px-4 bg-[#e8f0ed] group-hover:bg-white">
                  8H
                </td>
                </div>

                <td className="py-2 px-4">
                  <CloseCircleFilled style={{ color: 'red', fontSize: '20px' }} />
                </td>
                <td className="py-2 px-4">4H</td>
              </tr>
              {/* Row 7 */}
              <tr className="group">
                <td className="py-2 px-4">Connectivity</td>
                
                <div className="group w-[16.46vw] border-l-2 border-r-2 border-[#2eb263] relative left-[10vw]">
                <td className="group w-[16.46vw] py-2 px-4 bg-[#e8f0ed] group-hover:bg-white">
                  Wi-Fi, Cellular
                </td>
                </div>

                <td className="py-2 px-4">Ethernet</td>
                <td className="py-2 px-4">Cellular</td>
              </tr>
              {/* Row 8 (Last Row - Add rounded corners here) */}
              <tr className="group">
                <td className="py-2 px-4">
                  Price
                </td>

                <div className="group w-[16.46vw] border-l-2 border-r-2 border-b-2 border-[#2eb263] rounded-b-2xl relative left-[10vw]">
                <td className="group w-[16.46vw] py-2 px-4 bg-[#e8f0ed] rounded-b-2xl group-hover:bg-white">
                  15,000 BDT
                </td>
                </div>

                <td className="py-2 px-4">20,000 BDT</td>
                <td className="py-2 px-4">40,000 BDT</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* table here */}
      </section>

      <section className="bg-[#f2f3f4]" ref={clientsRef} id="clients">
        <div className="pt-[6vh]">
        <div className="text-center text-xl font-normal my-10">
          <p>Our Clients</p>
        </div>
        <div className="w-9/12 mx-auto grid grid-cols-4 gap-8">

        <div className="bg-white p-8 border-2 border-[#e8e8e8] rounded-2xl">
          <div className="flex gap-4">
            <div>
              <img src={client1} alt="" className="w-[4.125vw]" />
            </div>
            <div>
              <p>Tanzimul Ummah Madrasa</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm mt-4">Uses Sentinel Elite</p>
            <button className="hover:bg-[#e0e1e0] border-2 border-[#e8e8e8] hover:border-[#e0e1e0] flex justify-center gap-2 py-1.5 rounded-sm">
              <p><IoIosGlobe /></p>
              <p className="text-sm">Website</p>
            </button>

            <button className="hover:bg-[#e0e1e0] border-2 border-[#e8e8e8] hover:border-[#e0e1e0] flex justify-center gap-2 py-1.5 rounded-sm">
              <p><BiLogoFacebookSquare /></p>
              <p className="text-sm">Facebook</p>
            </button>
          </div>
        </div>

        <div className="bg-white p-8 border-2 border-[#e8e8e8] rounded-2xl h-[32vh]">
          <div className="flex gap-4">
            <div>
              <img src={client2} alt="" className="w-[3.125vw]" />
            </div>
            <div>
              <p>Tanzimul Ummah Madrasa</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm mt-4">Uses Sentinel Elite</p>
            <button className="hover:bg-[#e0e1e0] border-2 border-[#e8e8e8] hover:border-[#e0e1e0] flex justify-center gap-2 py-1.5 rounded-sm">
              <p><BiLogoFacebookSquare /></p>
              <p className="text-sm">Facebook</p>
            </button>
          </div>
        </div>
        
        <div className="bg-white p-8 border-2 border-[#e8e8e8] rounded-2xl">
          <div className="flex gap-4">
            <div>
              <img src={client3} alt="" className="w-[8.125vw]" />
            </div>
            <div>
              <p>Tanzimul Ummah Madrasa</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm mt-4">Uses Sentinel Elite</p>
            <button className="hover:bg-[#e0e1e0] border-2 border-[#e8e8e8] hover:border-[#e0e1e0] flex justify-center gap-2 py-1.5 rounded-sm">
              <p><IoIosGlobe /></p>
              <p className="text-sm">Website</p>
            </button>

            <button className="hover:bg-[#e0e1e0] border-2 border-[#e8e8e8] hover:border-[#e0e1e0] flex justify-center gap-2 py-1.5 rounded-sm">
              <p><BiLogoFacebookSquare /></p>
              <p className="text-sm">Facebook</p>
            </button>
          </div>
        </div>

        <div className="bg-white p-8 border-2 border-[#e8e8e8] rounded-2xl">
          <div className="flex gap-4">
            <div>
              <img src={client4} alt="" className="w-[8.125vw]" />
            </div>
            <div>
              <p>Tanzimul Ummah Madrasa</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm mt-4">Uses Sentinel Elite</p>
            <button className="hover:bg-[#e0e1e0] border-2 border-[#e8e8e8] hover:border-[#e0e1e0] flex justify-center gap-2 py-1.5 rounded-sm">
              <p><IoIosGlobe /></p>
              <p className="text-sm">Website</p>
            </button>

            <button className="hover:bg-[#e0e1e0] border-2 border-[#e8e8e8] hover:border-[#e0e1e0] flex justify-center gap-2 py-1.5 rounded-sm">
              <p><BiLogoFacebookSquare /></p>
              <p className="text-sm">Facebook</p>
            </button>
          </div>
        </div>

        <div className="bg-white p-8 border-2 border-[#e8e8e8] rounded-2xl h-[32vh]">
          <div className="flex gap-4">
            <div>
              <img src={client5} alt="" className="w-[5.125vw]" />
            </div>
            <div>
              <p>Tanzimul Ummah Madrasa</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm mt-4">Uses Sentinel Elite</p>
            <button className="hover:bg-[#e0e1e0] border-2 border-[#e8e8e8] hover:border-[#e0e1e0] flex justify-center gap-2 py-1.5 rounded-sm">
              <p><BiLogoFacebookSquare /></p>
              <p className="text-sm">Facebook</p>
            </button>
          </div>
        </div>

        <div className="bg-white p-8 border-2 border-[#e8e8e8] rounded-2xl h-[32vh]">
          <div className="flex gap-4">
            <div>
              <img src={client6} alt="" className="w-[3.7vw]" />
            </div>
            <div>
              <p>Tanzimul Ummah Madrasa</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm mt-4">Uses Sentinel Elite</p>
            <button className="hover:bg-[#e0e1e0] border-2 border-[#e8e8e8] hover:border-[#e0e1e0] flex justify-center gap-2 py-1.5 rounded-sm">
              <p><BiLogoFacebookSquare /></p>
              <p className="text-sm">Facebook</p>
            </button>
          </div>
        </div>

        <div className="bg-white p-8 border-2 border-[#e8e8e8] rounded-2xl h-[32vh]">
          <div className="flex gap-4">
            <div>
              <img src={client7} alt="" className="w-[7.5vw]" />
            </div>
            <div>
              <p>Tanzimul Ummah Madrasa</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm mt-4">Uses Sentinel Elite</p>
            <button className="hover:bg-[#e0e1e0] border-2 border-[#e8e8e8] hover:border-[#e0e1e0] flex justify-center gap-2 py-1.5 rounded-sm">
              <p><BiLogoFacebookSquare /></p>
              <p className="text-sm">Facebook</p>
            </button>
          </div>
        </div>

        <div className="bg-white p-8 border-2 border-[#e8e8e8] rounded-2xl">
          <div className="flex gap-4">
            <div>
              <img src={client8} alt="" className="w-[5.125vw]" />
            </div>
            <div>
              <p>Tanzimul Ummah Madrasa</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm mt-4">Uses Sentinel Elite</p>
            <button className="hover:bg-[#e0e1e0] border-2 border-[#e8e8e8] hover:border-[#e0e1e0] flex justify-center gap-2 py-1.5 rounded-sm">
              <p><IoIosGlobe /></p>
              <p className="text-sm">Website</p>
            </button>

            <button className="hover:bg-[#e0e1e0] border-2 border-[#e8e8e8] hover:border-[#e0e1e0] flex justify-center gap-2 py-1.5 rounded-sm">
              <p><BiLogoFacebookSquare /></p>
              <p className="text-sm">Facebook</p>
            </button>
          </div>
        </div>

        <div className="bg-white p-8 border-2 border-[#e8e8e8] rounded-2xl h-[32vh]">
          <div className="flex gap-4">
            <div>
              <img src={client9} alt="" className="w-[5.125vw]" />
            </div>
            <div>
              <p>Tanzimul Ummah Madrasa</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm mt-4">Uses Sentinel Elite</p>

            <button className="hover:bg-[#e0e1e0] border-2 border-[#e8e8e8] hover:border-[#e0e1e0] flex justify-center gap-2 py-1.5 rounded-sm">
              <p><BiLogoFacebookSquare /></p>
              <p className="text-sm">Facebook</p>
            </button>
          </div>
        </div>

        <div className="bg-white p-8 border-2 border-[#e8e8e8] rounded-2xl">
          <div className="flex gap-4">
            <div>
              <img src={client10} alt="" className="w-[6.125vw]" />
            </div>
            <div>
              <p>Tanzimul Ummah Madrasa</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm mt-4">Uses Sentinel Elite</p>
            <button className="hover:bg-[#e0e1e0] border-2 border-[#e8e8e8] hover:border-[#e0e1e0] flex justify-center gap-2 py-1.5 rounded-sm">
              <p><IoIosGlobe /></p>
              <p className="text-sm">Website</p>
            </button>

            <button className="hover:bg-[#e0e1e0] border-2 border-[#e8e8e8] hover:border-[#e0e1e0] flex justify-center gap-2 py-1.5 rounded-sm">
              <p><BiLogoFacebookSquare /></p>
              <p className="text-sm">Facebook</p>
            </button>
          </div>
        </div>

        <div className="bg-white p-8 border-2 border-[#e8e8e8] rounded-2xl h-[32vh]">
          <div className="flex gap-4">
            <div>
              <img src={client11} alt="" className="w-[5.125vw]" />
            </div>
            <div>
              <p>Tanzimul Ummah Madrasa</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm mt-4">Uses Sentinel Elite</p>
            <button className="hover:bg-[#e0e1e0] border-2 border-[#e8e8e8] hover:border-[#e0e1e0] flex justify-center gap-2 py-1.5 rounded-sm">
              <p><IoIosGlobe /></p>
              <p className="text-sm">Website</p>
            </button>
          </div>
        </div>
        </div>
        </div>
      </section>

      {/* footer */}
      <Sfooter />

      {/* Correctly use the CheckoutModal */}
      {isModalOpen && (
        <CheckoutModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          productData={productInfo}
          initialQuantity={initialQuantity}
          quantityInputRef={quantityInputRef}
        />
      )}

<div>
          <p className="fixed right-[0.6vw] top-[34rem] bg-blue-500 p-[10px] w-[4vw] h-[8.6vh] z-10 rounded-full">
          <RiChat2Fill className="text-white text-4xl -rotate-[9deg] relative top-[0.4vh] left-[0.3vw]" />
          </p>
        </div>
    </>
  );
};

export default SentinalPage;