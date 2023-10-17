const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

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
  Blog.find()
    .sort({ createdAt: -1 })
    .then(result => {
      // res.send(result)
      res.render("index", { title: "Home", blogs: result });
    })
    .catch(err => {
      console.log(err);
    });
});

app.get("/blogs/:id", (req, res, next) => {
  const { id } = req.params;

  Blog.findById(id)
    .then(result => {
      res.render("details", { title: "Blog Details", blog: result });
    })
    .catch(err => {
      console.log(err);
      next();
    });
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
