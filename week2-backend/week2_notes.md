# Week 2 Notes

---

## Node.js and npm

### Initiation and notes
- dependencies:
    ```bash
    npm install express mongoose dotenv bcrypt jsonwebtoken
    npm install --save-dev nodemon
    ```
    * `Node.js` let JavaScript run **outside** the browser.
        * since what learned in week1 JavaScript only ran inside the browser.
    * now JS can:
        * craete web servers
        * read files
        * connect to databases
        * communicate with other computers
    * `npm` stands for **Node Package Manager**.
        * `npm install express` downloads package `express` from `npm`.
    * `express` is a library for building web servers.
        * can creates a route in one line: `app.get("/", ...)`
    * `Mongoose` makes talking to MOngoDB.
    * `dotenv` loads values into the program, for example database password should be put in a `.env` file.
    * `bcrypt` converts a password of an account into a long encrypted-looking string(a **hash**).
        * Even if the database leaks, people can not recover the password easily.
    * `jsonwebtoken` allows teh server remember "this user is already authenticated" when a user logs in.
    
    * `nodemon` watches the files. Whenever changes being made, it automatically restarts the server.
    * There are two kinds of packages.
        - Runtime dependencies: needed when the application runs, e.g. express, mongoose, bcrypt
        - Development dependencies: only needed while programming, e.g. nodemon.
    * `--save-dev` records "devDenpendencies" in a separate place, different from runtime dependencies.

- update `package.json`:
    ```json
    {
    "scripts": {
        "dev": "nodemon server.js",
        "start": "node server.js"
    }
    }
    ```
    * think of `package.json` as the project's **configuration file**.
    * such updates allow `npm` to know when `npm run dev`, executes `nodemon server.js`. Likewise `npm run start` executes `node server.js`.


