// script.js
document.getElementById('taskForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;

  await fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description })
  });

  fetchTasks();
});

async function fetchTasks() {
  const response = await fetch('/api/tasks');
  const tasks = await response.json();
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${task.title}</strong>: ${task.description}`;
    taskList.appendChild(li);
  });
}

// Fetch tasks on initial load
fetchTasks();
