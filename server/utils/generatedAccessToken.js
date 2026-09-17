import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";


const generateAccessToken = async(userId)=>{
    const token = jwt.sign({id:userId},process.env.JWT_KEY_ACCESS_TOKEN,{
        expiresIn:'5h'
    });
    //  const updateRefreshToken = await userModel.updateOne({ _id: userId  },{
    //         access_token: token
    //     });
    return token;
}
export default generateAccessToken;