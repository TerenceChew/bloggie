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
  res.redirect("/blogs");
});

app.get("/blogs", (req, res) => {
  res.render("index", { title: "Home" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create New Blog" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
