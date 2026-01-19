const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const contador = document.getElementById("contador");

const filterAll = document.getElementById("filterAll");
const filterPending = document.getElementById("filterPending");
const filterCompleted = document.getElementById("filterCompleted");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all"; // all | pending | completed

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  let filteredTasks = [];

  if (currentFilter === "all") {
    filteredTasks = tasks;
  } else if (currentFilter === "pending") {
    filteredTasks = tasks.filter(t => !t.completed);
  } else {
    filteredTasks = tasks.filter(t => t.completed);
  }

  filteredTasks.forEach(task => {
    const li = document.createElement("li");

if (task.completed) {
  li.classList.add("completed");
}

const spanText = document.createElement("span");
spanText.textContent = task.text;

// clicar SOMENTE no texto
spanText.addEventListener("click", () => {
  task.completed = !task.completed;
  saveTasks();
  renderTasks();
});

li.appendChild(spanText);

    // editar tarefa
    li.addEventListener("dblclick", () => {
      const inputEdit = document.createElement("input");
      inputEdit.type = "text";
      inputEdit.value = task.text;
      inputEdit.style.width = "80%";

      li.innerHTML = "";
      li.appendChild(inputEdit);
      inputEdit.focus();

      inputEdit.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const novoTexto = inputEdit.value.trim();
          if (novoTexto !== "") {
            task.text = novoTexto;
            saveTasks();
            renderTasks();
          }
        }

        if (e.key === "Escape") {
          renderTasks();
        }
      });
    });

    // remover tarefa
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";

    removeBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      const confirmar = confirm(
        `Deseja remover a tarefa:\n"${task.text}" ?`
      );

      if (!confirmar) return;

      tasks = tasks.filter(t => t !== task);
      saveTasks();
      renderTasks();
    });

    li.appendChild(removeBtn);
    taskList.appendChild(li);
  });

  contador.textContent = filteredTasks.length;
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

// eventos
addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// filtros
function setActiveFilter(botao) {
  document.querySelectorAll(".filter-btn").forEach(btn =>
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

// inicial
renderTasks();
