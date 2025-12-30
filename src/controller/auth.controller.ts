import { Users} from "../models/user.model";
import { NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { User_Profile } from "../models/user_profile.model";
import dotenv from 'dotenv'
import { userData,UserDetails } from "../types/user";
import AppError from "../utils/appError";
dotenv.config();


const createSendCookie = async (res: Response, user: userData,message:string,status?:number) => {
  try {
    const secret:any|string=process.env.JWT_SECERET
    const token = jwt.sign({ id: user.id,email:user.email }, secret, { expiresIn: "10d" });
    return res
      .status(status||200)
      .cookie("jwt", token)
      .json({ success: true, data: user,message:message });
  } catch (error) {
    return res.status(500).json({ success: false, message: "server error" });
  }
};


// signup user
const signup = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const data: userData = req.body;
    const user = await Users.create({ ...data,isVerified:true });
    if (!user) {
      return res.status(500).json({ message: "server prblm" });
    }
    // return res.status(201).json({ message: "user created successfuly" });
    createSendCookie(res, user.dataValues,"User Register successfully");
  } catch (error) {
    return res.status(500).json({ message: "server prblm" });
  }
};


// logini user
const login = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const data: { email: string; password: string } = req.body;

    // get the user data based on the email
    const user = await Users.findOne<userData | any>({
      where: { email: data.email },
      // raw: true,
      include:[{
        model:User_Profile,
        as:"user_details"
      }]
    });

    // if not return error
    if (!user) 
      next(new AppError("User not found",404));

    // check the password is correct or not
    const isUser = bcryptjs.compare(data.password,user.password);
    if (!isUser)  
      next(new AppError("Unauthorized Request",401));
      
    // check the profile completed
    const isProfileCompleted=user.isProfileCompleted;
    // return error if the profile is completed
    if(!isProfileCompleted)
     return createSendCookie(res,user,"User Profile is not Completed",400);
    
    // make the user password undifned before sending the response
    user.password = undefined;
    // create the token and send to yuser
    createSendCookie(res,user,"User login successfully")
  } 
  
  catch (error) {
    console.log(error);
    
   next(new AppError("Server error",500));
  }
};


// complete user profile

const completeProfile=async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const {id,email}=req.user;

    // get the profile data from the front-end
    const data:UserDetails=req.body;

    // create the userprofileData
    const userData:UserDetails={...data,user_id:id,resume:'resume.pdf'}
    
    // create the userprofile
    const userProfile=await User_Profile.create({...userData});

    // if any problem occur while creating the userprofile
    if(!userProfile)
      next(new AppError("Something went wrong",500));

    // console.log(user);
    await Users.update({isProfileCompleted:true},{where:{id:id}})
    
    // get the user details
    const user:userData=await Users.findOne<userData|any>({where:{id:id,email:email},include:{
      model:User_Profile,
      as:"user_details"
    }});
    // create the send the token 
    createSendCookie(res,user,"user Profile created")
  } catch (error) {
    console.log(error);
    
    next(new AppError("Server Error",500));
  }
}


//get user details based on the userID
const getUserDetails=async(req:Request,res:Response,next:NextFunction)=>{
  try {
  // id from the params
   const {userId}=req.params;

  //  get the user form the database
   const user:userData=await Users.findOne<userData|any>({where:{id:userId},include:{
    model:User_Profile,
    as:"user_details"
     }});
   if(!user)
    next(new AppError("User not found",404));
    
    // make the user password undifned before sending the response
    user.password=undefined;
    // return the response
    return res.status(200).json({message:"success",data:user})
  } catch (error) {
   next(new AppError("Server error",500));
  }
}

export { signup, login ,getUserDetails,completeProfile};
