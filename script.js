import { toggleDarkMode } from "/helper.js";

const content = document.querySelector(".content");
let darkMode = false;

const getMode = function () {
  const darkMode = JSON.parse(localStorage.getItem("dark-mode"));
  toggleDarkMode(darkMode);
};
getMode();

content.addEventListener("click", function (e) {
  const el = e.target;

  // Toggle Dark Mode
  if (el.closest(".icon-mode")) {
    darkMode = !darkMode;
    toggleDarkMode(darkMode);
    // Send to Local Storage
    localStorage.setItem("dark-mode", darkMode);
  }

  // Toggle Checkbox icon
  if (el.closest(".checkbox")) {
    // Define to checked icon
    const checkboxEl = el.closest(".checkbox");
    let iconChecked = checkboxEl.dataset.checked;
    checkboxEl.dataset.checked = iconChecked === "false" ? "true" : "false";

    const checkboxIcon = checkboxEl.firstElementChild;

    // Turn on Checkbox icon style
    if (iconChecked === "false") {
      checkboxIcon.classList.remove("hidden");
      checkboxEl.classList.add("active-checkbox");
    }

    // Turn off Checkbox icon style
    if (iconChecked === "true") {
      checkboxIcon.classList.add("hidden");
      checkboxEl.classList.remove("active-checkbox");
    }
  }
});
