import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

//ultimately we want to send back a token that we can save on the client and we can use that token to access protected routes later.
const authUser = asyncHandler(async (req, res) => {
     const { email, password } = req.body
   
     const user = await User.findOne({ email })
   
     if (user && (await user.matchPassword(password))) {
       res.json({
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
         token: generateToken(user._id),
       })
     } else {
       res.status(401)
       throw new Error('Invalid email or password')
     }
   })


  const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if(userExists)
  {
    console.error(404);
    throw new Error("User Already Exists");
  }

  const newUser = await User.create({
    name,
    email,
    password
  })

  if(newUser)
  {
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: generateToken(newUser._id)  
    }) //status 201 means something was created.

  }
  else
  {
    res.status(400)
    throw new Error('Invalid User Data')
  }
})




const getUserProfile = asyncHandler(async (req, res) => {
     const user = await User.findById(req.user._id)
   
     if (user) {
       res.json({
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
       })
     } else {
       res.status(404)
       throw new Error('User not found')
     }
   });

export {authUser, getUserProfile, registerUser};