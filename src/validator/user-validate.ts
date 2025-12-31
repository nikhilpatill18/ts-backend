import { body, param } from "express-validator";
import { Users } from "../models/user.model";
export const createUserValdations = [
  body("firstName").trim().notEmpty().withMessage("FirstName is required"),
  body("lastName").trim().notEmpty().withMessage("LastName is required"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email) => {
      const user = await Users.findOne({ where: { email } });
      if (user) throw new Error("Email Aready Exists");
    }),
  body("password")
    .trim()
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("pasword is required"),
  body("phoneNumber")
    .trim()
    .notEmpty()
    .withMessage("Phonenumber could not be empty")
    .isLength({min:10})
    .withMessage("Phone number should me 10 digit")
];


export const loginUserValidators=[
  body("email").trim().notEmpty().isEmail().withMessage("Please Enter the valid email").custom(async (email) => {
      const user = await Users.findOne({ where: { email } });
      if (!user) throw new Error("email does't exists");
    }),
  body("password").trim().notEmpty().withMessage("password is required").isLength({min:6}).withMessage("minium length required is 6")
]


export const completeProfileValidators=[
  body("underGraduation").trim().notEmpty().withMessage("under graduation is required"),
  body("underGraduationYear").trim().notEmpty().withMessage("under graduation year is required"),
  body("state").trim().notEmpty().withMessage("state is required"),
  body("city").trim().notEmpty().withMessage("City is required")
]
