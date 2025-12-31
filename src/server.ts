import app from "./app";
const { sequelize } = require("./db/sequelize");
import dotenv from 'dotenv'

import globalerrorController from "./controller/globalerror.controller";

dotenv.config()
const PORT=process.env.PORT||4000

const connectDb = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
app.listen(3001 ,"0.0.0.0", async () => { 
  console.log(`server started running on ${PORT}`);
  await connectDb();
  // await createUser();
});

// auth routes


import authRouter from "./routers/auth.routes";

app.use('/api/user/v1',authRouter)


app.use(globalerrorController)