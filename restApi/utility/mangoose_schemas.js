const {connection} = require('../utility/conn_mongoose');
const {Schema} = require("mongoose");
const userSchema = new Schema({
    userName:String,
    userAge: Number,
    userEmail:String,
    createdDate: Number,
    modifiedDate: Number,
    userId: Number,
    userImages: String,
    userProfile: String,
    userResume: String
  });
  const counters = new Schema({
    id:Number
  })
let schemas = {
    getUserSchema : userSchema,
    getCounterSchema:counters

}

module.exports = schemas;
