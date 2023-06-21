import { parseISO, isToday, isThisWeek } from 'date-fns';
import Storage from './Storage';
import TodoList from './TodoList';

export default class UserInterface {
  static inbox = document.querySelector('.menu .inbox')
  static today = document.querySelector('.menu .today')
  static thisWeek = document.querySelector('.menu .this-week')

  static currentPage = this.inbox
  static todoBeingEdited = null
  static projectBeingEdited = null

  static addTodoButton = document.querySelector('.add-todo-button');
  
  static {
    if (window.localStorage.getItem("todos")) {
      Storage.loadData();
      this.updateTodosList();
      this.updateProjectsList();
    }

    this.handleSelectInboxEvent();
    this.handleSelectTodayEvent();
    this.handleSelectThisWeekEvent();
    this.handleAddTodoButton();
    this.handleAddProjectButton();
    this.handleTodoFormEvent();
    this.handleProjectFormEvent();
    this.handleOverlayEvent();
  }

  static handleSelectInboxEvent() {
    this.inbox.addEventListener('click', e => {
      this.currentPage = this.inbox;
      TodoList.selectedProject = null;
      this.addTodoButton.style.display = 'flex';
      this.updateTodosList();
      this.highlightCurrentPage();  
    });
  }

  static handleSelectTodayEvent() {
    this.today.addEventListener('click', e => {
      this.currentPage = this.today;
      this.addTodoButton.style.display = 'none';
      TodoList.selectedProject = null;
      this.updateTodosList();
      this.highlightCurrentPage();  
    });
  }

  static handleSelectThisWeekEvent() {
    this.thisWeek.addEventListener('click', e => {
      this.currentPage = this.thisWeek;
      TodoList.selectedProject = null;
      this.addTodoButton.style.display = 'none';
      this.updateTodosList();
      this.highlightCurrentPage();  
    });
  }
  
  static handleAddTodoButton() {
    this.addTodoButton.addEventListener('click', e => {
      const button = document.querySelector('.todo-form button');
      button.textContent = 'Add Todo';

      this.toggleTodoForm();
    });
  }

  static handleAddProjectButton() {
    const addProjectButton = document.querySelector('.add-project-button');

    addProjectButton.addEventListener('click', e => {
      const button = document.querySelector('.project-form button');
      button.textContent = 'Add Project';

      this.toggleProjectForm();
    });
  }

  static toggleProjectForm() {
    const projectForm = document.querySelector('.project-form');
    projectForm.classList.toggle('active');

    const overlay = document.querySelector('.overlay');
    overlay.classList.toggle('active');
  }

  static handleProjectFormEvent() {
    const projectForm = document.querySelector('.project-form');

    projectForm.addEventListener('submit', e => {
      e.preventDefault();
  
      const name = document.getElementById('name');

      if (this.projectBeingEdited) {
        this.projectBeingEdited.name = name.value;
      } else {
        TodoList.createProject(name.value);
      }

      this.projectBeingEdited = null;

      this.toggleProjectForm();
      this.clearProjectForm();
      this.updateProjectsList();
      Storage.populateStorage();
    });
  }

  static handleTodoFormEvent() {
    const todoForm = document.querySelector('.todo-form');

    todoForm.addEventListener('submit', e => {
      e.preventDefault();
  
      const title = document.getElementById('title');
      const description = document.getElementById('description');
      const dueDate = document.getElementById('due-date');
  
      const priorities = document.getElementsByName('priority');
      const priority = Array.from(priorities).find(radio => radio.checked);
  
      if (this.todoBeingEdited) {
        this.todoBeingEdited.title = title.value;
        this.todoBeingEdited.description = description.value;
        this.todoBeingEdited.dueDate = dueDate.value;
        this.todoBeingEdited.priority = priority.value;
      } else {
        TodoList.createTodo(title.value, description.value, dueDate.value, priority.value);
      }

      this.todoBeingEdited = null;

      this.toggleTodoForm();
      this.clearTodoForm();
      this.updateTodosList();
      Storage.populateStorage();
    });
  }

  static handleOverlayEvent() {
    const overlay = document.querySelector('.overlay');

    overlay.addEventListener('click', e => {
      this.projectBeingEdited = null;
      this.todoBeingEdited = null;

      this.clearProjectForm();
      this.clearTodoForm();

      const todoForm = document.querySelector('.todo-form');
      const projectForm = document.querySelector('.project-form');
      todoForm.classList.contains('active') ? this.toggleTodoForm() : this.toggleProjectForm();
    });
  }

  static clearProjectForm() {
    const name = document.getElementById('name');

    name.value = '';
  }  

  static clearTodoForm() {
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const dueDate = document.getElementById('due-date');
    const noPriority = document.getElementById('no-priority');

    title.value = '';
    description.value = '';
    dueDate.value = '';
    noPriority.checked = true;
  }

  static toggleTodoForm() {
    const todoForm = document.querySelector('.todo-form');
    todoForm.classList.toggle('active');

    const overlay = document.querySelector('.overlay');
    overlay.classList.toggle('active');
  }

