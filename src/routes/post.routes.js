const { Router } = require("express");
const {
  createPost,
  getPostsWithAnswers,
  getAllPosts,
  updatePost,
} = require("../controllers/post.controllers");
const authenticate = require("../middlewares/auth.middleware");
const router = Router();

router.get("/api/v1/posts", getAllPosts);
router.post("/api/v1/posts", authenticate, createPost);
router.get("/api/v1/posts/:postId/answers", authenticate, getPostsWithAnswers);

router.put("/api/v1/posts/:id", authenticate, updatePost);

module.exports = router;
