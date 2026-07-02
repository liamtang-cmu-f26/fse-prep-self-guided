# fse-prep-self-guided
self-guided learning for the fse project following tutorials on HTML/CSS/JS.

## week 1

### how the web works
Client: browser(Chrome)
Server: a computer that sends data or files to the browser
```
Browser sends request → server
Browser receives response ← server
```
Example: 
```http
GET /index.html HTTP/1.1
```
```html
<!-- example of how the web works -->
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

### HTML Fundamentals
HTML describes the structure of a page.
<br>
common elements:
```html
<div>Container</div>
<input />
<button>Click me</button>
<form></form>
```
<br>
`div` stands for **division**, something like a box that groups stuffs together.<br>
without `<div>`:
```html
<h1>Login</h1>

<input>

<button>Sign In</button>
```
The browser simply sees three separate elements.<br>
with `<div>`:
```html
<div>
    <h1>Login</h1>

    <input>

    <button>Sign In</button>
</div>
```
Now the browser sees three elements in one container. `div` makes things in one container, can **easier** move/center/border/change the background color.<br>
Example:
```html
<div class="card">
    Hello
</div>
```
In this case, `div` is the *tag*, `class="card"` is the attribute, `Hello` is the content, `"card"` is a *label* attached ti the box.

id is unique:
```html
<input id="username" />

<input id="password">
```
There is no difference between `<input id="username" />` and `<input id="username">` since `<input>` element never contains anything. `<input />` is a self-closing tag.<br>

class can be reused:
```html
<div class="card"></div>
```

```html
<!-- example of HTML fundamentals -->
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
`<head>` is the information about the page<br>
`<body>` is the actual page content<br>
`<title>` describes the webpage, so not shown(like a book title never shows in the content)<br>
`<form>` groups together user input that will be submitted somewhere.<br>
`type` is predefined HTML attribute, its values are predefined by HTML standard. For example: text, password, email, number, date, checkbox, radio, file, submit, etc..<br>