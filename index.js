var express = require('express');
const app = express();
var bodyParser = require('body-parser')
const port = 3000;

var jsonParser = bodyParser.json()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register',jsonParser, (req, res) => {
    console.log(req.body)
    res.status(200)
    res.json({
        username: req.body.username,
        password: req.body.password
    })

  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})