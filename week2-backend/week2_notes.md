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