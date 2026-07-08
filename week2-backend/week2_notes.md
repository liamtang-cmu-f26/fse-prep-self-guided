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
    