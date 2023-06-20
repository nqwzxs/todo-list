import Todo from './Todo';
import Project from './Project';

export default class TodoList {
  static todos = [];
  static projects = [];
  static selectedProject = null;

  static createProject(name) {
    TodoList.projects.push(new Project(name));
  }

  static deleteProject(project) {
    const index = TodoList.projects.indexOf(project);
    TodoList.projects.splice(index, 1);
  }

  static createTodo(title, description, dueDate, priority, isCompleted) {
    const todo = new Todo(title, description, dueDate, priority, isCompleted);

    TodoList.selectedProject ? TodoList.selectedProject.addTodo(todo) : TodoList.todos.push(todo);
  }

  static deleteTodo(todo) {
    let todos;

    if (this.selectedProject) {
      todos = this.selectedProject.todos;
    } else {
      todos = this.todos;
    }

    const index = todos.indexOf(todo);
    todos.splice(index, 1);
  }

  static selectProject(name) {
    TodoList.selectedProject = TodoList.projects.find(el => el.name === name);
  }

  static deselectProject() {
    TodoList.selectedProject = null;
  }
}