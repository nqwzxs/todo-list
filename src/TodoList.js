class TodoList {
  todos = [];
  projects = [];
  selectedProject = null;

  createProject(name) {
    projects.push(new Project(name));
  }

  deleteProject(project) {
    const index = projects.indexOf(project);
    projects.splice(index, 1);
  }

  createTodo(title, description, dueDate, priority, isCompleted) {
    const todo = new Todo(title, description, dueDate, priority, isCompleted);

    selectedProject ? selectedProject.addTodo(todo) : todos.push(todo);
  }

  selectProject(name) {
    selectedProject = projects.find(el => el.name === name);
  }

  deselectProject() {
    selectedProject = null;
  }
}