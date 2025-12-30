import express, { type Application } from "express";
import cors from "cors";
import cookieParser from 'cookie-parser'
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(cors());


export default app;
