const {MongoClient} = require('mongodb');
//const url = 'mongodb://localhost:27017';
const username = encodeURIComponent("user");
const password = encodeURIComponent("password");
const mongo_server = "localhost:27017";
const authMechanism = "DEFAULT";

const uri = `mongodb://${username}:${password}@${mongo_server}/?authMechanism=${authMechanism}`;
const client = new MongoClient(uri);
const dbName = 'rest_api_mongodb'


async function dbConnect(){
    await client.connect();
    console.log("connected successfullly to the server")

    const dbConnection = client.db(dbName)

    //wait db.authenticate('user', 'password');
    console.log('Authenticated with MongoDB');
    const collection = dbConnection.collection('user')

    // const insertResult = await collection.insertOne({ userName:"selena" ,userAge:30 , userEmail:"selena@gmail.com"});
   // const deleteResult = await collection.deleteOne({userName:"selena"})
  //console.log('Inserted documents =>', deleteResult);
   // const findResult = await collection.find({}).toArray();
    //console.log('Found documents =>', findResult);
    
    return 'done';
}

dbConnect()
  .then(console.log)
  .catch(console.error)
  .finally(
    //() => client.close()
    );

module.exports = {
    dbConnection: this.dbConnection
}

    



