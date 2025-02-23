import { useState, useEffect, useRef } from 'react';
import video1 from "../../assets/eduai/1.mp4";
import video2 from "../../assets/eduai/2.mp4";
import line1 from "../../assets/eduai/line1.png";
import video3 from "../../assets/eduai/3.mp4";
import line2 from "../../assets/eduai/line2.png";
import video4 from "../../assets/eduai/4.mp4";
import line3 from "../../assets/eduai/line3.png";
import video5 from "../../assets/eduai/5.mp4";
import line4 from "../../assets/eduai/line4.png";

const VidCard = () => {
    const [videoStates, setVideoStates] = useState({});
    const videoRefs = {
        video1Ref1: useRef(null),
        video1Ref2: useRef(null),
        video2Ref1: useRef(null),
        video2Ref2: useRef(null),
        video3Ref1: useRef(null),
        video3Ref2: useRef(null),
        video4Ref1: useRef(null),
        video4Ref2: useRef(null),
        video5Ref1: useRef(null),
        video5Ref2: useRef(null),
    };

      const videoSources = {
      video1Ref1: video1,
      video1Ref2: video1,
      video2Ref1: video2,
      video2Ref2: video2,
      video3Ref1: video3,
      video3Ref2: video3,
      video4Ref1: video4,
      video4Ref2: video4,
      video5Ref1: video5,
      video5Ref2: video5
    }

    // Configuration for each video (THIS IS WHERE YOU CONTROL THE BEHAVIOR)
    const videoConfigs = {
        video1Ref1: { topPause: true, bottomPause: true, threshold: 0.1 },
        video1Ref2: { topPause: true, bottomPause: true, threshold: 0.1 },
        video2Ref1: { topPause: true, bottomPause: true, threshold: 0.1 },
        video2Ref2: { topPause: true, bottomPause: true, threshold: 0.1 },
        video3Ref1: { topPause: true, bottomPause: true, threshold: 0.1 },
        video3Ref2: { topPause: true, bottomPause: true, threshold: 0.1 },
        video4Ref1: { topPause: true, bottomPause: true, threshold: 0.1 },
        video4Ref2: { topPause: true, bottomPause: true, threshold: 0.1 },
        video5Ref1: { topPause: true, bottomPause: true, threshold: 0.1 },
        video5Ref2: { topPause: true, bottomPause: true, threshold: 0.1 },
    };

    const handleIntersection = (entries, observer) => {
      entries.forEach((entry) => {
        const videoRefKey = Object.keys(videoRefs).find(
          (key) => videoRefs[key].current === entry.target
        );

        if (videoRefKey) {
          const config = videoConfigs[videoRefKey];
          const { topPause, bottomPause, threshold } = config;

            // Determine if the top or bottom is out of view
            const rect = entry.boundingClientRect;
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
            const topOutOfView = rect.top < 0;
            const bottomOutOfView = rect.bottom > viewportHeight;
            const visibleRatio = entry.intersectionRatio;


          let shouldPause = false;

          if (topPause && topOutOfView && visibleRatio < threshold) {
            shouldPause = true;
          }
          if (bottomPause && bottomOutOfView && visibleRatio < threshold) {
            shouldPause = true;
          }

            setVideoStates((prevStates) => ({
                ...prevStates,
                [videoRefKey]: !shouldPause, // Store playing state (opposite of pause)
            }));

            if (shouldPause) {
                entry.target.pause();
            } else if (entry.target.readyState >= 2){ // Check if video is ready to play
              entry.target.play().catch((e) => console.error("Error playing video:", e));
            }
        }
      });
    };



    useEffect(() => {
        const observers = [];

        Object.keys(videoRefs).forEach(refKey => {
            const videoRef = videoRefs[refKey];
            if (videoRef.current) {
                const config = videoConfigs[refKey];
                const observerOptions = {
                    root: null,
                    rootMargin: '0px',
                    threshold: config.threshold, // Use the configured threshold
                };

                const observer = new IntersectionObserver(handleIntersection, observerOptions);
                observer.observe(videoRef.current);
                observers.push(observer);


                 videoRef.current.onloadeddata = () => {
                  setVideoStates(prevStates => ({
                      ...prevStates,
                      [refKey]: true // Initially set to true, so it plays when first visible
                  }));
                };
                videoRef.current.onerror = (e) => console.error("Error loading video:", videoSources[refKey], e);
                // Add event listener for 'ended' event
                videoRef.current.addEventListener('ended', () => {
                  if (videoStates[refKey]) { // Only replay if it was supposed to be playing
                    videoRef.current.play().catch(e => console.error("Error replaying video:", e));
                   }
                });
            }
        });

        return () => {
            observers.forEach(observer => observer.disconnect());
        };
    }, [videoStates]);

     const isVideoLoaded = (refKey) => videoStates[refKey] !== undefined;


    return (
        <>
            <div className="w-10/12 h-auto mx-auto">
                {/* Set 1: Two Instances of Video 1 */}
                <div className="flex justify-between w-full -gap-0">
                    {/* Video 1, Instance 1 */}
                    <div className="relative w-[41.3vw] h-[500px] overflow-hidden rounded-tl-4xl rounded-bl-4xl">
                        <video
                            ref={videoRefs.video1Ref1}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isVideoLoaded('video1Ref1') ? 'opacity-100' : 'opacity-0'}`}
                            muted playsInline
                        >
                            <source src={video1} type="video/mp4" />
                        </video>
                        {!isVideoLoaded('video1Ref1') && <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>}
                    </div>

                    {/* Video 1, Instance 2 */}
                    <div className="relative w-1/2 h-[500px] overflow-hidden rounded-tr-4xl rounded-br-4xl">
                        <video
                            ref={videoRefs.video1Ref2}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isVideoLoaded('video1Ref2') ? 'opacity-100' : 'opacity-0'}`}
                             muted playsInline
                        >
                            <source src={video1} type="video/mp4" />
                        </video>
                        {!isVideoLoaded('video1Ref2') && <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>}
                        {/* Overlay for Video 1, Instance 1 - CORRECTLY PLACED */}
                        <div
                            className="absolute top-0 right-0 h-full w-[100%] rounded-tr-4xl rounded-br-4xl
                bg-white/35  {/* Changed to white/20 */}
                backdrop-filter backdrop-blur-3xl
                shadow-lg border border-gray-300/50
                flex flex-col justify-center items-start p-4 z-10"
                        >
                            <h2 className="text-[#2f3e43] mb-2 w-[26vw] text-[2.5vw] text-justify leading-[1.3]">
                                Give each student a unique tutor tailored to their learning style
                            </h2>
                            <p className="text-[#2f3e43] text-lg">
                                AI-tuned tutoring helps each student find their optimal learning
                                path.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Custom content between Card 1 and Card 2 */}
                <div className="relative w-[30%] top-0 left-[30vw] h-[35vh]">
                    <img src={line1} alt="" />
                </div>

                {/* Set 2: Two Instances of Video 2 */}
                <div className="flex justify-between w-full mt-4">
                    {/* Video 2, Instance 1 */}
                    <div className="relative w-[41.3vw] h-[500px] overflow-hidden rounded-tl-4xl rounded-bl-4xl">
                        <video
                            ref={videoRefs.video2Ref1}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isVideoLoaded('video2Ref1') ? 'opacity-100' : 'opacity-0'}`}
                            muted playsInline
                        >
                            <source src={video2} type="video/mp4" />
                        </video>
                        {!isVideoLoaded('video2Ref1') && <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>}
                        {/* Overlay for Video 2, Instance 1 - CORRECTLY PLACED*/}
                        <div
                            className="absolute top-0 right-0 h-full w-[100%] rounded-tl-4xl rounded-bl-4xl
                            bg-white/40  {/* Changed to white/20 */}
                            backdrop-filter backdrop-blur-3xl
                            shadow-lg border border-gray-300/50
                            flex flex-col justify-center items-start p-4 z-10"
                        >
                            <h2 className="text-[#2f3e43] relative left-[13vw] mb-2 w-[26vw] text-[2.5vw] text-right leading-[1.3]">
                                Automatically create assessments & evaluate students
                            </h2>
                            <p className="text-[#2f3e43] text-lg text-right">
                                AI-generated tailored assessments target weak areas, offer instant
                                feedback, and lighten teachers' workload with personalized
                                evaluations.
                            </p>
                        </div>
                    </div>

                    {/* Video 2, Instance 2 */}
                    <div className="relative w-1/2 h-[500px] overflow-hidden rounded-tr-4xl rounded-br-4xl">
                        <video
                            ref={videoRefs.video2Ref2}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isVideoLoaded('video2Ref2') ? 'opacity-100' : 'opacity-0'}`}
                           muted playsInline
                        >
                            <source src={video2} type="video/mp4" />
                        </video>
                        {!isVideoLoaded('video2Ref2') && <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>}
                    </div>
                </div>

                {/* Custom content between Card 2 and Card 3 */}
                <div className="relative w-[30%] top-0 left-[37vw] h-[35vh]">
                    <img src={line2} alt="" />
                </div>

                {/* Set 3: Two Instances of Video 3 */}
                <div className="flex justify-between w-full mt-4">
                    {/* Video 3, Instance 1 */}
                    <div className="relative w-[41.3vw] h-[500px] overflow-hidden rounded-tl-4xl rounded-bl-4xl">
                        <video
                            ref={videoRefs.video3Ref1}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isVideoLoaded('video3Ref1') ? 'opacity-100' : 'opacity-0'}`}
                             muted playsInline
                        >
                            <source src={video3} type="video/mp4" />
                        </video>
                        {!isVideoLoaded('video3Ref1') && <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>}
                        {/* Overlay for Video 3, Instance 1 - CORRECTLY PLACED*/}
                        <div
                            className="absolute rounded-full border-2 border-white
                            bg-white/40  {/* Changed to white/20 */}
                            backdrop-filter backdrop-blur-3xl h-[6vh] w-[31vw] top-[8vh] left-[10.26vw]
                            shadow-lg border border-gray-300/50
                            flex flex-col justify-center items-start p-6 z-10"
                        >
                            <p className="text-[#2f3e43] text-sm">
                                Create a cool animation showcasing how genetic engineering works
                            </p>
                        </div>
                    </div>

                    {/* Video 3, Instance 2 */}
                    <div className="relative w-1/2 bg-[#d3dee0] h-[500px] overflow-hidden rounded-tr-4xl rounded-br-4xl">
                    <video
                            ref={videoRefs.video3Ref2}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isVideoLoaded('video3Ref1') ? 'opacity-100' : 'opacity-0'}`}
                             muted playsInline
                        >
                            <source src={video3} type="video/mp4" />
                        </video>
                        {/* Overlay for Video 3, Instance 1 - CORRECTLY PLACED*/}
                        <div
                            className="absolute top-0 right-0 h-full w-[100%] rounded-tr-4xl rounded-br-4xl
                bg-white/35  {/* Changed to white/20 */}
                backdrop-filter backdrop-blur-3xl
                shadow-lg border border-gray-300/50
                flex flex-col justify-center items-start p-4 z-10"
                        >
                            <h2 className="text-[#2f3e43] mb-2 w-full text-[3.5rem] text-left leading-[1.3]">
                            Generate learning materials on the fly
                            </h2>
                            <p className="text-[#2f3e43] text-lg">
                            Instantly crafted learning resources adapt to student needs in real-time.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Add content between cards */}
                <div className="relative w-[35%] bottom-[4.6vh] h-[35vh]">
                    <img src={line3} alt="" className="h-[42vh] relative top-0 left-[26vw] rotate-[6deg]" />
                </div>

                {/* Set 4: Two Instances of Video 4 */}
                <div className="flex justify-between w-full mt-4">
                    {/* Video 4, Instance 1 */}
                    <div className="relative w-1/2 h-[500px] overflow-hidden rounded-tl-4xl rounded-bl-4xl">
                        <video
                            ref={videoRefs.video4Ref1}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isVideoLoaded('video4Ref1') ? 'opacity-100' : 'opacity-0'}`}
                             muted playsInline
                        >
                            <source src={video4} type="video/mp4" />
                        </video>
                        {!isVideoLoaded('video4Ref1') && <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>}
                        {/* Overlay for Video 3, Instance 1 - CORRECTLY PLACED*/}
                        <div
                            className={`absolute top-0 right-0 h-full w-full
                bg-gray-300/45 backdrop-filter backdrop-blur-md
                border border-gray-100/50 dark:border-gray-700/50
                flex flex-col justify-center items-start p-4 z-10 rounded-tl-4xl rounded-bl-4xl
                transition-opacity duration-500 ${isVideoLoaded('video4Ref1') ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <h2 className="text-[#2f3e43] mb-2 w-[26vw] text-[2.5vw] leading-[1.3]">
                                Ensure safety for all with real-time conflict detection
                            </h2>
                            <p className="text-[#2f3e43] text-lg">
                                AI-driven solutions detect conflicts in real-time, ensuring safety for everyone in the workplace or learning environment.
                            </p>
                        </div>
                    </div>

                    {/* Video 4, Instance 2 */}
                    <div className="relative w-1/2 h-[500px] overflow-hidden rounded-tr-4xl rounded-br-4xl">
                        <video
                            ref={videoRefs.video4Ref2}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isVideoLoaded('video4Ref2') ? 'opacity-100' : 'opacity-0'}`}
                           muted playsInline
                        >
                            <source src={video4} type="video/mp4" />
                        </video>
                        {!isVideoLoaded('video4Ref2') && <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>}
                    </div>
                </div>

                {/* Custom content between Card 3 and Card 4*/}
                <div className="relative w-[30%] bottom-[4.6vh] h-[35vh]">
                    <img src={line4} alt="" className="relative h-[28vh] top-[9vh] left-[31vw] rotate-[14deg]" />
                </div>

                {/* Set 5: Two Instances of Video 5 */}
                <div className="flex justify-between w-full mt-4">
                    {/* Video 5, Instance 1 */}
                    <div className="relative w-1/2 h-[500px] overflow-hidden rounded-tl-4xl rounded-bl-4xl">
                        <video
                            ref={videoRefs.video5Ref1}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isVideoLoaded('video5Ref1') ? 'opacity-100' : 'opacity-0'}`}
                             muted playsInline
                        >
                            <source src={video5} type="video/mp4" />
                        </video>
                        {!isVideoLoaded('video5Ref1') && <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>}
                    </div>

                    {/* Video 5, Instance 2 */}
                    <div className="relative w-[41.53vw] h-[500px] overflow-hidden rounded-tr-4xl rounded-br-4xl">
                        <video
                            ref={videoRefs.video5Ref2}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isVideoLoaded('video5Ref2') ? 'opacity-100' : 'opacity-0'}`}
                             muted playsInline
                        >
                            <source src={video5} type="video/mp4" />
                        </video>
                        {!isVideoLoaded('video5Ref2') && <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>}
                        {/* Overlay for Video 3, Instance 1 - CORRECTLY PLACED*/}
                        <div
                            className={`absolute top-0 right-0 h-full w-full rounded-tr-4xl rounded-br-4xl
                bg-gray-300/50 backdrop-filter backdrop-blur-lg
                shadow-lg border border-gray-100/50
                flex flex-col justify-center items-start p-4 z-10
                transition-opacity duration-500 ${isVideoLoaded('video5Ref2') ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <h2 className="text-[#2f3e43] mb-2 w-[26vw] text-[2.5vw] text-justify leading-[1.3]">
                                Let action model do your work on your behalf
                            </h2>
                            <p className="text-[#2f3e43] text-lg">
                                AI-powered automation models take care of repetitive tasks, allowing you to focus on the creative aspects of your work.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VidCard;