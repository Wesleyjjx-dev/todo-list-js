const input = document.querySelector("input");
const button = document.querySelector("button");
const lista = document.querySelector("ul");
const contador = document.querySelector("#contador");

// Carrega tarefas do localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Salva tarefas
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Renderiza tarefas na tela
function renderTasks() {
  lista.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.texto;

    if (task.concluida) {
      li.classList.add("concluida");
    }

    // Marcar / desmarcar como concluída
    li.addEventListener("click", () => {
      task.concluida = !task.concluida;
      saveTasks();
      renderTasks();
    });

    // Botão remover
    const btnRemove = document.createElement("button");
    btnRemove.textContent = "✖";

    btnRemove.addEventListener("click", (e) => {
      e.stopPropagation(); // evita marcar como concluída
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(btnRemove);
    lista.appendChild(li);
  });

  // Atualiza contador
  contador.textContent = tasks.filter(t => !t.concluida).length;
}

// Adiciona nova tarefa
function addTask() {
  const texto = input.value.trim();
  if (texto === "") return;

  tasks.push({
    texto: texto,
    concluida: false
  });

  input.value = "";
  saveTasks();
  renderTasks();
}

// Clique no botão
button.addEventListener("click", addTask);

// Enter no input
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// Renderiza ao abrir a página
renderTasks();
