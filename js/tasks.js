import config from '../config/config.js';
import ApiService from '../services/ApiService.js';

const userId = localStorage.getItem('userId');
const userName = localStorage.getItem('userName');
const userEmail = localStorage.getItem('userEmail');

const checkUserSession = () => {
    if (!userId || !userName || !userEmail) {
        alert('You are not logged in. Redirecting to login page.');
        window.location.href = 'index.html';
    }
};

const setUserDetails = () => {
    document.getElementById('userName').textContent = userName;
    document.getElementById('userEmail').textContent = userEmail;
}

const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    window.location.href = 'index.html';
};

const showError = (message) => {
    const errorMessageDiv = document.querySelector('.error-message');
    errorMessageDiv.textContent = message;
};

const displayTasks = (tasks) => {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    const filteredTasks = tasks.filter(task => task.userId === userId);

    filteredTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');

        const taskEndDate = new Date(task.endDate);
        const formattedDateTime = taskEndDate.toISOString().slice(0, 16).replace('T', ' ');

        const maxContentLength = 500;
        const shorterContent = task.content.length > maxContentLength 
            ? task.content.substring(0, maxContentLength) + '...' 
            : task.content;

        taskItem.innerHTML = `
            <div class="task-type">${task.type}</div>
            <div class="task-content">
                <p>${shorterContent}</p>
                <small>Due: ${formattedDateTime}</small>
            </div>
        `;

        taskItem.addEventListener('click', () => {
            window.location.href = `task.html?id=${task.id}`;
        });

        taskList.appendChild(taskItem);
    });
};

const fetchTasks = async () => {
    const response = await ApiService.getAllTodos(`${config.BACKEND_URL}ToDo`);

    if (response.error) {
        showError('Error fetching tasks: ' + response.error);
        return;
    }

    displayTasks(response);
};


const handleAddTask = async () => {
    showError('');

    const taskType = document.getElementById('taskType').value;
    const taskContent = document.getElementById('taskContent').value;
    const taskEndDate = document.getElementById('taskEndDate').value;

    if (!taskType || !taskContent || !taskEndDate) {
        showError('Please fill in all fields.');
        return;
    }

    const newTask = {
        userId: userId,
        type: taskType,
        content: taskContent,
        endDate: new Date(taskEndDate).toISOString(),
    };

    const response = await ApiService.createTodo(`${config.BACKEND_URL}ToDo`, newTask);

    if (response.error) {
        showError('Error adding task: ' + response.error);
        return;
    }
    alert('Task added successfully!');
    fetchTasks();

};

const setupEventListeners = () => {
    document.getElementById('logoutButton').addEventListener('click', handleLogout);
    document.getElementById('showTaskFormButton').addEventListener('click', () => {
        document.getElementById('taskFormContainer').style.display = 'block';
    });
    document.getElementById('addTaskButton').addEventListener('click', handleAddTask);
};

const init = () => {
    checkUserSession();
    setUserDetails();
    fetchTasks();
    setupEventListeners();
};

init();
