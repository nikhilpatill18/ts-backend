import { NextFunction, Response,Request } from 'express';


export default async(err:any,req:Request,res:Response,next:NextFunction)=>{
    err.statusCode=err.statusCode||500;
    err.status=err.status||'error';
    return res.status(err.statusCode).json({
        status:err.status,
        error:err,
        message:err.message,
        stack:err.stack
    })
}