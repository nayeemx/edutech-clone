// ImageInfiniteSlider.js
import { useState, useRef, useEffect } from 'react';
import image1 from '../../assets/sms/news-page.png'; // Import images *here*
import image2 from '../../assets/sms/nutshell_news.png';
import image3 from '../../assets/sms/poligram_news.png';
// ... import more images

const ImageInfiniteSlider = ({ imageWidth, imageHeight, animationDuration = 15 }) => {
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
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    if (sliderRef.current) {
      sliderRef.current.addEventListener('mousedown', handleMouseDown);
      sliderRef.current.addEventListener('mouseup', handleMouseUp);
    }

    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      if (sliderRef.current) {
        sliderRef.current.removeEventListener('mousedown', handleMouseDown);
        sliderRef.current.removeEventListener('mouseup', handleMouseUp);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

    // Define the image data array *inside* the component
    const imageData = [
        { src: image1, alt: 'Description of image 1' },
        { src: image2, alt: 'Description of image 2' },
        { src: image3, alt: 'Description of image 3' },
        // ... add more image objects here.  Make sure the imported image variables are used.
    ];

    const displayImages = imageData;

    // Calculate visibleItems based on container and image width if specified
    const visibleItems = imageWidth ? Math.floor(containerWidth / imageWidth) : 5;  // Default to 5 if imageWidth is not provided

    // Calculate the actual itemWidth, either using provided width or equally distributed
    const itemWidthPx = imageWidth || (containerWidth / visibleItems);

  const totalItems = displayImages.length;
  const animationDurationCalculated = animationDuration; // You can optionally calculate based on total items.

  return (
    <div className="relative w-full overflow-hidden" ref={containerRef}>
      <div
        ref={sliderRef}
        className="flex"
        style={{
          animation: `marquee ${animationDurationCalculated}s linear infinite`,
          animationPlayState: animationPlayState,
          width: 'fit-content',
          whiteSpace: 'nowrap',
        }}
      >
        {(displayImages.length > 0 ? [...displayImages, ...displayImages] : []).map((image, index) => (
          <div
            key={index}
            className={`px-2 py-3 inline-block`}
            style={{ width: `${itemWidthPx}px`}}
          >
            <img
              src={image.src}
              alt={image.alt || `Slide ${index}`}
              style={{
                width: '100%',
                height: imageHeight || 'auto', // Use imageHeight if provided, otherwise auto-adjust
                objectFit: 'cover', // or 'contain' based on your preference
              }}
            />
          </div>
        ))}
      </div>

      <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-${itemWidthPx * totalItems}px); }
          }
        `}</style>
    </div>
  );
};

export default ImageInfiniteSlider;