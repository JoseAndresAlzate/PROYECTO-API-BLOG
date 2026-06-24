import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

            if (!name || !email || !password ) {
                const error = new Error("Todos los campos deben ser diligenciados.")
                error.status = 400
                return next(error)
            };

        const existingUser = await User.findOne ({ email }) 
            if (existingUser){
                const error = new Error("Usuario ya existe.")
                error.status = 400
                return next(error)
            };

        const newUser = await User.create({
            name, email, password,
        });
              
        const { password: _, ... userData} = newUser._doc;

        res.status(201).json({
            success: true,
            message: "Usuario creado con éxito.",
            newUser: userData,
        });

         }catch (error){
        next(error)
    };
};

export const login = async ( req, res, next) => {
    try {
        const { email, password }= req.body;

        if (!email || !password ){
            const error = new Error("Todos los campos se deben diigenciar.")
            error.status = 400
            return next(error)
        };

        const user = await User.findOne ({ email });
            if (!user) {
                const error = new Error("Credenciales inválidas.")
                error.status = 400
                return next(error)
            };

        const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) {
                const error = new Error("Credenciales inválidas.")
                error.status = 400
                return next(error)
            };

        const token = jwt.sign(
            {id: user._id},
            process.env.SECRET_TOKEN,
            {expiresIn: "1h"}
        );
        
        const {password: _, ...userData} = user._doc

        res.status(200).json({
            success: true,
            message: "Login realizado con éxito.",
            user: userData,
            token
        });

    }catch(error){
        next(error);
    };
   
};