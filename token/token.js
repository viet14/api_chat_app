
import jwt from "jsonwebtoken"

const generateAccessToken = (data)=>{
    return jwt.sign({
        data: data,
        sub: "Chat App Backend",
    } , process.env.ACCESS_TOKEN_KEY , {expiresIn: "5m"})
}

const generateRefreshToken = (data) => {
    return jwt.sign({
        data: data,
        sub: "Chat App Backend",
    } , process.env.REFRESH_TOKEN_KEY , {expiresIn: "7d"})
}

const decodeToken = (token , keys) =>{
    return jwt.verify(token , keys)
}

export {generateAccessToken , generateRefreshToken , decodeToken}