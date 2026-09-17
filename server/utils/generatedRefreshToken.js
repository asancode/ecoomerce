import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

const generateRefreshToken = async(userId)=>{
    const token = jwt.sign({id:userId},process.env.JWT_KEY_REFRESH_TOKEN,{
        expiresIn:'7d'
    });
    const updateRefreshToken = await UserModel.updateOne({ _id: userId  },{
        refresh_token: token
    });
    return token;
}
export default generateRefreshToken;