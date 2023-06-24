const express = require('express')
const router = express.Router();

const userController = require('../controllers/controller.js')
const validationMiddleware = require('../middleware/validationMiddleware.js')

router.get('/',userController.getAllUsersController);
router.post('/',userController.postUserController);
router.put('/:id',userController.updateUserDetailController);
router.delete('/:id',userController.deleteUserController);
router.patch('/:id',validationMiddleware.patchValidationMiddleware,userController.partialDetailUpdateController);
router.post('/userImage/:id',validationMiddleware.imageValidationMiddleware,userController.updateUserDetailController);

module.exports = router;