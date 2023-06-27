const { userData, userDetail } = require('../dao/datastore.js');
const userService = require('../services/service.js')
const path = require('path');
const os=require('os');  
console.log("os.freemem(): \n",os.freemem());  
console.log("os.homedir(): \n",os.homedir());  
console.log("os.hostname(): \n",os.hostname());  
console.log("os.endianness(): \n",os.endianness());  
console.log("os.loadavg(): \n",os.loadavg());  
console.log("os.platform(): \n",os.platform());  
console.log("os.release(): \n",os.release());  
console.log("os.tmpdir(): \n",os.tmpdir());  
console.log("os.totalmem(): \n",os.totalmem());  
console.log("os.type(): \n",os.type());  
console.log("os.uptime(): \n",os.uptime());  
console.log("os")
console.log(os.arch)


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

    partialDetailUpdateController: function (req, res, next) {
        const originalUser = req.originalUser;
        console.log("partial update contrller");
        console.log(originalUser);
        const reqBody = req.body;
        const data = userService.partialDetailUpdateService(originalUser, reqBody);
        if (data.message == "success") {
            res.status(202).json({
                "message": "partial data updated successfully",
                "user": data.user
            })
        } else if (data.message == "error") {
            res.status(400).json({
                "message": "Bad request",
                "user": data.user
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
                "id": data.id

            });
        }
    },

    postProfileDetailsController: function (req, res, next) {
        console.log('post method controller')
        const userId = req.params.id;
        const files = req.files;
        let data ;
        let filesObject=new Object();
        Object.assign(filesObject, files);
        console.log(filesObject);
        
        if ((filesObject.hasOwnProperty('image')) && (filesObject.hasOwnProperty('images')) && (filesObject.hasOwnProperty('resume'))) {
           data = userService.uploadUserImageService(userId, filesObject);
        } else {
            res.status(401).json({
                "message": "All fields are mandatory",

            });
        }
        if (data.message == "success") {
            res.status(200).json({
                "message": "user image uploaded successfully",
                "user": data.user
            });

        } else if (data.message == "error") {
            res.status(401).json({
                "message": "some error occured",
                "user": data.id

            });
        }

    },

    getImgController:function(req,res,next){
        const userId= req.query.id;
        const data = userService.getImgService(userId)
        res.setHeader('Content-Type', 'image/jpeg');
       

        if (data.message == "success") {
            res.sendFile(path.dirname(__dirname) + "/uploads/" + data.fileName,(err) => {
                if (err) {
                    throw err;
                }
                console.log("Success")
            });
    
        } else if (data.message == "error") {
            res.status(401).json({
                "message": "some error occured",
                
    
            });
        }


    },

    getResumeController: function(req,res,next){
        const userId= req.query.id;
        const data = userService.dowloadResumeService(userId)
        res.set('Content-Type', 'application/pdf');
        if (data.message == "success") {
            res.download(path.dirname(__dirname) + "/uploads/" + data.fileName, (err) => {
                if (err) {
                    throw err;
                }
                console.log(err);
                res.status(200).json({
                    "message": "pdf downloaded",
                    
        
                }); 
            })
    
        } else if (data.message == "error") {
            res.status(401).json({
                "message": "some error occured",
                
    
            });
        }


    }
    




}
