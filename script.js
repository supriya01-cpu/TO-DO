const form = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskTime = document.getElementById('taskTime');
const daySelect = document.getElementById('daySelect');
const taskLists = document.getElementById('taskLists');

const tasks = {};

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  const time = taskTime.value;
  const day = daySelect.value;

  if (!taskText || !time) return;

  if (!tasks[day]) {
    tasks[day] = [];
    createDaySection(day);
  }

  const taskObj = { text: taskText, time: time };
  tasks[day].push(taskObj);
  addTaskToDOM(day, taskObj);

  taskInput.value = '';
  taskTime.value = '';
});

function createDaySection(day) {
  const section = document.createElement('div');
  section.className = 'day-section';
  section.id = day;

  const heading = document.createElement('h2');
  heading.textContent = day;

  const list = document.createElement('div');
  list.className = 'task-list';

  section.appendChild(heading);
  section.appendChild(list);
  taskLists.appendChild(section);
}

function addTaskToDOM(day, taskObj) {
  const section = document.getElementById(day);
  const list = section.querySelector('.task-list');

  const taskDiv = document.createElement('div');
  taskDiv.className = 'task';

  taskDiv.innerHTML = `
    <span>🕒 ${taskObj.time} — ${taskObj.text}</span>
    <button onclick="deleteTask('${day}', '${taskObj.text}', '${taskObj.time}', this)">❌</button>
  `;

  list.appendChild(taskDiv);
}

function deleteTask(day, text, time, btn) {
  tasks[day] = tasks[day].filter(t => t.text !== text || t.time !== time);
  btn.parentElement.remove();

  if (tasks[day].length === 0) {
    document.getElementById(day).remove();
    delete tasks[day];
  }
}
