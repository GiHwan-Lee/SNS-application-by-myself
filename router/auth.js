import express from "express";
import { body } from "express-validator";
import { validate } from "../middleware/validator.js";
import * as authController from "../controller/auth.js";

const router = express.Router();

const validateCredential = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("pleas write at least 5 character"),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("pleas write at least 5 character"),
  validate,
];

const validateSignup = [
  ...validateCredential,
  body("name").notEmpty().withMessage("write your name"),
  body("email").isEmail().normalizeEmail().withMessage("invalid email"),
  body("url")
    .isURL()
    .withMessage("invalid URL")
    .optional({ nullable: true, checkFalsy: true }),
  validate,
];

router.post("/signup", validateSignup, authController.signup);

router.post("/login", validateCredential, authController.login);

export default router;
