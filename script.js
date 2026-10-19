const form = document.getElementById("reset-form");
const email = document.getElementById("email");
const error = document.getElementById("error-message");

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailValue = email.value.trim();

    let errors = [];

    function emailIsValid(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    if (emailValue === '' || emailValue === null) {
        errors.push('Email is required');
        email.parentElement.classList.add('incorrect');
    } else if (!emailIsValid(emailValue)) {
        errors.push('Email is not valid');
        email.parentElement.classList.add('incorrect');
    }

    const accounts = JSON.parse(localStorage.getItem("lifelink-accounts")) || [];

    const foundAccount = accounts.some(function(user){
        return user.email && user.email.toLowerCase() === emailValue.toLowerCase();
    });

    if (!foundAccount) {
        errors.push('Email is not found in our records');
        email.parentElement.classList.add('incorrect');
    }

    
    if (errors.length > 0) {
        error.textContent = errors[0];
        return;
    }

    email.parentElement.classList.remove('incorrect');
    error.textContent = "";
    alert("A reset link has been sent to " + emailValue + ". Please check your inbox.");
});

email.addEventListener('input', function() {
    email.parentElement.classList.remove('incorrect');
    error.textContent = "";
});
