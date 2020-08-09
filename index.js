var express = require('express');
const mongoose = require('mongoose');
const app = express();
var bodyParser = require('body-parser')
const user = require("./Models/user")
const port = 3000;

var jsonParser = bodyParser.json()

const uri = "mongodb+srv://faxesan:123123123@cluster0.joxic.mongodb.net/openu-db?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(res => {
}).catch(err => {
    console.log(err);
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/register', jsonParser, (req, res) => {
    console.log(req.body)

    new user({username: req.body.username, password: req.body.password}).save(err => {
        if (err) {
            console.log(err);
            res.status(500).send();
        }
    });

    res.status(200)
    res.json({
        username: req.body.username,
        password: req.body.password
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})