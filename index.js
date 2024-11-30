const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
const port = 3010;

app.use(express.static('static'));
app.use(cors());

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];

// Function to add a task
function addTask(taskId, text, priority) {
  let newTask = {
    taskId: parseInt(taskId),
    text: text,
    priority: parseInt(priority),
  };
  tasks.push(newTask);
}

// Function to get all tasks
function getAllTasks() {
  return tasks;
}

//Endpoint 1. Add a Task to the Task List
app.get('/tasks/add', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = parseInt(req.query.priority);
  addTask(taskId, text, priority);

  res.json({ tasks: getAllTasks() });
});

//Endpoint 2. Read All Tasks in the Task List
app.get('/tasks', (req, res) => {
  res.json({ tasks: getAllTasks() });
});

function sortTasksByPriority() {
  return [...tasks].sort((a, b) => a.priority - b.priority);
}

//Endpoint 3. Sort Tasks by Priority
app.get('/tasks/sort-by-priority', (req, res) => {
  let sortedTasks = sortTasksByPriority();
  res.json({ tasks: sortedTasks });
});

function editTaskPriority(taskId, priority) {
  let task = tasks.find((t) => t.taskId === parseInt(taskId));
  if (task) {
    task.priority = parseInt(priority);
  }
}

//Endpoint 4. Edit Task Priority
app.get('/tasks/edit-priority', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);

  editTaskPriority(taskId, priority);
  res.json({ tasks: getAllTasks() });
});

function editTaskText(taskId, text) {
  let task = tasks.find((t) => t.taskId === parseInt(taskId));
  if (task) {
    task.text = text;
  }
}

//Endpoint 5. Edit/Update Task Text
app.get('/tasks/edit-text', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  editTaskText(taskId, text);
  res.json({ tasks: getAllTasks() });
});

// Function to delete a task by taskId
function deleteTask(taskId) {
  tasks = tasks.filter((t) => t.taskId !== parseInt(taskId));
}

//Endpoint 6. Delete a Task from the Task List
app.get('/tasks/delete', (req, res) => {
  let taskId = parseInt(req.query.taskId);

  deleteTask(taskId);
  res.json({ tasks: getAllTasks() });
});

// Function to filter tasks by priority
function filterTasksByPriority(priority) {
  return tasks.filter((t) => t.priority === parseInt(priority));
}

//Endpoint 7. Filter Tasks by Priority
app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = req.query.priority;
  let filteredTasks = filterTasksByPriority(priority);
  res.json({ tasks: filteredTasks });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
