const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser')
const connectDB = require('./utilities/db')
const handleNewUser = require('./controllers/newUser')
const findAllUsers = require('./controllers/findAllUsers');
const addExercise = require('./controllers/add');
const logExercise = require('./controllers/log');

// Implement a Root-Level Request Logger Middleware
app.use((req, res, next) => {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
});

connectDB();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post('/api/exercise/new-user', (req, res) => { handleNewUser(req, res) });
app.get('/api/exercise/users', (req, res) => { findAllUsers(req, res) });
app.post('/api/exercise/add', (req, res, next) => { addExercise(req, res, next) });
app.get('/api/exercise/log', (req, res, next) => { logExercise(req, res, next) });

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
