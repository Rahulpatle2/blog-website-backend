import mongoose from "mongoose";

const connect = async() =>{
   try {
    await mongoose.connect(process.env.MONGO_URI)
 
    console.log('db connected')
   } catch (error) {
     console.error("MongoDB connection failed:", error);
    process.exit(1);
   }
}

export default connect


