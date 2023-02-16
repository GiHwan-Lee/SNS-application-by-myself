import express from "express";
import "express-async-errors";

let tweets = [
  {
    id: "1",
    text: "안녕",
    username: "bob",
    createdAt: Date.now().toString(),
    name: "bob",
    url: "https://cdn.expcloud.co/life/uploads/2020/04/27135731/Fee-gentry-hed-shot-1.jpg",
  },
  {
    id: "2",
    text: "멋있으시네용",
    createdAt: Date.now().toString(),
    name: "kihwan",
    username: "kihwan",
  },
];

const router = express.Router();

router.get("/", (req, res) => {
  const username = req.query.username;
  const data = username
    ? tweets.filter((tweet) => tweet.username === username)
    : tweets;
  res.status(200).json(data);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const data = tweets.find((tweet) => tweet.id === id);
  if (data) {
    res.status(200).json(data);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  const text = req.body.text;
  const username = req.body.username;
  const name = req.body.name;

  const tweet = {
    id: Date.now().toString(),
    text,
    username,
    name,
  };

  tweets = [tweet, ...tweets];
  res.status(201).json(tweet);
});

router.put("/:id", (req, res) => {
  const text = req.body.text;
  const id = req.params.id;

  const tweet = tweets.find((data) => data.id === id);

  if (tweet) {
    tweet.text = text;
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `${id} not found!!` });
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  tweets = tweets.filter((tweet) => tweet.id === id);
  res.sendStatus(204);
});

export default router;
