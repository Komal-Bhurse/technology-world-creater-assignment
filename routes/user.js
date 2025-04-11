import express from 'express'
import {getAllUsers,getOneUser,addOneUser,updateOneUser,deleteOneUser} from '../controllers/user.js'
import  veryfyToken  from "../middlewares/verifyTokenMiddleware.js"
import  authorizedRole  from "../middlewares/roleMiddleware.js"

const router = express.Router()

router.get('/getall', veryfyToken,authorizedRole("SCP"),getAllUsers)

router.get('/:id',veryfyToken,authorizedRole("SCP"),getOneUser)

router.post('/',veryfyToken,authorizedRole("SCP"),addOneUser)

router.put('/:id',veryfyToken,authorizedRole("SCP"),updateOneUser)

router.delete('/:id',veryfyToken,authorizedRole("SCP"),deleteOneUser)

export default router;


