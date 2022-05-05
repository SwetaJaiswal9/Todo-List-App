var TodoListApp = (function(){

	let tasks = [];
	const tasksList = document.getElementById('list');
	const addTaskInput = document.getElementById('add');
	const tasksCounter = document.getElementById('tasks-counter');


	async function fetchTodos(){
	try{
		const response = await fetch('https://jsonplaceholder.typicode.com/todos');
		const data = await response.json();
		tasks = data.slice(0, 5);
		renderList();

	} catch(error){
		console.log("Error: ", error);
	}}


	function addTaskToDOM(task){
		const li = document.createElement('li');

		li.innerHTML =  `<input type = "checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} class = "custom-checkbox">
	                 		<label for = "${task.id}"> ${task.title} </label>
	             		  <img src = "bin.png" class = "delete" data-id = "${task.id}" />`;

	    tasksList.append(li);
	}


	function renderList () {
		tasksList.innerHTML = '';

		for( let i=0; i<tasks.length; i++){

			addTaskToDOM(tasks[i]);
		}

		tasksCounter.innerHTML = tasks.length;
	}


	function toggleTask (taskId) {
		const newTask = tasks.filter( function(task){

				return task.id == Number(taskId); 
			});
		
		if(newTask.length > 0){

			const currentTask = newTask[0];
			  currentTask.completed = !currentTask.completed;
			  renderList();
			  showNotification("Task toggled successfully!")
			return;
		}

		showNotification("Could not toggle the task!")	
	}


	function deleteTask (taskId) {
		const newTasksArr = tasks.filter( function(task){

				return task.id !== Number(taskId); 
			});

		tasks = newTasksArr;
		renderList();

		showNotification("Task deleted successfully!");
	}


	function addTask (task) {
		if(task){

		tasks.push(task);
		renderList();
		showNotification("Task added successfully!");
		return;
		}

		showNotification("Task cannot be added!");
	}


	function showNotification(text) {
		alert(text);
	}


	function getInput(e){
		if (e.key === "Enter"){
			const text = e.target.value;

		if(!text){

			showNotification("Task can't be empty!");
			return;
		}

		const task = {

			title: text,
			id: Date.now(),
			completed: false
		}

		e.target.value = '';
		addTask(task);
	 	}
	}


	function handleClickListener(e){
		const target = e.target;

		if (target.className === 'delete'){

			const taskId = target.dataset.id;
			deleteTask(taskId);
			return;
		}

		else if (target.className === 'custom-checkbox'){

			const taskId = target.id;
			toggleTask (Number(taskId));
			return;
		}
	}


	function initialiseApp(){
		fetchTodos();
		addTaskInput.addEventListener("keyup", getInput);
		document.addEventListener("click", handleClickListener);
	}

	initialiseApp();


	return{
		initialise: initialiseApp
	}

})()

