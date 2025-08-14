import { findUserById } from "../dao/user.data.js";
import { verifyToken } from "./helper.js";

export const attachUser = async(req,res,next)=>{
    const token = req.cookies.accessToken
    if(!token) return next();

    try{
        const decode = verifyToken(token)
        const user = await findUserById(decode);
        if(!user) return next();
        req.user = user
        next()
    }catch(error){
        console.log(error);
        next()
    }
}