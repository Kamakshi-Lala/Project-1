// script.js
document.addEventListener('DOMContentLoaded', function () {
    const wrapper = document.querySelector('.wrapper');
    const loginLink = document.querySelector('.login-link');
    const registerLink = document.querySelector('.register-link');
    const btnPopup = document.querySelector('.btnLogin-popup');
    const iconClose = document.querySelector('.icon-close');
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const loginButton = document.getElementById('loginButton');

    registerLink.addEventListener('click', () => {
        wrapper.classList.add('active');
    });

    loginLink.addEventListener('click', () => {
        wrapper.classList.remove('active');
    });

    btnPopup.addEventListener('click', () => {
        wrapper.classList.add('active-popup');
    });

    iconClose.addEventListener('click', () => {
        wrapper.classList.remove('active');
        wrapper.classList.remove('active-popup');
    });

    loginButton.addEventListener('click', (event) => {
        performLogin(event);  // Pass the event object to the function
    });

    function performLogin(event) {
        // Hardcoded login details (replace with your actual details)
        const validEmail = "mayank123@gmail.com";
        const validPassword = "password@123";
    
        // Retrieve user input
        const emailInput = document.getElementById("loginEmail").value;
        const passwordInput = document.getElementById("loginPassword").value;
    
        // Check if the provided details match the hardcoded ones
        if (emailInput === validEmail && passwordInput === validPassword) {
            // Redirect to copy.html if login is successful
            window.location.href = "copy.html";
        } else {
            alert("Invalid login credentials. Please try again.");
            
            // Prevent the default form submission and event propagation
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
        }
    }
    

    function performRegistration() {
        const username = document.getElementById('regUsername').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        const agreeTerms = document.getElementById('agreeTerms').checked;

        if (username.trim() !== '' && email.trim() !== '' && password.trim() !== '' && agreeTerms) {
            // Replace this logic with your own registration logic
            alert('Registration successful. Please login.');
            wrapper.classList.remove('active');
            // Optionally, you can redirect to a login page after successful registration
            // window.location.href = "login.html";
        } else {
            alert('Please fill in all fields and agree to the terms.');
        }
    }
});
