import express from "express";
import { createComment } from "../controllers/comment.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/:postId/comments", verifyToken, createComment );

export default router;