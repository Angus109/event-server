import mongoose from "mongoose";
import joi from 'joi-browser'


interface Speakers{
    name: string,
    image: string,
    role: string,
    company: string,
    bio: string

}


const schemaSpakers = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
     
    },
    role: {
        type: String,
        required: true
    },
    company: {
        type: String
    },
    bio: {
        type: String
    }


}, {timestamps: true})


export function ValidateSpeakers (speaker: any){
    const schema = {
        name:joi.string().required(),
        image: joi.string().required(),
        role: joi.string().required(),
        company: joi.string().required(),
        bio: joi.string().required()
    }

    return joi.validate(speaker, schema)

}

export const speakersModel = mongoose.model("speakers", schemaSpakers)
