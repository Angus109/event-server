import express from 'express'
const router = express.Router()
import auth from '../middlewares/auth'
import { createSpeakers, updateSpeakers, deleteSpeaker, getSpeakersAll} from '../controllers/speakers.controller'


 router.post('/', createSpeakers)
 router.put('/action', auth, updateSpeakers)
 router.delete('/action', auth, deleteSpeaker)
 router.get('/', auth, getSpeakersAll)

 

 export default router