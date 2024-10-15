import express from 'express'
const router = express.Router()
import auth from '../middlewares/auth'
import { createSpeakers, deleteSpeaker, getSpeakersAll, updateSpeakers } from '../controllers/speakers.controller'

 router.post('/', auth, createSpeakers)
 router.put('/action', auth, updateSpeakers)
 router.delete('/action', auth, deleteSpeaker)
 router.get('/', auth, getSpeakersAll)

 

 export default router