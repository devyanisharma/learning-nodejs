const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const {connection} = require('../utility/conn_mysql')
const { validPassword } = require('./authenticate')

const customFields = {
    usernameField:'username',
    passwordField:'password',
};

function verifyCallback(username, password, done) {

connection.query('SELECT * FROM userInfo WHERE username = ? ', [username], function(error, results, fields) {
        if (error) {
            return done(error);
        }
        if(results.length==0) {
            return done(null,false);
        }
        const isValid = validPassword(password,results[0].hash,results[0].salt);
        user = {
            userId:results[0].userId,
            username:results[0].username,
            hash:results[0].hash,
            salt:results[0].salt
        };
        if(isValid) {
            return done(null,user);
        } else {
            return done(null,false);
        }
   });
}

const localStrategy = new LocalStrategy(customFields, verifyCallback);
passport.use(localStrategy);

/**
 * This is used  for setting the user id as cookie in header
 */
passport.serializeUser((user, done)=>{

    console.log("inside serialize",user);
    done(null,user.userId)
});

passport.deserializeUser(function(userId, done){
    console.log('deserializeUser' + userId);
    connection.query('SELECT * FROM userInfo where userId = ?',[userId], function(error, results) {
            done(null, results[0]);    
    });
});

module.exports = passport;


