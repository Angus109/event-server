import mongoose from "mongoose";
import joi from 'joi-browser'

interface tikets {
    name: string,
    email: string,
    type: string
}



const ticketShema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    type: {
       type: String,
       enum:["VIP", "Regular", "Early Birds"],
       default: "Regular"
    },

}, {timestamps: true})


export function ValidateTickets (tikets:tikets){
    const schema = {
        name:joi.string().required(),
        email:joi.string().email().required()
    }

    return joi.validate(tikets, schema)

}
export const TicketModel = mongoose.model('tickets', ticketShema)
