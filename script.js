const input = document.getElementById("taskInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("taskList");

button.addEventListener("click", () => {
  const text = input.value;

  if (text === "") return;

  const li = document.createElement("li");
  li.textContent = text;
  li.addEventListener("click", () => {
  li.style.textDecoration = "line-through";
});

  list.appendChild(li);
  input.value = "";
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    button.click();
  }
});
