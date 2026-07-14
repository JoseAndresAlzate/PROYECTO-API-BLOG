import express from "express";
import {
  createComment,
  getComments,
  getByIdComments,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/:postId/comments", verifyToken, createComment);
router.get("/:postId/comments/", getComments);
router.get("/comments/:commentId", getByIdComments);
router.put("/comments/:commentId", verifyToken, updateComment);
router.delete("/comments/:commentId", verifyToken, deleteComment);

export default router;
