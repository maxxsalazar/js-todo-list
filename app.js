// Selectors
const todoInput = document.querySelector('#todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);


// Functions
function addTodo(event){
    // Prevent refreshing of page
        event.preventDefault();
    // create todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
    // Create Li 
        const newTodo = document.createElement('li');
        newTodo.classList.add('todo-item');
        newTodo.innerText = todoInput.value;
        todoDiv.appendChild(newTodo);

    // save to local storage
    saveLocalTodos(todoInput.value);

    // Check Mark Button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');

        todoDiv.appendChild(completedButton);
    // Trash Button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

    // append new item to UL
        todoList.appendChild(todoDiv);
    // clear input
        todoInput.value = '';
};

function deleteCheck(e){
    const item = e.target;
    if(e.target.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }
    else if(e.target.classList[0] === 'complete-btn'){
        item.parentElement.classList.toggle('completed');
    }
};

function filterTodo(e){
    e.preventDefault();
 const todos = todoList.childNodes;
   todos.forEach(function(todo){
       switch(e.target.value){
           case 'all':
               todo.style.display = 'flex';
               break;
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else{
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else{
                    todo.style.display = 'none';
                }
                break;
       }
    });
}

// Save todos to local storage
function saveLocalTodos(todo){
    let todos;
    // Check if there are todos
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Check local storage for saved todos
function getTodos(){
    let todos;
    // Check if there are todos
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    // Iterate over todos in storage
    todos.forEach(function(todo){
        // create todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
    // Create Li 
        const newTodo = document.createElement('li');
        newTodo.classList.add('todo-item');
        newTodo.innerText = todo;
        todoDiv.appendChild(newTodo);

    // Check Mark Button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');

        todoDiv.appendChild(completedButton);
    // Trash Button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

    // append new item to UL
        todoList.appendChild(todoDiv);
    })
}

// Remove todos from local storage
function removeLocalTodos(todo){
    let todos;
    // Check if there are todos
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todos.indexOf(todo.children[0].innerText);
    todos.splice(todoIndex, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}
