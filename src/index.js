class Todo {
  constructor(title, description, dueDate, priority, project, isCompleted) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
    this.isCompleted = isCompleted;
  }
}

class Project {
  constructor(name) {
    this.name = name;
  }
}

window.todos = [];
window.projects = [];
window.selectedProject = null;

window.createProject = function(name) {
  projects.push(new Project(name));
}

window.createTodo = function(title, description, dueDate, priority, project, isCompleted) {
  if (selectedProject) project = selectedProject;
  
  const todo = new Todo(title, description, dueDate, priority, project, isCompleted);
  todos.push(todo);
}

window.selectProject = function(name) {
  selectedProject = projects.find(el => el.name === name);
}

window.deselectProject = function() {
  selectedProject = null;
}

window.addTodoForm = document.querySelector('.add-todo-form');

addTodoForm.addEventListener('submit', e => {
  e.preventDefault();

  let title = document.getElementById('title');
  let description = document.getElementById('description');
  let dueDate = document.getElementById('due-date');

  const priorities = document.getElementsByName('priority');
  let priority = Array.from(priorities).find(radio => radio.checked);

  let project = document.getElementById('project');
  let isCompleted = document.getElementById('is-completed');

  createTodo(title.value, description.value, dueDate.value, priority.value, project.value, isCompleted.checked);
});

window.todosGrid = document.querySelector('.todos-grid');

window.createTodoCard = function (todo) {
  const todoCard = document.createElement('div');

  const title = document.createElement('div');
  title.textContent = todo.title;
  todoCard.appendChild(title);

  const description = document.createElement('div');
  description.textContent = todo.description;
  todoCard.appendChild(description);

  return todoCard;
}

window.updateTodosGrid = function() {
  todos.forEach(todo => {
    const todoCard = createTodoCard(todo);
    todosGrid.appendChild(todoCard);
  });
}