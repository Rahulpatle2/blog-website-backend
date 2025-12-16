import express from 'express';
import blogModel from './models/blog.model.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "https://blog-website-frontend-indol.vercel.app",
}));

app.get('/blogs', async (req, res) => {
  try {
    const blogs = await blogModel.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/blogs/create-blog', async (req, res) => {
  const { title, date, details, author, imageUrl } = req.body;

  if (!title || !details) {
    return res.status(400).json({ message: 'Title and details are required' });
  }

  try {
    const blog = await blogModel.create({
      title,
      date,
      details,
      author,
      imageUrl
    });

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.patch('/blogs/:id',async(req,res) =>{
    const{ id }= req.params;

    try {
        const blog = await blogModel.findByIdAndUpdate(
            id,
            req.body,
            {new:true}
        )

        res.status(200).json(blog)

        if(!blog){
            return res.status(404).json({message:'No blog found!'})
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

app.delete('/blogs/:id',async(req,res) =>{
    try {
      const {id} = req.params;
  
      const blog = await blogModel.findByIdAndDelete(id);
      if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
}
    } catch (error) {
      res.status(404).json({message:error})
    }
})

export default app;
