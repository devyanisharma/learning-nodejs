//const userDao = require('../dao/datastore.js');
//const userDao = require('../dao/userDao_mysql');
//const userDao = require('../dao/userdao_mongo.js');
const userDao  = require('../dao/userDao_mongoose');

module.exports =
{
    getAllUserService: async function () {
        return await userDao.getAllUserData();
    },

    postUserService: async function (name, age, email) {
        return await userDao.postUserData(name, age, email);
    },

    updateUserDetailService: async function (id, name, age, email) {
          return await userDao.updateUserDetail(id, name, age, email);

    },

    partialDetailUpdateService: async function(id,reqBody){
        return await userDao.partialDetailUpdate(id,reqBody);
    },

    deleteUserService: async function (id) {
        return await userDao.deleteUser(id);
    },

    uploadUserImageService: async function(userId,files){
        return await userDao.uploadUserImage(userId,files);
    },

    getImgService: async function(userId){
        return await userDao.getImg(userId)
    },

    dowloadResumeService: async function(userId){
        return await userDao.downloadResume(userId)
    }


}