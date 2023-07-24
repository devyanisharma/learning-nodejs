const express = require('express')
const router = express.Router();
const passport = require('../middleware/passport-config')

const userController = require('../controllers/controller.js')
const authenticateMiddleware = require('../middleware/authenticate.js')

router.get('/home',userController.home)
router.get('/login', (req,res,next)=>{res.render('login')});
router.get('/register',(req,res,next)=>{res.render('register')});
router.post('/register',authenticateMiddleware.userExists,userController.register)
router.post('/login',  passport.authenticate('local', {failureRedirect:'login'}),userController.login)
router.get('/logout',  passport.authenticate('local', {failureRedirect:'login'}),userController.logoutController)

module.exports = router;