export const errorHandler = (err, req, res, next)=>{
    
    const status = err.message || 500
    
    res.status(status).json({
            success: false,
            message: err.message || "Error interno del servidor.", 
    });
    
};