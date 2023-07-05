const { MongoClient } = require('mongodb');
//const url = 'mongodb://localhost:27017';
const username = encodeURIComponent("user");
const password = encodeURIComponent("password");
const mongo_server = "localhost:27017";
const authMechanism = "DEFAULT";

const uri = `mongodb://${username}:${password}@${mongo_server}/?authMechanism=${authMechanism}`;
const client = new MongoClient(uri);
const dbName = 'restapi_db'

let db=new Object({db:null});
async function dbConnect() {
    await client.connect();
    console.log("connected successfullly to the server")

    db = client.db(dbName)

    console.log('Authenticated with MongoDB');
   
    const collection = db.collection('user')
    //const counters = db.collection('counters')

    //const insertResult = await collection.insertOne({ userName:"sea" ,userAge:30 , userEmail:"sea@gmail.com",createdDate:Date.now(),modifiedDate:Date.now()});
    //console.log('insert result =>', insertResult);
    //const deleteResult = await collection.deleteMany({userName:"selena"})
    //console.log('Inserted documents =>', deleteResult);

      //let findResult = [];
      //findResult = await collection.find({}).toArray();
      
     // console.log('Found documents =>', findResult);


    return db;
}

(async ()=>{
    db.db = await dbConnect();
    console.log("Success");
})();

module.exports = {
    db:db
}







