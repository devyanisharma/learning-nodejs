const session = require('express-session')
const {redisClient} = require('../utility/redis')

const RedisStore = require('connect-redis').default;


module.exports =  session({
        store: new RedisStore({client: redisClient}),
        secret: 'shhh',
        resave: false,
        saveUninitialized: false,
        name:"session Id",
        cookie: { 
          secure: false,
          httpOnly:true,
          maxAge : 300000
          }
      })

