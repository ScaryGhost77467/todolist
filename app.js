document.addEventListener('DOMContentLoaded', () => {
    // Get tasks from local storage or set an empty array
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Display tasks on page load
    displayTasks(tasks);

    // Add task function
    window.addTask = function () {
        const newTaskInput = document.getElementById('newTask');
        const newTaskText = newTaskInput.value.trim();

        if (newTaskText !== '') {
            const newTask = {
                text: newTaskText,
                completed: false,
            };

            tasks.unshift(newTask); // Add new task to the beginning of the array
            displayTasks(tasks);
            saveTasksToLocalStorage(tasks);

            newTaskInput.value = ''; // Clear the input field
        }
    };

    // Delete task function
    window.deleteTask = function (index) {
        tasks.splice(index, 1); // Remove task at the specified index
        displayTasks(tasks);
        saveTasksToLocalStorage(tasks);
    };

    // Toggle completion status function
    window.toggleCompletion = function (index) {
        tasks[index].completed = !tasks[index].completed; // Toggle completion status
        displayTasks(tasks);
        saveTasksToLocalStorage(tasks);
    };

    // Filter tasks function
    window.filterTasks = function () {
        const filter = document.getElementById('filter').value;
        let filteredTasks = [];

        if (filter === 'completed') {
            filteredTasks = tasks.filter(task => task.completed);
        } else if (filter === 'active') {
            filteredTasks = tasks.filter(task => !task.completed);
        } else {
            filteredTasks = tasks;
        }

        displayTasks(filteredTasks);
    };

    // Function to display tasks on the page
    function displayTasks(tasksArray) {
        const tasksContainer = document.getElementById('tasks');
        tasksContainer.innerHTML = ''; // Clear the tasks container

        tasksArray.forEach((task, index) => {
            const taskElement = document.createElement('div');
            taskElement.innerHTML = `
                <li class="${task.completed ? 'completed' : ''}">
                    <span>${task.text}</span>
                    <button onclick="toggleCompletion(${index})">Toggle</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                </li>
            `;
            tasksContainer.appendChild(taskElement);
        });
    }

    // Function to save tasks to local storage
    function saveTasksToLocalStorage(tasksArray) {
        localStorage.setItem('tasks', JSON.stringify(tasksArray));
    }
});
