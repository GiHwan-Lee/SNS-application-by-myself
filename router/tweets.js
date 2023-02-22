import express from "express";
import "express-async-errors";
import * as tweetRepository from "../data/tweet.js";

const router = express.Router();

router.get("/", (req, res) => {
  const username = req.query.username;
  const data = username
    ? tweetRepository.getALLByUsername(username)
    : tweetRepository.getAll();
  res.status(200).json(data);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const data = tweetRepository.getById(id);

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: `ID not found` });
  }
});

router.post("/", (req, res) => {
  const text = req.body.text;
  const username = req.body.username;
  const name = req.body.name;

  const tweet = tweetRepository.create(text, username, name);

  res.status(201).json(tweet);
});

router.put("/:id", (req, res) => {
  const text = req.body.text;
  const id = req.params.id;

  const tweet = tweetRepository.update(id, text);

  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `${id} not found!!` });
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  tweetRepository.remove(id);

  res.sendStatus(204);
});

export default router;
