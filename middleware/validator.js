import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    console.log(errors);
    return next();
  }
  console.log(errors);
  return res.status(400).json({ message: errors.array()[0].msg });
};
