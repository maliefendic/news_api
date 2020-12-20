const mongoose=require('mongoose');

const NewsSchema= new mongoose.Schema({
    title:{
        type:String,
        required:[true, 'Please add a title']
    },
    text:{
        type:String,
        required:[true, 'Please add a text']
    },
    photo:{
        type:String,
        default:'no-photo.jpg'
    },
    createAt:{
        type:Date,
        default:Date.now
    }
});
module.exports= mongoose.model('News',NewsSchema);