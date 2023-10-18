const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

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
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.use("/blogs", blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
