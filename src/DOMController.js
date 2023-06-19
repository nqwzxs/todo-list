import TodoList from './TodoList';

export default class DOMController {
  static {
    this.handleAddTodoButton();
    this.handleAddTodoFormEvent();
    this.handleOverlayEvent()
  }
  
  static handleAddTodoButton() {
    const addTodoButton = document.querySelector('.add-todo-button');

    addTodoButton.addEventListener('click', e => {
      this.toggleAddTodoForm();
    });
  }

  static handleAddTodoFormEvent() {
    const addTodoForm = document.querySelector('.add-todo-form');

    addTodoForm.addEventListener('submit', e => {
      e.preventDefault();
  
      const title = document.getElementById('title');
      const description = document.getElementById('description');
      const dueDate = document.getElementById('due-date');
  
      const priorities = document.getElementsByName('priority');
      const priority = Array.from(priorities).find(radio => radio.checked);
  
      TodoList.createTodo(title.value, description.value, dueDate.value, priority.value);
      this.toggleAddTodoForm();
      this.clearAddTodoForm();
      this.updateTodosList();
    });
  }

  static handleOverlayEvent() {
    const overlay = document.querySelector('.overlay');

    overlay.addEventListener('click', e => {
      const addTodoForm = document.querySelector('.add-todo-form');
      this.toggleAddTodoForm();
    });
  }

  static clearAddTodoForm() {
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const dueDate = document.getElementById('due-date');
    const noPriority = document.getElementById('no-priority');

    title.value = '';
    description.value = '';
    dueDate.value = '';
    noPriority.checked = true;
  }

  static toggleAddTodoForm() {
    const addTodoForm = document.querySelector('.add-todo-form');
    addTodoForm.classList.toggle('active');

    const overlay = document.querySelector('.overlay');
    overlay.classList.toggle('active');
  }

  static createTodoCard(todo) {
    const todoCard = document.createElement('div');

    const span = document.createElement('span');
    
    const input = document.createElement('input');
    input.type = 'checkbox';
    span.appendChild(input);
    todoCard.appendChild(span)

    const title = document.createElement('div');
    title.textContent = todo.title;
    todoCard.appendChild(title);

    const dueDate = document.createElement('div');
    dueDate.textContent = todo.dueDate ? todo.dueDate : 'No due date';
    todoCard.appendChild(dueDate);

    return todoCard;
  }

  static updateTodosList() {
    const todosList = document.querySelector('.todos-list');

    TodoList.todos.forEach(todo => {
      const todoCard = this.createTodoCard(todo);
      const addTodoButton = document.querySelector('.add-todo-button');
      todosList.insertBefore(todoCard, addTodoButton);
    });
  }

  static createProjectButton(project) {
    const projectButton = document.createElement('button');
    projectButton.textContent = project.name;

    return projectButton;
  }

  static updateProjectsList() {
    const projectsList = document.querySelector('.projects-list');

    TodoList.projects.forEach(project => {
      const projectButton = createProjectButton(project);
      projectsList.appendChild(projectButton);
    });
  }
}