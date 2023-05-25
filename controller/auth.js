import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as userRepository from "../data/auth.js";

export async function signup(req, res) {
  const { password, username, name, email, url } = req.body;
  const found = userRepository.findByUsername(username);

  if (found) {
    return res.status(409).json({ message: `${username} is already exist` });
  }

  const hashed = await bcrypt.hash(password, 12);

  const userId = await userRepository.createUser({
    password: hashed,
    username,
    name,
    email,
    url,
  });

  const token = createJwtToken(userId);

  res.status(201).json({ token, username });
}

export async function login(req, res) {
  const { username, password } = req.body;
  const user = userRepository.findByUsername(username);

  if (!user) {
    return res.status(401).json({ message: "Can't find your information" });
  }
  //계정이 있는지 확인

  const isValidPassword = bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid user" });
  }

  const token = createJwtToken(user.id);

  res.status(200).json({ token, username });
}

const secretKey = "fM5kL1g%Pt7ccS8ghhLug#BD8XrrxrVs";

function createJwtToken(id) {
  return jwt.sign({ id }, secretKey, { expiresIn: 17200 });
}

//id, password, username, name, email, url이 rep가 될 것이다.

//이를 바탕으로 해당 데이터를 data층으로 옮기고
//res를 해줘야 하는데, token과 username을 res 해줄 것이다.

//가입하려는 계정이 이미 존재한다면 거절을 하도록 해야하고,
//없다면 그 때는 password를 암호화 한 뒤 data 층으로 보내고,
//jwt 토큰을 생성해야 하고,
//id의 경우는 진짜 id가 아니라 고유의 번호를 부여하도록 설정하는 것이다.
