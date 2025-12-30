import { NextFunction, Request, Response } from "express";
import { Users } from "../models/user.model";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import AppError from "../utils/appError";
dotenv.config();
const secret:string|any=process.env.JWT_SECERET

const authMiddleware=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const token=req.cookies.jwt||req.headers.authorization?.replace("Bearer ","");
        if(!token) return res.status(401).json({success:false,message:"Unauthorized token"});

        // type of payload
        type payload={id:string|any,email:string};
        
        const {id,email}:payload|any= jwt.verify(token,secret);
        // check the user is there with the email and id

        const user=await Users.findOne({where:{id:id,email:email},raw:true});
        if(!user){
            return res.status(404).json({success:false,message:"user not found"})
        }
        req.user=user;
        next();
    } catch (error) {
        console.log(error);
        
        next(new AppError("Server error",500));
    }
}

export { authMiddleware}