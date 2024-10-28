import config from '../config/config.js'; 
import AuthService from '../services/AuthService.js';

const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const emailInput = document.getElementById('email');

const confirmPasswordInput = document.getElementById('confirmPassword'); 
const homeButton = document.getElementById('homeButton');
const registerButton = document.getElementById('registerButton');
const errorMessageDiv = document.querySelector('.error-message');

const init = () => {
    setupEventListeners();
};

const handleRegister = async () => { 
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const email = emailInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    if (!username || !password || !email) {
        showError('Please fill in all fields.');
        return;
    }

    if (!isValidEmail(email)) {
        showError('Please enter a valid email address.');
        return;
    }
    if (!doPasswordsMatch(password, confirmPassword)) {

        showError('Passwords do not match.');
        return;
    }

    const url = `${config.BACKEND_URL}Auth`;
    const payload = { userName: username, password: password, email: email };

    const data = await AuthService.register(url, payload);

    if (data.error) {
        showError(data.error);
        return;
    }

    alert(`Registration successful! Welcome, ${username}.`);
    window.location.href = 'login.html'; 
};

const setupEventListeners = () => {
    homeButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    registerButton.addEventListener('click', handleRegister);
    usernameInput.addEventListener('focus', clearError);
    passwordInput.addEventListener('focus', clearError);
    emailInput.addEventListener('focus', clearError);
};

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const doPasswordsMatch = (password, confirmPassword) => {
    return password === confirmPassword;
};

const clearError = () => {
    errorMessageDiv.textContent = '';
};

const showError = (message) => {
    errorMessageDiv.textContent = message;
};

init();
