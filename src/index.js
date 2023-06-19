class Todo {
  constructor(title, description, dueDate, priority, isCompleted) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isCompleted = isCompleted;
  }
}

class Project {
  todos = []
  
  constructor(name) {
    this.name = name;
  }

  addTodo(todo) {
    this.todos.push(todo);
  }
}

window.todos = [];
window.projects = [];
window.selectedProject = null;

window.createProject = function(name) {
  projects.push(new Project(name));
}

window.deleteProject = function(project) {
  const index = projects.indexOf(project);
  projects.splice(index, 1);
}

window.createTodo = function(title, description, dueDate, priority, isCompleted) {
  const todo = new Todo(title, description, dueDate, priority, isCompleted);

  selectedProject ? selectedProject.addTodo(todo) : todos.push(todo);
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

  createTodo(title.value, description.value, dueDate.value, priority.value);
});

window.createTodoCard = function(todo) {
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
  window.todosGrid = document.querySelector('.todos-grid');

  todos.forEach(todo => {
    const todoCard = createTodoCard(todo);
    todosGrid.appendChild(todoCard);
  });
}

window.createProjectButton = function(project) {
  const projectButton = document.createElement('button');
  projectButton.textContent = project.name;

  return projectButton;
}

window.updateProjectsList = function() {
  window.projectsList = document.querySelector('.projects-list');

  projects.forEach(project => {
    const projectButton = createProjectButton(project);
    projectsList.appendChild(projectButton);
  });
}

