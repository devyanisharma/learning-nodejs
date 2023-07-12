const express = require('express')
const app = express();

app.use(express.json());

const cookieParser = require('cookie-parser')
app.use(cookieParser())

const userRouter = require('./routes/index.js');
app.use('/api/user', userRouter);
// app.use('/api/product', userRouter);

module.exports = {
    app: app
}
