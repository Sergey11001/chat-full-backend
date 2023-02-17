import express from "express";
import {MessageModel} from "../models";

class MessageController {
    index(req: express.Request, res: express.Response) {
        const dialogId = req.query.dialog
        MessageModel.find({dialog: dialogId})
            .populate("dialog")
            .exec((err, messages) => {
                if (err) {
                    return res.status(404).json({
                        message: "Messages not found"
                    })
                }
                res.json(messages)
            })
    }

    // show(req: express.Request, res: express.Response) {
    //     const id: string = req.params.id
    //     UserModal.findById(id, (err: any, user: any) => {
    //             if (err) {
    //                 return res.status(404).json({
    //                     message: "Not found"
    //                 })
    //             }
    //             res.json(user)
    //         }
    //     )
    // }
    //
    // getMe() {
    //     //
    // }
    //
    //
    create(req: express.Request, res: express.Response) {
        const UserId = req.user?._id
        const postData = {
            text: req.body.text,
            user: UserId,
            dialog: req.body.dialog_id
        }
        const message = new MessageModel(postData)
        message.save((err, obj) => {
            if (err) return res.json(err);
            res.send(obj);
        })
    }

    delete(req: express.Request, res: express.Response) {
        const id: string = req.params.id
        MessageModel.findOneAndRemove({_id: id})
            .then(() => {
                res.json({
                    message: `Message deleted`
                })
            })
            .catch(() => {
                return res.status(404).json({
                    message: "Message not found"
                })
            })
    }
}

export default MessageController