document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("set-tab", (e) => {
    const index = e.detail;

    document.querySelectorAll("#tabs button").forEach((btn, i) => {
      if (i === index) {
        btn.classList.add("gradient_blue_bg", "text-white");
        btn.classList.remove("bg-white", "gradient-text");
      } else {
        btn.classList.add("bg-white", "gradient-text");
        btn.classList.remove("gradient_blue_bg", "text-white");
      }
    });

    document.getElementById("tab-content").innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-15 items-start">
        <img src="${tabs[index].img}" class="w-full h-auto" />
        <div class="tab_contents">
          <h2 class="mb-3 gradient-text text-[35px] leading-[40px] font-poppins">${tabs[index].title}</h2>
          <div class="text-gray-700 leading-relaxed space-y-3">
            ${tabs[index].text}
          </div>
        </div>
      </div>`;
  });

  /* -------------------------------
     DRAGGABLE TABS (mouse + touch)
  -------------------------------- */
  const tabContainer = document.getElementById("tabs");
  let isDown = false;
  let startX;
  let scrollLeft;

  tabContainer.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - tabContainer.offsetLeft;
    scrollLeft = tabContainer.scrollLeft;
  });
  tabContainer.addEventListener("mouseleave", () => (isDown = false));
  tabContainer.addEventListener("mouseup", () => (isDown = false));
  tabContainer.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - tabContainer.offsetLeft;
    tabContainer.scrollLeft = scrollLeft - (x - startX) * 1.5;
  });

  tabContainer.addEventListener("touchstart", (e) => {
    isDown = true;
    startX = e.touches[0].pageX - tabContainer.offsetLeft;
    scrollLeft = tabContainer.scrollLeft;
  });
  tabContainer.addEventListener("touchend", () => (isDown = false));
  tabContainer.addEventListener("touchmove", (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - tabContainer.offsetLeft;
    tabContainer.scrollLeft = scrollLeft - (x - startX) * 1.5;
  });

  // MOBILE ACCORDION JS
  const accordionBtns = document.querySelectorAll("[data-accordion-btn]");
  const accordionContents = document.querySelectorAll(".accordion-content");
  const accordionArrows = document.querySelectorAll("[data-arrow]");

  accordionBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.accordionBtn;
      const content = document.querySelector(`[data-accordion-content="${index}"]`);
      const arrow = document.querySelector(`[data-arrow="${index}"]`);
      const isOpen = content.style.maxHeight && content.style.maxHeight !== "0px";

      // Close all
      accordionContents.forEach(c => c.style.maxHeight = "0px");
      accordionArrows.forEach(a => a.style.transform = "rotate(0deg)");

      // Open clicked
      if(!isOpen){
        content.style.maxHeight = content.scrollHeight + "px";
        arrow.style.transform = "rotate(180deg)";
      }
    });
  });

  // OPEN FIRST ACCORDION ON PAGE LOAD
  window.addEventListener("DOMContentLoaded", () => {
    if(accordionContents.length > 0){
      accordionContents[0].style.maxHeight = accordionContents[0].scrollHeight + "px";
      accordionArrows[0].style.transform = "rotate(180deg)";
    }
  });
  });