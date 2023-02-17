import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import {TUser} from "../models/User";
dotenv.config()

export default (token:string) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_KEY || "", (err, decodedData) => {
            if(err || !decodedData){
                return reject(err)
            }
            resolve(decodedData)
        })
    })
}