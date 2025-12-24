// src/scripts/reveal.js
export default function revealOnScroll() {
  const reveals = document.querySelectorAll("[data-reveal]");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  reveals.forEach((el) => observer.observe(el));
}

if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", revealOnScroll);
}