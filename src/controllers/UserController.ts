import express from "express";
import bcrypt from "bcrypt";
import {validationResult} from "express-validator";

import {UserModel} from "../models";
import {createJWTToken} from "../utils";
import {TUser} from "../models/User";

class UserController {
    show(req: express.Request, res: express.Response) {
        const id: string = req.params.id
        UserModel.findById(id, (err: Error, user: TUser) => {
                if (err) {
                    return res.status(404).json({
                        message: "User not found"
                    })
                }
                res.json(user)
            }
        )
    }

    login(req: express.Request, res: express.Response) {
        const postData = {
            email: req.body.email,
            password: req.body.password,
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array()
            })
        }
        UserModel.findOne<TUser>({email: postData.email})
            .then((user) => {
                if (user) {
                    if (bcrypt.compareSync(postData.password, user.password)) {
                        const token = createJWTToken(user)
                        res.json({
                            status: "success",
                            token
                        })
                    } else {
                        res.json({
                            status: "error",
                            message: "Incorrect password or email"
                        })
                    }
                }
                else throw Error
            })
            .catch(() => {
                return res.status(404).json({
                    message: "User not found"
                })
            })
    }

    getMe(req: express.Request, res: express.Response){
        const id = req.user?._id
        UserModel.findById(id, (err: Error, user: TUser) => {
                if (err) {
                    return res.status(404).json({
                        message: "User not found"
                    })
                }
                res.json(user)
            }
        )
    }


    create(req: express.Request, res: express.Response) {
        const postData = {
            email: req.body.email,
            fullname: req.body.fullname,
            password: req.body.password,
        }
        const user = new UserModel(postData)
        user.save((err) => {
            if (err) return res.json(err);
            res.send("User created");
        })
    }

    delete(req: express.Request, res: express.Response) {
        const id: string = req.params.id
        UserModel.findOneAndRemove({_id: id})
            .then((user) => {
                res.json({
                    message: `User ${user?.fullname} deleted`
                })
            })
            .catch(() => {
                return res.status(404).json({
                    message: "User not found"
                })
            })
    }
}

export default UserController