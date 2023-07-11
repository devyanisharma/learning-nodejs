
var mysql = require('mysql2');


// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'devyani',
//     password: 'password',
//     database: 'restapi_db'
// });
var pool = mysql.createPool({
    host:'localhost',
    user:'devyani',
    password:'password',
    database:'restapi_db',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
})
// connection.connect(function (err) {
//     if (err) {
//         console.error('error connecting: ' + err.stack);
//         return;
//     }

//     console.log('connected as id ' + connection.threadId);
// });

pool.getConnection(function(err,conn){
    if(err){
        console.error('error get connection: ' + err.stack);
        return;
    }
    conn.query('SELECT * FROM `user` ');
    console.log('connected as id ' + conn.threadId);
   
   
// conn.connect(function(error){
// if(err){
//     console.error('error connecting: ' + error.stack);
//     return;
// }

// console.log('connected as id ' + conn.threadId);
// })

pool.releaseConnection(conn);

})

// connection.query(
//     'SELECT * FROM `user` ',
//     function (err, results, fields) {
//         //console.log(results); // results contains rows returned by server
//         //console.log(fields); // fields contains extra meta data about results, if available
//     }
// );

//connection.end();
module.exports = {
    connection: pool
}