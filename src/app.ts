import express, { type Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import session from 'express-session'
import redisClient from './config/redis';
import { RedisStore } from 'connect-redis';
const app: Application = express();


const redisStore= new RedisStore({
    client:redisClient
});
app.use(
  session({
    store: redisStore,
    secret: 'supersecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 // 1 hour
    }
  })
);
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(cors({origin:['http://localhost:3000','http://192.168.1.66:3000'],credentials:true}));


export default app;
