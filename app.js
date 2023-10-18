const express = require("express");
const mongoose = require("mongoose");
const blogController = require("./controllers/blogController");

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
app.use(express.json());

// Routes
app.get("/", blogController.blog_root);
app.get("/blogs", blogController.blog_home);
app.get("/about", blogController.blog_about);
app.get("/blogs/create", blogController.blog_create_get);
app.post("/blogs/create", blogController.blog_create_post);
app.get("/blogs/:id", blogController.blog_details);
app.delete("/blogs/:id", blogController.blog_delete);
app.get("/blogs/edit/:id", blogController.blog_edit_get);
app.patch("/blogs/edit/:id", blogController.blog_edit_patch);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
