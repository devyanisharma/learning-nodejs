const dataStore = require('../dao/datastore.js');

module.exports =
{
    getAllUserService: function () {
        return dataStore.getAllUserData();
    },

    postUserService: function (name, age, email) {
        return dataStore.postUserData(name, age, email);
    },

    updateUserDetailService: function (id, name, age, email) {
        return dataStore.updateUserDetail(id, name, age, email);

    },

    deleteUserService: function (id) {
        return dataStore.deleteUser(id);
    },

    partialDetailUpdateService: function(id,reqBody){
        return dataStore.partialDetailUpdate(id,reqBody);
    }


}