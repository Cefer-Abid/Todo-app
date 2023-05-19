// Helper functions
const iconMoon = document.querySelector(".icon--moon");
const iconSun = document.querySelector(".icon--sun");
const headerImgLightMode = document.querySelector(".header__img--light-mode");
const headerImgDarkMode = document.querySelector(".header__img--dark-mode");
const todoList = document.querySelector(".todo--list");
const countTodoList = document.querySelector(".count--todo-list");

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

export const updateTodoList = function (data) {
  todoList.innerHTML = "";
  const str = data
    .map((todo, i) => {
      return `
      <li class="todo__item">
        <div class="todo-main-inside">
          <div class="checkbox ${todo.checked && "active-checkbox"}"
             data-index="${i}">
            <svg class="checkbox--icon ${todo.checked || "hidden"}" 
             xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
          </div>
          <span class="todo__title ${todo.checked && "completed-todo"}">
            ${todo.title}</span>
        </div>
        <svg  class="todo__delete-icon icon" data-index="${i}" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
      </li>
  `;
    })
    .join("");

  todoList.insertAdjacentHTML("beforeend", str);

  // Active todo items count
  const activeTodoItems = data.filter((todo) => !todo.checked).length;
  countTodoList.textContent = activeTodoItems;
};

export const setLocalStorage = function (itemName, item) {
  localStorage.setItem(itemName, JSON.stringify(item));
};

export const getLocalStorage = function (item) {
  return JSON.parse(localStorage.getItem(item));
};

export const displayAllTodos = function (data) {
  const allTodos = data.filter((todo) => todo);
  updateTodoList(allTodos);
};

export const displayActiveTodos = function (data) {
  const activeTodos = data.filter((todo) => !todo.checked);
  updateTodoList(activeTodos);
};

export const displayCompletedTodos = function (data) {
  const completedTodos = data.filter((todo) => todo.checked);
  updateTodoList(completedTodos);
};

export const displayClearedTodos = function (data) {
  // Delete data
  data.splice(0, data.length);
  updateTodoList(data);
  setLocalStorage("data", data);
};
