import Project from './Project';

export default class Storage {
  static todos = []
  static projects = []

  static populateStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }

  static loadData() {
    this.todos = JSON.parse(localStorage.getItem('todos'));
    this.projects = JSON.parse(localStorage.getItem('projects'));
    
    this.projects.forEach(project => {
      Object.setPrototypeOf(project, Project.prototype)
    });
  }
}