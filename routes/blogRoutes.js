const express = require("express");
const blogController = require("../controllers/blogController");

const router = express.Router();

router.get("/", blogController.blog_home);
router.get("/create", blogController.blog_create_get);
router.post("/create", blogController.blog_create_post);
router.get("/:id", blogController.blog_details);
router.delete("/:id", blogController.blog_delete);
router.get("/edit/:id", blogController.blog_edit_get);
router.patch("/edit/:id", blogController.blog_edit_patch);

module.exports = router;
