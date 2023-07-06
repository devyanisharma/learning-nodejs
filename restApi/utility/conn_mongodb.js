const { MongoClient } = require('mongodb');
//const url = 'mongodb://localhost:27017';
const username = encodeURIComponent("user");
const password = encodeURIComponent("password");
const mongo_server = "localhost:27017";
const authMechanism = "DEFAULT";

const uri = `mongodb://${username}:${password}@${mongo_server}/?authMechanism=${authMechanism}`;
const client = new MongoClient(uri);
const dbName = 'restapi_db'

let connection=new Object({db:null});
async function dbConnect() {
    await client.connect();
    console.log("connected successfullly to the server")
    // console.log(db);
    let db = client.db(dbName)
    console.log('Authenticated with MongoDB');
   
    // const data = await db.listCollections().toArray();
    // console.log(data);
    // const collection = db.collection('users')
    //const counters = db.collection('counters')
    //const result = await collection.updateOne({ userId: 2 }, { $set: { userName: "shivangu", userAge: 24, userEmail: "shivangu@gmail.com", modifiedDate: Date.now() } })
    //console.log(result)
    //const insertResult = await collection.insertOne({ userName:"sea" ,userAge:30 , userEmail:"sea@gmail.com",createdDate:Date.now(),modifiedDate:Date.now()});
    //console.log('insert result =>', insertResult);
    //const deleteResult = await collection.deleteMany({userName:"selena"})
    //console.log('Inserted documents =>', deleteResult);
    // let findResult = [];
    // findResult = await collection.find({}).toArray();
    // console.log('Found documents =>', findResult);


    return db;
}

(async ()=>{
    connection.db = await dbConnect();
    console.log("Success");
})();

module.exports = {
    connection:connection
}







