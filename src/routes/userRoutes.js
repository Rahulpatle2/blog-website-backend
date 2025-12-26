import express from 'express'
import * as userController from '../controllers/userController.js'
import * as userAuth from '../middlewares/userAuth.js'

const router = express.Router()

router.post('/register',userController.userRegisterController);
router.post('/login',userController.userLoginController)
router.get('/me',userAuth.VerifiedUser,userController.getUserController);

export default router