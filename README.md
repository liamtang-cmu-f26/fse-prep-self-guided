# FSE Prep Self-Guided

Self-guided learning for the FSE project by following tutorials on HTML, CSS, and JavaScript.

---

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
