import express from 'express'
import mongoose from 'mongoose';
import dotenv from "dotenv"
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';



dotenv.config()

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Mongo db connected")
}).catch((err)=>{
    console.log("Error: "+err);
})



const app=express();
app.use(express.json());

app.listen(3000,()=>{
    console.log("Server is running at port 3000!?!");
})

app.use('/api/user',userRouter);
app.use('/api/auth', authRouter);



//middleware for try catch
app.use((err, req, res, next)=>{
    const statusCode=err.statusCode ||500;
    const message=err.message || "Internal server error";
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})