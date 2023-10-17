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

// Middlewares
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then(result => {
      res.render("index", { title: "Home", blogs: result });
    })
    .catch(err => {
      console.log(err);
    });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create New Blog" });
});

app.post("/blogs/create", (req, res) => {
  const { body } = req;
  const blog = new Blog(body);

  blog
    .save()
    .then(result => {
      res.redirect("/blogs");
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

app.delete("/blogs/:id", (req, res) => {
  const { id } = req.params;

  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: "/blogs" });
    })
    .catch(err => {
      console.log(err);
    });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
