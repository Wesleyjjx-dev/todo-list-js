const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const contador = document.getElementById("contador");
const themeToggle = document.getElementById("themeToggle");
const filterAll = document.getElementById("filterAll");
const filterPending = document.getElementById("filterPending");
const filterCompleted = document.getElementById("filterCompleted");
const emptyMessage = document.getElementById("emptyMessage");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all"; // all | pending | completed

// Salvar tarefas no localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Renderizar tarefas
function renderTasks() {
  emptyMessage.style.display = tasks.length === 0 ? "block" : "none";

  // contador de pendentes
  contador.textContent = tasks.filter(t => !t.completed).length;

  taskList.innerHTML = "";

  let filteredTasks = tasks;
  if (currentFilter === "pending") filteredTasks = tasks.filter(t => !t.completed);
  else if (currentFilter === "completed") filteredTasks = tasks.filter(t => t.completed);

  filteredTasks.forEach(task => {
    const li = document.createElement("li");
    if(task.completed) li.classList.add("completed");

    const spanText = document.createElement("span");
    spanText.textContent = task.text;
    spanText.addEventListener("click", () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    });
    li.appendChild(spanText);

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";
    removeBtn.addEventListener("click", e => {
      e.stopPropagation();
      tasks = tasks.filter(t => t !== task);
      saveTasks();
      renderTasks();
    });
    li.appendChild(removeBtn);

    taskList.appendChild(li);
  });
}


// Adicionar nova tarefa
function addTask() {
  const texto = taskInput.value.trim();
  if (texto === "") return;

  tasks.push({ text: texto, completed: false });
  taskInput.value = "";
  saveTasks();
  renderTasks();
}

// Eventos
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

// Tema claro/escuro
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  themeToggle.textContent = isDark ? "☀️ Modo claro" : "🌙 Modo escuro";
});

// Restaurar tema salvo
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️ Modo claro";
}

// Filtros
function setActiveFilter(botao) {
  document.querySelectorAll(".filter-btn").forEach((btn) =>
    btn.classList.remove("active")
  );
  botao.classList.add("active");
}

filterAll.addEventListener("click", () => {
  currentFilter = "all";
  setActiveFilter(filterAll);
  renderTasks();
});
filterPending.addEventListener("click", () => {
  currentFilter = "pending";
  setActiveFilter(filterPending);
  renderTasks();
});
filterCompleted.addEventListener("click", () => {
  currentFilter = "completed";
  setActiveFilter(filterCompleted);
  renderTasks();
});

// Inicial
renderTasks();
