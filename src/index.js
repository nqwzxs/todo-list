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

window.updateTodosList = function() {
  window.todosList = document.querySelector('.todos-list');

  todos.forEach(todo => {
    const todoCard = createTodoCard(todo);
    todosList.appendChild(todoCard);
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