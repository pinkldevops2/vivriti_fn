window.addEventListener("tab-change", (event) => {
    const id = event.detail.id;

    const panels = document.querySelectorAll(".borrowvcl-panel");

    panels.forEach((panel) => {
      if (panel.id === id) {
        panel.classList.remove("hidden", "opacity-0", "-translate-y-2");
        panel.classList.add("opacity-100", "translate-y-0");
      } else {
        panel.classList.add("opacity-0", "-translate-y-2");
        panel.classList.remove("opacity-100", "translate-y-0");
        setTimeout(() => panel.classList.add("hidden"), 300);
      }
    });
  });