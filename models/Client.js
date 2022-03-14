import mongoose from "mongoose"

const Schema = mongoose.Schema

const clientSchema = new Schema({
    firstName : {
        type: String,
        required: true,
    } ,
    lastName: { 
        type :String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    email: {
        type :String,
        required: true,
        unique: true,
    },
    phoneNumber:{
        type :String,
        required: true,
        unique : true,
    },
    password: {
        type :String,
        required: true,
    },
    created_at: {
        type :Date,
        default: Date.now(),
    },
    updated_at: {
        type :Date,
        default: null
    }
})

const Client = mongoose.model('Client' , clientSchema)

export default Client