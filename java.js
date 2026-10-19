import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAyN5dfrQ32O42nl58bc9Sf3OqYhiTR7Js",
  authDomain: "lifelink-a9618.firebaseapp.com",
  projectId: "lifelink-a9618",
  storageBucket: "lifelink-a9618.firebasestorage.app",
  messagingSenderId: "652005462493",
  appId: "1:652005462493:web:78a230302cdbe33d6ba634",
  measurementId: "G-F8KGDET40Q"
};

const app = initializeApp(firebaseConfig);   
const analytics = getAnalytics(app);
const auth = getAuth(app);

const form = document.getElementById("form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("repeat-password");
const errorMessage = document.getElementById("error-message");

if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const isSignup = !!confirmPasswordInput;
        const errors = isSignup
            ? getSignupFormErrors(emailInput, passwordInput, confirmPasswordInput)
            : getLoginFormErrors(emailInput, passwordInput);

        if (errors.length > 0) {
            errorMessage.style.color = "red";
            errorMessage.innerText = errors.join(". ");
            return;
        }

        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const button = form.querySelector("button[type='submit']");
        button.disabled = true;

        try {
            if (isSignup) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            window.location.href = "homepage.html";
        } catch (err) {
            showError(friendlyError(err.code));
        } finally {
            button.disabled = false;
        }
    });
}

function friendlyError(code) {
    switch (code) {
        case "auth/email-already-in-use":
            return "An account with this email already exists. Try logging in instead.";
        case "auth/invalid-email":
            return "Please enter a valid email address.";
        case "auth/weak-password":
            return "Password is too weak. Use at least 8 characters.";
        case "auth/user-not-found":
            return "No account found with that email. Try signing up instead.";
        case "auth/wrong-password":
        case "auth/invalid-credential":
            return "Incorrect email or password. Please try again.";
        case "auth/too-many-requests":
            return "Too many attempts. Please wait a bit and try again.";
        case "auth/network-request-failed":
            return "Network error. Check your internet connection.";
        case "auth/operation-not-allowed":
            return "Email/Password sign-in is not enabled in your Firebase console.";
        case "auth/api-key-not-valid":
        case "auth/invalid-api-key":
            return "Your Firebase config in java.js is not filled in correctly.";
        default:
            return "Something went wrong (" + (code || "unknown") + ").";
    }
}

function showError(message) {
    errorMessage.style.color = "red";
    errorMessage.innerText = message;
    emailInput.parentElement.classList.add("incorrect");
    if (!confirmPasswordInput) passwordInput.parentElement.classList.add("incorrect");
}

function getSignupFormErrors(emailInput, passwordInput, confirmPasswordInput) {
    let errors = [];
    if (emailInput.value.trim() === "") {
        errors.push("Email is required");
        emailInput.parentElement.classList.add("incorrect");
    }
    if (passwordInput.value === "") {
        errors.push("Password is required");
        passwordInput.parentElement.classList.add("incorrect");
    }
    if (confirmPasswordInput.value === "") {
        errors.push("Confirm Password is required");
        confirmPasswordInput.parentElement.classList.add("incorrect");
    }
    if (passwordInput.value !== "" && passwordInput.value.length < 8) {
        errors.push("Password must be at least 8 characters long");
        passwordInput.parentElement.classList.add("incorrect");
    }
    if (passwordInput.value !== "" && confirmPasswordInput.value !== "" && passwordInput.value !== confirmPasswordInput.value) {
        errors.push("Passwords do not match");
        passwordInput.parentElement.classList.add("incorrect");
        confirmPasswordInput.parentElement.classList.add("incorrect");
    }
    return errors;
}

function getLoginFormErrors(emailInput, passwordInput) {
    let errors = [];
    if (emailInput.value.trim() === "") {
        errors.push("Email is required");
        emailInput.parentElement.classList.add("incorrect");
    }
    if (passwordInput.value === "") {
        errors.push("Password is required");
        passwordInput.parentElement.classList.add("incorrect");
    }
    return errors;
}

[emailInput, passwordInput, confirmPasswordInput].filter(Boolean).forEach((input) => {
    input.addEventListener("input", () => {
        if (input.parentElement.classList.contains("incorrect")) {
            input.parentElement.classList.remove("incorrect");
            if (errorMessage) errorMessage.innerText = "";
        }
    });
});
