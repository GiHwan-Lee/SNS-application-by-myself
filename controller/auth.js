import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as userRepository from "../data/auth.js";

function signup(req, res) {
  const { password, username, name, email, url } = req.body;
  const found = userRepository.findByUsername(username);

  if (found) {
    return res.status(409).json({ message: `${username} is already exist` });
  }

  userRepository.createUser({ password, username, name, email, url });
}

//id, password, username, name, email, url이 rep가 될 것이다.

//이를 바탕으로 해당 데이터를 data층으로 옮기고
//res를 해줘야 하는데, token과 username을 res 해줄 것이다.

//가입하려는 계정이 이미 존재한다면 거절을 하도록 해야하고,
//없다면 그 때는 password를 암호화 한 뒤 data 층으로 보내고,
//jwt 토큰을 생성해야 하고,
//id의 경우는 진짜 id가 아니라 고유의 번호를 부여하도록 설정하는 것이다.
