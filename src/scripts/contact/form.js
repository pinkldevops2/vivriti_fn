document.addEventListener("DOMContentLoaded", () => {
    const dropdown = document.getElementById('customDropdown');
  const toggle = dropdown.querySelector('.dropdown-toggle');
  const label = document.getElementById('dropdownLabel');
  const items = dropdown.querySelectorAll('.dropdown-menu li');
  const modal = document.getElementById("successModal");
  const closeBtn = document.getElementById("closeModal");

  toggle.addEventListener('click', () => {
    dropdown.classList.toggle('open');
    toggle.setAttribute(
      'aria-expanded',
      dropdown.classList.contains('open')
    );
  });

  // Select option & close dropdown
  dropdown.querySelector('.dropdown-menu').addEventListener('click', (e) => {
  const item = e.target.closest('li');
  if (!item) return;

  label.textContent = item.textContent;
  dropdown.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
});


  // Click outside to close dropdown
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  const tabOptions = {
    borrow: [
      "Corporates",
      "Financial Institutions"
    ],
    invest: [
      "An Individual",
      "A Corporate Treasury",
      "A Family Office",
      "A Global Citizen"
    ],
    advisory: [
      "Capital Raise",
      "Capital Markets",
      "Capital Structuring",
      "Risk Management",
      "Credit Ratings",
      "ESG and Climate"
    ],
    tech: [
      "Mid Corporate Lending",
      "Supply Chain Finance",
      "Co-Lending",
      "Asset Management",
      "Common Capabilities"
    ],
    other: [
      "General Enquiry"
    ]
  };

  const tabs = document.querySelectorAll(".tab");
  const dropdownMenu = document.querySelector(".dropdown-menu");
  const dropdownLabel = document.getElementById("dropdownLabel");

  function updateDropdown(options) {
    dropdownMenu.innerHTML = options
      .map(option => `<li>${option}</li>`)
      .join("");

    // Set default label
    if (options.length) {
      dropdownLabel.textContent = options[0];
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();

      // Active tab styling
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const selectedTab = tab.dataset.tab;
      const options = tabOptions[selectedTab] || [];

      updateDropdown(options);
    });
  });

  
  const form = document.querySelector("form");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function showError(input, message) {
    input.classList.add("input-error");
    input.nextElementSibling.textContent = message;
  }

  function clearError(input) {
    input.classList.remove("input-error");
    input.nextElementSibling.textContent = "";
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    const nameInput = form.querySelector('input[placeholder="Name*"]');
    const emailInput = form.querySelector('input[placeholder="Email*"]');
    const messageInput = form.querySelector('input[placeholder="Message*"]');

    // Dropdown validation
    if (!dropdownLabel.textContent || dropdownLabel.textContent === "Capital Raise") {
      alert("Please select a service from the dropdown.");
      return;
    }

    // Name
    if (!nameInput.value.trim()) {
      showError(nameInput, "Name is required");
      isValid = false;
    } else {
      clearError(nameInput);
    }

    // Email
    if (!emailInput.value.trim()) {
      showError(emailInput, "Email is required");
      isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      showError(emailInput, "Enter a valid email");
      isValid = false;
    } else {
      clearError(emailInput);
    }

    // Message
    if (!messageInput.value.trim()) {
      showError(messageInput, "Message is required");
      isValid = false;
    } else {
      clearError(messageInput);
    }

    if (!isValid) return;

    // ✅ SUCCESS
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    form.reset();

    form.reset();
    dropdownLabel.textContent = "Capital Raise";
  });

  // Clear error on typing
  form.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", () => {
      if (input.nextElementSibling?.classList.contains("error-text")) {
        clearError(input);
      }
    });
  });


  function activateSegment(key) {
    const options = tabOptions[key] || [];

    // Update dropdown list
    dropdownMenu.innerHTML = options
      .map(opt => `<li>${opt}</li>`)
      .join("");

    // Update label
    if (options.length) {
      dropdownLabel.textContent = options[0];
    }

    // Update active tab (desktop)
    tabs.forEach(tab => {
      tab.classList.toggle("active", tab.dataset.tab === key);
    });
  }


  /* ---------- MOBILE DROPDOWN ---------- */
  const segmentSelect = document.getElementById("segmentSelect");
  if (segmentSelect) {
    segmentSelect.addEventListener("change", (e) => {
      activateSegment(e.target.value);
    });
  }

  /* ---------- INIT ---------- */
 /* ---------- URL PARAM HANDLING ---------- */
function getQueryParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

/* ---------- INIT WITH URL ---------- */
const segmentFromUrl = getQueryParam("segment");

// Validate segment key
if (segmentFromUrl && tabOptions[segmentFromUrl]) {
  activateSegment(segmentFromUrl);

  // Sync mobile dropdown
  if (segmentSelect) {
    segmentSelect.value = segmentFromUrl;
  }
} else {
  // Default fallback
  activateSegment("");
}

 closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  });
  });