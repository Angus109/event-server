import express from 'express'
const router = express.Router()
import auth from '../middlewares/auth'
import { createSpeakers, updateSpeakers, deleteSpeaker, getSpeakersAll} from '../controllers/speakers.controller'


 router.post('/', auth, createSpeakers)
 router.put('/action', auth, updateSpeakers)
 router.delete('/action', auth, deleteSpeaker)
 router.get('/', getSpeakersAll)

 

 export default router