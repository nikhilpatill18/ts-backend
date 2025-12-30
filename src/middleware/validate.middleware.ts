import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: errors.array(),
      });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
