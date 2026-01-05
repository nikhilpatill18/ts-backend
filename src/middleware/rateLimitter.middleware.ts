import { NextFunction, Request, Response } from 'express';
import redisClient from '../config/redis';
import AppError from '../utils/appError';


const WINDOW_SIZE = 180;   // seconds
const MAX_REQUESTS = 2;

const rateLimiter=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const ip=req?.ip;
        const key=`rate:${ip}`;
        const count=await redisClient.get(key);
        console.log('login ratelimmiter',count);
        
        if(count==null){
            await redisClient.set(key,'0');
        }
        await  redisClient.incr(key);
        if (Number(count) === 1) {
        await redisClient.expire(key, WINDOW_SIZE);
            }

    // 3️⃣ Block if limit exceeded
    if (Number(count) >= MAX_REQUESTS) {
      next(new AppError('Too many request please try after some time',429))
    }

    next()
    } catch (error) {
        console.log(error);
        
      next(new AppError('something went wrong',500))
    }
}

export {rateLimiter};