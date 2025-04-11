import express from 'express'
import { Register, Login, Logout } from '../controllers/auth.js'
import  veryfyToken from "../middlewares/verifyTokenMiddleware.js"

const router = express.Router()

router.post('/register', Register)

router.post('/login', Login)

router.post('/logout',veryfyToken, Logout)

export default router;
