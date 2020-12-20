const ErrorResponse = require("../utils/errorResponse");

const errorHandler=(err,req,res,next)=>{
    let error={...err};

    error.message=err.message;

    //Log to consol for new
    console.log(err.stack);
     
     //ValidationError -->Mongoose
     if(err.name==='ValidationError'){
         const message=Object.values(err.errors).map(val=>val.message);
         error= new ErrorResponse(message, 404);
     }
    //Bad object Id -->Mongoose
    if(err.name==='CastError'){
        const message=`News with id ${err.value} is not find`;
        error= new ErrorResponse(message, 404);
    }
    
  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }
  
    res.status(error.statusCode || 500).json({
        success:false,
        error: error.message || 'Server Error'
    });
}
module.exports=errorHandler;