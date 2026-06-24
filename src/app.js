import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import routeComment from "./routes/comment.routes.js";

const app = express();

dotenv.config();

app.use(express.json());

const PORT = process.env.PORT || 4000;

app.use('/api/auth',authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/posts',routeComment)

app.use(errorHandler);

const startServer = async () => {
   try {

      await connectDB();

      app.listen(PORT, () => {
         console.log(`Servidor corriendo en puerto ${PORT}`);
      });

   } catch (error) {
      console.log(error);
   }
};

startServer();