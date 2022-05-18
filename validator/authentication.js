import Joi from "joi"


const schemas = {
    getUser: Joi.object().keys({
        q : Joi.string().min(5).required()
    }),
    setAvatar: Joi.object().keys({

    }),
    signUp: Joi.object().keys({
        firstName : Joi.string().min(3).max(15).required(),
        lastName : Joi.string().min(3).max(15).required(),
        dateOfBirth : Joi.date().raw().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        phoneNumber: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    }) ,
    signIn: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    }) , 
}

export {schemas}