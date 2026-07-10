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

## Mongoose

### Concepts
- Mongoose helps define data structure. 
- A **schema** defines the shape of a document; a **model** is the tool you use to create, find, update, and delete documents.

### Setup
- Create `models/User.js`:
    ```js
    const mongoose = require("mongoose");

    const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    }
    });

    const User = mongoose.model("User", userSchema);

    module.exports = User;
    ```

- Update `server.js`:
    ```js
    const User = require("./models/User");
    ```

- Add register route:
    ```js
    app.post("/api/register", async function (req, res) {
    try {
        const username = req.body.username;
        const password = req.body.password;

        if (!username || !password) {
        return res.status(400).json({
            error: "Username and password are required"
        });
        }

        const existingUser = await User.findOne({ username: username });

        if (existingUser) {
        return res.status(409).json({
            error: "Username already exists"
        });
        }

        const user = await User.create({
        username: username,
        passwordHash: password
        });

        res.status(201).json({
        message: "User created",
        user: {
            id: user._id,
            username: user.username
        }
        });
    } catch (error) {
        res.status(500).json({
        error: "Server error"
        });
    }
    });
    ```

### Notes
- The schema defines the structure and validation rules. 
    - username should be `string`, `required`, and `unique`.
- The model is the interface your code uses to work with documents in MongoDB.
    - User.create(...)
    - User.findOne(...)
    - User.find(...)
    - User.findById(...)
    - User.updateOne(...)
    - User.deleteOne(...)
- `module.exports = User;` means export the `User` value from this file. Then in `server.js` we use `const User = require("./models/User");` to retrieve and store.
- to test if **registration** is working properly, open a second terminal and do:
    ```bash
    curl -i -X POST http://localhost:3000/api/register \
    -H "Content-Type: application/json" \
    -d '{"username":"liam","password":"123456"}'
    ```
- to test if **validation of same username** is working properly, re-prompt the same command above.
- can NOT open a POST route in the browser.

---

## Password Hashing

### storing passwords
- Bad:
    ```js
    password: "123456"
    ```

- Good:
    ```js
    passwordHash: "$2b$10$..."
    ```

- `bcrypt` hashes passwords so the database stores the hash, not the original password.

### Setup

- update `server.js`:
    ```js
    const bcrypt = require("bcrypt");
    ```

- replace user creation logic, the full route be like:
    ```js
    app.post("/api/register", async function (req, res) {
    try {
        const username = req.body.username;
        const password = req.body.password;

        if (!username || !password) {
        return res.status(400).json({
            error: "Username and password are required"
        });
        }

        if (password.length < 6) {
        return res.status(400).json({
            error: "Password must be at least 6 characters"
        });
        }

        const existingUser = await User.findOne({ username: username });

        if (existingUser) {
        return res.status(409).json({
            error: "Username already exists"
        });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await User.create({
        username: username,
        passwordHash: passwordHash
        });

        res.status(201).json({
        message: "User created",
        user: {
            id: user._id,
            username: user.username
        }
        });
    } catch (error) {
        res.status(500).json({
        error: "Server error"
        });
    }
    });
    ```

### Notes
- `bcrypt.hash(password, 10)`: the second parameter is called the **salt rounds**(or **cost factor**).
    - `bcrypt` first generates a random salt, for example: `password = 123456`, `salt = k93hF1`.
    - Then it combines them: `123456 + k93hF1` --> Hash. So another user who also choose `123456` could get a different salt, which allows different hashing.
    - cost factor controls how much work bcrypt should do. The larger the cost factor, the more computation it performs.
    - internally bcrypt users powers of two, each increase doubles the work. So very roughly, `bcrypt.hash(password, 11)` is approximately twice as slow as `bcrypt.hash(password, 10)`.

---

## JWT Authentication

### Concepts
- JWT means JSON Web Token. It is a compact way to send signed claims between two parties.
- workflow:
    ```plaintext
    1. User logs in
    2. Server verifies username/password
    3. Server creates token
    4. Client stores token
    5. Client sends token when accessing protected routes
    6. Server verifies token
    ```

