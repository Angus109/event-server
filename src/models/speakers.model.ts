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
    },
    image: {
        type: String,
     
    },
    role: {
        type: String
    },
    company: {
        type: String
    },
    bio: {
        type: String
    }


}, {timestamps: true})


export function ValidateSpeakers (speakers: Speakers){
    const schema = {
        name:joi.string().required(),
        image: joi.string().required(),
        role: joi.string().required(),
        company: joi.String().required(),
        bio: joi.string().required()
    }

    return joi.validate(speakers, schema)

}

export const speakersModel = mongoose.model("speakers", schemaSpakers)
