document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');

    if (taskInput.value.trim() === '') {
        alert('Please enter a task');
        return;
    }

    const li = document.createElement('li');
    li.innerText = taskInput.value;
    li.addEventListener('click', toggleTaskCompleted);

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.onclick = function () {
        taskList.removeChild(li);
        saveTasks();
    };

    li.appendChild(deleteButton);
    taskList.appendChild(li);

    taskInput.value = '';
    saveTasks();
}

function toggleTaskCompleted(event) {
    event.target.classList.toggle('completed');
    saveTasks();
}

function saveTasks() {
    const taskList = document.getElementById('task-list');
    const tasks = [];
    for (const task of taskList.children) {
        tasks.push({
            text: task.firstChild.textContent,
            completed: task.classList.contains('completed')
        });
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        const taskList = document.getElementById('task-list');
        for (const task of tasks) {
            const li = document.createElement('li');
            li.innerText = task.text;
            if (task.completed) {
                li.classList.add('completed');
            }
            li.addEventListener('click', toggleTaskCompleted);

            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.onclick = function () {
                taskList.removeChild(li);
                saveTasks();
            };

            li.appendChild(deleteButton);
            taskList.appendChild(li);
        }
    }
}
