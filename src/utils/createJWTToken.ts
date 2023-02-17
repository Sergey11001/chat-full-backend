import {TUser} from "../models/User";
import jwt from "jsonwebtoken";
import lodash from "lodash"

export default (user:TUser) => {
    return jwt.sign(
        {
            data: lodash.reduce(user, (result: any, value:any, key:any ) => {
                if(key!='password'){
                    result[key] = value
                }
                return result
            }, {})
        },
        process.env.JWT_KEY || "",
        {
            expiresIn: process.env.JWT_MAX_AGE,
            algorithm:"HS256"
        }
    )
}