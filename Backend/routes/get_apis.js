const express = require('express')
const router = express.Router();
const authController = require('../controllers/get_apis')

router.get('/token', authController.findToken)



router.get('/verify/:token',authController.verify)


router.get('/username/:token',authController.User)


router.get('/user',authController.getUser)

router.get('/getnews',authController.getFromNewsApi)



module.exports=router