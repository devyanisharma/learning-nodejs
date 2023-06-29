const dataStore = require('../dao/datastore.js')
const { app } = require('../app.js')


describe('getAllUserData function - success', () => {
    test('it will response message', () => {
        console.log("dataStore");
        console.log(dataStore.userData);
        expect({
            "message": "success",
            "user": dataStore.userData
        }).toEqual(dataStore.getAllUserData());
        console.log(dataStore.getAllUserData);
    })
})

// describe('getAllUserData function - error',()=>{
//     test('it will response error message',()=>{
//         //expect(dataStore.getAllUserData).toBe(dataStore.userData);
//         const user = dataStore.getAllUserData;
//         console.log("user length");
//     console.log(user.length);
//         expect(user.length<1).toBe(true);
//     })
//     })

describe('postUserData function - success', () => {
    test('It should give success message', () => {
        const data = dataStore.postUserData('devyani', 22, 'devyani@email.com');

        expect(data.message).toEqual('success')
        expect(dataStore.userData.includes(data.user)).toBe(true);

    })
})

describe('postUserData function - name less than 3 char', () => {
    test('It should give error message', () => {
        const data = dataStore.postUserData('de', 21, 'dcdcd@email.com');
        expect(data.message).toEqual('error')
        expect(dataStore.userData.includes(data.user)).toBe(false);

    })
})

describe('postUserData function - invalid email', () => {
    test('It should give error message', () => {
        const data = dataStore.postUserData('devyani', 21, 'dcdcailom');
        expect(data.message).toEqual('error')
        expect(dataStore.userData.includes(data.user)).toBe(false);

    })
})

describe('postUserData function - invalid age', () => {
    test('It should give error message', () => {
        const data = dataStore.postUserData('devyani', 0, 'devyani.gmail.com');
        expect(data.message).toEqual('error')
        expect(dataStore.userData.includes(data.user)).toBe(false);

    })
})

describe('updateUserDetail function - invalid age', () => {
    test('It should give erro message', () => {
        
        const data = dataStore.updateUserDetail(id, name, age, email);
        expect(data.message).toEqual('error')
        expect(dataStore.userData.includes(data.user)).toBe(false);

    })
})





