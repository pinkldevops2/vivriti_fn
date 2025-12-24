import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initScrollAnim() {
  gsap.from(".content h2", {
    scrollTrigger: {
      trigger: ".content",
      start: "top 80%",
      end: "bottom 20%",
      scrub: true,
    },
    opacity: 0,
    y: 50,
    duration: 1.2,
  });
}