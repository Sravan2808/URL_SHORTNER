import { createUser, findUserByEmail, findUserByEmailAndPassword } from "../dao/user.data.js";
import { signToken } from "../utils/helper.js";
import { AppError } from "../utils/errorHandler.js";

export const registerUser = async (name, email, password) => {
  const user = await findUserByEmail(email);
  if (user) throw new AppError("User already exists");
  const newUser = await createUser(name, email, password);
  const token = await signToken({ id: newUser._id });
  return {token,user};
};

export const LoginUser = async (email, password) => {
  const user = await findUserByEmailAndPassword(email);
 

  if (!user) throw new AppError("Invalid Credentials");

  const isPasswordValid = await user.comparePassword(password);
  
  if (!isPasswordValid) throw new AppError("Invalid email or password");
  const token = await signToken({ id: user._id });
  return { token, user };
};
