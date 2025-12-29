import jwt from 'jsonwebtoken'
import blogModel from '../models/blog.model';

export const VerifiedUser = async(req,res,next) =>{
    try {
        const token =  req.cookies?.token;
    
        if(!token){
            return res.status(401).json({message:'user not logged in'});
        }
    
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        // console.log()
    
        req.user = decoded
        // console.log(req.user)

        next()
    } catch (error) {
        res.status(401).json({message:'user not logged in'});
    }
}

export const isOwner = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const blogId = req.params.id;
        
        const blog = await blogModel.findById(blogId);

        // 1. FIX: Handle case where blog doesn't exist
        if (!blog) {
            return res.status(404).json({ message: "Blog post not found" });
        }

        // 2. FIX: specific comparison logic
        // We use .toString() to ensure we compare String vs String. 
        // Note: Check if your schema stores the user as 'blog.user' or 'blog.user._id'
        const ownerId = blog.user.id.toString(); 

        if (ownerId !== userId) {
            // 3. FIX: Use 403 (Forbidden) instead of 402
            return res.status(403).json({ message: "You are not authorized to modify this content" });
        }

        next();
    } catch (error) {
        console.error(error); // Good to log the actual error for debugging
        res.status(500).json({ message: "Internal server error" });
    }
}