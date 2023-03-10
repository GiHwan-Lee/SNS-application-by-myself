let tweets = [
  {
    id: "1",
    text: "안녕",
    username: "bob",
    createdAt: new Date().toString(),
    name: "bob",
    url: "https://cdn.expcloud.co/life/uploads/2020/04/27135731/Fee-gentry-hed-shot-1.jpg",
  },
  {
    id: "2",
    text: "멋있으시네용",
    createdAt: new Date().toString(),
    name: "kihwan",
    username: "kihwan",
  },
];

export async function getAll() {
  return tweets;
}

export async function getALLByUsername(username) {
  return tweets.filter((tweet) => tweet.username === username);
}

export async function getById(id) {
  return tweets.filter((tweet) => tweet.id === id);
}

export async function create(text, username, name) {
  const tweet = {
    id: Date.now().toString(),
    createdAt: new Date().toString(),
    text,
    username,
    name,
  };

  tweets = [tweet, ...tweets];

  return tweet;
}

export async function update(id, text) {
  const tweet = tweets.find((tweet) => tweet.id === id);

  if (tweet) {
    tweet.text = text;
  }

  return tweet;
}

export async function remove(id) {
  tweets.filter((data) => data.id !== id);
}
