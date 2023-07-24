const bcrypt = require('bcrypt');
const {connection} = require('../utility/conn_mysql')
module.exports={
    authenticate: function (req, res, next) {
        if (!req.session || !req.session.user) {
            console.log("un authenticated")
                    const error = new Error("Use not logged in")   
                    next(error)
                        
        }
        next();
    },

    //below methoda are for passport
    isAuth :function(req,res,next) {
        if(req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/notAuthorized');
        }
    },

    userExists :function(req,res,next) {
        
        connection.query('Select * from userInfo where username=? ', [req.body.username], function(error, results, fields) {
            if (error) {
                console.log("Error",error);
            } else if(results.length>0) {
                res.json({"message" :"user already exist"})
            } else {
                next();
            }
        });
    },

    genPassword:function (password) {
        return new Promise((resolve,reject)=>{
            //console.log("encrypt password methods")
            const saltRounds = 10;
            bcrypt.genSalt(saltRounds, function (err, salt) {
                if (err) {
                    console.log("error in salt", err);
                    return reject("error")
                }
               // console.log("salt-", salt)
               bcrypt.hash(password ,salt,function (error, hash) {
                    if (error) {
                        console.log("error in hash-", error)
                        return reject("eror")
                    }
                    resolve({hash:hash,salt:salt})
                   // console.log("hash- ", hash)
                
                })
        })
        })
    },
      

     validPassword :function decryptPwdFunction(dbpwd,password){
        return new Promise((resolve,reject)=>{
            bcrypt.compare(password,dbpwd,function(err,result){
                if(err){
                    console.log("error while matching password", err)
                    reject(err)
                }
               // console.log("result compare pwd", result)
                resolve(result);
                
            })
            
        })
        
    
    }
    }
