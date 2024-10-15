
import { ValidateUser, UserModel } from "../models/user.model";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import joi from 'joi-browser'
import { CONFIG } from "../config";
const config = CONFIG()

export const createUser = async (req:any, res:any, next:any)=>{
    const {error} = ValidateUser(req.body)
    if(error) return res.status(400).send(error.details[0].message)

   
    try{
        const findUser = await UserModel.findOne({email:req.body.email})
        if (findUser) return res.status(401).send('Email has been taken')

      
        const newUser = new UserModel ({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
        })
        
        const salt = await bcrypt.genSalt(10)
        newUser.password = await bcrypt.hash(newUser.password, salt)

        const saveUser = await newUser.save()
        res.json({
            success: true,
            message:'user created successfully',
            data: saveUser
        })
        

       
       
    }catch(err){
        res.json({
            success: false,
            error: err
        })
    }

    
}


export const AuthUser = async (req:any, res:any, next:any)=>{
    const {error} = Validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)


    try{
        const findUser = await UserModel.findOne({email:req.body.email})
        if(!findUser) return res.status(401).send('user not found')

        const checkPwd = await bcrypt.compare(req.body.password, findUser.password)
        if(!checkPwd) return res.status(401).send('Invalid password')
 
        const token= jwt.sign({...findUser}, `${process.env.JWT_SECRET}`)

        res.json({
            success: true,
            message:'Login successful',
            data: findUser,
            token,
           
        })
      
    }catch(err){
        res.json({
            success:false,
            error: err
        })


    }
}




export const getUser = async (req:any, res:any, next:any)=>{
    try{      
        const user = await UserModel.findById(req.user._doc._id)
        user.password=""
        res.json({
            status:'success',
            data:user
        })
    }catch(error){
        res.json({
            status: false,
            error: error
        })
    }
}

export const getUserAll= async (req:any, res:any, next:any) => {
    try{
        const users = await UserModel.find()
        res.json({
            succes: true,
            result: users
        })
    }catch(err){
        res.json({
            success: true,
            error: err,
        })
    }
}

function Validate (user:any){
    const schema = {
        email:joi.string().required(),
        password:joi.string().required()
    }
    return joi.validate(user, schema)
}
