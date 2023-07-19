const express = require('express')
const app = express();
app.use(express.json());
// app.set('trust proxy',1)

const cookieParser = require('cookie-parser')
app.use(cookieParser())

const sessionMiddleware = require('./middleware/session.js')
app.use(sessionMiddleware)

const userRouter = require('./routes/index.js');
app.use('/api/user', userRouter);


module.exports = {
  app: app
}
