import { findUserById } from "../dao/user.data.js";
import { verifyToken } from "../utils/helper.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        if (!token) throw new Error("Unauthorized");
        const decoded = verifyToken(token);
        const user = await findUserById(decoded);
        if (!user) throw new Error("Unauthorized");
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}