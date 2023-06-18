const express = require('express')
const router = express.Router();

const userController = require('../controllers/controller.js')

router.get('/',userController.getAllUsersController);
router.post('/',userController.postUserController);
router.put('/:id',userController.updateUserDetailController);
router.delete('/:id',userController.deleteUserController);


module.exports = router;