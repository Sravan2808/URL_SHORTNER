import { nanoid } from "nanoid";
import jsonwebtoken from "jsonwebtoken"

export const generateNanoId = (length) => {
  return nanoid(length);
};

export const signToken = (payload) => {
  return jsonwebtoken.sign(payload, process.env.JWT_SECRET, {expiresIn:"5m"});
};

export const verifyToken = (token) => {
  const decode =  jsonwebtoken.verify(token, process.env.JWT_SECRET);
  console.log(decode.id);
  return decode.id
  
};
