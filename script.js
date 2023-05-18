// prettier-ignore
import { toggleDarkMode, updateTodoList, setLocalStorage, getLocalStorage, displayAllTodos, displayActiveTodos, displayCompletedTodos,displayClearedTodos,
} from "/helper.js";

const content = document.querySelector(".content");
const formEl = document.querySelector(".search-field");
const searchInput = document.querySelector(".search-input");
const checkboxInput = document.querySelector(".checkbox__input");
const controlButton = document.querySelectorAll(".control-button");
let darkMode, data, completedOnInput;

const init = function () {
  // init value
  darkMode = false;
  completedOnInput = false;
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

// UPDATE APP
const updateApp = () => {
  updateTodoList(data);
  setLocalStorage("data", data);
};

content.addEventListener("click", function (e) {
  const el = e.target;

  // Toggle Dark Mode
  if (el.closest(".icon-mode")) {
    darkMode = !darkMode;
    toggleDarkMode(darkMode);
    // Send to Local Storage
    setLocalStorage("dark-mode", darkMode);
  }

  // Complete todo item && Toggle Checkbox
  if (el.closest(".checkbox")) {
    const completedIndex = +el.closest(".checkbox").dataset.index;
    const todoItem = data[completedIndex];

    // if todoItem is false, it is "input"  but todoItem is true, it is "todoItem"
    if (!todoItem) return;
    todoItem.checked = !todoItem.checked;

    updateApp();
  }

  // Toggle completed todo on Input
  const inputCheckbox = el.closest(".checkbox__input");
  if (inputCheckbox) {
    searchInput.classList.toggle("completed-todo");

    // true: 1;  false: 0
    completedOnInput = +inputCheckbox.dataset.checked;
    inputCheckbox.dataset.checked = completedOnInput ? 0 : 1;
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

    updateApp();
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

  console.log(data);
  // Add new todo data
  const newTodo = searchInput.value;
  if (!newTodo) return;

  const obj = {
    title: newTodo,
    checked: completedOnInput ? true : false,
  };
  data.unshift(obj);

  // Update todo list view && Send data local storage
  updateApp();

  // Clean input
  searchInput.value = "";
});
