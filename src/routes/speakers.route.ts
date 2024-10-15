import express from 'express'
const router = express.Router()
import auth from '../middlewares/auth'
import { createSpeakers, updateSpeakers, deleteSpeaker, getSpeakersAll} from '../controllers/speakers.controller'
import { createSponsor } from '../controllers/sponsors.controller'

 router.post('/', auth, createSponsor )
 router.put('/action', auth, updateSpeakers)
 router.delete('/action', auth, deleteSpeaker)
 router.get('/', auth, getSpeakersAll)

 

 export default router