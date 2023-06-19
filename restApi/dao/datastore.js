let dataStore = {
    userData: [{ userId: 99, userName: "Shivang", userAge: 22, userEmail: "as@email.com" },
    { userId: 90, userName: "Devyani", userAge: 25, userEmail: "de@email.com" }],


    getAllUserData: function () {
        return this.userData;
    },

    postUserData: function (name, age, email) {
        if (name.length > 3 && age > 0 && email.includes('.') && email.includes('@')) {
            const userId = Math.floor(Math.random() * 101);
            const user = { userId: userId, userName: name, userAge: age, userEmail: email }
            this.userData.push(user);
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
        for (let i = 0; i <= this.userData.length; i++) {
            if (this.userData[i].userId == id) {
                const data = {
                    "message": "success",
                    "user": this.userData[i]
                }
                this.userData.pop(this.userData[i])
                return data;
                
            }

        }
        const data = {
            "message": "error"
        }
        return data;

    },

    partialDetailUpdate: function(originalUser,patchObject){
        Object.assign(originalUser, patchObject);
        const data= {
            "message":"success",
            "user":originalUser
        }
        return data;
     }


}
module.exports = dataStore;