//const { userData, userDetail } = require('../dao/datastore.js');
//const { userData, userDetail } = require('../dao/userDao.js');
//const userDao = require('../dao/userdao_mongo.js');
const userService = require('../services/service.js');
const path = require('path');



module.exports = {
    getAllUsersController: function (req, res, next) {
        (async () => {
            try {
                const data = await userService.getAllUserService();
                if (data.message == "success") {
                    res.status(200).json({
                        "message": "user fetched successfully",
                        "user": data.user
                    });
                } else if (data.message == "error2") {
                    console.log(data);
                    res.status(400).json({
                        "message": "no user found",
                        "user": data.user
                    });
                }
            } catch (error) {
                if (error.message == "error") {
                    res.status(401).json({
                        "message": "something went wrong. reject"
                    });
                    console.log(error)
                }
            }
        })().catch((err) => {
            res.status(401).json({
                "message": "something error occured"
            });
        });

        //    try {
        //         userService.getAllUserService().then((data) => {
        //             if (data.message == "success") {
        //                 res.status(200).json({
        //                     "message": "user fetched successfully",
        //                     "user": data.user
        //                 });
        //             }
        //         }).catch((error) => {
        //             if (error.message == "error") {
        //                 res.status(204).json({
        //                     "message": "No user found",
        //                 });
        //             }

        //         })
        //     } catch (error) {
        //         console.log(error);
        //     }
    },

    postUserController: function (req, res, next) {
        const name = req.body.name;
        const age = req.body.age;
        const email = req.body.email;
        if (name.length > 3 && age > 0 && email.includes('.') && email.includes('@')) {
            (async () => {
                //const userId = Math.floor(Math.random() * 101);
                try {
                    const data = await userService.postUserService(name, age, email);
                    if (data.message == "success") {
                        res.status(201).json({
                            "message": "user added successfully",
                            "user": data.user
                        });
                    }
                } catch (error) {
                    console.log(" reject - db error " + error);
                    return res.status(401).json(error);
                }
            })().catch((error) => {
                console.log("in async catch - " + error);
                return res.status(401).json({
                    "message": "something went wrong"
                });
            })
        } else {
            res.status(401).json({
                "message": "fields validation doesn't matched"
            });
        }
    },

    updateUserDetailController: function (req, res, next) {
        if (req.body.hasOwnProperty("name") && req.body.hasOwnProperty("email") && req.body.hasOwnProperty("age")) {
            const id = req.params.id;
            const name = req.body.name;
            const age = req.body.age;
            const email = req.body.email;
            console.log(id.constructor.name);
            (async () => {
                try {
                    const data = await userService.updateUserDetailService(Number.parseInt(id), name, age, email);
                    if (data.message == "success") {
                        return res.status(202).json({
                            "message": "user updated successfully",

                        });
                    }
                } catch (error) {
                    if (error.message == "error") {
                        return res.status(401).json({
                            "message": "forbidden request. db error",
                        });
                    }
                }

            })().catch((error) => {
                console.log("in async catch" + error)
                return res.status(401).json({
                    "message": "forbidden request",
                });
            })

        } else {
            return res.status(400).json({
                "message": "Incomplete request. All fields are mandatory for update",
            });
        }
    },

    partialDetailUpdateController: function (req, res, next) {
        const userId = req.params.id;
        const reqBody = req.body;
        (async () => {
            try {
                const data = await userService.partialDetailUpdateService(Number.parseInt(userId), reqBody);
                if (data.message == "success") {
                    res.status(202).json({
                        "message": "partial data updated successfully",
                    })
                }
            } catch (err) {
                if (err.message == "error") {
                    console.log("error in db")
                    res.status(400).json({
                        "message": "Bad request"
                    })
                }
            }
        })().catch((error) => {
            console.log(error)
            console.log("error in async ")
            res.status(400).json({
                "message": "Bad request",
            })
        })
    },

    deleteUserController: function (req, res, next) {
        const id = req.params.id;
        (async () => {
            try {
                const data = await userService.deleteUserService(Number.parseInt(id));
                if (data.message == "success") {
                    res.status(200).json({
                        "message": "user deleted successfully",
                        "id": data.id
                    });
                } else if (data.message == "error") {
                    res.status(200).json({
                        "message": "no user found",
                        "id": data.id
                    });
                }
            } catch (error) {
                if (error.message == "error") {
                    res.status(401).json({
                        "message": "soemthing went wrong. error in db",
                        "id": data.id
                    });
                }
            }
        })().catch((error) => {
            console.log("inside async" + error)
            res.status(400).json({
                "message": "Bad request"
            })
        })
    },

    postProfileDetailsController: function (req, res, next) {
        const userId = req.params.id;
        const files = req.files;
        let filesObject = new Object();
        Object.assign(filesObject, files);
        if ((filesObject.hasOwnProperty('image')) && (filesObject.hasOwnProperty('images')) && (filesObject.hasOwnProperty('resume'))) {
            (async () => {
                try {
                    const data = await userService.uploadUserImageService(Number.parseInt(userId), filesObject);
                    if (data.message == "success") {
                        res.status(200).json({
                            "message": "user Detail uploaded successfully"
                        });
                    }
                } catch (err) {
                    if (err.message == "error") {
                        res.status(401).json({
                            "message": "some error occured.user id not correct"
                        });
                    }
                }
            })().catch((error) => {
                console.log("inside async error" + error)
            })
        } else {
            res.status(401).json({
                "message": "All fields are mandatory"
            });
        }
    },

    getImgController: function (req, res, next) {
        const userId = req.query.id;
        (async () => {
            try {
                const data = await userService.getImgService(Number.parseInt(userId))

                if (data.message == "success") {
                    res.setHeader('Content-Type', 'image/jpeg');
                    res.sendFile(path.dirname(__dirname) + "/uploads/" + data.fileName, (err) => {
                        if (err) {
                            throw err;
                        }
                        console.log("Success")
                    });
                } else if (data.message == "error") {

                    res.status(401).json({
                        "message": "user id  not found",
                    });
                }
            }
            catch (error) {
                if (data.message == "error") {
                    res.status(401).json({
                        "message": "some error occured",
                    });
                }
            }
        })().catch((error) => {
            console.log("inside async");
            console.log(error);
        })

    },

    getResumeController: function (req, res, next) {
        const userId = req.query.id;
        (async () => {
            try {
                const data = await userService.dowloadResumeService(Number.parseInt(userId))
                if (data.message == "success") {
                    res.set('Content-Type', 'application/pdf');
                    res.download(path.dirname(__dirname) + "/uploads/" + data.fileName, (err) => {
                        if (err) {
                            console.log(err);
                            throw err;
                        }
                    })
                    console.log("pdf download")
                }
                else if (data.message == "error") {
                    res.status(401).json({
                        "message": "user id  not found",
                    });
                }
            } catch (data) {
                if (data.message == "error") {
                    res.status(401).json({
                        "message": "some error occured"
                    });
                }
            }
        })().catch((err) => {
            console.log(err)
            console.log("inside async");

        })
    }
}
