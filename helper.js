const iconMoon = document.querySelector(".icon--moon");
const iconSun = document.querySelector(".icon--sun");
const headerImgLightMode = document.querySelector(".header__img--light-mode");
const headerImgDarkMode = document.querySelector(".header__img--dark-mode");

export const toggleDarkMode = function (darkMode) {
  if (darkMode) {
    document.body.classList.add("dark-mode");
    iconMoon.classList.add("hidden");
    iconSun.classList.remove("hidden");
    headerImgLightMode.classList.add("hidden");
    headerImgDarkMode.classList.remove("hidden");
  }
  if (!darkMode) {
    document.body.classList.remove("dark-mode");
    iconMoon.classList.remove("hidden");
    iconSun.classList.add("hidden");
    headerImgLightMode.classList.remove("hidden");
    headerImgDarkMode.classList.add("hidden");
  }
};
