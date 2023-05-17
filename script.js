// prettier-ignore
import { toggleDarkMode, updateTodoList, setLocalStorage, getLocalStorage, displayAllTodos, displayActiveTodos, displayCompletedTodos,displayClearedTodos,getInputStatus
} from "/helper.js";

const content = document.querySelector(".content");
const formEl = document.querySelector(".search-field");
const searchInput = document.querySelector(".search-input");
const checkboxInput = document.querySelector(".checkbox__input");
const controlButton = document.querySelectorAll(".control-button");
let darkMode, data;

const init = function () {
  // init value
  darkMode = false;
  data = [];

  // Get dark mode from local storage
  const activeDarkMode = getLocalStorage("dark-mode");
  toggleDarkMode(activeDarkMode);

  // Get data from local storage
  const localData = getLocalStorage("data");
  if (!localData) return;
  data = localData;
  updateTodoList(data);
};
init();

content.addEventListener("click", function (e) {
  const el = e.target;

  // Toggle Dark Mode
  if (el.closest(".icon-mode")) {
    darkMode = !darkMode;
    toggleDarkMode(darkMode);
    // Send to Local Storage
    setLocalStorage("dark-mode", darkMode);
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

  // Footer active btn
  if (el.closest(".control-button")) {
    controlButton.forEach((btn) => btn.classList.remove("active--control-btn"));
    el.closest(".control-button").classList.add("active--control-btn");
  }

  // Delete todo item
  if (el.closest(".todo__delete-icon")) {
    const deleteIndex = +el.closest(".todo__delete-icon").dataset.index;
    data.splice(deleteIndex, 1);

    updateTodoList(data);
    setLocalStorage("data", data);
  }

  // Complete todo item
  if (el.closest(".checkbox")) {
    const completedIndex = +el.closest(".checkbox").dataset.index;
    const completedTodo = data[completedIndex];
    if (!completedTodo) return searchInput.classList.toggle("completed-todo");
    completedTodo.checked = !completedTodo.checked;

    updateTodoList(data);
    setLocalStorage("data", data);
  }

  // Control buttons
  if (el.closest(".footer")) {
    if (el.closest(".btn-all")) displayAllTodos(data);
    if (el.closest(".btn-active")) displayActiveTodos(data);
    if (el.closest(".btn-completed")) displayCompletedTodos(data);
    if (el.closest(".btn-clear-all")) displayClearedTodos(data);
  }
});



formEl.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get input checkbox status
  let inputStatus = checkboxInput.dataset.checked === "false" ? false : true;
  getInputStatus();

  // Add new todo data
  const newTodo = searchInput.value;
  const obj = {
    title: newTodo,
    checked: inputStatus ? true : false,
  };
  data.push(obj);

  // Update todo list view
  updateTodoList(data);

  // Send data local storage
  setLocalStorage("data", data);

  // Clean input
  searchInput.value = "";
});
