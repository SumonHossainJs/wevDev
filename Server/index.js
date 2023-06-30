import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js';
import videoRoutes from './routes/video.route.js';
import commentRoutes from './routes/comment.route.js';

const app = express();
const PORT = 3100;
dotenv.config()
mongoose.set('strictQuery', true)

const connect = () =>{
    mongoose.connect(process.env.MONGO).then(()=>{
        console.log("Connected to DB")
    }).catch((err)=>{
        throw err;
    })
}



// middlewares
app.use(cookieParser())
app.use(express.json());
app.use(cors());




app.use("/api/auth", authRoutes);

app.use("/api/user", userRoutes);

app.use("/api/video", videoRoutes);
app.use("/api/comment", commentRoutes);


// error handler 

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
      success: false,
      status,
      message,
    });
  });


app.listen(PORT, () => {

    connect()
    console.log(`Server is up and Running on Port http://localhost:${PORT}`)
})

