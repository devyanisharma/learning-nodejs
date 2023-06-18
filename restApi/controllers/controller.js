const { userData } = require('../dao/datastore.js');
const userService = require('../services/service.js')

module.exports = {
    getAllUsersController: function (req, res, next) {
        const data = userService.getAllUserService();
        res.status(200).json(data);
    },

    postUserController: function (req, res, next) {
        const name = req.body.name;
        const age = req.body.age;
        const email = req.body.email;
        const data = userService.postUserService(name, age, email);
        if (data.message == "success") {
            res.status(201).json({
                "message": "user added successfully",
                "user": data.user
            });
        } else if (data.message == "error") {
            res.status(401).json({
                "message": "forbidden request",
            });
        }


    },

    updateUserDetailController: function (req, res, next) {
        if (req.body.hasOwnProperty("name") && req.body.hasOwnProperty("email") && req.body.hasOwnProperty("age")) {
            const id = req.params.id;
            const name = req.body.name;
            const age = req.body.age;
            const email = req.body.email;
            const data = userService.updateUserDetailService(id, name, age, email);
            if (data.message == "success") {
                res.status(201).json({
                    "message": "user updated successfully",
                    "user": data.user
                });
            } else if (data.message == "error") {
                res.status(401).json({
                    "message": "forbidden request",
                });
            }
        } else {
            res.status(401).json({
                "message": "Incomplete request. All fields are mandatory for update",
            });
        }


    },

    deleteUserController: function (req, res, next) {
        const id = req.params.id;
        const data = userService.deleteUserService(id);
        if (data.message == "success") {
            res.status(200).json({
                "message": "user deleted successfully",
                "user": data.user
            });
        } else if (data.message == "error") {
            res.status(401).json({
                "message": "forbidden request",
            });
        }
    }

}
