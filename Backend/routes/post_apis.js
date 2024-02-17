const express = require('express')
const router = express.Router();
const authController = require('../controllers/post_apis')

router.post('/login',authController.Login)
router.post('/register',authController.Register)
router.post('/forget',authController.ForgetPassword)
router.put('/changePass',authController.changePassword)
router.post('/logout',authController.Logout)
router.post('/chat',authController.getGPTresponse)

module.exports=router