import express from 'express'
import { Register, Login, Logout } from '../controllers/auth.js'
import  verifyToken from "../middlewares/verifyTokenMiddleware.js"

const router = express.Router()

router.post('/register', Register)

router.post('/login', Login)

router.post('/logout',verifyToken, Logout)

export default router;
