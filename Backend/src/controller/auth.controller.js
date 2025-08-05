import { cookieOptions } from "../config/config.js";
import { LoginUser, registerUser } from "../services/auth.service.js";
import catchAsync from "../utils/tryCatchWrapper.js";
import bcrypt from "bcrypt";

export const register_user = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const token = await registerUser(name, email, passwordHash);
  req.user = user;
  res.cookie("accessToken",token,cookieOptions);
  res.status(200).json({message:"login Successfully"});
});

export const login_user = catchAsync(async (req, res, next) => {
  const {email,password} = req.body;
  const token = await LoginUser(email, password);
  req.user = user   
  res.cookie("accessToken",token,cookieOptions);
  res.status(200).json({message:"login Successfully"});
});
