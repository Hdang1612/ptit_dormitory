const errorHandler = (err, req, res, next) => {
    console.error(err);
    let statusCode = err.statusCode || 500; // Mặc định lỗi server 500
    let message = err.message || "Internal Server Error";

    if (err.name === "SequelizeValidationError") {
      statusCode = 400;
      message = err.errors.map((e) => e.message).join(", ");
    }
  
    res.status(statusCode).json({ message });
  };
  
  export default errorHandler;
  