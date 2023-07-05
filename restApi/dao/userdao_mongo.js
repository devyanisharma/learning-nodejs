//const { connection } = require('../utility/connection');
const { db } = require('../utility/connection_mongodb')

// setTimeout(() => {
//     console.log(db.db)
// }, 3000);

let userDao = {

    getAllUserData: function () {
        return new Promise((resolve, reject) => {
            (async () => {
                try {
                    const collection = await db.db.collection('user');
                    const result = await collection.find({}).toArray();
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
                } catch {
                    const data = {
                        "message": "error"
                    }
                    console.log("inside catch");
                    return reject(data)
                }
            })().catch((error) => {
                console.log("inside error of asyn catch")
            })
        })
    },

    postUserData: function (name, age, email) {
        return new Promise((resolve, reject) => {
            let count = [];
            (async () => {
                try {
                    //setting userId
                    const counters = await db.db.collection('counters');
                    count = await counters.find({}).toArray();
                    let userId = count[0].id;

                    //inserting user
                    const collection = await db.db.collection('user');
                    const insertResult = await collection.insertOne({userName: name, userAge: age, userEmail: email, createdDate: Date.now(), modifiedDate: Date.now(),userId: userId });
                    const user = {userName:name, userAge:age, userEmail:email, createdDate:Date.now(), modifiedDate:Date.now(), userId:userId }
                    console.log(user)
                    userId = userId + 1
                    const update = await counters.updateOne({ }, { $set: { id: userId } });

                    if (insertResult.acknowledged) {
                        const data = {
                            "message": "success",
                            "user": user
                        }
                        return resolve(data);
                    }else{
                        const data = {
                            "message": "error. something while inserting data. "
                        }
                        return reject(data); 
                    }

                } catch (error){
                    console.log(error)
                    const data = {
                        "message": "error. something went wrong db side. "
                    }
                    return reject(data);
                }

            })().catch((error) => {
                console.log("inside error of asyn catch")
            })
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
module.exports = userDao;