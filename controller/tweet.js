import * as tweetRepository from "../data/tweet.js";

export async function getTweets(req, res) {
  const username = req.query.username;
  const data = await (username
    ? tweetRepository.getALLByUsername(username)
    : tweetRepository.getAll());
  res.status(200).json(data);
}

export async function getTweet(req, res) {
  const id = req.params.id;
  const data = await tweetRepository.getById(id);

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: `ID not found` });
  }
}

export async function createTweet(req, res) {
  const text = req.body.text;
  const username = req.body.username;
  const name = req.body.name;

  const tweet = await tweetRepository.create(text, username, name);

  res.status(201).json(tweet);
}

export async function updateTweet(req, res) {
  const text = req.body.text;
  const id = req.params.id;

  const tweet = await tweetRepository.update(id, text);

  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `${id} not found!!` });
  }
}

export async function deleteTweet(req, res) {
  const id = req.params.id;

  await tweetRepository.remove(id);

  res.sendStatus(204);
}
