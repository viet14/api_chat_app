import Router from "express-promise-router"
import {refreshToken , signOut , signUp , signIn} from "../controller/authentication.js"
import {validatorBody} from "../validator/index.js"
import { schemas } from "../validator/authentication.js"

const authRouter = Router()

authRouter.route('/refreshToken')
    .post(refreshToken)

authRouter.route('/signUp')
    .post(validatorBody(schemas.signUp) ,signUp)

authRouter.route('/signIn')
    .post(validatorBody(schemas.signIn) , signIn)

authRouter.route('/signOut')
    .post(signOut)

export default authRouter