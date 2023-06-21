import Todo from './Todo';
import Project from './Project';
import Storage from './Storage';

export default class TodoList {
  static selectedProject = null

  static createProject(name) {
    Storage.projects.push(new Project(name));
  }

  static deleteProject(project) {
    const index = Storage.projects.indexOf(project);
    Storage.projects.splice(index, 1);
  }

  static createTodo(title, description, dueDate, priority) {
    const todo = new Todo(title, description, dueDate, priority);
    const project = TodoList.selectedProject;

    project ? project.addTodo(todo) : Storage.todos.push(todo);
  }

  static deleteTodo(todo) {
    let todos;

    if (this.selectedProject) {
      todos = this.selectedProject.todos;
    } else {
      todos = Storage.todos;
    }

    const index = todos.indexOf(todo);
    todos.splice(index, 1);
  }

  static selectProject(name) {
    TodoList.selectedProject = Storage.projects.find(el => el.name === name);
  }

  static deselectProject() {
    TodoList.selectedProject = null;
  }
}