import React, { useEffect } from "react";
import $ from "jquery";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel";
/**
 * Reusable Slick Slider component for Astro.
 * @param {string} id - Unique ID for the slider instance.
 * @param {Array} slides - Array of slide objects (title, text, img, etc.)
 * @param {Object} settings - Optional slick settings override.
 */
export default function SlickSlider({ id = "astro-slider", slides = [], settings = {} }) {
  useEffect(() => {
    // ensure DOM is ready and prevent double init
    const selector = `#${id}`;
    if ($(selector).hasClass("slick-initialized")) return;

    $(selector).slick({
      dots: true,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 2500,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      ...settings,
    });

    return () => {
      // destroy slick instance on unmount (important for Astro rehydration)
      if ($(selector).hasClass("slick-initialized")) {
        $(selector).slick("unslick");
      }
    };
  }, [id]);

  return (
    <div id={id} className="slick-slider-container">
      {slides.map((slide, index) => (
        <div
          key={index}
          className="px-6 py-8 bg-gray-100 text-center rounded-lg flex flex-col items-center justify-center"
        >
          {slide.img && (
            <img
              src={slide.img}
              alt={slide.title || `Slide ${index + 1}`}
              className="w-full h-64 object-cover mb-4 rounded-md"
            />
          )}
          {slide.title && <h3 className="text-lg font-semibold mb-2">{slide.title}</h3>}
          {slide.text && <p className="text-gray-600">{slide.text}</p>}
        </div>
      ))}
    </div>
  );
}