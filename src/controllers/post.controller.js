import Post from "../models/post.model.js";

export const createPost = async (req, res, next) => {
   try {
      const { title, content } = req.body;

      if (!title || !content) {
         const error = new Error("Todos los campos deben ser diligenciados.");
         error.status = 400;
         return next(error);
      }
      const userId = req.user.id;

      const newPost = await Post.create({
         title,
         content,
         user: userId,
      });

      res.status(201).json({
         success: true,
         message: "Post creado con éxito.",
         post: newPost,
      });

   } catch (error) {
      next(error);
   }
};

export const getPosts = async (req, res, next)=> {
    try {
        const findPosts = await Post.find({user: req.user.id}).populate("user", "name email")
            if (findPosts.length === 0){
                const error = new Error("No hay posts creados.")
                error.status = 404
                return next(error);             
            };

        res.status(200).json({
            success: true,
            post: findPosts
        });    

    }catch(error){
        next(error);
    };
};

export const getPostById = async (req, res, next) => {
    try {

        const { postId } = req.params;

        const post = await Post.findById(postId).populate("user", "name email");

        if (!post) {
            const error = new Error("Post no encontrado.");
            error.status = 404;
            return next(error);
        }

        res.status(200).json({
            success: true,
            post,
        });

    } catch (error) {
        next(error);
    }
};

export const updatePost = async (req, res, next) => {

   try {

      const { id } = req.params;

      const { title, content } = req.body;

      const post = await Post.findById(id);

      if (!post) {
         const error = new Error("Post no encontrado.");
         error.status = 404;
         return next(error);
      }

      if (post.user.toString() !== req.user.id) {
         const error = new Error("No autorizado.");
         error.status = 403;
         return next(error);
      }

      post.title = title ?? post.title;

      post.content = content ?? post.content;

      await post.save();

      res.status(200).json({
         success: true,
         message: "Post actualizado con éxito.",
         post,
      });

   } catch (error) {

      next(error);
   }
};

export const deletePost = async (req, res, next) => {

   try {

      const { id } = req.params;

      const post = await Post.findById(id);

      if (!post) {

         const error = new Error("Post no encontrado.");
         error.status = 404;

         return next(error);
      }

      if (post.user.toString() !== req.user.id) {

         const error = new Error("No autorizado.");
         error.status = 403;

         return next(error);
      }

      await post.deleteOne();

      res.status(200).json({
         success: true,
         message: "Post eliminado con éxito."
      });

   } catch (error) {

      next(error);
   }
};