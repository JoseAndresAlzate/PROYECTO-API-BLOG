import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";

export const createComment = async (req, res, next) => {
    try {
        const { postId } = req.params;

        const { content } = req.body;

        if(!content){
            const error = new Error("Debe escribir un comentario.")
            error.status = 400
            return next(error)
        };

        const existingPost = await Post.findById(postId);

         if(!existingPost){
            const error = new Error("Post no existe.")
            error.status = 404
            return next(error)
        };

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

    }catch(error){
        next(error)
    };
};

export const getComments = async (req, res, next)=> {
    try {
        const {postId} = req.params;

        const Comments = await Comments.find({ post: postId });
            if (Comments.length ===0){
                const error = new Error("No hay comentarios que mostrar.")
                error.status = 404
                return next(error)
            };
        
        res.status(200).json({
            success: true,
            post: Comments,
        });    

    }catch (error){
        next(error)
    };
};

export const getByIdComments = async (req, res, next)=> {
    try {
        const { commentId } = req.params

        const comment = await comment.findById(commentId);
            if(!comment){
                const error = new Error("No se encontró el comentario.")
                error.status = 404
                return next(error)
            };

        res.status(200).json({
            success: true,
            comment,
        });    

    }catch(error){
        next(error)
    };
};