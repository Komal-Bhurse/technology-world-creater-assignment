import express from 'express'
import {getAllUsers,getOneUser,addOneUser,updateOneUser,deleteOneUser} from '../controllers/user.js'

const router = express.Router()

router.get('/getall/:id',getAllUsers)

router.get('/:id',getOneUser)

router.post('/',addOneUser)

router.put('/:id',updateOneUser)

router.delete('/:id',deleteOneUser)

export default router;


