const express=require('express');
const { getAllUsers, registerController, loginController, getProfileLoggedinUser } = require('../controllers/userController');

const router=express.Router()

//get all users
router.get('/all-users',getAllUsers);

//create a user
router.post('/register',registerController);

//Login
router.post('/login',loginController);

//get loggedin user
router.get('/profile',getProfileLoggedinUser);

module.exports=router;