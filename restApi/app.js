const express = require('express')
const app = express();

app.use(express.json());

const userRouter = require('./routes/index.js');
app.use('/api/user', userRouter);

module.exports = {
    app: app
}
