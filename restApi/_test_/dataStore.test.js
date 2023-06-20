const {dataStore} = require('../dao/datastore.js')
const {app} = require('../app.js')
userData: [{ userId: 99, userName: "Shivang", userAge: 22, userEmail: "as@email.com" },
     { userId: 90, userName: "Devyani", userAge: 25, userEmail: "de@email.com" }],


describe('get all user data function success',()=>{
test('it will response message',()=>{
const data = {
    "message": "success",
    "user": userData
}
    expect(data).toEqual(dataStore.getAllUserData());
    console.log(dataStore.getAllUserData);
})
})

describe('get all user data function error',()=>{
    test('it will response error message',()=>{
        expect(dataStore.getAllUserData).toBe(dataStore.userData);
        const user = dataStore.getAllUserData;
        expect(user.lenghth<1).toBe(true);
    })
    })


