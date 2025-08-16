import { cookieOptions } from "../config/config.js";
import { LoginUser, registerUser } from "../services/auth.service.js";
import catchAsync from "../utils/tryCatchWrapper.js";
import bcrypt from "bcrypt";

export const register_user = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;
  const {token,user} = await registerUser(name, email, password);
  req.user = user;
  res.cookie("accessToken",token,cookieOptions);
  res.status(200).json({message:"login Successfully"});
});

export const login_user = catchAsync(async (req, res) => {
  const {email,password} = req.body;
    
  const {token,user} = await LoginUser(email, password);
  req.user = user   
  res.cookie("accessToken",token,cookieOptions);
  res.status(200).json({user,message:"login Successfully"});
});
 
export const logout_user = catchAsync(async (req, res) => {
  res.clearCookie("accessToken",cookieOptions);
  res.status(200).json({ message: "Logout Successfully" });
});

export const get_current_user = catchAsync(async (req, res) => {
  res.status(200).json({ user: req.user });
});
