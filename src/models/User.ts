import mongoose, {Schema} from "mongoose";
import bcrypt, {hash} from "bcrypt"
import validator from "validator"
import {generateUserPassword} from "../utils";
export type TUser = {
    email:string,
    fullname:string,
    password:string,
    confirmed:boolean,
    avatar?:string,
    confirm_hash?:string,
    last_seen?: {
        type:string,
        default:Date
    },
    _id?:string
}

const UserSchema = new Schema({
    email: {
        type:String,
        required:"Email is required",
        validator:[validator.isEmail, "Invalid email"],
        index: {unique:true}
    },
    fullname:{
        type:String,
        required:"Fullname is required"
    },
    password:{
        type:String,
        required:"Password is required"
    },
    confirmed: {
        type:Boolean,
        default: false
    },
    avatar:String,
    confirm_hash:String,
    last_seen: {
        type:Date,
        default: new Date()
    }
},{
    timestamps:true
})

UserSchema.pre(  'save', function (next){
    const user = this

    if (!user?.isModified('password')) {
        return next()
    }
    generateUserPassword(user.password)
        .then((hash) => {
            user.password = hash
            next()
        })
        .catch(err => {
            next(err)
        })
})

const UserModel = mongoose.model<TUser>("User", UserSchema)

export default UserModel