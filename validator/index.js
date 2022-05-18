const validatorBody  =  (schema) => {
    return (req , res , next) => {
        const isValid = schema.validate(req.body);
        if(isValid.error) {
            return res.status(400).json({error :{message : isValid.error.message}})
        }else{
            next()
        }
    }
}

const validatorQuery  =  (schema) => {
    return (req , res , next) => {
        const isValid = schema.validate(req.query);
        if(isValid.error) {
            return res.status(400).json({error :{message : isValid.error.message}})
        }else{
            next()
        }
    }
}


export {validatorBody , validatorQuery}