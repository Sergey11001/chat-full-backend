import {Server} from "socket.io"
import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import createRoutes from "./core/routes"


const app = express()
const http = require('http');
const server = http.createServer(app);
const io = new Server(server);

dotenv.config()

createRoutes(app)

mongoose.connect('mongodb://127.0.0.1:27017/chat');

io.on('connection', (socket) => {
    console.log('User connected');
});

server.listen(process.env.PORT, () => {
    console.log(`Server http://localhost:${process.env.PORT}`)
})