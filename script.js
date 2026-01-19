const input = document.querySelector("input");
const button = document.querySelector("button");
const ul = document.querySelector("ul");

// carregar tarefas salvas
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  ul.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.done) {
      li.style.textDecoration = "line-through";
    }

    li.addEventListener("click", () => {
      tasks[index].done = !tasks[index].done;
      saveTasks();
      renderTasks();
    });

    ul.appendChild(li);
  });
}

button.addEventListener("click", () => {
  if (input.value.trim() === "") return;

  tasks.push({ text: input.value, done: false });
  input.value = "";

  saveTasks();
  renderTasks();
});

// render inicial
renderTasks();
 
