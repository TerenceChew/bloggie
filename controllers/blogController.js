const Blog = require("../models/blog");

const blog_home = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then(result => {
      res.render("index", { title: "Home", blogs: result });
    })
    .catch(err => {
      console.log(err);
    });
};

const blog_create_get = (req, res) => {
  res.render("create", { title: "Create New Blog" });
};

const blog_create_post = (req, res) => {
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
};

const blog_details = (req, res, next) => {
  const { id } = req.params;

  Blog.findById(id)
    .then(result => {
      res.render("details", { title: "Blog Details", blog: result });
    })
    .catch(err => {
      console.log(err);
      next();
    });
};

const blog_delete = (req, res) => {
  const { id } = req.params;

  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: "/blogs" });
    })
    .catch(err => {
      console.log(err);
    });
};

const blog_edit_get = (req, res) => {
  const { id } = req.params;

  Blog.findById(id)
    .then(result => {
      res.render("edit", { title: "Edit Blog", blog: result });
    })
    .catch(err => {
      console.log(err);
    });
};

const blog_edit_patch = (req, res) => {
  const { id } = req.params;
  const newFields = req.body;

  Blog.findByIdAndUpdate(id, newFields)
    .then(result => {
      res.json({ redirect: `/blogs/${id}` });
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = {
  blog_home,
  blog_create_get,
  blog_create_post,
  blog_details,
  blog_delete,
  blog_edit_get,
  blog_edit_patch,
};
