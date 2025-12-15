document.addEventListener("DOMContentLoaded", function () {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Selecting input fields and error message spans
    const usernameInput = document.querySelector("input[name='fullname']");
    const emailInput = document.querySelector("input[name='email']");
    const passwordInput = document.querySelector("input[name='password']");
    
    const usernameError = document.createElement("span");
    const emailError = document.createElement("span");
    const passwordError = document.createElement("span");

    usernameError.style.color = "red";
    usernameError.style.fontSize = "12px"; // Reduced font size
    emailError.style.color = "red";
    emailError.style.fontSize = "12px";
    passwordError.style.color = "red";
    passwordError.style.fontSize = "12px";

    usernameInput.insertAdjacentElement("afterend", usernameError);
    emailInput.insertAdjacentElement("afterend", emailError);
    passwordInput.insertAdjacentElement("afterend", passwordError);

    // Real-time validation function
    function validateUsername() {
        let username = usernameInput.value.trim();
        if (username.length < 6) {
            usernameError.textContent = "Username must be at least 6 characters.";
            return false;
        } else {
            usernameError.textContent = "";
            return true;
        }
    }

    function validateEmail() {
        let email = emailInput.value.trim();
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            emailError.textContent = "Enter a valid email address.";
            return false;
        } else {
            emailError.textContent = "";
            return true;
        }
    }

    function validatePassword() {
        let password = passwordInput.value;
        if (password.length < 6) {
            passwordError.textContent = "Password must be at least 6 characters.";
            return false;
        } else {
            passwordError.textContent = "";
            return true;
        }
    }

    // Attach validation on input
    usernameInput.addEventListener("input", validateUsername);
    emailInput.addEventListener("input", validateEmail);
    passwordInput.addEventListener("input", validatePassword);

    // Signup Function
    function signup(event) {
        event.preventDefault();

        let usernameValid = validateUsername();
        let emailValid = validateEmail();
        let passwordValid = validatePassword();

        if (!usernameValid || !emailValid || !passwordValid) {
            return;
        }

        let username = usernameInput.value.trim();
        let email = emailInput.value.trim();
        let password = passwordInput.value;

        if (users.some(user => user.email === email)) {
            emailError.textContent = "User already exists! Please login.";
            return;
        }

        users.push({ username, email, password });
        localStorage.setItem("users", JSON.stringify(users));

        alert("Signup successful! Redirecting to login...");
        setTimeout(() => {
            window.location.href = "index.html"; // Redirect to login page
        }, 1000); // Delay to allow alert visibility
    }

    // Login Function
    function login(event) {
        event.preventDefault();

        let email = emailInput.value.trim();
        let password = passwordInput.value;

        let user = users.find(user => user.email === email && user.password === password);
        if (user) {
            alert("Login successful! Welcome, " + user.username);
            
            // Store logged-in user in localStorage
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            
            setTimeout(() => {
                window.location.href = "dashboard.html"; // Redirect after showing alert
            }, 1000);
        } else {
            emailError.textContent = "Invalid email or password.";
        }
    }

    // Attach event listeners
    let signupBtn = document.getElementById("signup-btn");
    let loginBtn = document.getElementById("login-btn");

    if (signupBtn) {
        signupBtn.addEventListener("click", signup);
    }

    if (loginBtn) {
        loginBtn.addEventListener("click", login);
    }

    // Display logged-in user on the dashboard
    const dashboardMessage = document.getElementById("welcome-message");
    if (dashboardMessage) {
        let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (loggedInUser) {
            dashboardMessage.textContent = `Welcome, ${loggedInUser.username}!`;
        }
    }
});