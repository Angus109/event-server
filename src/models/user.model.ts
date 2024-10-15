import mongoose from 'mongoose'
import joi from 'joi-browser'


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
 
   
}, {timestamps:true})

 export function ValidateUser (user:any){
    const schema = {
        name:joi.string().required(),
        password:joi.string().min(5).required(),
        email:joi.string().email().required()
    }

    return joi.validate(user, schema)

}
export const UserModel = mongoose.model('user', userSchema)

// export {ValidateUser as ValidateUser};

