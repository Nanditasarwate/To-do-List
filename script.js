const input = document.getElementById('task-input');
const addButton = document.getElementById('add-task');
const list = document.getElementById('task-list');

// Load tasks from localStorage when the page loads
document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
});

addButton.addEventListener('click', function() {
   if (input.value.trim() !== "") {
    let newTask = document.createElement("li");
    newTask.textContent = input.value;

    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = "✖";
    deleteBtn.className = "delete-btn";

    deleteBtn.addEventListener('click', function(event) {
        event.stopPropagation();
        newTask.remove();
        saveTasks(); // Save the updated list after deletion
    });

    newTask.addEventListener('click', function() {
        newTask.classList.toggle("completed");
        saveTasks(); // Save the updated list after toggling completion
    });

    newTask.appendChild(deleteBtn); 
    list.appendChild(newTask);
    
    saveTasks(); // Save the list of tasks to localStorage
    input.value = ""; // Clear the input field
   } 
});

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    const taskItems = document.querySelectorAll('li');
    taskItems.forEach(function(task) {
        tasks.push({
            text: task.textContent.replace('✖', '').trim(),
            completed: task.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function(task) {
        let newTask = document.createElement("li");
        newTask.textContent = task.text;
        if (task.completed) {
            newTask.classList.add("completed");
        }

        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = "✖";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener('click', function(event) {
            event.stopPropagation();
            newTask.remove();
            saveTasks(); // Save the updated list after deletion
        });

        newTask.addEventListener('click', function() {
            newTask.classList.toggle("completed");
            saveTasks(); // Save the updated list after toggling completion
        });

        newTask.appendChild(deleteBtn); 
        list.appendChild(newTask);
    });
}
