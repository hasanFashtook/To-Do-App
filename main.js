

let form = document.querySelector("form");
let input = document.querySelector(".input");
let add = document.querySelector(".add");
let tasks = document.querySelector(".tasks");

let arrayOfTasks = [];

renderTasksFromLocalStorage();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (input.value !== "") {
    addTaskToArray(input.value);
    input.value = "";
    input.focus();
  }
});

function addTaskToArray(item) {
  let task = {
    title: item,
    id: Date.now(),
    status: false,
  };
  arrayOfTasks.push(task);
  renderTasks(arrayOfTasks);
  addArrayToLocalStorage(arrayOfTasks);
}

function renderTasks(arrayOfTasks) {
  tasks.innerHTML = "";

  for (let i = 0; i < arrayOfTasks.length; i++) {
    let task = document.createElement("div");
    let delBtn = document.createElement("span");

    isChecked = arrayOfTasks[i].status === true ? "done" : "";
    task.className = `task ${isChecked}`;
    task.setAttribute("data-id", arrayOfTasks[i].id);
    task.textContent = arrayOfTasks[i].title;
    delBtn.textContent = "delete";
    delBtn.className = "del";
    task.append(delBtn);
    tasks.append(task);
  }
}

tasks.addEventListener("click", (event) => {
  if (event.target.className === "del") {
    event.target.parentElement.remove();
    taskId = event.target.parentElement.dataset.id;
    deleteFromArray(taskId);
  }
  if (event.target.classList.contains("task")) {
    event.target.classList.toggle("done");
    taskId = event.target.dataset.id;
    toggleDone(taskId);
  }
});

function deleteFromArray(taskId) {
  arrayOfTasks = arrayOfTasks.filter((item) => item.id !== Number(taskId));
  addArrayToLocalStorage(arrayOfTasks);
}
function toggleDone(taskId) {
  let index = arrayOfTasks.findIndex((ele) => ele.id === Number(taskId));
  arrayOfTasks[index].status === false
    ? (arrayOfTasks[index].status = true)
    : (arrayOfTasks[index].status = false);
  addArrayToLocalStorage(arrayOfTasks);
}
function addArrayToLocalStorage(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
function renderTasksFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    arrayOfTasks = JSON.parse(data);
  }
  renderTasks(arrayOfTasks);
}
