import { Router } from "express";
import { createUserValdations,loginUserValidators ,completeProfileValidators} from "../validator/user-validate";
import { validate } from "../middleware/validate.middleware";
import { signup,login,getUserDetails,completeProfile,send_otp,verify_opt ,authME} from "../controller/auth.controller";

import { authMiddleware } from "../middleware/auth.middleware";

const authRouter=Router();

authRouter.route('/create-user').post(createUserValdations,validate,signup);
authRouter.route('/login-user').post(loginUserValidators,validate,login);
authRouter.route('/get-user/:userId').get(authMiddleware,getUserDetails);
authRouter.route('/complete-user-profile').post(authMiddleware,completeProfileValidators,validate,completeProfile);
authRouter.route('/send-otp').get(authMiddleware,send_otp);
authRouter.route('/verify-otp').post(authMiddleware,verify_opt);
authRouter.route('/me').get(authMiddleware,authME);


export default authRouter