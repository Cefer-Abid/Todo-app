const content = document.querySelector(".content");

content.addEventListener("click", function (e) {
  const el = e.target;

  if (el.closest(".icon-mode")) {
    document.body.classList.toggle("dark-mode");
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