- create `server.js`:
    ```js
    const express = require("express");

    const app = express();
    const PORT = 3000;

    app.get("/", function (req, res) {
    res.send("Hello from backend");
    });

    app.listen(PORT, function () {
    console.log(`Server running on http://localhost:${PORT}`);
    });
    ```
    * `app.get("/", function(req, res) {` is a **route**, meaning if someone visits `http://localhost:3000/`, run this function.
        * `req` is request, contains information sent by the browser.
        * `res` is response, what I'll send back.
    * `app.listen(PORT, function() {` meaning start listening for incoming requests. Without this the server never starts.


- run: 
    ```bash
    npm run dev
    ```
    * a shortcut to run the program, mentioned above in `package.json`.

- open:
    ```plaintext
    http://localhost:3000
    ```

---

## Express basics

### route structure
```js
app.METHOD(PATH, HANDLER)
```

### example
update `server.js`:
```js
const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello from backend");
});

app.get("/api/health", function (req, res) {
  res.json({
    status: "ok",
    message: "Backend is running"
  });
});

app.get("/api/users", function (req, res) {
  res.json([
    { id: 1, username: "liam" },
    { id: 2, username: "cmusv" }
  ]);
});

app.listen(PORT, function () {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

* Express decides which function should handle each request.
    ```plaintext
    Browser
        │
        │ Request
        ▼
    +----------------------+
    | Express Server       |
    |                      |
    | "/"              → Room A
    | "/api/health"    → Room B
    | "/api/users"     → Room C
    +----------------------+
    ```
* `app.use(express.json())` was not applied last time since the browser wasn;t sending any data to the server.
* suppose frontend sends
    ```json
    {
    "username": "liam",
    "password": "123456"
    }
    ```
    when Express received it, it initially just sees text:
    ```plaintext
    "{\"username\":\"liam\",\"password\":\"123456\"}"
    ```
    * `express.json()` tells Express whenever someone sends JSON, automatically parse it into a JavaScript object.
* `res.send()` sends whatever you give it.
* `res.json()` sends JSON.

---

## Express Practice

### Server Static Frontend Files
- Create public:
    ```bash
    mkdir public
    ```
- Move week1 files to public:
    ```plaintext
    public/index.html
    public/style.css
    public/script.js
    ```
- add following to `server.js`:
    ```js
    app.use(express.static("public"));
    ```
- Now visit `http://localhost:3000` will show the HTML page.

### Notes
- `app.use(express.static("public"));` tells Express: When someone visits /, look inside the public folder. 
    - So `http://localhost:3000`now returns `public/index.html`,
    - instead of reaching `app.get("/", ...)`. The `app.get("/", ...)` is still there, but the static middleware handles the request first.

---

### Add POST requests
- add route:
    ```js
    app.post("/api/register", function (req, res) {
        const username = req.body.username;
        const password = req.body.password;

        if (!username || !password) {
            return res.status(400).json({
            error: "Username and password are required"
            });
        }

        res.status(201).json({
            message: "User received",
            user: {
            username: username
            }
        });
    });
    ```
- key idea: `app.use(express.json());` allows Express to read JSON request bodies as `req.body`.
- test with curl in a new terminal while `localhost` is running:
    ```bash
    curl -X POST http://localhost:3000/api/register \
    -H "Content-Type: application/json" \
    -d '{"username":"liam","password":"123456"}'
    ```

### Notes
- `res.status(400)` sets the HTTP status code, meaning: bad request, the client sent invalid data.
- `return` only after `res.status(400)`, because for the error case, you want to stop the function immediately.
- for the success case, it is the last line nayway, so `return` is optional.
- `curl` is a terminal tool for sending HTTP requests. It allows to test backend without building a frontend first. The server must be running.
    - `-X POST`: use the POST method.
    - `-H "Content-Type: application/json"`: send a header saying the request body is JSON.
    - `-d '{"username":"liam","password":"123456"}'`: send this JSON data as the request body.
- HTTP status codes:
    - 200 OK: everything worked.
    - 201 Created: A new resource was successfully created.
    - 400 Bad Request: The client sent invalid data.
    - 401 Unauthorized: You are not logged in.
    - 403 Forbidden: You are logged in, but you don't have permission.
    - 404 Not Found: Page doesn't exist.
    - 500 Internal Server Error: Something went wrong inside the server.

---

## Checkpoint: idea of frontend and backend

### Big Picture

A modern web application consists of **two separate programs**:

```text
Browser (Frontend)
        │
        │ HTTP Request / Response
        ▼
Server (Backend)
        │
        ▼
Database (later)
```

Although both can be written in JavaScript, **they run in different places and have different responsibilities.**

### Frontend

The frontend runs **inside the user's browser**.

Technologies:

- HTML
- CSS
- JavaScript

Responsibilities:

- Display the webpage
- Respond to user interactions
- Modify the DOM
- Send requests to the backend
- Perform simple validation for a better user experience

Think of it as:

```text
HTML = Skeleton

CSS = Skin / Clothes

JavaScript = Muscles + Brain (behavior)
```

Example:

```text
User clicks Login

↓

Frontend JS checks:

Is username empty?

↓

If empty

↓

Show alert immediately
```

This improves user experience because the user receives instant feedback without contacting the server.

### Backend

The backend runs on **your server** (currently your own computer using Node.js).

Technologies:

- Node.js
- Express
- MongoDB (later)
- Mongoose (later)

Responsibilities:

- Receive HTTP requests
- Validate incoming data
- Execute business logic
- Communicate with databases
- Return HTTP responses

Example:

```text
POST /api/register

↓

Backend receives:

{
    username,
    password
}

↓

Validate data

↓

Store user (later)

↓

Return response
```

### Why Have Both Frontend and Backend?

The biggest reason is:

> **The frontend belongs to the user. The backend belongs to you (the application/company).**

```text
User's Computer

↓

Frontend

↓

User can inspect or modify it.
```

```text
Company Server

↓

Backend

↓

Users cannot directly control it.
```

Because users control the frontend, **it cannot be trusted**.

### Never Trust the Frontend

Suppose the frontend checks:

```javascript
if (username === "" || password === "") {
    alert("Username and password cannot be empty.");
    return;
}
```

A normal user:

```text
User

↓

Frontend validation

↓

Backend
```

A malicious user can completely skip the frontend:

```text
User

↓

curl / Postman / Custom Program

↓

Backend
```

The backend must **always validate again**.

Frontend validation is for **user experience**.

Backend validation is for **security and correctness**.

### The Backend Owns the Truth

This is one of the most important concepts in web development.

> **The backend owns the truth.**

The frontend only displays it.

Examples:

| Data | Who Owns It? |
|-------|--------------|
| Login page layout | Frontend |
| Button animations | Frontend |
| Username empty check | Frontend + Backend |
| Password database | Backend |
| User accounts | Backend |
| Shopping cart animation | Frontend |
| Final product price | Backend |
| Bank account balance | Backend |

### Why Not Put Everything in the Frontend?

Without a backend:

- No database
- No user accounts
- No saved information
- No shared data between users
- No security
- No authentication

You could only build static or local applications.

You could **not** build:

- Gmail
- Instagram
- GitHub
- WhatsApp
- ChatGPT

### Example: Login Flow

```text
User enters username/password

↓

Frontend JavaScript

↓

Basic validation
(empty fields?)

↓

POST /login

↓

Backend

↓

Database

↓

Password correct?

↓

Return success or failure

↓

Frontend updates the page
```

Notice:

- The frontend **does not know** whether the password is correct.
- Only the backend has access to the database.

### Mental Model

Instead of memorizing "Frontend vs Backend", ask yourself:

> **Who should own this information?**

If it is:

- UI appearance → Frontend
- User interactions → Frontend
- Sensitive information → Backend
- Business rules → Backend
- Database → Backend

This question helps determine where a feature belongs.

### Key Takeaways

- **Frontend** runs in the browser and focuses on presentation and interaction.
- **Backend** runs on the server and handles data, security, and business logic.
- **Frontend validation improves user experience.**
- **Backend validation guarantees correctness and security.**
- **The backend is the source of truth.**
- **The frontend should never be trusted with sensitive or authoritative data.**

---

## MongoDB

### Setup
- create `.env`:
    ```env
    MONGO_URI=your_mongodb_connection_string
    PORT=3000
    ```

- update `server.js`:
    ```js
    require("dotenv").config();

    const express = require("express");
    const mongoose = require("mongoose");

    const app = express();
    const PORT = process.env.PORT || 3000;

    app.use(express.json());
    app.use(express.static("public"));

    mongoose
    .connect(process.env.MONGO_URI)
    .then(function () {
        console.log("Connected to MongoDB");
    })
    .catch(function (error) {
        console.error("MongoDB connection error:", error);
    });

    app.get("/api/health", function (req, res) {
    res.json({ status: "ok" });
    });

    app.listen(PORT, function () {
    console.log(`Server running on http://localhost:${PORT}`);
    });
    ```

### Notes
- With `mongoose.connect(process.env.MONGO_URI);`, MongoDB does not connect instantly. 
    - It needs to go through computer --> internet --> MOngoDB Atlas --> Authenticate --> Connect, which takes time. JavaScript cannot know beforehand.
    - So `mongoose.connect(process.env.MONGO_URI);` doesn't return "Connected" immediately. Instead, it returns a **Promise**.
- A **Promise** is JavaScript's way of saying "I'm working on it. I'll let you know when I'm finished."
- `.then()` meaning "Then, if the connection succeeds..."
- `.catch()` does the work for "if the connection goes wrong..."
- `if...else...` is not applied here since the connection takes time to happen.