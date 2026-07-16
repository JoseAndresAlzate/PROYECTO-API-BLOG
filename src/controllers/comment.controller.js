import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";

export const createComment = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const { content } = req.body;

    if (!content) {
      const error = new Error("Debe escribir un comentario.");
      error.status = 400;
      return next(error);
    }

    const existingPost = await Post.findById(postId);

    if (!existingPost) {
      const error = new Error("Post no existe.");
      error.status = 404;
      return next(error);
    }

    const newComment = await Comment.create({
      content,
      user: req.user.id,
      post: postId,
    });

    res.status(201).json({
      success: true,
      message: "Comentario creado con éxito.",
      comment: newComment,
    });
  } catch (error) {
    next(error);
  }
};

export const getComments = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId }).populate(
      "user",
      "name email",
    );
    if (comments.length === 0) {
      const error = new Error("No hay comentarios que mostrar.");
      error.status = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    next(error);
  }
};

export const getByIdComments = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId).populate(
      "user",
      "name email",
    );
    if (!comment) {
      const error = new Error("No se encontró el comentario.");
      error.status = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      comment,
    });
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      const error = new Error("Comentario no encontrado.");
      error.status = 404;
      return next(error);
    }

    console.log(req.user);
    console.log(comment.user.toString());

    if (comment.user.toString() !== req.user.id) {
      const error = new Error("No autorizado.");
      error.status = 403;
      return next(error);
    }

    comment.content = content ?? comment.content;

    await comment.save();
    res.status(200).json({
      success: true,
      message: "Comentario actualizado.",
      comment,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      const error = new Error("Comentario no existe.");
      error.status = 404;
      return next(error);
    }

    if (comment.user.toString() !== req.user.id) {
      const error = new Error("No autorizado.");
      error.status = 403;
      return next(error);
    }

    await comment.deleteOne();

    res.status(200).json({
      success: true,
      message: "Comentario eliminado con éxito.",
    });
  } catch (error) {
    next(error);
  }
};
