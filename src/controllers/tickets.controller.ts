
import { ValidateTickets, TicketModel} from "../models/ticketss.model";



export const createTicket = async(req: any, res: any, next:any )=>{
   try{
    const {error} = ValidateTickets(req.body)
    if(error) return res.json({
        success: false,
        error: error.details[0].message
    })

    const ticket = new TicketModel(req.body)
    const saveticket = await ticket.save()

    res.status(200).send({
        success: true,
        result: saveticket
    })
        


        

   }catch(err){
    res.status(501).send({
        succes: false,
        error:err
    })
   }
}


export const getTicketsAll = async(req: any, res: any, next:any)=> {
    try{

        const tickets =  await TicketModel.find()


        res.json({
            success:true,
            result: tickets
         
        })

    }catch(err){
        res.status(501).send({
            success: false,
            error: err
        })
    }
}


export const updateTicket = async (req:any, res: any, next:any) =>{
      if(!req.body.id){
       return  res.status(403).send({
            success: false,
            message: "spaeker id required"
      })
      }

    
    try{
        const updateTicket = await TicketModel.findByIdAndUpdate(
            req.body.id,
             req.body,
             {
                new: true,
                runValidators: true,
                useFindAndModify: false,
              }
        )

        if(updateTicket){
            res.json({
                success: true,
                message: "ticket updated successfully!",
                result: updateTicket
            })
        }else{
            res.status(404).send({
                success: false,
                message : "Ticket not found"
            })
        }
       

    

        


        
    }catch(err){
        res.status(501).send({
            success: false,
            error: err
        })
    }
}



export const deleteTicket= async(req: any, res:any, next:any)=>{
    if(!req.query.id){
        return  res.status(403).send({
             success: false,
             message: "ticket id required"
       })
       }
   try{

    const deleteTicket = await TicketModel.findByIdAndDelete(req.query.id)
    if(deleteTicket){
        res.json({
            sucesss: true,
            message:"deleted successfully"
        })
    }else{
        res.json({
            success: false,
            message: "tickets not found"
        })
    }

    



   }catch(err){
    res.status(501).send({
        succes: false,
        error: err
    })
   }



}