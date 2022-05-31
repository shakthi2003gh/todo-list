const input = document.querySelector("input");
const lists = document.querySelector(".lists");
const tasks = document.querySelectorAll(".lists span");
let deleteButton;
let index;

const LOCAL_STORAGE_KEY = "task.list";
const taskToDo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

render(taskToDo);

window.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() == "") {
    input.value = "";
    alert("Type a task to add");
    return;
  }

  taskToDo.push({ id: Date.now(), name: input.value, complete: false });

  // save
  save();

  render(taskToDo);
  input.value = "";
});

function add(task) {
  const list = document.createElement("li");
  const taskText = document.createElement("span");
  const icon = document.createElement("i");

  taskText.innerText = task.name;
  icon.classList.add("fa-solid");
  icon.classList.add("fa-trash-can");

  list.dataset.id = task.id;
  list.appendChild(taskText);
  list.appendChild(icon);
  lists.appendChild(list);

  if (task.complete) list.classList.add("task--done");

  // task
  taskText.addEventListener("click", (e) => {
    const task = e.target.closest("li");
    const taskId = task.dataset.id;

    task.classList.toggle("task--done");

    taskToDo.forEach((value) => {
      if (value.id == taskId) {
        value.complete = task.classList.contains("task--done");
        save();
      }
    });
  });

  // remove
  icon.addEventListener("click", (e) => {
    const taskId = e.target.closest("li").dataset.id;

    taskToDo.forEach((value, position) => {
      if (value.id == taskId) index = position;
    });

    taskToDo.splice(index, 1);

    save();
    render(taskToDo);
  });
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(taskToDo));
}

function render(tasks) {
  while (lists.firstChild) {
    lists.removeChild(lists.firstChild);
  }

  tasks.forEach((task) => {
    add(task);
  });
}