### Setup
- add secret to `.env`:
    ```env
    JWT_SECRET=your_long_random_secret
    ```
- add login Route in `server.js`:
    ```js
    const jwt = require("jsonwebtoken");

    app.post("/api/login", async function (req, res) {
    try {
        const username = req.body.username;
        const password = req.body.password;

        if (!username || !password) {
        return res.status(400).json({
            error: "Username and password are required"
        });
        }

        const user = await User.findOne({ username: username });

        if (!user) {
        return res.status(401).json({
            error: "Invalid username or password"
        });
        }

        const passwordMatches = await bcrypt.compare(password, user.passwordHash);

        if (!passwordMatches) {
        return res.status(401).json({
            error: "Invalid username or password"
        });
        }

        const token = jwt.sign(
        {
            userId: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
        );

        res.json({
        message: "Login successful",
        token: token
        });
    } catch (error) {
        res.status(500).json({
        error: "Server error"
        });
    }
    });
    ```

- create Auth Middleware: `middleware/authMiddleware.js`
    ```js
    const jwt = require("jsonwebtoken");

    function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
        error: "Authorization header missing"
        });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).json({
        error: "Invalid authorization format"
        });
    }

    const token = parts[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
        error: "Invalid or expired token"
        });
    }
    }

    module.exports = authMiddleware;
    ```

- protect `/api/chat`, update `server.js`:
    ```js
    const authMiddleware = require("./middleware/authMiddleware");

    app.get("/api/chat", authMiddleware, function (req, res) {
    res.json({
        message: "Welcome to protected chat",
        user: req.user
    });
    });
    ```

### Notes

#### Why Do We Need JWT?

Suppose a user logs into a website.

Without JWT:

```text
Request 1:
Username + Password
↓
Server verifies

Request 2:
Username + Password
↓
Server verifies

Request 3:
Username + Password
↓
...
```
The user would have to send their password with **every request**, which is insecure.

Instead:
```text
1. User logs in
↓
2. Server verifies username/password
↓
3. Server creates JWT
↓
4. Browser stores JWT
↓
5. Browser sends JWT when accessing protected routes
↓
6. Server verifies JWT
↓
7. Access granted
```

The password is only used during login.

---

#### What Is a JWT?

JWT stands for **JSON Web Token**.

A JWT is composed of three parts:

```text
Header.Payload.Signature
```

Example:

```text
xxxxx.yyyyy.zzzzz
```

- **Header** – algorithm information
- **Payload** – data (claims)
- **Signature** – proves the token has not been modified

#### Payload vs Signature

Example payload:

```json
{
    "userId": "...",
    "username": "liam"
}
```

The payload is **not secret**.

The important part is the **signature**.

The signature is generated using:

```text
Payload
+
JWT_SECRET
↓
Signature
```

If someone changes the payload:
```json
{
    "username": "admin"
}
```

the signature no longer matches.

The server immediately detects that the token has been tampered with.

#### Why Is the Signature Important?

Think of a passport.

The passport contains:

- Name
- Birthday
- Photo

Anyone can read these.

What makes it trustworthy is the **government stamp/signature**.

JWT works the same way.

The server trusts the token because it can verify the signature.

#### JWT_SECRET

`JWT_SECRET` is a secret key known **only by the backend**.

It is used when creating and verifying JWTs.

Example:

```env
JWT_SECRET=7f94d8c3bbef0d6a8b78a8bc93d9f20e7d7a6dceab23b7c4b77c4efaa5df4f11
```

Never use weak secrets such as:

```text
secret
123456
password
```

Never upload `.env` to GitHub.

#### How to Generate JWT_SECRET

Do **not** manually invent one.

Generate a cryptographically random string.

Recommended:

```bash
openssl rand -hex 32
```

Example output:

```text
7f94d8c3bbef0d6a8b78a8bc93d9f20e7d7a6dceab23b7c4b77c4efaa5df4f11
```

This should be stored in:

