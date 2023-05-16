import { hoverCheckboxBorder, toggleIcon } from "./helper.js";

const content = document.querySelector(".content");

content.addEventListener("click", function (e) {
  const el = e.target;

  // Checkbox icon
  if (el.closest(".checkbox")) {
    // Define to checked icon
    let iconChecked = el.dataset.checked;
    el.dataset.checked = iconChecked === "false" ? "true" : "false";

    const borderEl = el.closest(".checkbox--border");
    const checkboxIcon = el.firstChild.nextElementSibling;

    // Turn on checkbox icon & checkbox style
    if (iconChecked === "false") {
      checkboxIcon.classList.remove("hidden");
      toggleIcon(borderEl, "transparent");
      toggleIcon(el, "linear-gradient(135deg, #55ddff 0%, #c058f3 100%)");
    }

    // Turn off checkbox icon & checkbox style
    if (iconChecked === "true") {
      checkboxIcon.classList.add("hidden");
      toggleIcon(borderEl, "#e3e4f1");
      toggleIcon(el, "white");
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
