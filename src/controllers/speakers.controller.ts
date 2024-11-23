
import { ValidateSpeakers, speakersModel} from "../models/speakers.model"


export const createSpeakers = async(req: any, res: any, next:any )=>{
   try{
    const {error} = ValidateSpeakers(req.body)
    if(error) return res.json({
        success: false,
        error: error.details[0].message
    })

    const speakers = new speakersModel (req.body)
    const saveSpeaker = await speakers.save()

    res.json({
        success: true,
        result: saveSpeaker
    })
        


        

   }catch(err){
    res.status(501).send({
        succes: false,
        error:err
    })
   }
}


export const getSpeakersAll = async(req: any, res: any, next:any)=> {
    try{

        const speakers =  await speakersModel.find()


        res.json({
            success:true,
            result: speakers
         
        })

    }catch(err){
        res.status(501).send({
            success: false,
            error: err
        })
    }
}


export const updateSpeakers = async (req:any, res: any, next:any) =>{
      if(!req.body.id){
       return  res.status(403).send({
            success: false,
            message: "spaeker id required"
      })
      }

    
    try{

        const updateSpeaker = await speakersModel.findByIdAndUpdate(
            req.body.id,
             req.body,
             {
                new: true,
                runValidators: true,
                useFindAndModify: false,
              }
        )

        if(updateSpeaker){
            res.json({
                success: true,
                message: "speakers updated succesfully!",
                result: updateSpeaker
            })
        }else{
            res.status(404).send({
                success: false,
                message : "speaker not found"
            })
        }
       


        
    }catch(err){
        res.status(501)({
            success: false,
            error: err
        })
    }
}



export const deleteSpeaker= async(req: any, res:any, next:any)=>{
    if(!req.query.id){
        return  res.status(403).send({
             success: false,
             message: "spaeker id required"
       })
       }
   try{

    const deleteSpeaker = await speakersModel.findByIdAndDelete(req.query.id)
    if(deleteSpeaker){
        res.json({
            sucesss: true,
            message:"deleted successfully"
        })
    }else{
        res.json({
            success: false,
            message: "speaker not found"
        })
    }

    



   }catch(err){
    res.status(501).send({
        succes: false,
        error: err
    })
   }



}