const express = require('express')
const router = express.Router();

const userController = require('../controllers/controller.js')
const validationMiddleware = require('../middleware/validationMiddleware.js')


router.post('/register',validationMiddleware.registerValidation,userController.registerUser);
router.post('/login',userController.loginController);
router.use(validationMiddleware.authenticate)
router.post('/logout',userController.logoutController);
router.get('/',userController.getAllUsersController);
router.post('/',userController.postUserController);
router.put('/:id',userController.updateUserDetailController);
router.delete('/:id',userController.deleteUserController);
router.patch('/:id',validationMiddleware.patchValidationMiddleware,userController.partialDetailUpdateController);
const upload = validationMiddleware.configureMulterMiddleware();
router.post('/userProfile/:id',validationMiddleware.imageValidationMiddleware, upload, userController.postProfileDetailsController);
router.get('/getImg',userController.getImgController)
router.get('/getResume',userController.getResumeController)


module.exports = router;

