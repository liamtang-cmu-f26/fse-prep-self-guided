# Week 1

## How the Web Works

A website involves two main components:

* **Client:** The web browser (e.g., Chrome, Safari, Firefox)
* **Server:** A computer that stores website files and sends them to the browser when requested.

The communication process looks like this:

```text
Browser ──request──▶ Server
Browser ◀─response── Server
```

A browser sends an **HTTP request**, and the server returns an **HTTP response**.

Example request:

```http
GET /index.html HTTP/1.1
```

Example HTML page:

```html
<!-- Example of how the web works -->
<!DOCTYPE html>
<html>
  <head>
    <title>FSE Week 1</title>
  </head>

  <body>
    <h1>Hello, FSE</h1>
  </body>
</html>
```

---

## HTML Fundamentals

HTML (**HyperText Markup Language**) describes the **structure** of a webpage.

Some common HTML elements include:

```html
<div>Container</div>
<input />
<button>Click me</button>
<form></form>
```

### `<div>`

`div` stands for **division**.

It is a generic container used to group related HTML elements together. A `<div>` does not change the appearance of a page by itself, but it makes it much easier to organize and style groups of elements using CSS.

Without a `<div>`:

```html
<h1>Login</h1>

<input>

<button>Sign In</button>
```

The browser treats these as three independent elements.

With a `<div>`:

```html
<div>
  <h1>Login</h1>

  <input>

  <button>Sign In</button>
</div>
```

Now the browser sees all three elements as part of a single container.

Grouping elements inside a `<div>` makes it easier to:

* move them together
* center them on the page
* add borders
* change the background color
* apply spacing and layout

Example:

```html
<div class="card">
  Hello
</div>
```

In this example:

* `<div>` is the **tag**
* `class="card"` is an **attribute**
* `"card"` is the **attribute value**
* `Hello` is the **content** inside the element

---

### `id`

An `id` uniquely identifies one element on a webpage.

Example:

```html
<input id="username" />

<input id="password" />
```

Each `id` should only be used once on the page.

---

### `class`

Unlike `id`, a `class` can be shared by many elements.

Example:

```html
<div class="card"></div>

<div class="card"></div>

<div class="card"></div>
```

This allows multiple elements to share the same styling.

---

### Self-closing elements

There is no practical difference between

```html
<input id="username" />
```

and

```html
<input id="username">
```

because the `<input>` element never contains any content.

The slash (`/`) is optional in HTML5 but is commonly written because it makes self-closing elements easier to recognize.

---

### Example: Login Page

```html
<!-- Example of HTML fundamentals -->
<!DOCTYPE html>
<html>
  <head>
    <title>Login Page</title>
  </head>

  <body>
    <div id="login-container">
      <h1>Welcome Back</h1>

      <form id="login-form">
        <div>
          <label for="username">Username</label>
          <input id="username" type="text" />
        </div>

        <div>
          <label for="password">Password</label>
          <input id="password" type="password" />
        </div>

        <button type="submit">Log In</button>
      </form>
    </div>
  </body>
</html>
```

### Notes

* `<html>` is the root element that contains the entire webpage.
* `<head>` contains **metadata**, such as the page title, linked CSS files, JavaScript files, and character encoding.
* `<body>` contains the content that is displayed in the browser window.
* `<title>` specifies the title shown on the browser tab. It does **not** appear inside the webpage itself.
* `<form>` groups related user input so it can be submitted to a server.
* `<label>` provides a text description for an input field. When its `for` attribute matches an input's `id`, clicking the label automatically focuses the corresponding input.
* `type` is a predefined HTML attribute. Its allowed values are defined by the HTML standard, such as:

  * `text`
  * `password`
  * `email`
  * `number`
  * `date`
  * `checkbox`
  * `radio`
  * `file`
  * `submit`

Different `type` values change how the browser displays the input and how it validates user input.

---

## CSS Basics

### Concepts
CSS controls appearances.
```css
color: red;
font-size: 20px;
margin: 10px;
padding: 20px;
border: 1px solid black;
```

---

### Example
```css
body {
  font-family: Arial, sans-serif;
  background-color: #f3f4f6;
}

#login-container {
  width: 360px;
  margin: 100px auto;
  padding: 32px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 12px;
}

h1 {
  text-align: center;
}

input {
  width: 100%;
  padding: 10px;
  margin-top: 6px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
}
```
One more line to be added in corresponding HTML file:
```html
<link rel="stylesheet" href="style.css" />
```
--- 

