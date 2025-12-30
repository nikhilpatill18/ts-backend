"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const { sequelize } = require("./db/sequelize");
const user_ts_model_1 = require("./models/user-ts.model");
const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};
app_1.default.listen(3000, async () => {
    console.log("server started");
    await connectDb();
    // await createUser();
});
const createUser = async () => {
    try {
        const user = await user_ts_model_1.UserTs.create({
            firstName: "nikhil",
            lastName: "patil",
            password: "qwerty",
            email: "nik1@nik.com",
        });
        if (user) {
            console.log("user created successfully");
            const newUser = await user_ts_model_1.UserTs.findOne({
                where: { email: "nik1@nik.com" },
            });
            console.log("createdUser", newUser);
        }
    }
    catch (error) {
        console.log(error);
        console.log("error");
    }
};
//# sourceMappingURL=server.js.map