  static createTodoCard(todo) {
    const todoCard = document.createElement('div');

    const leftContainer = document.createElement('span');
    leftContainer.classList.add('left-container');

    const checkIcon = document.createElement('span');
    checkIcon.classList.add('material-icons');
    checkIcon.classList.add('check-todo-button');
    checkIcon.textContent = 'radio_button_unchecked';
    leftContainer.appendChild(checkIcon);

    const title = document.createElement('span');
    title.textContent = todo.title;
    leftContainer.appendChild(title);

    todoCard.appendChild(leftContainer);

    const rightContainer = document.createElement('span');
    rightContainer.classList.add('right-container');

    const dueDate = document.createElement('span');
    dueDate.textContent = todo.dueDate ? todo.dueDate : 'No due date';
    rightContainer.appendChild(dueDate);

    todoCard.appendChild(rightContainer);

    return todoCard;
  }

  static updateTodosList() {
    const todosList = document.querySelector('.todos-list');
    const todoCards = document.querySelectorAll('.todos-list div');
    todoCards.forEach(card => {
      todosList.removeChild(card);
    })
    
    let selectedTodos = [];

    selectedTodos = selectedTodos.concat(Storage.todos);

    Storage.projects.forEach(project => {
      selectedTodos = selectedTodos.concat(project.todos);
    });

    if (this.currentPage === this.today) {
      selectedTodos = selectedTodos.filter(todo => isToday(parseISO(todo.dueDate)));
    } else if (this.currentPage === this.thisWeek) {
      selectedTodos = selectedTodos.filter(todo => isThisWeek(parseISO(todo.dueDate)));
    } else if (TodoList.selectedProject) {
      selectedTodos = TodoList.selectedProject.todos;
    } else {
      selectedTodos = Storage.todos;
    }

    selectedTodos.forEach(todo => {
      const todoCard = this.createTodoCard(todo);

      todoCard.addEventListener('click', e => {
        const button = document.querySelector('.todo-form button');
        button.textContent = 'Save';

        this.todoBeingEdited = todo;
        this.clearTodoForm();
        this.addTodoValuesToForm(todo);
        this.toggleTodoForm();
      });

      const checkTodo = todoCard.firstChild.firstChild;

      checkTodo.addEventListener('click', e => {
        TodoList.deleteTodo(todo);
        this.updateTodosList();
        e.stopPropagation();
      });

      
      todosList.insertBefore(todoCard, this.addTodoButton);
    });
  }

  static addTodoValuesToForm(todo) {
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const dueDate = document.getElementById('due-date');
    const priorities = document.getElementsByName('priority');
    const priority = Array.from(priorities).find(radio => radio.checked);

    title.value = todo.title;
    description.value = todo.description;
    dueDate.value = todo.dueDate;
    Array.from(priorities).find(priority => priority.value === todo.priority).checked = true;
  }

  static createProjectDiv(project) {
    const projectDiv = document.createElement('div');
    
    const leftContainer = document.createElement('span');
    leftContainer.classList.add('left-container');

    const projectIcon = document.createElement('span');
    projectIcon.classList.add('material-icons');
    projectIcon.textContent = 'folder';
    leftContainer.appendChild(projectIcon);

    const name = document.createElement('span');
    name.textContent = project.name;
    leftContainer.appendChild(name);

    projectDiv.appendChild(leftContainer);

    const rightContainer = document.createElement('span');
    rightContainer.classList.add('right-container');

    const editIcon = document.createElement('span');
    editIcon.classList.add('material-icons');
    editIcon.classList.add('edit-project-button');
    editIcon.textContent = 'edit';
    rightContainer.appendChild(editIcon);

    const deleteIcon = document.createElement('span');
    deleteIcon.classList.add('material-icons');
    deleteIcon.classList.add('delete-project-button');
    deleteIcon.textContent = 'delete';
    rightContainer.appendChild(deleteIcon);

    projectDiv.appendChild(rightContainer);

    return projectDiv;
  }

  static updateProjectsList() {
    const projectsList = document.querySelector('.projects-list');
    const projectDivs = document.querySelectorAll('.projects-list div');
    projectDivs.forEach(div => {
      projectsList.removeChild(div);
    })

    Storage.projects.forEach(project => {
      const projectDiv = this.createProjectDiv(project);

      projectDiv.addEventListener('click', e => {
        this.currentPage = projectDiv;
        this.addTodoButton.style.display = 'flex';
        TodoList.selectedProject = project;
        this.updateTodosList();
        this.highlightCurrentPage();  
      });

      const editProject = projectDiv.lastChild.firstChild;

      editProject.addEventListener('click', e => {
        const button = document.querySelector('.project-form button');
        button.textContent = 'Save';

        this.projectBeingEdited = project;
        this.clearProjectForm();
        this.addProjectValuesToForm(project);
        this.toggleProjectForm();
      });

      const deleteProject = projectDiv.lastChild.lastChild;

      deleteProject.addEventListener('click', e => {
        TodoList.deselectProject(project);
        TodoList.deleteProject(project);
        this.currentPage = this.inbox;
        this.highlightCurrentPage();
        this.updateProjectsList();
        this.updateTodosList();
        e.stopPropagation();
      });
      
      this.highlightCurrentPage();
      const addProjectButton = document.querySelector('.add-project-button');
      projectsList.insertBefore(projectDiv, addProjectButton);
    });
  }

  static addProjectValuesToForm(project) {
    const name = document.getElementById('name');
    name.value = project.name;
  }

  static highlightCurrentPage() {
    const menuElements = document.querySelectorAll('.menu button');

    menuElements.forEach(el => {
      el.classList.remove('selected');
    });

    const projectsDivs = document.querySelectorAll('.projects-list div');

    projectsDivs.forEach(div => {
      div.classList.remove('selected');
    });

    this.currentPage.classList.add('selected');
  }
}