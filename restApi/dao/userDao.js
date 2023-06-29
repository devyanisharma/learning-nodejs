const { connection } = require('../utility/connection')
let userDao = {
    //userData:[],
    userData: [{ userId: 99, userName: "Shivang", userAge: 22, userEmail: "as@email.com" },
    { userId: 90, userName: "Devyani", userAge: 25, userEmail: "de@email.com" }],
    // userDetail: [{
    //     userId: "99",
    //     userProfile: "1687859977490-images (1).jpeg",
    //     userImages: ["1687859977492-icecream.jpeg", "1687859977495-images (1).jpeg"],
    //     userResume: "1687859977496-Devyani_Resume_Latest.pdf"
    // }],



    getAllUserData: function () {
        return new Promise((resolve, reject) => {
            connection.query('SELECT COUNT(userId) AS rowCount FROM `user`', function (err, result, fields) {
                if (err) {
                    console.error('error connecting: ' + err.stack);
                    const data = {
                        "message": "error"
                    }
                    return reject(data)

                } else {
                    console.log(result);
                    let count = result[0].rowCount;
                    if (count >= 1) {
                        const data = {
                            "message": "success",
                            "user": this.userData
                        }
                        return resolve(data)
                    }
                };
            })
        })
    },

    postUserData: function (name, age, email) {
        if (name.length > 3 && age > 0 && email.includes('.') && email.includes('@')) {
            const userId = Math.floor(Math.random() * 101);
            const query = 'INSERT INTO `user` (userId , userName , userAge , useEmail, createdDate, modifiedDate) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)';
            connection.query(query, [userId, name, age, email, Date.now(), Date.now()], function (err, result, fields) {
                if (err) {
                    console.error('error connecting: ' + err.stack);
                    return;
                }

                console.log("success");

            });
            const user = { userId: userId, userName: name, userAge: age, userEmail: email }
            //this.userData.push(user);
            const data = {
                "message": "success",
                "user": user
            }
            return data;
        } else {
            const data = {
                "message": "error"
            }
            return data;

        }
    },

    updateUserDetail: function (id, name, age, email) {

        for (let i = 0; i < this.userData.length; i++) {
            if (this.userData[i].userId == id) {
                this.userData[i].userName = name;
                this.userData[i].userAge = age;
                this.userData[i].userEmail = email;
                console.log(this.userData[i]);
                const data = {
                    "message": "success",
                    "user": this.userData
                }
                return data;
            }

        }
        const data = {
            "message": "error"
        }
        return data;
    },

    deleteUser: function (id) {
        for (let i = 0; i < this.userData.length; i++) {
            if (this.userData[i].userId == id) {
                const leftArray = this.userData.slice(0, i);
                const rightArray = this.userData.slice(i + 1, this.userData.length);
                const Arrry = leftArray.concat(rightArray);
                this.userData = Arrry;

                const data = {
                    "message": "success",
                    "user": Arrry
                }
                return data;
            }
        }
        const data = {
            "id": id,
            "message": "error"
        }
        return data;


    },

    partialDetailUpdate: function (originalUser, patchObject) {
        Object.assign(originalUser, patchObject);
        const data = {
            "message": "success",
            "user": originalUser
        }
        return data;
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