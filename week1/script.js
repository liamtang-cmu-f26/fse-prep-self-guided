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

const sendButton = document.getElementById("send-button");
const messageInput = document.getElementById("message-input");
const messages = document.getElementById("messages");

sendButton.addEventListener("click", function () {
  const text = messageInput.value;

  if (text === "") {
    alert("Message cannot be empty.");
    return;
  }

  const messageDiv = document.createElement("div");
  messageDiv.className = "message";
  messageDiv.textContent = text;

  messages.appendChild(messageDiv);

  messageInput.value = "";
});

const loadApiButton = document.getElementById("load-api-button");
const apiResult = document.getElementById("api-result");

loadApiButton.addEventListener("click", async function () {
  apiResult.textContent = "Loading...";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    const data = await response.json();

    apiResult.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    apiResult.textContent = "Failed to load API data.";
  }
});