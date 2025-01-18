const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRouter');
const cors = require("cors");
const create = require('./model/dbsetup');

const app = express();
const errorLogger= require('./utilities/ErrorLogger');
const requestLogger= require('./utilities/RequestLogger');

app.use(cors())
app.use(bodyParser.json());
// to setup the Database
app.get('/setupDb', (req, res, next) => {
    create.setupDb().then((data) => {
        res.send(data)
    }).catch((err) => {
        next(err)
    })
})
app.use(requestLogger)
app.use('/user', userRouter)

app.use(errorLogger)
console.log("Server listening in port 3000");
app.listen(3000);


module.exports = app;