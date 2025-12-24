// src/components/DrivingImpactSwiper.jsx
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import arrow_left_mob from '../../../public/arrow_left_mob.svg';

export default function ThinkTankSlider({ slides }) {
  const swiperRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(1);

  return (
    <div className="driving-impact-slider relative w-full bg-[#3bbae212] py-4">
      {/* Navigation */}
      <style>
        {`
        .swiper-button-prev-custom,
        .swiper-button-next-custom {
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 50;
        }

        .swiper-button-prev-custom::after,
        .swiper-button-next-custom::after {
          font-size: 18px;
          color: #000;
        }
        `}
      </style>

      <Swiper
        modules={[Navigation, Autoplay]}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}         // 👈 Important
        spaceBetween={20}              // 👈 gap between slides
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex + 1)}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            style={{ width: "90%" }}   // 👈 MAIN FIX: Show 0.25 slide preview on both sides
          ><div class="w-full md:w-8/12 lg:w-5/12">
        <div>
          <div class="image-flash-container">
            <img src="/Insights.png" />
          </div>
          <div class="pt-[25px]">
            <span class="taxonomy_tag gradient-text text-sm">
              Report | 5 min read
            </span>
            <p
              class="max-w-3xl pt-[20px] leading-[24px] text-[#1B1B1B] text-lg"
            >
              Lorem ipsum dolor sit amet consectetur. Iaculis est consequat
              dictum molestie porta metus egestas. Tincidunt vitae purus amet.
            </p>
            <span
              class="taxonomy_date flex text-sm items-center gap-2 pt-[10px]"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 0C4.40887 0 2.88274 0.632146 1.75707 1.75707C0.632078 2.88261 0 4.40887 0 6C0 7.59113 0.632146 9.11726 1.75707 10.2429C2.88261 11.3679 4.40887 12 6 12C7.59113 12 9.11726 11.3679 10.2429 10.2429C11.3679 9.11739 12 7.59113 12 6C11.9984 4.40942 11.3657 2.88425 10.2407 1.75927C9.11575 0.634286 7.59058 0.00164571 6 0ZM6 11.1429C4.63607 11.1429 3.32791 10.6013 2.36352 9.63648C1.39869 8.6722 0.857143 7.36402 0.857143 6C0.857143 4.63598 1.39875 3.32791 2.36352 2.36352C3.3278 1.39869 4.63598 0.857143 6 0.857143C7.36402 0.857143 8.67209 1.39875 9.63648 2.36352C10.6013 3.3278 11.1429 4.63598 11.1429 6C11.1412 7.36339 10.5991 8.67058 9.63483 9.63483C8.67056 10.5991 7.36347 11.1412 6 11.1429ZM6.42857 2.14286V5.6448C6.42964 5.98605 6.29411 6.31337 6.05196 6.55391L4.16035 8.44552V8.44605C3.99213 8.60838 3.72481 8.6057 3.55928 8.4407C3.39429 8.27516 3.3916 8.00785 3.55392 7.83963L5.44554 5.94802H5.44607C5.52643 5.86766 5.57143 5.75837 5.57143 5.64481V2.14286C5.57143 1.90607 5.76321 1.71429 6 1.71429C6.23679 1.71429 6.42857 1.90607 6.42857 2.14286Z"
                  fill="#2E2E2E"></path>
              </svg>
              Thursday 26th Oct</span
            >
          </div>
        </div>
       
      </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      <div className="container mx-auto flex justify-center items-center mb-4 gap-4 pt-4">
        <button className="swiper-button-prev-custom" aria-label="Previous Slide">
            <img src={arrow_left_mob.src} class="rotate-180"/> 
      </button>
        <button className="swiper-button-next-custom" aria-label="Next Slide">
            <img src={arrow_left_mob.src} class=""/>
        </button>
      </div>
      
    </div>
  );
}