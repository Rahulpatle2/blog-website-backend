import mongoose from "mongoose";



const blogSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
        
    },
    date:{
        type:Date,
        default:Date.now
    },
    details:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
})


const blogModel = mongoose.model('blog',blogSchema);

export default blogModel;