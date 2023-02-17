import express from "express";
import{verifyJWTToken} from "../utils";


export default (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if(req.path==='/user/login' || req.path==='/user/registration'){
        return next()
    }
    const token = req.headers['token'] as string

    verifyJWTToken(token)
        .then((user:any) => {
            req.user = user.data._doc
            next()
        })
        .catch(() => {
            res.status(403).json("Invalid auth token provided")
        })
}