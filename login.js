document.addEventListener("DOMContentLoaded", function () {
    let emailInput = document.querySelector("input[name='email']");
    let passwordInput = document.querySelector("input[name='password']");
    let loginBtn = document.getElementById("login-btn");

    loginBtn.addEventListener("click", function (event) {
        event.preventDefault();

        let email = emailInput.value.trim();
        let password = passwordInput.value;

        let users = JSON.parse(localStorage.getItem("users")) || [];

        if (!email || !password) {
            alert("Please enter email and password.");
            return;
        }

        let user = users.find(user => user.email === email && user.password === password);

        if (user) {
            alert("Login successful!");
            window.location.href = "new/index.html"; // Redirect to new folder
        } else {
            alert("Invalid email or password.");
        }
    });
});