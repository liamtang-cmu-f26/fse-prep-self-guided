# Week 2 Notes

## Node.js and npm

### Initiation
* dependencies:
    ```bash
    npm install express mongoose dotenv bcrypt jsonwebtoken
    npm install --save-dev nodemon
    ```

* update `package.json`:
    ```json
    {
    "scripts": {
        "dev": "nodemon server.js",
        "start": "node server.js"
    }
    }
    ```

* create `server.js`:
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

* run: 
    ```bash
    npm run dev
    ```

* open:
    ```plaintext
    http://localhost:3000
    ```