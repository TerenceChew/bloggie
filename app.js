const express = require("express");
const mongoose = require("mongoose");

// App & database setup
const app = express();
const PORT = 3000;
const dbURI =
  "mongodb+srv://terencecws:test123@cluster0.82suigq.mongodb.net/bloggie?retryWrites=true&w=majority";

mongoose
  .connect(dbURI)
  .then(connection => {
    app.listen(PORT, () => {
      console.log("Listening to port", PORT);
    });
  })
  .catch(err => console.log(err));

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
