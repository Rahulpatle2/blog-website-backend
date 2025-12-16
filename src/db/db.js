import mongoose from "mongoose";

const connect = async() =>{
   try {
    await mongoose.connect('mongodb://localhost:27017/blog-database')
 
    console.log('db connected')
   } catch (error) {
    console.log(`Error: ${error.massage}`)
   }
}

export default connect


