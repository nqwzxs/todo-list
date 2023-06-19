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

window.createTodo = function(title, description, dueDate, priority, project) {
  if (selectedProject) project = selectedProject;
  
  const todo = new Todo(title, description, dueDate, priority, project);
  todos.push(todo);
}

window.selectProject = function(name) {
  selectedProject = projects.find(el => el.name === name);
}

window.deselectProject = function() {
  selectedProject = null;
}