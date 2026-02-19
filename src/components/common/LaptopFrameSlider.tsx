import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

interface LaptopFrameSliderProps {
  readonly laptopImage: string;
  readonly slides: readonly string[];
  readonly sliderId?: string;
}

export default function LaptopFrameSlider({
  laptopImage,
  slides = [],
}: LaptopFrameSliderProps) {
  const swiperRef = useRef<any>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && swiperRef.current) {
          swiperRef.current.update();
          swiperRef.current.autoplay?.start();
        } else {
          swiperRef.current?.autoplay?.stop();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="laptop-frame-wrapper relative flex flex-col items-center"
      ref={wrapperRef}
    >
      {/* Laptop Frame */}
      <img
        src={laptopImage}
        alt="Laptop Frame"
        className="laptop-frame w-full max-w-4xl"
      />

      {/* Screen Area */}
      <div className="laptop-screen absolute top-[12%] left-[12%] w-[76%] h-[60%] overflow-hidden">
        <Swiper
          modules={[Autoplay]}   // ✅ removed Navigation
          slidesPerView={1}
          loop
          observer
          observeParents
          resizeObserver
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            swiper.autoplay.start();
          }}
          className="h-full"
        >
          {slides.map((img) => (
            <SwiperSlide key={img}>
              <img
                src={img}
                alt="Slide"
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
