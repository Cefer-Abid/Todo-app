import { hoverCheckboxBorder, toggleIcon } from "./helper.js";

const content = document.querySelector(".content");

content.addEventListener("click", function (e) {
  const el = e.target;

  // Toggle Checkbox icon
  if (el.closest(".checkbox")) {
    // Define to checked icon
    const checkboxEl = el.closest(".checkbox");
    let iconChecked = checkboxEl.dataset.checked;
    checkboxEl.dataset.checked = iconChecked === "false" ? "true" : "false";

    const borderEl = el.closest(".checkbox--border");
    const checkboxIcon = checkboxEl.firstElementChild;

    // Turn on :
    if (iconChecked === "false") {
      // Checkbox icon
      checkboxIcon.classList.remove("hidden");
      // Checkbox style
      toggleIcon(borderEl, "transparent");
      toggleIcon(
        checkboxEl,
        "linear-gradient(135deg, #55ddff 0%, #c058f3 100%)"
      );
    }

    // Turn off :
    if (iconChecked === "true") {
      // Checkbox icon
      checkboxIcon.classList.add("hidden");
      // Checkbox style
      toggleIcon(borderEl, "#e3e4f1");
      toggleIcon(checkboxEl, "white");
    }
  }
});

// Checkbox border hover
content.addEventListener("mouseout", function (e) {
  hoverCheckboxBorder(e, "#e3e4f1");
});
content.addEventListener("mouseover", function (e) {
  hoverCheckboxBorder(e, "linear-gradient(135deg, #55ddff 0%, #c058f3 100%)");
});
