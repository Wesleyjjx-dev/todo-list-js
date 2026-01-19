const input = document.querySelector("#taskInput");
const button = document.querySelector("#addBtn");
const lista = document.querySelector("#taskList");
const contador = document.querySelector("#contador");

// Carregar tarefas
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Salvar tarefas
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Renderizar tarefas
function renderTasks() {
  lista.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.texto;

    if (task.concluida) {
      li.classList.add("concluida");
    }

    // Marcar como concluída
    li.addEventListener("click", () => {
      task.concluida = !task.concluida;
      saveTasks();
      renderTasks();
    });

    // Botão remover
    const btnRemove = document.createElement("button");
    btnRemove.textContent = "✖";
    btnRemove.classList.add("remove");

    btnRemove.addEventListener("click", (e) => {
      e.stopPropagation();
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(btnRemove);
    lista.appendChild(li);
  });

  // Atualizar contador
  contador.textContent = tasks.filter(t => !t.concluida).length;
}

// Adicionar tarefa
function addTask() {
  const texto = input.value.trim();
  if (texto === "") return;

  tasks.push({
    texto,
    concluida: false
  });

  input.value = "";
  saveTasks();
  renderTasks();
}

// Eventos
button.addEventListener("click", addTask);

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// Inicial
renderTasks();
