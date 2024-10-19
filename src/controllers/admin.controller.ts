import { ValidateAdmin, AdminModel } from "../models/admin.model";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import joi from 'joi-browser'
import { CONFIG } from "../config";

const config = CONFIG()

export const createAdmin = async (req:any, res:any, next:any)=>{
    const {error} = ValidateAdmin(req.body)
    if(error) return res.status(400).send({
        success:false,
        message: error.details[0].message
    })

   
    try{
        const findAdmin = await AdminModel.findOne({email:req.body.email})
        if (findAdmin) return res.status(401).send({
            success: false,
            message: 'Email has been taken'
        })

        if(req.body.code !== "group_eight") return res.status(403).send({
            succes: false,
            messge: "invalid invitation code"
         })   

      
        const newAdmin = new AdminModel ({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
        })
        
        const salt = await bcrypt.genSalt(10)
        newAdmin.password = await bcrypt.hash(newAdmin.password, salt)
        // console.log(newAdmin);
        
        const saveUser = await newAdmin.save()
        res.json({
            status:'success',
            message:'Admin created successfully',
            result: saveUser
        })
        

       
       
    }catch(ex){
        res.status(500).send({
            succes: false,
            error: ex
        })
    }

    
}


export const AuthAdmin = async (req:any, res:any, next:any)=>{
    const {error} = Validate(req.body)
    if(error) return res.status(400).send({
        success: false,
        message: error.details[0].message
    })


    try{
        const checkAdmin = await AdminModel.findOne({email:req.body.email})
        if(!checkAdmin) return res.status(401).send({
            success: false,
            message: 'Admin not found'
        })

        const checkPwd = await bcrypt.compare(req.body.password, checkAdmin.password)
        if(!checkPwd) return res.status(401).send({
            success: false,
            message: 'Invalid password'
        })
 
 
        const token= jwt.sign({...checkAdmin}, `${process.env.JWT_SECRET}`)

        res.json({
            success: true,
            message:'Login successful',
            result: checkAdmin,
            token,
           
        })
   
      
    }catch(ex){
        res.status(501).send({
            success:false,
            error: ex
        })
    }
}

export const getAdmin = async (req:any, res:any, next:any)=>{
    try{      
        const admin = await AdminModel.findById(req.user._doc._id)
        admin.password=""
        res.json({
            success: true,
            result:admin
        })
    }catch(error){
        res.status(403).send({
            success:false,
            error:error
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
