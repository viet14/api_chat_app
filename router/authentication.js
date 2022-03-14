import Router from "express-promise-router"
import {signOut , signUp , signIn} from "../controller/authentication.js"
import {validatorBody} from "../validator/index.js"
import { schemas } from "../validator/authentication.js"

const authRouter = Router()

authRouter.route('/signUp')
    .post(validatorBody(schemas.signUp) ,signUp)


export default authRouter