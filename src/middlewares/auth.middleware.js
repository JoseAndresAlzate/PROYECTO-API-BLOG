import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    
    const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            const error = new Error("No hay token.");
            error.status= 401;
            return next(error);
        };

    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        req.user = decoded;
        next();

    }catch (err) {
        const error = new Error("Token inválido.");
        error.status = 401;
        return next(error);
    };
};