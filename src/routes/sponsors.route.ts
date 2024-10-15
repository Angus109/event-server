import express from 'express'
const router = express.Router()
import auth from '../middlewares/auth'
import { createSponsor, updateSponsor, deleteSponsor , getSponsorsAll} from '../controllers/sponsors.controller'

 router.post('/', auth, createSponsor )
 router.put('/action', auth, updateSponsor)
 router.delete('/action', auth, deleteSponsor)
 router.get('/', auth, getSponsorsAll)

 

 export default router