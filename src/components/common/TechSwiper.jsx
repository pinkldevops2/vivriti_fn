import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function TechSwiper({ slides }) {
  return (
    <div className="mx-auto relative w-full py-0">
      <style>{`
        .text-description {
          min-height: 50px;
        }
      `}</style>

      <Swiper
        modules={[Autoplay]}   
        loop
        spaceBetween={0}
        slidesPerView={2}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id || slide.title}>
            <div className="w-full">
              <div className="relative aspect-[97/120] overflow-hidden bg-gray-900">
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="relative p-6 text-white flex flex-col justify-end h-full">
                  <p className="text-base font-semibold uppercase">
                    {slide.title}
                  </p>
                  <span className="text-base font-light mt-1 text-description">
                    {slide.desc}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

TechSwiper.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      img: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      desc: PropTypes.string,
    })
  ).isRequired,
};
