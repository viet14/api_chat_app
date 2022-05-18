import Router from "express-promise-router"
import userController from "../controller/user.js"
import { validatorQuery } from "../validator/index.js"
import { schemas } from "../validator/authentication.js"
import multer from "multer"

const userRouter = Router()


userRouter.route('/getUser')
    .get(validatorQuery(schemas.getUser),userController.getUser)
    
userRouter.route('/getUsers')
    .get(validatorQuery(schemas.getUser),userController.getUsersByName)

userRouter.route('/upload')
    .post(userController.setAvatar)

export default userRouter 