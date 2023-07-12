const express = require('express')
const router = express.Router();

const userController = require('../controllers/controller.js')
const validationMiddleware = require('../middleware/validationMiddleware.js')

router.post('/register',validationMiddleware.registerValidation,userController.registerUser);
router.post('/login',userController.loginController);
router.post('/logout',validationMiddleware.cookieValidation,userController.logoutController);
router.get('/',validationMiddleware.cookieValidation,userController.getAllUsersController);
router.post('/',validationMiddleware.cookieValidation,userController.postUserController);
router.put('/:id',validationMiddleware.cookieValidation,userController.updateUserDetailController);
router.delete('/:id',validationMiddleware.cookieValidation,userController.deleteUserController);
router.patch('/:id',validationMiddleware.cookieValidation,validationMiddleware.patchValidationMiddleware,userController.partialDetailUpdateController);
const upload = validationMiddleware.configureMulterMiddleware();
router.post('/userProfile/:id',validationMiddleware.cookieValidation,validationMiddleware.imageValidationMiddleware, upload, userController.postProfileDetailsController);
router.get('/getImg',validationMiddleware.cookieValidation,userController.getImgController)
router.get('/getResume',validationMiddleware.cookieValidation,userController.getResumeController)


module.exports = router;

