import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// --- Assets (Import your images/SVGs here) ---
import LightbulbImage from "../../assets/teacher/opening.gif";
import MoneyImage from "../../assets/teacher/53e9910edc9c26fed09f3712d84175f6.webp";
import RocketImage from "../../assets/teacher/dribbble.gif";

const LandingPage = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Welcome To Edutechs",
      description: "We are here to make your life easier..",
      image: LightbulbImage,
      alt: "Lightbulb Illustration",
    },
    {
      title: "Education and Business Management Tools",
      description:
        "1000, 10,000 or 100,000.  Buy exactly how much or how little your business needs..",
      image: MoneyImage,
      alt: "Money Illustration",
    },
    {
      title: "Simple & Personalised Support",
      description:
        "Message us from the chat button to your bottom-right with any and all problems.  We are here to help you grow.",
      image: RocketImage,
      alt: "Rocket Illustration",
      buttonText: "Let's Go",
      showDoNotShowAgain: true,
    },
  ];

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setShowOnboarding(false);
    }
  };

  const doNotShowAgain = () => {
    setShowOnboarding(false);
    localStorage.setItem("hideOnboarding", "true");
  };

  useEffect(() => {
    const hideOnboarding = localStorage.getItem("hideOnboarding") === "true";
    if (hideOnboarding) {
      setShowOnboarding(false);
    } else {
      setShowOnboarding(true);
    }
  }, []);

  if (!showOnboarding) {
    return null;
  }

  return (
    // The key is to use a separate div for the overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay div */}
      <div className="fixed inset-0 bg-gray-400 opacity-[0.8]"></div>

      {/* Content div (no opacity here) */}
      <motion.div
        className="relative bg-white rounded-lg shadow-xl px-6 py-8 w-full max-w-[50vw]"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        key={step}
      >
        <section className="flex items-center justify-around gap-4 py-8">
          <div className="w-1/2">
            <img
              src={steps[step].image}
              alt={steps[step].alt}
              className="w-[22vw] h-[30vh] mx-auto mb-4"
            />
          </div>

          <div className="w-1/2 px-4">
            {/* data */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 text-center mb-2">
                {steps[step].title}
              </h2>
              <p className="text-gray-600 text-center mb-4">
                {steps[step].description}
              </p>
            </div>

            {/* buttons */}
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                onClick={nextStep}
              >
                {steps[step].buttonText || "NEXT"}
              </button>

              {steps[step].showDoNotShowAgain && (
                <button
                  className="text-blue-500 hover:text-blue-700 mb-1 text-sm w-full text-center"
                  onClick={doNotShowAgain}
                >
                  Do Not Show Again
                </button>
              )}
            </div>
          </div>
        </section>

        <div className="pb-4">
          {/* Carousel Indicators */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 my-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-6 h-1 ${
                  index === step ? "bg-gray-700" : "bg-gray-300"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;