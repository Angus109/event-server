import express from "express";
const router = express.Router()
import auth from '../middlewares/auth'
import { getUser, createUser, AuthUser } from "../controllers/user.controller";

router.post('/', createUser)

router.get('/',auth, getUser)
router.post('/login', AuthUser)
router.post('/', createUser)


export default router;