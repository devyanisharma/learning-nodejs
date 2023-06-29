
var mysql = require('mysql2');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'devyani',
    password: 'password',
    database: 'restapi_db'
});
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    //console.log('connected as id ' + connection.threadId);
});

connection.query(
    'SELECT * FROM `user` ',
    function (err, results, fields) {
        //console.log(results); // results contains rows returned by server
        //console.log(fields); // fields contains extra meta data about results, if available
    }
);

//connection.end();
module.exports = {
    connection: connection
}