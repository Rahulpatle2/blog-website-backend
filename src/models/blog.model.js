import mongoose from "mongoose";



const blogSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
        
    },
    date:{
        type:String
    },
    details:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String
    },
    author:{
        type:String,
        required:true
    }
})


const blogModel = mongoose.model('blog',blogSchema);

export default blogModel;