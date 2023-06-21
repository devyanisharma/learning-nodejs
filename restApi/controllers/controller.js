const { userData } = require('../dao/datastore.js');
const userService = require('../services/service.js')

module.exports = {
    getAllUsersController: function (req, res, next) {
        const data = userService.getAllUserService();

        if (data.message == "success") {
            res.status(200).json({
                "message": "user fetched successfully",
                "user": data.user
            });
        } else if (data.message == "error") {
            res.status(204).json({
                "message": "No user found",              
            });
            console.log('user not found')
        }
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
                res.status(202).json({
                    "message": "user updated successfully",
                    "user": data.user
                });
            } else if (data.message == "error") {
                res.status(401).json({
                    "message": "forbidden request",
                });
            }
        } else {
            res.status(400).json({
                "message": "Incomplete request. All fields are mandatory for update",
            });
        }


    },

    partialDetailUpdateController: function(req,res,next){
        const originalUser = req.originalUser;
        console.log("partial update contrller");
        console.log(originalUser);
        const reqBody = req.body;
        const data= userService.partialDetailUpdateService(originalUser,reqBody);
        if(data.message =="success"){
            res.status(202).json({
                "message":"partial data updated successfully",
                "user":data.user
            })
        }else if(data.message=="error"){
            res.status(400).json({
                "message":"Bad request",
                "user":data.user
            })
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
                "message": "User not found",
                "id":data.id

            });
        }
    },

   

   

}
