import express from "express";
import authController from "../controller/auth.js";

const router = express.Router;

router.post("/signup");

router.post("/login");

router.length("/me");

export default router;
