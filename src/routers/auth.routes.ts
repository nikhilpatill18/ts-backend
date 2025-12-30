import { Router } from "express";
import { createUserValdations,loginUserValidators ,completeProfileValidators} from "../validator/user-validate";
import { validate } from "../middleware/validate.middleware";
import { signup,login,getUserDetails,completeProfile } from "../controller/auth.controller";

import { authMiddleware } from "../middleware/auth.middleware";

const authRouter=Router();

authRouter.route('/create-user').post(createUserValdations,validate,signup);
authRouter.route('/login-user').post(loginUserValidators,validate,login);
authRouter.route('/get-user/:userId').get(getUserDetails);
authRouter.route('/complete-user-profile').post(authMiddleware,completeProfileValidators,validate,completeProfile);


export default authRouter