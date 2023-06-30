const { connection } = require('../utility/connection');
const { query } = require('express');

let userDao = {
    userData: [{ userId: 99, userName: "Shivang", userAge: 22, useEmail: "as@email.com" },
    { userId: 90, userName: "Devyani", userAge: 25, userEmail: "de@email.com" }],
    userDetail: [{
        id: 1,
        userId: "99",
        userProfile: "1687859977490-images (1).jpeg",
        userImages: ["1687859977492-icecream.jpeg", "1687859977495-images (1).jpeg"],
        userResume: "1687859977496-Devyani_Resume_Latest.pdf"
    }],
    getAllUserData: function () {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM `user`', function (err, result, fields) {
                if (err) {
                    console.error('error connecting: ' + err.stack);
                    const data = {
                        "message": "error"
                    }
                    return reject(data)

                } else {
                    console.log(result);
                    if (result.length >= 1) {
                        const data = {
                            "message": "success",
                            "user": result
                        }
                        return resolve(data)
                    } else {
                        const data = {
                            "message": "error2",
                            "user": result

                        }
                        return resolve(data)

                    }
                };
            })
        })
    },

    postUserData: function (userId, name, age, email) {

        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO `user` (userId , userName , userAge , useEmail, createdDate, modifiedDate) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)';
            connection.query(query, [userId, name, age, email, Date.now(), Date.now()], function (err, result, fields) {
                if (err) {
                    console.error('db error connecting: ' + err.stack);
                    const data = {
                        "message": "error. something went wrong db side. "
                    }
                    return reject(data);
                }
                const user = { userId: userId, userName: name, userAge: age, userEmail: email }
                const data = {
                    "message": "success",
                    "user": user
                }
                return resolve(data);

            });
        })
    },

    updateUserDetail: function (id, name, age, email) {
        console.log("update user detail dao")
        return new Promise((resolve, reject) => {
            const query = "UPDATE `user` SET userName = ?, userAge = ?, useEmail = ?, modifiedDate=CURRENT_TIMESTAMP WHERE userId = ?";
            const values = [name, age, email, id];
            console.log("-----------------")
            connection.query(query, values, function (err, result, fields) {
                if (err) {
                    console.log(err)
                    const data = {
                        "message": "error"

                    }
                    return reject(data);

                } else {
                    console.log(result)
                    const data = {

                        "message": "success"
                    }
                    return resolve(data);
                }
            })
        })
    },

    partialDetailUpdate: function (userId, patchObject) {
        return new Promise((resolve, reject) => {
            let set = "";
            let values = Object.values(patchObject);
            values.push(userId)
            for (var key in patchObject) {
                set = set + key + "=?,"
            }
            const query = "UPDATE `user` SET " + set + " modifiedDate = CURRENT_TIMESTAMP WHERE userId = ?"
            connection.query(query, values, function (err, result, fields) {
                if (err) {
                    console.log(err)
                    const data = {
                        "message": "error"
                    }
                    return reject(data)
                }
                console.log(result)
                const data = {
                    "message": "success"
                }
                return resolve(data)

            })
        })
    },

    deleteUser: function (id) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE from `user` where userId = ?'
            connection.query(query, [id], function (err, result, fields) {
                if (err) {
                    const data = {
                        "message": "error",
                        "id":id
                    }
                    return reject(data);
                }else{
                    if(result.affectedRows>0){
                        const data = {
                            "message": "success",
                            "id":id
                        }
                        return resolve(data)
                    }else{
                        const data = {
                            "message": "error",
                            "id":id
                        }
                        return resolve(data)
                    }
                } 
            })
        })
    },

    uploadUserImage: function (userId, files) {
        const userIndex = this.userDetail.findIndex((value, index, obj) => {
            return value.userId == userId;
        });
        console.log("userIndex " + userIndex)
        let imagesArray = [];
        imagesArray = files.images;
        let images = [];
        imagesArray.forEach(element =>
            images.push(element.filename));
        try {
            if (userIndex >= 0) {
                this.userDetail[userIndex].userProfile = files.image[0].filename;
                this.userDetail[userIndex].userImages = images;
                this.userDetail[userIndex].userResume = files.resume[0].filename;
            }
            else {
                const user = {
                    userId: userId, userProfile: files.image[0].filename, userImages: images, userResume: files.resume[0].filename

                }
                this.userDetail.push(user)
            }
            const data = {
                "message": "success",
                "user": this.userDetail
            }
            return data;
        } catch (error) {
            const data = {
                "id": userId,
                "message": "error"
            }
            console.log("error" + error)
            return data;
        }
    },
    getImg: function (userId) {
        const userIndex = this.userDetail.findIndex((value, index, obj) => {
            return value.userId == userId;
        });
        const fileName = this.userDetail[userIndex].userProfile;

        const data = {
            "message": "success",
            "fileName": fileName
        }
        return data;

        // }
        //     const data = {
        //         "id": userId,
        //         "message": "error"
        //     }
        //     console.log("error" + error)
        //     return data;

    },

    downloadResume: function (userId) {
        const userIndex = this.userDetail.findIndex((value, index, obj) => {
            return value.userId == userId;
        });
        const fileName = this.userDetail[userIndex].userResume;
        const data = {
            "message": "success",
            "fileName": fileName
        }
        return data;
    }




}
module.exports = userDao;