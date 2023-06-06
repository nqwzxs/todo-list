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

window.projects = [];

window.createDefaultProject = function() {
  projects.push(new Project('default'));
}

window.createProject = function(name) {
  projects.push(new Project(name));
}

window.createTodo = function(title, description, dueDate, priority, project) {
  const todo = new Todo(title, description, dueDate, priority);
  const selectedProject = projects.find(el => el.name === project);
  selectedProject.addTodo(todo);
}

createDefaultProject();