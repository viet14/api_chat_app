import Client from "../models/Client.js"
import mongoose from "mongoose";
import 'firebase/storage'
import {upload} from '../firebase/index.js';
import {v4 as uuid} from "uuid"

// const storage = db.storage().ref()

const userController = {
    getUser : async(req, res, next) =>{
        const query = req.query.q
        var objId = new mongoose.Types.ObjectId( (query.length <= 12) ? "123456789012" : query );
        try {
            const user = await Client.findOne({
                $or: [
                    {email: query},
                    {phoneNumber : query},
                    {_id : objId}
                ]
            })
            return res.status(200).json({
                firstName : user.firstName,
                lastName : user.lastName,
                dateOfBirth: user.dateOfBirth,
                email : user.email, 
                phoneNumber : user.phoneNumber,
            });
        } catch (error) {
            console.log(error);
            return res.status(400).json({err:{message: "This user not found"}})
        }
    },
    getUsersByName : async(req, res) => {
        const keyword = req.query.q
        try {
            const users = await Client.find(
                {   fistName    : {$regex: query , $options: 'i'} ,  
                    lastName    : {$regex: query , $options: 'i'}
                } , {password : 0 , created_at : 0 , updated_at : 0}
            )
            return req.status(200).json({...users})
        } catch (error) {
            return req.status(400).json({err : {message: error.message}})
        }
    }, 
    setAvatar: async(req, res , next) => {
        const file = req.files.file
        const type = file.name.split('.')[1]
        const nameFile  = `${uuid()}.${type}`
        try {
            return res.status(200).json({success:{file: upload('./public/2.jpg' , nameFile) }})
        } catch (error) {
            
        }
    }
}

export default userController