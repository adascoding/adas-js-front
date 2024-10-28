const loginButton = document.getElementById('loginButton');
const registerButton = document.getElementById('registerButton');

const setupEventListeners = () => {
    loginButton.addEventListener('click', () => {
        window.location.href = 'login.html';
    });

    registerButton.addEventListener('click', () => {
        window.location.href = 'register.html'
    });
};

const init = () => {
    setupEventListeners();
};

init();