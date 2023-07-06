const {connection} = require('../utility/conn_mongoose');
const schemas = require('../utility/mangoose_schemas')

const UserModel = connection.model('users', schemas.getUserSchema);
const Counters = connection.model('counters',schemas.getCounterSchema);
  
module.exports={
    UserModel:UserModel,
    Counters:Counters
}

