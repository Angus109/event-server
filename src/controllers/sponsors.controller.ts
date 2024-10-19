
import { ValidateSponsors, sponsorModel } from "../models/sponsors.model";



export const createSponsor = async(req: any, res: any, next:any )=>{
   try{
    const {error} = ValidateSponsors(req.body)
    if(error) return res.json({
        success: false,
        error: error.details[0].message
    })

    const sponsor = new sponsorModel(req.body)
    const saveSponsor = await sponsor.save()

    res.json({
        success: true,
        result: saveSponsor
    })
        


        

   }catch(err){
    res.status(501).send({
        succes: false,
        error:err
    })
   }
}


export const getSponsorsAll = async(req: any, res: any, next:any)=> {
    try{

        const sponsors =  await sponsorModel.find()


        res.json({
            success:true,
            result: sponsors
         
        })

    }catch(err){
        res.status(501).send({
            success: false,
            error: err
        })
    }
}


export const updateSponsor = async (req:any, res: any, next:any) =>{
      if(!req.body.id){
       return  res.status(403).send({
            success: false,
            message: "sponsor id required"
      })
      }

    
    try{
    

    
        const updateSponsor = await sponsorModel.findByIdAndUpdate(
            req.body.id,
             req.body,
             {
                new: true,
                runValidators: true,
                useFindAndModify: false,
              }
        )

        if(updateSponsor){
            res.json({
                success: true,
                message: "sponsor updated successfully!",
                result: updateSponsor
            })
        }else{
            res.status(404).send({
                success: false,
                message : "sponsor not found"
            })
        }
       
        


        
    }catch(err){
        res.status(501).send({
            success: false,
            error: err
        })
    }
}



export const deleteSponsor= async(req: any, res:any, next:any)=>{
    if(!req.query.id){
        return  res.status(403).send({
             success: false,
             message: "Sponsor id required"
       })
       }
   try{

    const deleteTicket = await sponsorModel.findByIdAndDelete(req.query.id)
    if(deleteTicket){
        res.json({
            sucesss: true,
            message:"deleted successfully"
        })
    }else{
        res.json({
            success: false,
            message: "sponsor not found"
        })
    }

    



   }catch(err){
    res.status(501).send({
        succes: false,
        error: err
    })
   }



}