import express from "express"
import morgan from "morgan"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import 'dotenv/config'
import fileUpload from 'express-fileupload'
import http from 'http'
import {Server} from 'socket.io'

//Route
import authRouter from "./router/authentication.js"
import userRouter from "./router/user.js"

const app = express()
const server = http.createServer(app)
//file upload
app.use(fileUpload())

//Mongo db connection
mongoose.connect('mongodb://localhost/ChatApp')
    .then(()=>{console.log('connection successfully')})
    .catch(err => {console.log(err)})
//Morgan
app.use(morgan('dev'))

//BodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

//Socket.io

const io = new Server(server)

io.on('connection',client =>{
    console.log(client)
})

//Router

app.use('/auth', authRouter)
app.use('/user', userRouter)

//Cath 404 error 

app.use((req , res , next)=>{
    const err = new Error('Not Found')
    err.status = 404 
    next(err)
})

//Error handler

app.use((err , req , res , next)=>{
    const error = app.get('env') === 'development' ? err : {}
    const status = err.status || 500
    return res.status(status).json({
        error: {
            message: error.message
        }
    })
})

server.listen(3000, ()=>{
    console.log('Listen on port 3000')
})