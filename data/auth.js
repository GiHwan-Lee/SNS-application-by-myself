let users = [
  {
    id: "1",
    username: "bob",
    password: "",
    name: "Bob",
    email: "bob@gmail.com",
    url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
  },
];

export function findByUsername(username) {
  return users.find((user) => username === user.username);
}

export function createUser(user) {
  users.push(user);
}
