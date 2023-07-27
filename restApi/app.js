const express = require('express')
var path = require('path');
const fs = require('fs')
const rfs = require('rotating-file-stream')
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
app.use(express.json());
app.use(cors())
const morgan = require('morgan')


const customFormat = 'date :date[web] method-:method url-:url status-:status response time-:response-time ms response-:res[content-length]';

//const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' });
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // Rotate daily
  path: path.join(__dirname, 'logs') // Folder where log files will be stored
});

app.use(morgan(customFormat, { stream: accessLogStream }));

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