### Notes
* The part before {} is called a **selector**.
* The part inside {} is called the **rules**.
* for `#login-container`, the # means find the element whose **id** is `login-container`.
* common values for `text-align`:
    * left
    * right
    * center
    * jusify (stretches spaces so both sides line up)
* **Padding** is the space INSIDE the border, meaning increasing padding makes the border larger.
    * `padding:32px;`
* **Margin** is the space OUTSIDE the border, meaning increasing margin makes the whole box move away from other objects.
    * `margin: 20px`, meaning 4 sides are all 20px away
    * `margin:100px auto;`, meaning top and bottom are 100px away, where `auto` split equally left and right
    * `margin: 10px 20px 30px 40px;`, think of the order clockwise(top --> right --> bottom --> left)
* Common values for **border**:(format: `border: thickness style color`)
    * solid   = normal straight line
    * dashed  = dashed line
    * dotted  = dots
    * double  = two lines
    * none    = no border
* `rel` stands for **relationship**. Common values include:
    * `<link rel="stylesheet" href="style.css">`
    * `<link rel="icon" href="logo.ico">`, meaning this is the small icon shown in the browser tab.
    * `<link rel="preconnect" href="https://fonts.googleapis.com">`, meaning "Browser, prepare a connection early because we'll use this website soon"
* `href` stands for **Hypertext Reference**, think of it as where the file i want is.
* `<link />` is a self-closing element(**void** element).

---

## Flexbox

### Concepts
Flexbox is a CSS layout system for arranging child elements inside a container. Important properties include:
```css
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
```

---

### Example
```css
body {
  font-family: Arial, sans-serif;
  background-color: #f3f4f6;
  min-height: 100vh;
  margin: 0;

  display: flex;
  justify-content: center;
  align-items: center;
}

#login-container {
  width: 360px;
  max-width: 90%;
  padding: 32px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 12px;
}
```

---

### Notes
* `vh` means **viewport height**.
    * `min-height: 100vh;` means make the `body` at least 100% of the browser window height.
* Browsers give `<body>` a small default margin, so without `margin: 0;`, the page may have unwanted white space around the edges.
* `display: flex;` means treat the `body` as a flexible layout ocntainer.
* `justify-content: center;` means center the item **horizontally**.
* `align-items: center;` means center the item **vertically**.
* when flexbox is applied, there is no need to manually set margin for `#login-container`. Therefore `width: 360px;` and `max-width: 90%;` is applied together, meaning that try to be 360px wide, but never exceed 90% of the screen width.
* `flex-direction: row;` is implicitly written in `body`. `flex-direction` determines the main axis, the direction in which flex items are laid out. In this case there is only one direct child, so no need to specify row or column.

---

## JavaScript Basics

### Concepts
JavaScript adds behavior.
```js
let name = "Liam";
const age = 22;

function greet(name) {
  return "Hello " + name;
}

const users = ["Alice", "Bob"];

const user = {
  username: "liam",
  password: "123456"
};
```

---
### Notes
* standard way to declare a variable: `let name = "Liam";`
* `const` prevents reassignments of the variable, not modification of the object or array it refers to.
* JavaScript arrays can store mixed types:
    * ` const arr = [123, "hello", true, null, { name: "Liam" }, [1, 2, 3]];`
    * locate array elements by index: `arr[0]`

---

### Example
```js
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
```
Add following line into html file right before `</body>`:
```html
<script src="script.js"></script>
```

---
### Example notes
* some common events:
    * `button.addEventListener("click", function () { });`
    * `input.addEventListener("keydown", function () { });`
    * `input.addEventListener("input", function () { });`
    * `element.addEventListener("mousemove", function () { });`
* the first paramenter tells JavaScript which event should I listen for: `addEventListener(eventName, function)`
* Every HTML element has default behavior.
    * A link `<a href="google.com">` open google
    * A checkbox check or uncheck itself
    * A form send the data to the server --> reload the page
* Current login page isn;t connected to a server yet. If the browser performs the default action, the page immediately reloads. The validation code wouldn't have a chance to run. So `event.preventDefault()` let JavaScript decide what should happen.
    * without it: click log in --> browser submits form --> reload page
    * with it: click log in --> stop browser --> run JavaScript --> check username --> check password --> show alert
