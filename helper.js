const iconMoon = document.querySelector(".icon--moon");
const iconSun = document.querySelector(".icon--sun");

export const toggleDarkMode = function (darkMode) {
  if (darkMode) {
    document.body.classList.add("dark-mode");
    iconMoon.classList.add("hidden");
    iconSun.classList.remove("hidden");
  }
  if (!darkMode) {
    document.body.classList.remove("dark-mode");
    iconMoon.classList.remove("hidden");
    iconSun.classList.add("hidden");
  }
};
