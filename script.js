const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const contador = document.getElementById("contador");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filtroAtual = "todas"; // todas | pendentes | concluidas

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  let tarefasFiltradas = tasks;

  if (filtroAtual === "pendentes") {
    tarefasFiltradas = tasks.filter(t => !t.completed);
  }

  if (filtroAtual === "concluidas") {
    tarefasFiltradas = tasks.filter(t => t.completed);
  }

  tarefasFiltradas.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task";

    if (task.completed) {
      li.classList.add("completed");
    }

    li.textContent = task.text;

    // clicar no texto marca/desmarca
    li.addEventListener("click", () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    });

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";

    removeBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // evita marcar como concluída
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(removeBtn);
    taskList.appendChild(li);
  });

  atualizarContador();
}

function atualizarContador() {
  const pendentes = tasks.filter(t => !t.completed).length;
  contador.textContent = pendentes;
}

function addTask() {
  const texto = taskInput.value.trim();
  if (texto === "") return;

  tasks.push({
    text: texto,
    completed: false
  });

  taskInput.value = "";
  saveTasks();
  renderTasks();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// inicial
renderTasks();
