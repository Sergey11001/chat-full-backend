import mongoose, {Schema} from "mongoose";

export type TMessage = {
    text: {
        type: string,
        required: boolean
    },
    dialog:{
        type:Schema.Types.ObjectId,
        ref:string,
        required:boolean
    },
    unread:boolean
}

const MessageSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    dialog:{
        type:Schema.Types.ObjectId,
        ref:"Dialog",
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    unread: {
        type:Boolean,
        default:false
    }

},{
    timestamps:true
})

const MessageModel = mongoose.model<TMessage>("Message", MessageSchema)

export default MessageModel