```env
JWT_SECRET=<generated_secret>
```

#### What Happens If JWT_SECRET Changes?

Suppose the server originally used:

```text
JWT_SECRET = ABC123
```

All issued JWTs were signed using this secret.

Later, the secret changes:

```text
JWT_SECRET = XYZ789
```

Now every old JWT fails verification.

Result:

- All users are logged out.
- Users must log in again.
- New JWTs are signed using the new secret.

#### Login Route

Login workflow:

```text
Browser
↓
POST /api/login
↓
Find user in MongoDB
↓
bcrypt.compare()
↓
Password correct?
↓
Generate JWT
↓
Return JWT to browser
```

JWT creation:

```javascript
const token = jwt.sign(
  {
    userId: user._id,
    username: user.username
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1h"
  }
);
```

Meaning:

- Payload = user information
- Secret = JWT_SECRET
- Option = token expires in 1 hour

#### Why Does JWT Expire?

Suppose someone's JWT is stolen.
If it never expired:
```text
Attacker
↓
Use token forever
```

Bad. Instead:
```text
Token
↓
Valid for 1 hour
↓
Expired
↓
Must log in again
```

Expired tokens are rejected with:
```http
401 Unauthorized
```

#### Protected Routes

Protected routes require the user to be authenticated.

Examples:

```text
/api/chat
/api/profile
/api/orders
/api/settings
```

Public routes:

```text
/api/login
/api/register
```

#### Authentication Middleware

Middleware is code that runs **before** a route handler.
Without middleware:
```text
Request
↓
Route
```

With middleware:
```text
Request
↓
Authentication Check
↓
Route
```

If authentication fails:
```text
Request
↓
Authentication Check
↓
401 Unauthorized
↓
Stop
```

The route never executes.

#### Authorization Header

The browser sends the JWT inside an HTTP header.

Example:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

Express reads it using:

```javascript
const authHeader = req.headers.authorization;
```

Example value:

```text
Bearer eyJhbGciOiJIUzI1NiIs...
```

Split by spaces:

```javascript
const parts = authHeader.split(" ");
```

Result:
```text
parts[0]
↓
Bearer
```

```text
parts[1]
↓
JWT Token
```

The middleware extracts the token:
```javascript
const token = parts[1];
```
Then verifies it:
```javascript
const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET
);
```
If verification succeeds:
```javascript
req.user = decoded;
```
Now every later route knows who the current user is.

#### Complete Authentication Flow

```text
Register
↓
Hash password with bcrypt
↓
Store user in MongoDB
↓
Login
↓
Compare password using bcrypt.compare()
↓
Password correct?
↓
Generate JWT (signed with JWT_SECRET)
↓
Browser stores JWT
↓
Browser requests protected API
↓
Authorization: Bearer <JWT>
↓
Authentication Middleware
↓
jwt.verify()
↓
Valid?
├── No → 401 Unauthorized
└── Yes
      ↓
Protected route executes
```

#### Key Takeaways

- JWT allows users to authenticate **without sending their password on every request**.
- A JWT contains **Header + Payload + Signature**.
- The **signature** prevents token tampering.
- The backend alone knows `JWT_SECRET`.
- `JWT_SECRET` should be generated randomly and stored in `.env`.
- Protected routes require a valid JWT.
- Middleware verifies the JWT before allowing access.
- If the JWT expires or is modified, the server returns **401 Unauthorized**.
- Changing `JWT_SECRET` invalidates all existing JWTs.

### testing workflow:
register:
```bash
curl -i -X POST http://localhost:3000/api/register \  -H "Content-Type: application/json" \  -d '{"username":"liam","password":"123456"}'
```

login:
```bash
curl -i -X POST http://localhost:3000/api/login \   -H "Content-Type: application/json" \  -d '{"username":"liam","password":"123456"}
```
where `GENERATED_TOKEN` is given as a string in the response.

access chat:
```bash
curl http://localhost:3000/api/chat \  -H "Authorization: Bearer GENERATED_TOKEN"
```
