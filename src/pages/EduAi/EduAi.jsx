import { useState } from "react";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import VidCard from "../../components/VidCard/VidCard";
import star from "../../assets/eduai/star4.png";
import explore from "../../assets/eduai/explore.gif";
import { Link } from "react-router";
import { RiChat2Fill } from "react-icons/ri";

const EduAi = () => {
  const [activeKey, setActiveKey] = useState(null);

  const onChange = (key) => {
    setActiveKey(key === activeKey ? null : key);
  };

  const items = [
    {
      key: "1",
      label: getLabel(
        <div
          style={{
            position: "relative",
            width: "100%",
            cursor: "pointer",
            fontSize: "20px",
            fontWeight: "600",
            color: "#374957",
          }}
          onClick={(event) => {
            event.stopPropagation(); // Prevent event bubbling from header
            onChange("1");
          }}
        >
          How do I start integrating Al into my school?
          <div style={{ position: "absolute", right: 0, top: 0 }}>
            {activeKey !== "1" && (
              <PlusOutlined
                onClick={(event) => {
                  event.stopPropagation(); // Prevent event bubbling from plus icon
                  onChange("1");
                }}
              />
            )}
          </div>
        </div>
      ),
      children: (
        <div style={{ position: "relative", paddingTop: "10px" }}>
          Book a demo with us. Our team will guide you through the setup and
          integration process, ensuring a smooth transition to the enhanced
          learning environment.
          {activeKey === "1" && (
            <CloseOutlined
              style={{ position: "absolute", right: "0", top: "10px" }}
              onClick={(event) => {
                event.stopPropagation(); // Prevent event bubbling from close icon
                onChange("1");
              }}
            />
          )}
        </div>
      ),
    },
    {
      key: "2",
      label: getLabel(
        <div
          style={{
            position: "relative",
            width: "100%",
            cursor: "pointer",
            fontSize: "20px",
            fontWeight: "600",
            color: "#374957",
          }}
          onClick={(event) => {
            event.stopPropagation();
            onChange("2");
          }}
        >
          Can I try Edutechs Al for free?
          <div style={{ position: "absolute", right: 0, top: 0 }}>
            {activeKey !== "2" && (
              <PlusOutlined
                onClick={(event) => {
                  event.stopPropagation();
                  onChange("2");
                }}
              />
            )}
          </div>
        </div>
      ),
      children: (
        <div style={{ position: "relative", paddingTop: "10px" }}>
          Yes, we offer a demo or trial period for schools to explore the Al
          capabilities before making a commitment. Please contact us for more
          details.
          {activeKey === "2" && (
            <CloseOutlined
              style={{ position: "absolute", right: "0", top: "10px" }}
              onClick={(event) => {
                event.stopPropagation();
                onChange("2");
              }}
            />
          )}
        </div>
      ),
    },
    {
      key: "3",
      label: getLabel(
        <div
          style={{
            position: "relative",
            width: "100%",
            cursor: "pointer",
            fontSize: "20px",
            fontWeight: "600",
            color: "#374957",
          }}
          onClick={(event) => {
            event.stopPropagation();
            onChange("3");
          }}
        >
          How does the Al tutoring feature work?
          <div style={{ position: "absolute", right: 0, top: 0 }}>
            {activeKey !== "3" && (
              <PlusOutlined
                onClick={(event) => {
                  event.stopPropagation();
                  onChange("3");
                }}
              />
            )}
          </div>
        </div>
      ),
      children: (
        <div style={{ position: "relative", paddingTop: "10px" }}>
          The Al tutor adapts to each student's unique learning style, providing
          personalized assistance and support whenever needed, allowing students
          to ask questions and receive instant, accurate responses.
          {activeKey === "3" && (
            <CloseOutlined
              style={{ position: "absolute", right: "0", top: "10px" }}
              onClick={(event) => {
                event.stopPropagation();
                onChange("3");
              }}
            />
          )}
        </div>
      ),
    },
    {
      key: "4",
      label: getLabel(
        <div
          style={{
            position: "relative",
            width: "100%",
            cursor: "pointer",
            fontSize: "20px",
            fontWeight: "600",
            color: "#374957",
          }}
          onClick={(event) => {
            event.stopPropagation();
            onChange("4");
          }}
        >
          Can Al-generated assessments replace traditional evaluations?
          <div style={{ position: "absolute", right: 0, top: 0 }}>
            {activeKey !== "4" && (
              <PlusOutlined
                onClick={(event) => {
                  event.stopPropagation();
                  onChange("4");
                }}
              />
            )}
          </div>
        </div>
      ),
      children: (
        <div style={{ position: "relative", paddingTop: "10px" }}>
          Our Al-generated assessments are designed to be used alongside
          traditional exams and assessments. It specifically designed to target
          students' weak areas and provide instant feedback, making evaluations
          more personalized, efficient and fast.
          {activeKey === "4" && (
            <CloseOutlined
              style={{ position: "absolute", right: "0", top: "10px" }}
              onClick={(event) => {
                event.stopPropagation();
                onChange("4");
              }}
            />
          )}
        </div>
      ),
    },
    {
      key: "5",
      label: getLabel(
        <div
          style={{
            position: "relative",
            width: "100%",
            cursor: "pointer",
            fontSize: "20px",
            fontWeight: "600",
            color: "#374957",
          }}
          onClick={(event) => {
            event.stopPropagation();
            onChange("5");
          }}
        >
          What types of learning materials can I generate?
          <div style={{ position: "absolute", right: 0, top: 0 }}>
            {activeKey !== "5" && (
              <PlusOutlined
                onClick={(event) => {
                  event.stopPropagation();
                  onChange("5");
                }}
              />
            )}
          </div>
        </div>
      ),
      children: (
        <div style={{ position: "relative", paddingTop: "10px" }}>
          Our Al can create a variety of learning materials, including
          explanatory videos, animations, diagrams, flowcharts, and more, all
          generated instantly based on simple prompts from teachers.
          {activeKey === "5" && (
            <CloseOutlined
              style={{ position: "absolute", right: "0", top: "10px" }}
              onClick={(event) => {
                event.stopPropagation();
                onChange("5");
              }}
            />
          )}
        </div>
      ),
    },
    {
      key: "6",
      label: getLabel(
        <div
          style={{
            position: "relative",
            width: "100%",
            cursor: "pointer",
            fontSize: "20px",
            fontWeight: "600",
            color: "#374957",
          }}
          onClick={(event) => {
            event.stopPropagation();
            onChange("6");
          }}
        >
          How does the conflict detection feature ensure student safety?
          <div style={{ position: "absolute", right: 0, top: 0 }}>
            {activeKey !== "6" && (
              <PlusOutlined
                onClick={(event) => {
                  event.stopPropagation();
                  onChange("6");
                }}
              />
            )}
          </div>
        </div>
      ),
      children: (
        <div style={{ position: "relative", paddingTop: "10px" }}>
          Our Al-driven surveillance system monitors the campus in real-time to
          detect issues like ragging, bullying, physical violence, and sexual
          harassment. By analyzing behavior patterns, it alerts school
          authorities immediately upon identifying any suspicious activities,
          enabling swift intervention and creating a safer learning environment.
          {activeKey === "6" && (
            <CloseOutlined
              style={{ position: "absolute", right: "0", top: "10px" }}
              onClick={(event) => {
                event.stopPropagation();
                onChange("6");
              }}
            />
          )}
        </div>
      ),
    },
    {
      key: "7",
      label: getLabel(
        <div
          style={{
            position: "relative",
            width: "100%",
            cursor: "pointer",
            fontSize: "20px",
            fontWeight: "600",
            color: "#374957",
          }}
          onClick={(event) => {
            event.stopPropagation();
            onChange("7");
          }}
        >
          What tasks can the action model perform for educators?
          <div style={{ position: "absolute", right: 0, top: 0 }}>
            {activeKey !== "7" && (
              <PlusOutlined
                onClick={(event) => {
                  event.stopPropagation();
                  onChange("7");
                }}
              />
            )}
          </div>
        </div>
      ),
      children: (
        <div style={{ position: "relative", paddingTop: "10px" }}>
          The action model automates various administrative tasks, allowing
          teachers to focus on instruction while handling scheduling, reminders,
          and other routine tasks seamlessly in the background.
          {activeKey === "7" && (
            <CloseOutlined
              style={{ position: "absolute", right: "0", top: "10px" }}
              onClick={(event) => {
                event.stopPropagation();
                onChange("7");
              }}
            />
          )}
        </div>
      ),
    },
    {
      key: "8",
      label: getLabel(
        <div
          style={{
            position: "relative",
            width: "100%",
            cursor: "pointer",
            fontSize: "20px",
            fontWeight: "600",
            color: "#374957",
          }}
          onClick={(event) => {
            event.stopPropagation();
            onChange("8");
          }}
        >
          What support is available after implementation?
          <div style={{ position: "absolute", right: 0, top: 0 }}>
            {activeKey !== "8" && (
              <PlusOutlined
                onClick={(event) => {
                  event.stopPropagation();
                  onChange("8");
                }}
              />
            )}
          </div>
        </div>
      ),
      children: (
        <div style={{ position: "relative", paddingTop: "10px" }}>
          Yes. You can revert back to the free plan whenever you want. However,
          please note that you will lose access to the exclusive features of the
          pro plan.
          {activeKey === "8" && (
            <CloseOutlined
              style={{ position: "absolute", right: "0", top: "10px" }}
              onClick={(event) => {
                event.stopPropagation();
                onChange("8");
              }}
            />
          )}
        </div>
      ),
    },
    {
      key: "9",
      label: getLabel(
        <div
          style={{
            position: "relative",
            width: "100%",
            cursor: "pointer",
            fontSize: "20px",
            fontWeight: "600",
            color: "#374957",
          }}
          onClick={(event) => {
            event.stopPropagation();
            onChange("9");
          }}
        >
          Can I upgrade later or in the future after I start using it?
          <div style={{ position: "absolute", right: 0, top: 0 }}>
            {activeKey !== "9" && (
              <PlusOutlined
                onClick={(event) => {
                  event.stopPropagation();
                  onChange("9");
                }}
              />
            )}
          </div>
        </div>
      ),
      children: (
        <div style={{ position: "relative", paddingTop: "10px" }}>
          We provide ongoing support through our dedicated customer service
          team, training sessions, and resources to help educators maximize the
          benefits of Al in their classrooms.
          {activeKey === "9" && (
            <CloseOutlined
              style={{ position: "absolute", right: "0", top: "10px" }}
              onClick={(event) => {
                event.stopPropagation();
                onChange("9");
              }}
            />
          )}
        </div>
      ),
    },
  ];

  function getLabel(text, key) {
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          cursor: "pointer",
          fontSize: "20px",
          fontWeight: "600",
          color: "#374957",
        }}
        onClick={(event) => {
          event.stopPropagation();
          onChange(key);
        }}
      >
        {text}
      </div>
    );
  }

  const customPanelStyle = {
    marginBottom: 24,
    overflow: "hidden",
    background: "white",
    border: "none",
  };

  return (
    <>
    <section className="bg-white">
        <div>
          <div className="w-9/12 h-auto my-4 p-2 mx-auto flex flex-col items-center gap-6">
          <img src={star} alt="" className="w-[10vw]" />
          <h1 className="text-6xl w-[56vw] font-bold text-center leading-[1.3]">Future-proof your school with your own personal AI</h1>
          <img src={explore} alt="" className="w-[11vw] my-20 invert" />
          </div>
          <VidCard />
        </div>
      </section>
    <div className="bg-[#f0f4ff] relative top-[33vh]">
      {/* container */}
      <div className="w-10/12 mx-auto relative top-[15vh]">
        {/* faq */}
        <div>
          <div className="my-10">
            <h1 className="text-4xl font-bold text-[#313a52]">FAQ</h1>
          </div>
          {/* acronym */}
          <Collapse
            activeKey={[activeKey]}
            onChange={onChange}
            expandIcon={() => null}
            items={items}
            style={customPanelStyle}
          />
          {/* acronym */}
        </div>
        {/* start */}
        <div className="mx-auto mt-[10rem] flex flex-col relative z-10">
          <div className="relative bottom-[6vh] h-[30vh] flex items-center px-10 py-[4rem] gap-[6vw] bg-blue-600 rounded-3xl">
            <div className="">
              <h1 className="text-4xl text-white text-nowrap">
                Give your classroom the upgrade it deserves
              </h1>
            </div>
            <div className="">
              <Link to="/auth/sign-up">
              <button className="text-blue-600 text-xl px-[5vw] py-4 rounded-4xl bg-white cursor-pointer">
                <p className="relative">Start For Free</p>
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

export default EduAi;