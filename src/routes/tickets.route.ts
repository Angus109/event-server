import express from 'express'
const router = express.Router()
import auth from '../middlewares/auth'

import { createTicket, updateTicket, deleteTicket,getTicketsAll } from '../controllers/tickets.controller'
 router.post('/',  createTicket)
 router.put('/action', auth, updateTicket)
 router.delete('/action', auth, deleteTicket)
 router.get('/', auth, getTicketsAll)

 

 export default router