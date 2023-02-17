import {loginValidation} from "../utils/validations";
import bodyParser from "body-parser";
import {checkAuth, updateLastSeen} from "../middleware";
import express from "express";
import {UserController, DialogController, MessageController} from "../controllers";


export default (app: express.Application) => {
    const User = new UserController()
    const Dialog = new DialogController()
    const Message = new MessageController()

    app.use(bodyParser.json())
    app.use(updateLastSeen)
    app.use(checkAuth)
    app.get('/user/me', User.getMe)
    app.get('/user/:id', User.show)
    app.post('/user/registration', User.create)
    app.post('/user/login', loginValidation, User.login)
    app.delete('/user/:id', User.delete)

    app.get("/dialogs", Dialog.index)
    app.post("/dialogs", Dialog.create)
    app.delete("/dialogs/:id", Dialog.delete)

    app.get("/messages", Message.index)
    app.post("/messages", Message.create)
    app.delete("/messages/:id", Message.delete)
}