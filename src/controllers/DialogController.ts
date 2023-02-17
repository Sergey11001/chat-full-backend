import express from "express";
import {DialogModel, MessageModel} from "../models";
import {TUser} from "../models/User";


class DialogController {
    index(req: express.Request, res: express.Response) {
        // @ts-ignore
        const authorId = req.user._id
        DialogModel.find({author: authorId})
            .populate(["author", "partner"])
            .exec((err, dialogs) => {
                if (err) {
                    return res.status(404).json({
                        message: "Dialogs not found"
                    })
                }
                res.json(dialogs)
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
        const postData = {
            author: req.body.author,
            partner: req.body.partner
        }
        const dialog = new DialogModel(postData)
        dialog.save((err, dialogObj) => {
            if (err) return res.json(err);
            const message = new MessageModel({
                text:req.body.text,
                dialog:dialogObj._id,
                user:req.body.author
            })

            message.save()
                .then(() => {
                    res.json({
                        dialog:dialogObj
                    })
                })
                .catch(err => {
                    res.json(err)
                })
        })
    }

    delete(req: express.Request, res: express.Response) {
        const id: string = req.params.id
        DialogModel.findOneAndRemove({_id: id})
            .then((dialog) => {
                res.json({
                    message: `Dialog deleted`
                })
            })
            .catch(() => {
                return res.status(404).json({
                    message: "dialog not found"
                })
            })
    }
}

export default DialogController