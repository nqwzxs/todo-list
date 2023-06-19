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

window.createTodo = function(title, description, dueDate, priority) {
  const todo = Todo(title, description, dueDate, priority);

  if (selectedProject) {
    selectedProject.addTodo(todo);
  } else {
    todos.push(todo);
  }
}

window.selectProject = function(name) {
  selectedProject = projects.find(el => el.name === name);
}

window.deselectProject = function() {
  selectedProject = null;
}