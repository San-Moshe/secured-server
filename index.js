var express = require('express');
const mongoose = require('mongoose');
const app = express();
var bodyParser = require('body-parser')
const User = require("./Models/user");
const port = 3000;
const bcrypt = require('bcryptjs');
var jsonParser = bodyParser.json()

const uri = "mongodb+srv://faxesan:123123123@cluster0.joxic.mongodb.net/openu-db?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(res => {
}).catch(err => {
    console.log(err);
})

app.use(jsonParser);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/register', (req, res) => {
    console.log(req.body)

    const username = req.body.username;
    const password = req.body.password;

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            new User({ username: username, password: hash }).save().then((resp) => {
                res.status(200).send(resp);
            }).catch((err) => {
                console.log(err);
                if (err.code === 11000) {
                    res.status(409).send(err);
                } else {
                    res.status(500).send(err);
                }
            });
        });
    });
})

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ username }).then(user => {
        if (!user) {
            console.log(`User: ${username} not found`);
            return res.status(404).json({ username: 'User not found' });
        }

        bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
                console.log("Authentication succeeded");
                res.status(200).send();
            } else {
                console.log("Passwords do not match, match result = ", isMatch)
                console.log(password, user.password)
                res.status(400).send();
            }
        })
    })
})

app.get('/my-credentials', (req, res) => {
    const username = req.body.username;

    User.findOne({ username }).then(user => {
        if (!user) {
            console.log(`User: ${username} not found`);
            return res.status(404).json({ username: 'User not found' });
        }

        res.status(200).json({ username: user.username, password: user.password })
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})