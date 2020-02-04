var input = document.getElementById('taskBar');
var button = document.getElementById('addTask');
var todo = document.getElementById('todo');
var pending = document.getElementById('pending');
var completed = document.getElementById('completed');
var moveIcon = "<img src='https://img.icons8.com/metro/26/000000/forward-arrow.png' alt='move the task to pending section icon' id='moveIcon' onclick='movetoPending(this)'>";
var deleteIcon = "<img src='https://img.icons8.com/material-rounded/24/000000/delete.png' alt='delete the task icon' id='deleteIcon' onclick='deleteTask(this)'>";
input.addEventListener('keyup', function(event){
	if((event.which || event.keycode)==13){
		event.preventDefault();
		button.click();
	}
})

button.addEventListener('click', function(){
	var task = input.value;
	if(task==''){
		input.classList.add('emptyAlert');
	}
	else{
		adder(task);
		if(input.classList.contains('emptyAlert')){
			input.classList.remove('emptyAlert');
		}
	}
});

var i = 1;
function adder(task){
	var div = document.createElement('div');
	div.classList.add('task', `task${i}`);
	var checkbox= "<input type='checkbox' onclick = moveToComplete(this)>";
	var x = document.createElement('p');
	var y = document.createTextNode(task);

	x.appendChild(y);
	div.appendChild(x);
	div.insertAdjacentHTML('afterbegin', checkbox);
	div.insertAdjacentHTML('beforeend', deleteIcon);
	div.insertAdjacentHTML('beforeend', moveIcon);

	todo.appendChild(div);
	i+=1;
}

function movetoPending(move){
	var task = move.parentElement;
	var moveIcon = "<img src='https://img.icons8.com/android/24/000000/left2.png' alt='move the task back to todo section from the pending section icon' id='moveIcon' onclick = 'movetoTodo(this)'>";
	move.remove();
	task.innerHTML+=moveIcon;
	pending.appendChild(task);
}

function movetoTodo(move){
	var task = move.parentElement;
	var moveIcon = "<img src='https://img.icons8.com/metro/26/000000/forward-arrow.png' alt='move the task to pending section icon' id='moveIcon' onclick='movetoPending(this)'>";
	move.remove();
	task.innerHTML += moveIcon;
	todo.appendChild(task);
}
function moveToComplete(box){
	var task = box.parentElement;
	if(box.checked){
		completed.appendChild(task);
	}
	else{
		todo.appendChild(task);
	}
}
function deleteTask(taskToDelete){
	var taskDiv = taskToDelete.parentElement;
	if(confirm('Are you sure you want to delete the task? ')){
		taskDiv.remove();
	}
}
