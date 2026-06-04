const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    if (err.name === "CastError") {
        message = "Not Found";
        statusCode = 404;
    }

    if (err.code === 'LIMIT_FILE_SIZE') {
        message = "File size should be less than 10MB";
        statusCode = 400;
    }
    
    if (err.name === "JsonWebTokenError") {
        message = "Invalid token";
        statusCode = 401;
    }
    
    if (err.name === "TokenExpiredError") {
        message = "Token expired";
        statusCode = 401;
    }

    console.error("Error:", {
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });

    res.status(statusCode).json({
        success: false,
        error:message,
        statusCode,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
}

export default errorHandler;