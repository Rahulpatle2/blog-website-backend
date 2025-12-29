import express from 'express'
import * as blogController from '../controllers/blogController.js'
import * as userAuth from '../middlewares/userAuth.js'

const router = express.Router();

router.get('/',blogController.getAllBlogController);
router.post('/create-blog',userAuth.VerifiedUser,blogController.createBlogController);
router.patch('/:id',userAuth.VerifiedUser,userAuth.isOwner,blogController.updateBlogController);
router.delete('/:id',userAuth.VerifiedUser,userAuth.isOwner,blogController.deleteBlogController);


export default router
