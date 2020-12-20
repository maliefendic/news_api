const express =require('express');
const dotenv= require('dotenv');
const morgan= require('morgan');
const errorHandler= require('./middleware/error');
const connectDB=require('./config/db');
const cookieParser=require('cookie-parser');

//Load env vars
dotenv.config({path:'./config/config.env'});

//Connect to database
connectDB();

//Route files
const news=require('./routes/news');
const auth=require('./routes/auth');

const app=express();

//Body parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());

//Dev logging middlware
if(process.env.NODE_ENV==='development')
app.use(morgan('dev'));


//Mount routes
app.use('/api/v1/news', news);
app.use('/api/v1', auth);

app.use(errorHandler);

const PORT= process.env.PORT || 5000;

const server=app.listen(PORT, console.log(`Server runing in ${process.env.NODE_ENV} mode on port ${PORT}`));

//Handle unhandlend promise rejections
process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error: ${err.message}`);
    //Close server and exit procces
    server.close(()=>process.exit(1));
})