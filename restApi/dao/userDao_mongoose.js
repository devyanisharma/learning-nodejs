const { connection } = require('../utility/conn_mongoose');
const { UserModel ,Counters} = require('../utility/mongoose_models');

let userDao = {

    getAllUserData: function () {
        return new Promise((resolve, reject) => {
            (async () => {
                try {
                    const result = await UserModel.find();
                    console.log(result);
                    if (result.length >= 1) {
                        const data = {
                            "message": "success",
                            "user": result
                        }
                        return resolve(data)
                    } else {
                        const data = {
                            "message": "success",
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
                    const count = await Counters.find();
                    let userId = count[0].id;
                    console.log("userId",userId)

                    //inserting user
                   
                    const insertResult = new UserModel({ userName: name, userAge: age, userEmail: email, createdDate: Date.now(), modifiedDate: Date.now(), userId: userId });
                    await insertResult.save();
                    const user = { userName: name, userAge: age, userEmail: email, createdDate: Date.now(), modifiedDate: Date.now(), userId: userId }
                    console.log(user)
                    userId = userId + 1
                    const update = await counters.updateOne({}, { $set: { id: userId } });

                    if (insertResult.acknowledged) {
                        const data = {
                            "message": "success",
                            "user": user
                        }
                        return resolve(data);
                    } else {
                        const data = {
                            "message": "error. something while inserting data. "
                        }
                        return reject(data);
                    }

                } catch (error) {
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
            (async () => {
                try {
                    const collection = await db.db.collection('user');
                    const result = await collection.updateOne({ userId: id }, { $set: { userName: name, userAge: age, userEmail: email, modifiedDate: Date.now() } })
                    console.log({ userName: name, userAge: age, userEmail: email, modifiedDate: Date.now() }, id);
                    if (result.modifiedCount > 0) {
                        const data = {
                            "message": "success"
                        }
                        return resolve(data);
                    } else {
                        const data = {
                            "message": "error"
                        }
                        return reject(data);
                    }

                } catch (err) {
                    console.log(err)
                    const data = {
                        "message": "error"
                    }
                    return reject(data);
                }
            })().catch((error) => {
                console.log(error)
                console.log("inside error of asyn catch")
            })

        })
    },

    partialDetailUpdate: function (userId, patchObject) {
        return new Promise((resolve, reject) => {
            patchObject.modifiedDate = Date.now();
            (async () => {
                try {
                    const collection = await db.db.collection('user');
                    const result = await collection.updateOne({ userId: userId }, { $set: patchObject });
                    console.log(result)
                    if (result.modifiedCount > 0) {
                        const data = {
                            "message": "success"
                        }
                        return resolve(data)
                    } else {
                        const data = {
                            "message": "error",
                        }
                        return reject(data)
                    }
                } catch (err) {
                    console.log(err)
                    const data = {
                        "message": "error"
                    }
                    return reject(data)
                }
            })().catch((error) => {
                console.log(error)
                console.log("inside error of asyn catch")
            })
        })
    },

    deleteUser: function (id) {
        return new Promise((resolve, reject) => {
            (async () => {
                try {
                    const collection = await db.db.collection('user');
                    const result = await collection.deleteOne({ userId: id });
                    console.log(result)
                    if (result.deletedCount > 0) {
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

                } catch (err) {
                    console.log(err)
                    const data = {
                        "message": "error",
                        "id": id
                    }
                    return reject(data);
                }
            })().catch((error) => {
                console.log(error)
                console.log("inside error of asyn catch")
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
                    const collection = await db.db.collection('user');
                    const result = await collection.updateOne({ userId: userId }, { $set: { userProfile: files.image[0].filename, userImages: JSON.stringify(images), userResume: files.resume[0].filename } })
                    console.log(result);
                    if (result.modifiedCount > 0) {
                        data = { "message": "success" }
                        return resolve(data);
                    } else {
                        data = { "message": "error" }
                        return reject(data);
                    }

                } catch (error) {
                    console.log(error)
                    data = {
                        "messgae": "error in db while updating"
                    }
                    return reject(data)
                }
            })().catch((error) => {
                console.log(error)
                console.log("inside error of asyn catch")
            })
        })
    },

    getImg: function (userId) {
        return new Promise((resolve, reject) => {
            (async () => {
                try {
                    const collection = await db.db.collection('user');
                    const result = await collection.findOne({ userId: userId });
                    console.log(result);
                    if (result != null) {
                        const data = {
                            "message": "success",
                            "fileName": result.userProfile
                        }
                        return resolve(data);
                    } else {
                        const data = {
                            "message": "error",
                        }
                        return resolve(data);
                    }
                } catch (err) {
                    console.log(err)
                    const data = {
                        "message": "error"
                    }
                    return reject(data)
                }

            })().catch((error) => {
                console.log(error)
                console.log("inside error of asyn catch")
            })
        })
    },

    downloadResume: function (userId) {

        return new Promise((resolve, reject) => {
            (async () => {
                try {
                    const collection = await db.db.collection('user');
                    const result = await collection.findOne({ userId: userId });
                    console.log(result);
                    if (result != null) {
                        const data = {
                            "message": "success",
                            "fileName": result.userResume
                        }
                        return resolve(data);
                    } else {
                        const data = {
                            "message": "error",
                        }
                        return resolve(data);
                    }

                } catch (err) {
                    console.log(err)
                    const data = {
                        "message": "error"
                    }
                    return reject(data)
                }

            })().catch((error) => {
                console.log(error)
                console.log("inside error of asyn catch")

            })

        })
    }



}

module.exports = userDao;



