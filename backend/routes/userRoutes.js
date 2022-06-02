import express from "express";

const router = express.Router();

import {authUser,registerUser, getUserProfile} from '../controllers/userController.js';
import {protect} from '../middleware/authMiddleWare.js';


router.route('/').post(registerUser);// 'It's not protected so we dont have to add the protect middleware.

//wer're only gonna be making post request to user login
router.post('/login', authUser);

//route for getting the user profile
router
  .route('/profile')
  .get(protect, getUserProfile) ;//to use the middleware, we just add it as an argument into the route funciton.
export default router;