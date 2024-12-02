import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config();

export const isProtect = async (req, res, next) => {
    let token;

    if(req?.headers?.authorization?.startsWith("Bearer")){
        token = req.headers?.authorization?.split(" ")[1];

        try {
            if(token){
                const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY)
                const user = await User.findById(decoded?._id)
                req.user = user;
                next();
            }
        } catch (error) {
            if (error instanceof Jwt.TokenExpiredError) {
                return res.status(401).json({ message: "Token expired. Please log in again." });
            }
            return res.status(401).json({ message: "Not authorized. Invalid token." });
        }
    }else{
        return res.send("there is no token attached to the header.")
    }
}