import express from 'express'
const app = express()
import mongoose from 'mongoose'
import cors from 'cors'
import {CONFIG}  from './config/index'
import { config } from "dotenv";
import user from './routes/user.route'
import Admin from './routes/admin.route'
import Speakers from './routes/speakers.route'
import Sponsors from './routes/sponsors.route'
import Tickets from './routes/tickets.route'

config();

if(!process.env.JWT_SECRET){
    console.log('No Jwt key provided');
    process.exit(1)  
}



mongoose.connect(process.env.DATABASE_URL as string)
.then(()=>console.log('connection established'))
.catch(()=>console.log('Failed to establish connection'))

app.use(cors())
app.use(express.json())
app.use('/api/user', user)
app.use('/api/admin', Admin )
app.use("api/sponsor", Sponsors)
app.use("api/speaker", Speakers)
app.use("api/ticket", Tickets)


const PORT = process.env.PORT || 3500 || 4000

app.listen(PORT, ()=>console.log(`Listening to port ${PORT}`))
