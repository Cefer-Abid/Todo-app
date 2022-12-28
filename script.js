"use strict";
const newTask = document.querySelector(".input");
const formEl = document.querySelector("form");
const ulEl = document.querySelector(".todo-list-ul");
const countTask = document.querySelector(".count-task");
const btnAll = document.querySelector(".btn-all");
const btnActive = document.querySelector(".btn-active");
const btnCompleted = document.querySelector(".btn-completed");
const btnClear = document.querySelector(".btn-clear");
const iconEl = document.querySelector(".icon");
const bodyEl = document.querySelector("body");
const imgEl = document.querySelector(".img");
const footerEl = document.querySelector(".footer");
const btnEl = document.querySelector(".btn");

// Function
const capital = function (str) {
  const arr = [str];
  return `${str[0].toUpperCase()}${str.slice(1)}`;
};
const countf = function (counting) {
  countTask.textContent = `${counting} items left`;
};
const toggle = function (element, cl) {
  element.classList.toggle(cl);
};

// Starting
let count = 0;
btnAll.classList.add("blue");
// const finish = toDo.classList.contains("xet");

formEl.addEventListener("submit", function () {
  if (newTask.value) {
    const toDo = document.createElement("li");
    toDo.textContent = capital(newTask.value);
    toDo.classList.add("task");
    ulEl.appendChild(toDo);
    newTask.value = ``;

    toDo.addEventListener("click", function () {
      toDo.classList.toggle("xet");
      toDo.classList.contains("xet")
        ? countf((count -= 1))
        : countf((count += 1));
    });

    countf((count += 1));

    btnAll.addEventListener("click", function () {
      toDo.classList.remove("hidden");
      btnCompleted.classList.remove("blue");
      btnAll.classList.add("blue");
      btnActive.classList.remove("blue");
    });

    btnActive.addEventListener("click", function () {
      toDo.classList.contains("xet")
        ? toDo.classList.add("hidden")
        : toDo.classList.remove("hidden");
      btnCompleted.classList.remove("blue");
      btnAll.classList.remove("blue");
      btnActive.classList.add("blue");
    });

    btnCompleted.addEventListener("click", function () {
      toDo.classList.contains("xet")
        ? toDo.classList.remove("hidden")
        : toDo.classList.add("hidden");
      btnCompleted.classList.add("blue");
      btnAll.classList.remove("blue");
      btnActive.classList.remove("blue");
    });

    btnClear.addEventListener("click", function () {
      toDo.classList.contains("xet") ? toDo.remove() : ``;
    });
  }
});

iconEl.addEventListener("click", function () {
  toggle(bodyEl, "dm-body");
  toggle(imgEl, "dm-img");
  toggle(ulEl, "dm-ul");
  toggle(newTask, "dm-input");
  toggle(footerEl, "dm-footer");
  toggle(btnEl, "dm-btn");
  btnEl.classList.add("dm-btn");
});
