import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { createPost, getPosts, getPostById, deletePost, updatePost } from"../controllers/post.controller.js";

const router = express.Router();

router.post("/", verifyToken, createPost);
router.get("/",verifyToken, getPosts);
router.get("/:postId", getPostById);
router.put("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);

export default router;