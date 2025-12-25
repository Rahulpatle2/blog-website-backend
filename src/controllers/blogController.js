import { rmSync } from "fs";
import blogModel from "../models/blog.model.js";

export const createBlogController = async(req,res) =>{
    try {
        const {title,imageUrl,details,date,author} = req.body;

        // console.log(req.body)
        // console.log(req.user)

        if(!title || !imageUrl || !details){
            return res.status(400).json({message:"All fields required!"});
        }
    
        const blog = await blogModel.create({
            title,
            date,
            imageUrl,
            author:req.user.id,
            details
        });
        // console.log(blog);
    
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({message:error.message});
    }


}

export const getAllBlogController = async(req,res) =>{

    // console.log(req.user)

    try {
        const blogs = await blogModel.find().populate("author","username email")
    
        if(blogs.length === 0){
            return res.status(404).json({message:"NO blog found!"})
        }
        
        // console.log(blogs)
        res.status(200).json({blogs});
        // console.log(req.requestTime);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const updateBlogController = async(req,res) =>{
    try {
        const id = req.params.id;
    
        const blog = await blogModel.findOneAndUpdate(
            {_id:id,
                author:req.user._id
            },
            req.body,
            {new:true}
        
        );
    
        res.status(201).json({message:"blog Updated successfully",blog});
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const deleteBlogController = async(req,res) =>{
    try {
        const id = req.params.id
    
        const blog = await blogModel.findByIdAndDelete(id);

        console.log(blog)
    
        res.status(201).json({message:"blog deleted successfully"});

    } catch (error) {

        res.status(500).json({message:error.message})
    }


}


export const getBlogController = async(req,res) =>{
    try {
        const id = req.params.id;
    
        const blog = await blogModel.findOne({_id:id});

        if(!blog){
            return res.status(404).json({message:"blog not found!"})
        }
    
        res.status(200).json(blog);
    
        
    
    } catch (error) {
        res.status(500).json({message:"internal server error!"});
    }

}

// export const updateBlogController = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const blog = await blogModel.findById(id);

//     if (!blog) {
//       return res.status(404).json({ message: "Blog not found" });
//     }

//     if (blog.author._id.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ message: "You are not allowed to update this blog" });
//     }

//     const updatedBlog = await blogModel.findByIdAndUpdate(
//       id,
//       req.body,
//       { new: true }
//     );

//     res.status(200).json({
//       message: "Blog updated successfully",
//       blog: updatedBlog
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Internal server error",error});
//   }
// };
