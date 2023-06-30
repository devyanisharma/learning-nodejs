const dataStore = require('../dao/datastore.js');
const userDao = require('../dao/userDao.js');

module.exports =
{
    getAllUserService: async function () {
        return await userDao.getAllUserData();
    },

    postUserService: async function (userId,name, age, email) {
        return await userDao.postUserData(userId,name, age, email);
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

    uploadUserImageService: function(userId,files){
        return dataStore.uploadUserImage(userId,files);
    },

    getImgService: function(userId){
        return dataStore.getImg(userId)
    },

    dowloadResumeService: function(userId){
        return dataStore.downloadResume(userId)
    }


}