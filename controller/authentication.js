import Client from "../models/Client.js"
import RefreshToken from "../models/RefreshToken.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {generateAccessToken , generateRefreshToken} from "../token/token.js"

const refreshToken = async (req, res , next) => {
    const refreshToken = req.headers.refresh_token
    const verifyToken = jwt.verify(refreshToken , process.env.REFRESH_TOKEN_KEY)
    if (!verifyToken) {
        return res.status(401).json({error: {message: 'Token is invalid'}})
    }
    const checkToken = await RefreshToken.findOneAndRemove({refreshToken})
    if (!checkToken) {
        return res.status(401).json({error: {message: 'token does not exist'}})
    }
    const newAccessToken = generateAccessToken(verifyToken , process.env.ACCESS_TOKEN_KEY)
    const newRefreshToken = generateRefreshToken(verifyToken , process.env.REFRESH_TOKEN_KEY)
    const NewRefreshToken = new RefreshToken({refreshToken : newRefreshToken})
    NewRefreshToken.save()
        .then(() => {
            return res.status(200).json({accessToken: newAccessToken, refreshToken: newRefreshToken})
        }).catch(error => {
            return res.status(500).json({error: {message:error.message}})
        })
}

const signOut = async (req, res , next) => {
    const {refresh_token }   = req.headers
    if(!refresh_token || refresh_token ==''){
        return res.status(401).json({err: {message: 'No tokens are sent to the server'}})
    }
    const deleteRefreshToken = await RefreshToken.findOneAndRemove({refreshToken : refresh_token })
    if(deleteRefreshToken){
         return res.status(200).json({success: true})
    }
    return res.status(500).json({err: {message: 'An unknown error'}})
}

const signUp = async (req, res , next) => {
    const {firstName, lastName  , dateOfBirth, email , password , phoneNumber} = req.body
    //check email and phone number exist
    const checkClient = await Client.findOne({
        $or: [{email: email}, {phoneNumber: phoneNumber}]
    })

    if (checkClient) return res.status(401).json({error: {message: "Email or phone number already exists"}})

    const newClient = new Client({  firstName ,
                                    lastName ,
                                    dateOfBirth,
                                    email,
                                    password: await bcrypt.hash(password , 10),
                                    phoneNumber
                                    })

    newClient.save()
    .then(()=>{
        return res.status(200).json({success: true})
    })
    .catch(err => {return res.status(500).json({ error:{message:"Error saving client"}})})
}

const signIn = async (req, res , next) => {
    const {email , password} = req.body
    const checkUser = await Client.findOne({ email: email})
    if(!checkUser) {
        return res.status(401).json({error: {message: 'email is incorrect'}})
    }
    const checkPassword = await bcrypt.compare(password, checkUser.password)
    if(!checkPassword){
        return res.status(401).json({error: {message: 'password is incorrect'}})
    }
    const accessToken = generateAccessToken(checkUser._id)
    const refreshToken = generateRefreshToken(checkUser._id)
    const newRefreshToken = new RefreshToken({refreshToken: refreshToken})
    newRefreshToken.save()
        .then(() =>{
            return res.status(200).json({accessToken , refreshToken})
        })
        .catch(error =>{
            return res.status(500).json({err: {message: error.message}})
        })
}

export {refreshToken ,signOut , signUp , signIn}