* `===` compares both the value and the type, `==` tries to convert values before comparing
    * `5 === "5"` results `false`, `5 == "5"` results `true`.
    * `0 == false`, `"" == false`, `null == undefined` will result `true`
    * so always use triple equations `===` or `!==`

---

## DOM Manipulations

### Concepts
The Document Object Model is the browser’s object representation of HTML. The "document" is the HTML page.
- suppose the HTML is:
```html
<body>
<div>
<h1>Hello</h1>
<input id="username">
<button>Login</button>
</div>
</body>
```
- The browser turns it into a DOM tree:
```plaintext
Document
│
└── html
     │
     └── body
           │
           └── div
                 │
                 ├── h1
                 │
                 ├── input
                 │
                 └── button
```

* select elements:
```js
document.getElementById("username");
document.querySelector(".message");
```
* creat elements:
```js
const div = document.createElement("div");
div.textContent = "Hello";
```
* Listen for events:
```js
button.addEventListener("click", function () {
  console.log("Clicked");
});
```

DOM changes the element as in a object, not modifying the HTML file.

--- 

### Example
```html
<div id="chat-container">
  <h2>Chat</h2>

  <div id="messages"></div>

  <input id="message-input" type="text" placeholder="Type a message" />
  <button id="send-button" type="button">Send</button>
</div>
```

```css
#chat-container {
  margin-top: 24px;
}

#messages {
  min-height: 120px;
  border: 1px solid #ddd;
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 6px;
}

.message {
  padding: 8px;
  margin-bottom: 8px;
  background-color: #e5e7eb;
  border-radius: 6px;
}
```

```js
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
```

---
### Example notes
HTML provides the initial skeleton. The browser builds a DOM from that HTML. JavaScript modifies the DOM (which exists in memory), and the browser updates the screen to reflect those changes. Unless JavaScript saves the data somewhere persistent (such as a database or browser storage), those DOM changes are lost when the page is reloaded.

---

## Async JavaScript

### Concepts
Modern web apps often get data from APIs.

* An API response often looks like JSON:
```json
{
  "id": 1,
  "title": "Hello"
}
```
* `fetch` sends a request:
```js
fetch("https://example.com/data")
```
* `async`/`await` make async code easier to read:
```js
async function loadData() {
  const response = await fetch(url);
  const data = await response.json();
}
```

---

### Notes
* API = Application Programming Interface. The API is the agreed-upon way your JavaScript asks the server for information.
* While waiting for asynchronous functions, other things can be done.
* by `const response = await fetch(url)`, the server replies things which contains the entire HTTP response, like:
    ```plaintext
    HTTP Response

    Status: 200 OK

    Headers:
    ...

    Body:
    {
        "id":1,
        "title":"Hello"
    }
    ```
* so `const data = await response.json();` read the response body --> interpret it as JSON --> convert it into a JavaScript object.
    * suppose the server sent
        ```json
        {
        "id": 1,
        "title": "Hello"
        }
        ```
    * after `await response.json()`, JavaScript gets
        ```js
        {
            id: 1,
            title: "Hello"
        }
        ```
    * Notice the text JSON file is now converted into a JS object
    * therefore now `data.title` gives `"Hello"`
* use `await` only for operations that are themselves asynchronous. so no `await` before `console.log(title);`.

---

### Example
```html
<div id="api-container">
  <h2>API Result</h2>
  <button id="load-api-button" type="button">Load API Data</button>
  <pre id="api-result"></pre>
</div>
```

```js
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
```

---

### Example notes
* `<pre>` stands for preformatted text, it preserves formatting by showing exactly what is typed.
* `JSON.stringify(data, null, 2);` converts object `data` to a text, meeting the need by ` apiResult.textContent`.
* `JSON.stringify(value, replacer, space)`
    * `JSON.stringify(data)` produce everything in one line:
        ```plaintext
        {"id":1,"title":"Hello","body":"Some text"}
        ```
    * `JSON.stringify(data, null, 2)` produce indentation of 2 spaces:
        ```plaintext
        {
          "id": 1,
          "title": "Hello",
          "body": "Some text"
        }
        ```
* usually in a real application, we don't do `JSON.stringify(data)`, here is just to see what is retrieved by API. Instead we do following to retrieve what we need:
    ```js
    const data = await response.json();

    titleElement.textContent = data.title;
    authorElement.textContent = data.author;
    ```