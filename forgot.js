import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";

const FirebaseConfig = {
  apiKey: "AIzaSyAyN5dfrQ32O42nl58bc9Sf3OqYhiTR7Js",
  authDomain: "lifelink-a9618.firebaseapp.com",
  projectId: "lifelink-a9618",
  appId: "1:652005462493:web:78a230302cdbe33d6ba634",

}

const app = initializeApp(FirebaseConfig);
const auth = getAuth(app);




const form = document.getElementById("reset-form");
const email = document.getElementById("email");
const error = document.getElementById("error-message");
const submit = document.getElementById("submit-button");





form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const emailValue = email.value.trim();

    error.textContent = "";
    submit.disabled = true;


    try {
        await sendPasswordResetEmail(auth, emailValue);
        error.textContent = "A reset link has been sent to " + emailValue + ". Please check your inbox.";
        form.reset();
    } catch (err) {
        console.error("Error sending password reset email:", err);
        
        if (err.code === "auth/invalid-email") {
            error.textContent = "Email is not valid";
        } else if (err.code === "auth/too-many-requests") {
            error.textContent = "Too many requests. Please try again later.";
        } else {
            error.textContent = "Unable to process your request. Please try again later.";
        }
    } finally {
        submit.disabled = false;
    }


});
