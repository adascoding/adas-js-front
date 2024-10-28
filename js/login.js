import config from '../config/config.js';
import AuthService from '../services/AuthService.js';

const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const homeButton = document.getElementById('homeButton');
const loginButton = document.getElementById('loginButton');
const errorMessageDiv = document.querySelector('.error-message');

const init = () => {
    checkUserSession();
    setupEventListeners();
};

const handleLogin = async () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
        showError('Please enter both username and password.');
        return;
    }

    const url = `${config.BACKEND_URL}Auth?username=${username}&password=${password}`;
    const data = await AuthService.login(url);

    if (data.error) {
        showError(data.error);
        return;
    }

    localStorage.setItem('userId', data.id);
    localStorage.setItem('userName', data.userName);
    localStorage.setItem('userEmail', data.email);

    alert(`Login successful! Welcome, ${data.userName}.`);
    window.location.href = 'tasks.html';
};

const setupEventListeners = () => {
    homeButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    loginButton.addEventListener('click', handleLogin);
    usernameInput.addEventListener('focus', clearError);
    passwordInput.addEventListener('focus', clearError);
};

const clearError = () => {
    errorMessageDiv.textContent = '';
};

const showError = (message) => {
    errorMessageDiv.textContent = message;
};

const checkUserSession = () => {
    if (localStorage.getItem('userId')) {
        const confirmLogout = confirm('You are already logged in. Do you want to log out and switch users?');
        if (confirmLogout) {
            localStorage.removeItem('userId');
            localStorage.removeItem('userName');
            localStorage.removeItem('userEmail');
        } else {
            window.location.href = 'tasks.html';
        }
    }
};

init();
