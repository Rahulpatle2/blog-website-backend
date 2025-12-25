import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
import cookieParser from 'cookie-parser';




const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials:true
}));

app.use('/users',userRoutes);
app.use('/blogs',blogRoutes);



export default app;
