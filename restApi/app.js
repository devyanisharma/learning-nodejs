const express = require('express')
const app = express();
app.use(express.json());
const fs = require('fs');

const userRouter = require('./routes/index.js');
app.use('/api/user', userRouter);

module.exports = {
    app: app
}
