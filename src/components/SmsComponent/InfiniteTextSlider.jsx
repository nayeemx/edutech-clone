import React, { useState, useRef, useEffect } from 'react';

const InfiniteTextSlider = ({ texts, colors: propColors }) => { // Destructure and rename
  const [animationPlayState, setAnimationPlayState] = useState('running');
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const handleMouseDown = () => {
    setAnimationPlayState('paused');
  };

  const handleMouseUp = () => {
    setAnimationPlayState('running');
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.addEventListener('mousedown', handleMouseDown);
      sliderRef.current.addEventListener('mouseup', handleMouseUp);
    }

    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (sliderRef.current) {
        sliderRef.current.removeEventListener('mousedown', handleMouseDown);
        sliderRef.current.removeEventListener('mouseup', handleMouseUp);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);


    // --- Default Values and Prop Handling ---
    const defaultTexts = [
        "Octagon", "Edcare", "Pathshala", "Edbase", "CareEdu"
    ];

  const defaultColors = ['#57a9f0', '#6bcb88', '#41c6d1', '#fcb473', '#9292d4'];

  // Use props if provided, otherwise use defaults
  const displayTexts = texts || defaultTexts; // Use prop texts or default
  const displayColors = propColors || defaultColors; // Use prop colors or default


  const totalItems = displayTexts.length;
  const visibleItems = 5;
  const animationDuration = totalItems * 3.5;
  const itemWidth = containerWidth / visibleItems;

  return (
    <div className="relative w-full overflow-hidden" ref={containerRef}>
      <div
        ref={sliderRef}
        className="flex"
        style={{
          animation: `marquee ${animationDuration}s linear infinite`,
          animationPlayState: animationPlayState,
          width: 'fit-content',
          whiteSpace: 'nowrap',
        }}
      >
        {[...displayTexts, ...displayTexts].map((text, index) => (
          <div
            key={index}
            className={`px-2 py-3 text-2xl text-center inline-block`}
            style={{ width: itemWidth + 'px', color: displayColors[index % displayColors.length] }}
          >
            {text}
          </div>
        ))}
      </div>

      <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-${itemWidth * totalItems}px); }
          }
        `}</style>
    </div>
  );
};

export default InfiniteTextSlider;