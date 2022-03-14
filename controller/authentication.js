import Client from "../models/Client.js"
import bcrypt from "bcrypt"

const signOut = async (req, res , next) => {
    
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
    
}



export {signOut , signUp , signIn}