import mongoose, {Schema} from "mongoose";

export type TDialog = {
    author:{
        type:Schema.Types.ObjectId,
        ref:string,
        required:boolean
    },
    partner:{
        type:Schema.Types.ObjectId,
        ref:string,
        required:boolean
    },
    lastMessage: {
        type:Schema.Types.ObjectId,
        ref: string
    }
}

const DialogSchema = new Schema({
    author: {
        type:Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    partner: {
        type:Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    lastMessage: {
        type:Schema.Types.ObjectId,
        ref: 'Message'
    }
},{
    timestamps:true
})

const DialogModel = mongoose.model<TDialog>("Dialog", DialogSchema)

export default DialogModel