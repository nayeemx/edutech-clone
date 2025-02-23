// TestimonialSlider.jsx

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'; // Import necessary Swiper modules
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import tahsin from "../../assets/sms/c1.png";
import mustakin from "../../assets/sms/c2.png";
import nadim from "../../assets/sms/c3.png";
import layla from "../../assets/sms/c4.png";
import anjani from "../../assets/sms/c6.png";
import Fahim from "../../assets/sms/c7.png";

const TestimonialSlider = () => {
  // Sample testimonial data (replace with your actual data)
  const testimonials = [
    {
      name: 'Tahasin Sadaf',
      title: 'EXCEL BEES',
      image: tahsin, // Replace with actual image URL
      text: 'What I loved most was their personalised support. To this day they have helped me every step of the way to introduce and transition and bring this great solution to my classrooms. Management and video sharing was never easier. I have big plans for their online Market-place in the future!',
    },
   {
      name: "Fahim Hasan",
      title: "EDUCARE",
      image: Fahim,
      text: "The easiest and best tools to manage my students and class. This has enabled me to have a much more hands-on approach to my business and teaching"
    },
     {
      name: "Mustahsin Islam",
      title: "AUGMENTA",
      image: mustakin,
      text: "Their integrations with Google Classroom and Zoom have made my life a lot easier. A lot of time-savings that I can put elsewhere to make my Classrooms better. I think their direct teacher-student shared file storage with notifications is also a very useful feature."
    },
    {
      name: 'Anjani Baria',
      title: 'ENGLISH TEACHER',
      image: anjani, // Replace with actual image URL
      text: 'They listen to my suggestions and new features are added accordingly every week while the price remains the same',
    },
   {
      name: "Engr. Md. Nadim",
      title: "EDBASE",
      image: nadim,
      text: "Created by my ex-students. They have made my class management much easier and have created all kinds of features that I have asked for. Any idea that I have, I share them and they bring it to my classes in record time. Recommended!"
    },
    {
        name: "Laila Arjuman Banu",
        title: "Mac Master School Principal",
        image: layla,
        text: "Great support and help. We are proud to be making the transition to enabling digital tools in our classrooms to make the lives of our teachers and students better!"
      }
    // ... Add the rest of your testimonial data here ...
  ];
    const sliderSettings = {
        slidesPerView: 4,
        spaceBetween: 20, // Adjust spacing as needed
        centeredSlides: true,
        loop: true,      // Enable looping for continuous sliding
        autoplay: {
            delay: 1000,   // Overall slide delay (in milliseconds)
            pauseOnMouseEnter: true, // Pause on hover
             disableOnInteraction: false,
        },
        speed: 2000,     // Overall transition speed (in milliseconds)
        breakpoints: {  // Responsive breakpoints (adjust as needed)
            320: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    };
      const sliderSettingsOpposite = {
        ...sliderSettings, // Inherit common settings
         autoplay: {
            ...sliderSettings.autoplay, // Inherit autoplay settings
            reverseDirection: true, // THIS IS KEY FOR OPPOSITE DIRECTION
        },
    };
     const handleSlideChange = (swiper) => {
        const activeIndex = swiper.realIndex;
        const slides = swiper.slides;
         const centerSlideIndex = Math.floor(sliderSettings.slidesPerView / 2);


        slides.forEach((slide, index) => {
            const relativeIndex = (index - activeIndex + slides.length) % slides.length;

            if (relativeIndex === centerSlideIndex ) {
                // Slow down the center slide.
                swiper.autoplay.stop();
                setTimeout(() => {
                   if(swiper && swiper.autoplay && !swiper.destroyed){
                        swiper.autoplay.start();
                    }
                }, 2000); // Keep the center slide visible for 2 seconds.
               slide.style.transitionDuration = '500ms'; //shorten transition duration
            } else {
               slide.style.transitionDuration = '2000ms'; // Default speed

            }
        });
    };


  return (
    <div className="relative w-full">
      {/* Top Slider (Normal Direction) */}
      <Swiper
        {...sliderSettings}
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        onSlideChange={handleSlideChange}
        className="mySwiper"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide
            key={index}
            className="bg-white rounded-lg p-4 shadow-md min-w-[38vw] min-h-[33vh] my-10"
          >
            <div className='flex items-center gap-4'>
            <div className="">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="min-w-[7vw] h-[16vh] rounded-lg mr-3"
              />
            </div>

            <div>
              <div>
                <h3 className="text-lg font-normal">{testimonial.name}</h3>
                <p className="text-[#fcae66]">{testimonial.title}</p>
              </div>
              <p className="text-[#8c8c8c] text-sm">{testimonial.text}</p>
            </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Bottom Slider (Opposite Direction) -  Clone the structure */}
      <Swiper
        {...sliderSettingsOpposite} // Use the opposite direction settings
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        onSlideChange={handleSlideChange}
        className="mySwiper mt-4"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide
          key={index}
          className="bg-white rounded-lg p-4 shadow-md min-w-[38vw] min-h-[33vh] mb-6"
        >
          <div className='flex items-center gap-4'>
          <div className="">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="min-w-[7vw] h-[16vh] rounded-lg mr-3"
            />
          </div>

          <div>
            <div>
              <h3 className="text-lg font-normal">{testimonial.name}</h3>
              <p className="text-[#fcae66]">{testimonial.title}</p>
            </div>
            <p className="text-[#8c8c8c] text-sm">{testimonial.text}</p>
          </div>
          </div>
        </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialSlider;