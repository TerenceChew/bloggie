const express = require("express");

// App setup
const app = express();
const PORT = 3000;

app.listen(PORT, err => {
  if (err) {
    console.log("Error in server setup");
  }
  console.log("Listening to port", PORT);
});

// View engine setup
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/create", (req, res) => {
  res.render("create");
});

app.get("/about", (req, res) => {
  res.render("about");
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404");
});
