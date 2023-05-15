"use strict";

const inputEl = document.querySelector(".input");
const formInputElement = document.querySelector(".new-todo");
const todoItemsElement = document.querySelector(".todo-items");
const todoItemInfo = document.querySelector(".footer");
const countTodo = document.querySelector(".count-task");
const btnAll = document.querySelector(".btn-all");
const btnActive = document.querySelector(".btn-active");
const btnCompleted = document.querySelector(".btn-completed");

let todos = [];
let count = 0;
btnAll.classList.add("active");

if (localStorage.getItem("todos")) {
  todos = JSON.parse(localStorage.getItem("todos"));
  count = todos.length;
  countTodo.textContent = `${count} items left`;
}

// Function
const capitalCase = function (str) {
  const arr = [str];
  return `${str[0].toUpperCase()}${str.slice(1)}`;
};

formInputElement.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!inputEl.value) {
    return;
  }
  countTodo.textContent = `${(count += 1)} items left`;

  const todoObj = {
    title: capitalCase(inputEl.value),
    checked: false,
  };
  todos.unshift(todoObj);
  localStorage.setItem("todos", JSON.stringify(todos));
  updateUi(todos);
  console.log(...todos);
});

const updateUi = (todos) => {
  todoItemsElement.innerHTML = "";
  todos.forEach((todo) => {
    const todoItemStr = `
    <div class="todo-item">
      <div class="check">
         <div class="check-mark"></div>
      </div>
      <div class="todo-text ${todo.checked ? "todo-checked" : ""}">
      ${todo.title}
      </div>
    </div> `;

    inputEl.value = ``;
    todoItemsElement.insertAdjacentHTML("beforeend", todoItemStr);
  });
};
updateUi(todos);

todoItemsElement.addEventListener("click", function (e) {
  if (e.target.classList.contains("todo-text")) {
    const mappedTodo = todos.map((todo) => {
      if (todo.title === e.target.textContent) {
        todo.checked = !todo.checked;

        todo.checked ? (count -= 1) : (count += 1);
        countTodo.textContent = `${count} items left`;

        return todo;
      } else {
        return todo;
      }
    });
    todos = mappedTodo;
    updateUi(todos);
  }
});

todoItemInfo.addEventListener("click", function (e) {
  e.preventDefault();
  const todoTargetTextContent = e.target.textContent;
  if (todoTargetTextContent === "All") {
    const filterAll = todos.filter((todo) => todo);
    updateUi(filterAll);
  } else if (todoTargetTextContent === "Active") {
    const filterActive = todos.filter((todo) => todo.checked === false);
    updateUi(filterActive);
  } else if (todoTargetTextContent === "Completed") {
    const filterCompleted = todos.filter((todo) => todo.checked === true);
    updateUi(filterCompleted);
  } else if (todoTargetTextContent === "Clear Completed") {
    // New
    // const removeLocal = todos.filter((todo) => todo.checked === true);
    // todos = removeLocal;
    // localStorage.removeItem(todos);

    const filterCompleted = todos.filter((todo) => !todo.checked);
    todos = filterCompleted;
    updateUi(todos);
  }
});

