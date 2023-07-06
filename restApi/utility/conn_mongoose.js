const mongoose = require('mongoose');
const username = encodeURIComponent("user");
const password = encodeURIComponent("password");
const mongo_server = "localhost:27017";
const authMechanism = "DEFAULT";
const dbName = "restapi_db"
const uri = `mongodb://${username}:${password}@${mongo_server}/?authMechanism=${authMechanism}`;
console.log(uri)


const connection = mongoose.createConnection(uri,{authMechanism:authMechanism,dbName:dbName});
 
  //const userModal = mongoose.model('users', userSchema); //collection name is users
  //const newUser = new userModal({ userName: 'Shivang' ,userAge:23,userEmail:"shivang@gmail.com"});
  //await newUser.save();
   //console.log(newUser.userName); 


//const users = await userCollection.find();
//console.log(users);
//const username  = await userCollection.find({userName:"Shivang"})
//console.log(username);

// dbconnect().then(() => {
//     console.log('Mongoose connected successfully!');
//   })
//   .catch((error) => {
//     console.error('Failed to connect to Mongoose:', error);
//   });


module.exports = {connection: connection};




  
   