const dataStore = require('../dao/datastore.js');
const userDao = require('../dao/userDao.js');

module.exports =
{
    getAllUserService: async function () {
        return await userDao.getAllUserData();
    },

    postUserService: function (name, age, email) {
        return userDao.postUserData(name, age, email);
    },

    updateUserDetailService: function (id, name, age, email) {
        return dataStore.updateUserDetail(id, name, age, email);

    },

    partialDetailUpdateService: function(id,reqBody){
        return dataStore.partialDetailUpdate(id,reqBody);
    },

    deleteUserService: function (id) {
        return dataStore.deleteUser(id);
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