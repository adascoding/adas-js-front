import config from '../config/config.js';
import ApiService from '../services/ApiService.js';

const userId = localStorage.getItem('userId');
const userName = localStorage.getItem('userName');
const userEmail = localStorage.getItem('userEmail');
const urlParams = new URLSearchParams(window.location.search);
const taskId = urlParams.get('id');

const showError = (message) => {
    const errorMessageDiv = document.querySelector('.error-message');
    errorMessageDiv.textContent = message;
};

const fetchTaskById = async (id) => {
    const response = await ApiService.getTodoById(`${config.BACKEND_URL}ToDo`, id);

    if (response.error) {
        showError('Error fetching task: ' + response.error);
        return;
    }

    document.getElementById('taskType').value = response.type;
    document.getElementById('taskContent').value = response.content;
    document.getElementById('taskEndDate').value = new Date(response.endDate).toISOString().slice(0, 16);

};


const handleUpdateTask = async () => {
    showError('');

    const taskType = document.getElementById('taskType').value;
    const taskContent = document.getElementById('taskContent').value;
    const taskEndDate = document.getElementById('taskEndDate').value;

    if (!taskType || !taskContent || !taskEndDate) {
        showError('Please fill in all fields.');
        return;
    }

    const updatedTask = {
        userId: userId,
        type: taskType,
        content: taskContent,
        endDate: new Date(taskEndDate).toISOString(),
        id: taskId,
    };

    const response = await ApiService.updateTodo(`${config.BACKEND_URL}ToDo`, taskId, updatedTask);

    if (response.error) {
        showError('Error updating task: ' + response.error);
        return;
    }
    alert('Task updated successfully!');
    window.location.href = 'tasks.html';

};

const handleDeleteTask = async () => {
    if (confirm('Are you sure you want to delete this task?')) {
        const response = await ApiService.deleteTodo(`${config.BACKEND_URL}ToDo`, taskId);

        if (response.error) {
            showError('Error deleting task: ' + response.error);
            return;
        }
        alert('Task deleted successfully!');
        window.location.href = 'tasks.html';

    }
};

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

const init = () => {

    checkUserSession();
    setUserDetails();
    fetchTaskById(taskId);
    setupEventListeners();
};

const setupEventListeners = () => {
    document.getElementById('backButton').addEventListener('click', () => {
        window.location.href = 'tasks.html';
    });
    document.getElementById('updateButton').addEventListener('click', handleUpdateTask);
    document.getElementById('deleteButton').addEventListener('click', handleDeleteTask);
};

init();
