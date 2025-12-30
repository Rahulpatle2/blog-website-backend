import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
import cookieParser from 'cookie-parser';
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'




const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// app.use(cors({
//   origin: process.env.CLIENT_URL,
//   credentials:true,
//   methods: ["GET", "POST", "PUT", "DELETE"], 
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));

app.use(cors({
  origin: "http://localhost:5173",
  credentials:true
}))


app.use('/users',userRoutes);
app.use('/blogs',blogRoutes);

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS 
  }
});

app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const info = await transporter.sendMail({
      from: `"${name}" <${email}>`, // Sender address
      to: process.env.EMAIL_USER, // Your email where you want to receive it
      subject: `New Form Submission from ${name}`,
      text: `You have a new message from: ${email}\n\nMessage:\n${message}`,
    });

    console.log("Message sent: %s", info.messageId);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

export default app;
