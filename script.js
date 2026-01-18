const input = document.getElementById("taskInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("taskList");

function addTask() {
  const text = input.value.trim();
  if (text === "") return;

  const li = document.createElement("li");
  li.textContent = text;

  li.addEventListener("click", () => {
    li.classList.toggle("done");
  });

  list.appendChild(li);
  input.value = "";
}

button.addEventListener("click", addTask);

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});
