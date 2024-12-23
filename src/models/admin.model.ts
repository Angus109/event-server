import mongoose from 'mongoose'
import joi from 'joi-browser'

const adminSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {timestamps:true})

export function ValidateAdmin (user:any){
    const schema = {
        name:joi.string().required(),
        password:joi.string().min(5).required(),
        email:joi.string().email().required(),
        code: joi.string().required(),
    }

    return joi.validate(user, schema)

}
export const AdminModel = mongoose.model('admin', adminSchema)
