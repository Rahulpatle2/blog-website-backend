import jwt from 'jsonwebtoken'
import blogModel from '../models/blog.model.js';

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
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: User info missing" });
        }
        
        const blog = await blogModel.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: "Blog post not found" });
        }

        
        console.log("Fetched Blog:", blog); 

       
        if (!blog.author) {
            return res.status(500).json({ 
                message: "Server Error: This blog post has no author/user field." 
            });
        }

        console.log(blog.author)

        
        const ownerId = blog.author.toString(); 
        const userId = req.user.id;

        if (ownerId !== userId) {
            return res.status(403).json({ message: "You can't change other people's blogs" });
        }

        next();

    } catch (error) {
        
        res.status(500).json({ message: "Internal server error" });
        console.log(error);
    }
}