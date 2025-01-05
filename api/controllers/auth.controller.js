import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { errorHandeler } from "../utils/error.js";
import jwt from "jsonwebtoken"

export const signup=async(req, res, next)=>{
    const {username, email,password}=req.body;
    const hashedPassword=bcryptjs.hashSync(password,10);
    const newUser= new User({username,email,password:hashedPassword});

    try {
        await newUser.save();
        res.status(201).json("User created successfully");
        
    } catch (error) {
        //NORMAL METHOD
        // res.status(409).json(error.message)

        // MIDDLEWARE USED
        next(error);

        //USING ERROR HANDELER
        // next(errorHandeler(500, error.message));
    }  


}



export const signin= async(req, res, next)=>{
    const {email, password}= req.body;
    try {
        const validUser= await User.findOne({email})
        if(!validUser) return next(errorHandeler(404, "User not found"));

        const validPassword=bcryptjs.compareSync(password, validUser.password)
        if(!validPassword) return next(errorHandeler(401, "Invalid Credentials"));

        const token=jwt.sign({id : validUser._id}, process.env.JWT_SECRET)

        // validUser
        const {password: pass, ...rest}=validUser._doc;

        res.cookie("accesstoken", token,{httpOnly:true}).status(200).json(rest)
    } catch (error) {
        next(error)
    }
}