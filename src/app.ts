import express, { type Application } from "express";
import cors from "cors";
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());


export default app;
