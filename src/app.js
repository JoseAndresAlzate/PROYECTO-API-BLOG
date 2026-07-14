import express from "express";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import routeComment from "./routes/comment.routes.js";

const app = express();

app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/posts',routeComment)

app.use(errorHandler);

export default app