import mongoose from "mongoose";
import joi from 'joi-browser'


interface Sponsors{
    name: string,
    logo: string,
    tier: string

}


const schemaSponsors = new mongoose.Schema({
    name: String,
    logo: String,
    tier: String,
   


}, {timestamps: true})


export function ValidateSponsors (sponsors: Sponsors){
    const schema = {
        name:joi.string().required(),
        logo: joi.string().required(),
        tier: joi.string().required(),
     
    }

    return joi.validate(sponsors, schema)

}

export const sponsorModel = mongoose.model("sponsors", schemaSponsors)
