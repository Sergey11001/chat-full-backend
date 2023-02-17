import bcrypt from "bcrypt";

export default (password: string = '') => {
    return new Promise<string>((resolve, reject) => {
        bcrypt.genSalt((err, salt) => {
            if (err) return reject(err)
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) return reject(err)
                resolve(hash)
            })
        })
    })
}