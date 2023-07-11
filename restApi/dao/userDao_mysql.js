const { connection } = require('../utility/conn_mysql');
const bcrypt = require("bcrypt")

let userDao = {
    userData: [{ userId: 99, userName: "Shivang", userAge: 22, userEmail: "as@email.com" },
    { userId: 90, userName: "Devyani", userAge: 25, userEmail: "de@email.com" }],
    userDetail: [{
        id: 1,
        userId: "99",
        userProfile: "1687859977490-images (1).jpeg",
        userImages: ["1687859977492-icecream.jpeg", "1687859977495-images (1).jpeg"],
        userResume: "1687859977496-Devyani_Resume_Latest.pdf"
    }],

    registerUserData: async function (firstname, lastname, phonenumber, password, email) {
       return new Promise((resolve, reject) => {   
        let encryptPwd;
        try{
            encryptPwdFunction(password).then((data)=>{
                encryptPwd = data;
             }).catch((error)=>{
                console.log("some error in encryption",error)
                const data = {
                    "message": "error. something went wrong while encryption. "
                }
                return reject(data)
             })
        }catch(error){
            console.log("error in catch block", error)
        }
            const query = 'INSERT INTO `userInfo` (firstname,lastname,email,phonenumber,password,createdDate,modifiedDate) Values (?,?,?,?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)'
            connection.query(query, [firstname, lastname, email, phonenumber, encryptPwd], function (err, result, fields) {
                if (err) {
                    console.log("error in stack trace", err)
                    const data = {
                        "message": "error. something went wrong db side. "
                    }
                    return reject(data);
                } else {
                    console.log("result", result)
                    const data = {
                        "message": "success"
                    }
                    return resolve(data);
                }
            })

        })

    },
    loginUserData: function (email, password) {
        return new Promise((resolve, reject) => {
            const query = 'select password from `userInfo` where email = ?';
            connection.query(query, [email], function (err, result, fields) {
                if (err) {
                    console.log("error", err);
                    const data = {
                        "message": "error",
                        "msg": "db error"
                    }
                    return reject(data)
                }
                console.log(result);

                if (result.length > 0) {
                    const dbPwd = result[0].password;
                    const pwdValidate = decryptPwdFunction(dbPwd,password);
                    console.log("pwdvalidate",pwdValidate)
                     if (pwdValidate) {
                        const data = {
                            "message": "success",
                            "msg": "user logged in successfully"
                        }
                        resolve(data)
                    } else {
                        const data = {
                            "message": "error",
                            "msg": "incorrect password "
                        }
                        return reject(data)
                    }
                } else {
                    const data = {
                        "message": "error",
                        "msg": "user not found"
                    }
                    reject(data)
                }


            })

        })

    },
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

    postUserData: function (name, age, email) {

        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO `user` (userName , userAge , userEmail, createdDate, modifiedDate) VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)';
            connection.query(query, [name, age, email], function (err, result, fields) {
                if (err) {
                    console.error('db error connecting: ' + err.stack);
                    const data = {
                        "message": "error. something went wrong db side. "
                    }
                    return reject(data);
                }
                const user = { userName: name, userAge: age, userEmail: email }
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
            const query = "UPDATE `user` SET userName = ?, userAge = ?, userEmail = ?, modifiedDate=CURRENT_TIMESTAMP WHERE userId = ?";
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
                        "id": id
                    }
                    return reject(data);
                } else {
                    if (result.affectedRows > 0) {
                        const data = {
                            "message": "success",
                            "id": id
                        }
                        return resolve(data)
                    } else {
                        const data = {
                            "message": "error",
                            "id": id
                        }
                        return resolve(data)
                    }
                }
            })
        })
    },

    uploadUserImage: function (userId, files) {
        return new Promise((resolve, reject) => {
            let imagesArray = [];
            imagesArray = files.images;
            let images = [];
            imagesArray.forEach(element =>
                images.push(element.filename));
            const values = [userId, files.image[0].filename, JSON.stringify(images), files.resume[0].filename];
            console.log(values);

            (async () => {
                try {
                    const rowCount = await userCheckFunction(userId);
                    if (rowCount == 0) {

                        const query2 = 'INSERT INTO `userDetail` (userId , userProfile , userImages , userResume) VALUES (?, ?, ?, ?)'
                        connection.query(query2, values, function (error, results, fields) {
                            if (error) {
                                console.log("error in insert query")
                                console.log(error);
                                data = {
                                    "message": "error"
                                }
                                return reject(data)
                            }
                            data = { "message": "success" }
                            return resolve(data)
                        })
                    } else {
                        const query2 = 'UPDATE `userDetail` SET userProfile=?, userImages=?, userResume=? where userId = ?'
                        const values = [files.image[0].filename, JSON.stringify(images), files.resume[0].filename, userId];
                        connection.query(query2, values, function (error, results, fields) {
                            if (error) {
                                console.log(error);
                                data = {
                                    "messgae": "error in db while updating"
                                }
                                return reject(data)
                            }
                            data = { "message": "success" }
                            return resolve(data)
                        })
                    }

                } catch (error) {

                    console.log("return error from select function in async ")
                    console.log(error);
                    return reject(error);

                }
            })().catch((error) => {
                console.log(error)
            })


        })
    },

    getImg: function (userId) {
        return new Promise((resolve, reject) => {
            const query = 'select `userProfile` from `userDetail` where userId = ?'
            connection.query(query, userId, function (err, result, fields) {
                if (err) {
                    console.log(err)
                    const data = {
                        "message": "error"
                    }
                    return reject(data)
                }
                console.log("result")
                console.log(result[0].userProfile)
                const data = {
                    "message": "success",
                    "fileName": result[0].userProfile
                }
                return resolve(data);

            })

        })
    },

    downloadResume: function (userId) {

        return new Promise((resolve, reject) => {
            const query = 'select `userResume` from `userDetail` where userId = ?'
            connection.query(query, userId, function (err, result, fields) {
                if (err) {
                    console.log(err)
                    const data = {
                        "message": "error"
                    }
                    return reject(data)
                }
                console.log("result")
                console.log(result[0].userResume)
                const data = {
                    "message": "success",
                    "fileName": result[0].userResume
                }
                return resolve(data);

            })

        })
    }

}

function userCheckFunction(userId) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT count(userId) As rowCount FROM `userDetail` where userId=?'
        connection.query(query, userId, function (err, results, fields) {
            if (err) {
                console.log("error in select function in query")
                console.log(err)
                const data = { "message": "error" }
                return reject(data)
            }
            else {
                const count = results[0].rowCount;
                console.log("success in user check - " + count);
                return resolve(count)
            }
        })
    })
}
function encryptPwdFunction(password) {
    return new Promise((resolve,reject)=>{
        console.log("encrypt password methods")
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) {
                console.log("error in salt", err);
                return reject("error")
            }
            console.log("salt-", salt)
            bcrypt.hash(password ,salt,function (error, hash) {
                if (error) {
                    console.log("error in hash-", error)
                    return reject("eror")
                }
                console.log("hash- ", hash)
                return resolve(hash);
            })
    })
    })
}

function decryptPwdFunction(dbpwd,password){
    const match = bcrypt.compare(password,dbpwd,function(err,result){
        if(err){
            console.log("error while matching password", err)
        }
        console.log("result compare pwd", result)
        
    })
    return match;

}
module.exports = userDao;