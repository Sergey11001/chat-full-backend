import {UserModel} from "../models";
import express from "express";

export default (req: express.Request, __: express.Response, next: express.NextFunction) => {
    const id = req.user?._id
    UserModel.findOneAndUpdate(
        {_id: id},
        {last_seen: new Date()},
        {new: true},
        ()=>{}
    )
    next()
}