import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function TechtabsSwiper({ slides }) {
  const swiperRef = useRef(null);
  const [activeTab, setActiveTab] = useState(slides[0]?.id || null);

  const handleTabClick = (id, index) => {
    setActiveTab(id);
    swiperRef.current?.slideToLoop(index);

    window.dispatchEvent(
      new CustomEvent("tab-change", {
        detail: { id },
      })
    );
  };

  return (
    <div className="mx-auto relative w-full py-0">
      <style>{`
          button.techtabs-btn:not(.tabactive) {
    color:#000;
    transition: all 0.3s ease-in-out;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .tabactive {
    color: #fff !important;
  /*   border:0; */
    padding-top: 40px;
    padding-bottom: 40px;
    background: linear-gradient(
      312deg,
      rgba(59, 186, 226, 1) 0%,
      rgba(0, 1, 138, 1) 100%
    );
    -webkit-background-clip: initial;
    -webkit-text-fill-color: initial;
  }
  .tabactive p{
    font-weight: 700;
  }
  button.techtabs-btn:not(.tabactive):hover {
    color: #fff !important;
    background: linear-gradient(
      312deg,
      rgba(59, 186, 226, 1) 0%,
      rgba(0, 1, 138, 1) 100%
    );
    -webkit-background-clip: initial;
    -webkit-text-fill-color: initial;
  }
      `}</style>

      {/* Navigation Buttons */}
       <div className="flex justify-end flex-col md:flex-row absolute bottom-[-45px] left-1/2 -translate-x-1/2 transform  md:relative md:left-[initial] md:translate-x-[initial] md:bottom-[initial]">
        {/* Navigation */}
       
         <div className="flex justify-end mb-5 items-center gap-5">
          <button
            className="swiper-button-prev-custom"
            aria-label="Previous Slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="45"
              height="15"
              viewBox="0 0 45 15"
              fill="none"
            >
              <path
                d="M0.292941 7.98894C-0.0975572 7.59388 -0.0975572 6.96071 0.292941 6.57472L6.65647 0.284639C7.04697 -0.101352 7.68009 -0.0940023 8.07059 0.301055C8.46109 0.696113 8.46109 1.32928 8.07059 1.71527L2.41412 7.30646L8.07059 13.029C8.46109 13.424 8.46109 14.0572 8.07059 14.4432C7.68009 14.8292 7.04697 14.8218 6.65647 14.4268L0.292941 7.98894ZM44.0692 7.79004L44.0692 8.79004L1 8.29004L1 7.29004L1 6.29004L44.0692 6.79004L44.0692 7.79004Z"
                fill="#555555"
              />
            </svg>
          </button>
          <button className="swiper-button-next-custom" aria-label="Next Slide">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="45"
              height="15"
              viewBox="0 0 45 15"
              fill="none"
            >
              <path
                d="M43.7754 6.73909C44.1659 7.13415 44.1659 7.76731 43.7754 8.1533L37.4119 14.4434C37.0214 14.8294 36.3883 14.822 35.9978 14.427C35.6073 14.0319 35.6073 13.3987 35.9978 13.0128L41.6542 7.42157L35.9978 1.69905C35.6073 1.30399 35.6073 0.670827 35.9978 0.284836C36.3883 -0.101155 37.0214 -0.0938047 37.4119 0.301253L43.7754 6.73909ZM-0.000825914 6.93799L-0.000825871 5.93799L43.0684 6.43799L43.0684 7.43799L43.0684 8.43799L-0.000825958 7.93799L-0.000825914 6.93799Z"
                fill="#555555"
              />
            </svg>
          </button>
        </div>

      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={10}
        slidesPerView={3}
        loop={true}
        autoplay={{ delay: 250000 }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 3 },
        }}
      >
        {slides.map((tab, index) => (
          <SwiperSlide key={index}>
            <button
              className={`techtabs-btn border border-dashed border-[#F58220] w-full text-left px-8 ${
                activeTab === tab.id ? "tabactive" : ""
              }`}
              aria-selected={activeTab === tab.id ? "true" : "false"}
              onClick={() => handleTabClick(tab.id, index)}
            >
              <h4 className="text-[28px] md:text-[35px] mb-3">{tab.num}.</h4>
              <p className="text-[16px] md:text-[18px] uppercase">{tab.title}</p>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
