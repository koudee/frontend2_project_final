const form = document.querySelector(".input_task");
const addTasks = document.querySelector(".addTask");
const input = document.querySelector("#input");
const date = document.querySelector(".date");
const todoTasks = document.querySelector(".todo-tasks");
const totalTodos = document.querySelector(".total-todos");
const highPriority = document.querySelector(".high-priority");
const statused = document.querySelector("#status");

const completeTask = document.querySelector(".total-completed");

const todoStarted = document.querySelector(".todo-started");

let count = 0,
  priority = 0;
let CompleteTasks = 0;
completeTask.innerHTML = `Complete ${CompleteTasks}`;
totalTodos.innerHTML = `To Do ${count}`;
highPriority.innerHTML = `High Priority ${count}`;

function addTask(e) {
  e.preventDefault();
  //   console.log("click");

  if (input.value.trim() === "") {
    alert("Please Enter a Task name");
    return;
  }

  //   console.log(date.value);
  const task = createElement(input.value);

  todoTasks.appendChild(task);

  form.reset();
}

// const filterBtn = document.getElementById("filterBtn");

// filterBtn.addEventListener("click", filterTasks);

function createElement(inputValue) {
  const selectedPriority = document.getElementById("priority").value;
  const selectedStatus = document.getElementById("status").value;
  count++;

  todoStarted.style.display = "none";
  totalTodos.innerHTML = `To-do list ${count}`;

  const taskDiv = document.createElement("div");
  taskDiv.classList.add("tasks");

  const taskCheckbox = document.createElement("input");
  taskCheckbox.type = "checkbox";

  //   Task Completed

  const taskPara = document.createElement("p");

  taskPara.classList.add("para");

  if (date.value) {
    taskPara.innerHTML = `<strong>${inputValue}</strong> <br> <small>Due Date:${date.value} </small></br>`;
  } else {
    taskPara.innerHTML = `<strong>${inputValue}</strong>`;
  }
  taskCheckbox.addEventListener("change", () => {
    if (taskCheckbox.checked) {
      taskPara.classList.add("line-through");
      taskPara.style.color = "#808080";
      CompleteTasks++;
      completeTask.innerHTML = `Complete ${CompleteTasks}`;

      if (selectedPriority === "high" && priority >= 0) {
        priority--;
        highPriority.innerHTML = `High Priority ${priority} of ${count}`;
      }
    } else {
      CompleteTasks--;
      completeTask.innerHTML = `Complete ${CompleteTasks}`;
      if (selectedPriority === "high") {
        priority++;
      }
      highPriority.innerHTML = `High Priority ${priority} of ${count}`;
      taskPara.classList.remove("line-through");
      taskPara.style.color = "white";
      //   priority--;
    }
  });

  //   high Priority Check
  if (selectedPriority === "high" && count >= 0) {
    // count++;
    priority++;
    highPriority.innerHTML = `High Priority ${priority} of ${count}`;
  }

  //   Priority status

  const priorityTabs = document.createElement("div");
  priorityTabs.classList.add("priorites");

  const priorites = document.createElement("div");
  priorites.innerHTML = selectedPriority;
  priorites.classList.add("high-priority");

  const priorityStatus = document.createElement("div");
  priorityStatus.innerHTML = selectedStatus;
  priorityStatus.classList.add("status");

  priorityTabs.append(priorites, priorityStatus);

  const taskEditBtn = document.createElement("button");
  taskEditBtn.classList.add("material-symbols-outlined");
  taskEditBtn.innerHTML = "edit";

  taskEditBtn.addEventListener("click", () => {
    editTask(taskPara, date.value);
  });

  const taskDeleteBtn = document.createElement("button");
  taskDeleteBtn.classList.add("material-symbols-outlined");
  taskDeleteBtn.textContent = "delete";

  taskDeleteBtn.addEventListener("click", () => {
    if (selectedPriority === "high" && count > 0 && priority > 0) {
      priority--;
      count--;
      highPriority.innerHTML = `High Priority ${priority} of ${count}`;
    } else {
      // count = 0;
      // priority = 0;
      count--;

      highPriority.innerHTML = `High Priority ${priority} of ${count}`;
      totalTodos.innerHTML = `To-do list ${count}`;
    }

    // Assuming taskDiv is a reference to the element you want to remove
    taskDiv.remove();

    totalTodos.innerHTML = `To-do list ${count}`;

    if (count === 0) {
      totalTodos.innerHTML = `To Do 0`;
    }
  });

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("btn-container");

  btnContainer.append(taskEditBtn, taskDeleteBtn);

  taskDiv.append(taskCheckbox, taskPara, priorityTabs, btnContainer);

  return taskDiv;
}

function editTask(taskpara) {
  const taskText = taskpara.firstChild;
  const taskName = taskText.textContent;

  const newTask = prompt("Edit Task Name", taskName);
  const newDate = prompt("Edit Date");

  if (newTask !== null) {
    taskText.textContent = newTask;
  }

  // console.log(editText);
}

addTasks.addEventListener("click", addTask);