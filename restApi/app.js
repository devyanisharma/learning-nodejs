const express = require('express')
const app = express();
const multer = require('multer');

app.use(express.json());

const userRouter = require('./routes/index.js');
app.use('/api/user', userRouter);

module.exports = {
    app: app
}