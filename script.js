const input = document.querySelector("#taskInput");
const button = document.querySelector("#addBtn");
const lista = document.querySelector("#taskList");
const contador = document.querySelector("#contador");
const filtros = document.querySelectorAll(".filtros button");

// Estado
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filtroAtual = "all";

// Ativa "Todas" por padrão
filtros[0].classList.add("ativo");

// Salvar tarefas
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Renderizar tarefas
function renderTasks() {
  lista.innerHTML = "";

  // Filtragem
  let tarefasFiltradas = tasks;

  if (filtroAtual === "pendentes") {
    tarefasFiltradas = tasks.filter(t => !t.concluida);
  }

  if (filtroAtual === "concluidas") {
    tarefasFiltradas = tasks.filter(t => t.concluida);
  }

  tarefasFiltradas.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.texto;

    if (task.concluida) {
      li.classList.add("concluida");
    }

    // Marcar / desmarcar
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

      const indexReal = tasks.indexOf(task);
      tasks.splice(indexReal, 1);

      saveTasks();
      renderTasks();
    });

    li.appendChild(btnRemove);
    lista.appendChild(li);
  });

  // Contador (pendentes)
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

// Eventos dos filtros
filtros.forEach(botao => {
  botao.addEventListener("click", () => {
    filtroAtual = botao.dataset.filter;

    filtros.forEach(b => b.classList.remove("ativo"));
    botao.classList.add("ativo");

    renderTasks();
  });
});

// Inicialização
renderTasks();
