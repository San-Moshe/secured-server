require('dotenv').config();
var express = require('express');
const mongoose = require('mongoose');
const app = express();
var bodyParser = require('body-parser')
const User = require("./Models/user");
const port = process.env.PORT;
const bcrypt = require('bcryptjs');
const tokenMiddleware = require("./Middlewares/token.middleware")
const tokenUtils = require("./Utils/token.utils")
var jsonParser = bodyParser.json()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.joxic.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(res => {
}).catch(err => {
    console.log(err);
})

app.use(jsonParser);
app.use('/', tokenMiddleware.checkToken);

app.post('/register', (req, res) => {
    console.log(req.body)

    const username = req.body.username;
    const password = req.body.password;

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            new User({ username: username, password: hash }).save().then((user) => {
                res.status(200).json(tokenUtils.createToken(username));
            }).catch((err) => {
                console.log(err);
                if (err.code === 11000) {
                    res.status(409).send();
                } else {
                    res.status(500).send();
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
                res.json(tokenUtils.createToken(username))
            } else {
                res.status(401).json({
                    success: false,
                    message: 'Incorrect username or password'
                });
            }
        })
    })
})


app.get('/my-credentials', (req, res) => {
    const username = req.decoded.username;

    User.findOne({ username }).then(user => {
        if (!user) {
            return res.status(404).json({ username: 'User not found' });
        }

        res.status(200).json({ username: user.username, password: user.password })
    }).catch(err => {
        console.log(err);
        res.status(500).send();
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})