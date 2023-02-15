import express from "express";
import "express-async-errors";

const tweets = [
  {
    id: "1",
    text: "안녕",
    username: "bob",
    createdAt: Date.now().toString(),
    name: "bob",
    url: "https://cdn.expcloud.co/life/uploads/2020/04/27135731/Fee-gentry-hed-shot-1.jpg",
  },
];

const router = express.Router();

router.get("/", (req, res, next) => {
  const username = req.query.username;
  const data = username
    ? tweets.filter((tweet) => tweet.username === username)
    : tweets;
  res.status(200).json(data);
});

//이미 app.js에서 /tweets를 적어줬기 때문에 여기서는 따로 안 적어도 된다.
//status가 아닌 statusCode를 넣으면 오류가 난다.
//filter를 쓸거니깐 tweets를 배열로 만들어줘야 한다.

export default router;
