//selectors
const todoInput = document.querySelector('#todoInput');
const todoBtn = document.querySelector('#todoBtn');
const todoList = document.querySelector('.todoList');
const complete = 'todoComplete';
const incomplete = 'todoText';

//events
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', removeCheck);

//local storage
const Storage = JSON.parse(
  localStorage.getItem('ITEMS')
  );
let items = localStorage.getItem('ITEMS') !== null ? Storage : [];

//functions
//1. function to activate the add button
todoInput.onkeyup = ()=> {
  let task = todoInput.value;
  if(task.trim() !== ''){
    todoBtn.classList.add('active');
  }else{
    todoBtn.classList.remove('active');
  }
}

//2. add a to-do
function addTodo(e) {
  e.preventDefault();
  if (todoInput.value.trim() === '') {
    alert('Please set a task!');
  }else{
    const item = {
      text: todoInput.value,
      id: items.length,
      complete: false,
      trash: false
    }
    items.push(item);
    createTodo(item);
    updateLocalStorage();
    
    todoInput.value = '';
    todoInput.onkeyup();
  }
}

//3. create a to-do from the input
function createTodo(item) {
  if (item.trash === true) {
    return;
  }else{
    const li = document.createElement('li');
  li.classList.add('todoItem');
  li.id = item.id;
  const p = document.createElement('p');
  p.classList.add('todoText');
  if (item.complete === true) {
    p.className = complete;
  }
  p.id = item.id;
  p.innerText = item.text;
  const delBtn = document.createElement('button');
  delBtn.classList.add('todoTrash');
  delBtn.id = item.id;
  delBtn.innerText = '×';
  
  li.appendChild(p);
  li.appendChild(delBtn);
  
  todoList.appendChild(li);
  }
}

//4. delete a to-do from the ui
function remove(element) {
  element.parentElement.remove();
  items[element.id].trash = true;
    
  updateLocalStorage();
}

//5. mark and unmark a to-do as done
function check(element) {
  items[element.id].complete = items[element.id].complete? false : true;
    
    if (items[element.id].complete === true) {
      element.children[0].className = complete;
    }
    
    if (items[element.id].complete === false) {
      element.children[0].className = incomplete;
    }
    
    updateLocalStorage();
}

//6. This function calls removeTodo and check functions
function removeCheck(e) {
  const element = e.target;
  
  if (element.classList[0] === 'todoTrash') {
    remove(element);
  }
  
  if (element.classList[0] === 'todoItem') {
    check(element);
  }
}

//7. save to-dos to local storage
function updateLocalStorage() {
  localStorage.setItem('ITEMS', JSON.stringify(items));
}

//8. update the to-dos based on what us saved in the local storage
function updateUI() {
  items.forEach((item) => createTodo(item));
}
updateUI();
