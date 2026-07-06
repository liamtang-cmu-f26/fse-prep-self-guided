const form = document.getElementById("login-form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = usernameInput.value;
  const password = passwordInput.value;

  if (username === "" || password === "") {
    alert("Username and password cannot be empty.");
    return;
  }

  alert("Login form submitted successfully.");
});