import express from "express";
import "express-async-errors";
import { body } from "express-validator";
import * as tweetController from "../controller/tweet.js";
import { validate } from "../middleware/validator.js";

const tweetValidate = [
  body("text")
    .trim()
    .isLength({ min: 3 })
    .withMessage("please write at least 3 character"),
  validate,
];

const router = express.Router();

router.get("/", tweetController.getTweets);

router.get("/:id", tweetController.getTweet);

router.post("/", tweetValidate, tweetController.createTweet);

router.put("/:id", tweetValidate, tweetController.updateTweet);

router.delete("/:id", tweetController.deleteTweet);

export default router;
