const express = require('express')
var path = require('path');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
app.use(express.json());
app.use(cors())

const cookieParser = require('cookie-parser')
app.use(cookieParser())

const sessionMiddleware = require('./middleware/session.js')
app.use(sessionMiddleware)

// app.set('trust proxy',1)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs')

const passport = require('passport')
app.use(passport.initialize());
app.use(passport.session())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userRouter = require('./routes/index.js');
app.use('/api/user', userRouter);

const authRouter = require('./routes/authRouter.js')
app.use('',authRouter)


module.exports = {
  app: app
}
