import { createUser, findUserByEmail } from "../dao/user.data.js";
import { signToken } from "../utils/helper.js";
import { AppError } from "../utils/errorHandler.js";
import bcrypt from "bcrypt";
export const registerUser = async (name, email, password) => {
  const user = await findUserByEmail(email);
  if (user) throw new AppError("User already exists");
  const newUser = await createUser(name, email, password);
  const token = await signToken({ id: newUser._id });
  return token;
};

export const LoginUser = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) throw new AppError("Invalid Credentials");
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(password, passwordHash);
  if (!isPasswordValid) throw new AppError("Invalid Credentials");
  const token = await signToken({ id: user._id });
  return { token, user };
};
