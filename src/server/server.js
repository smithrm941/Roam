const express = require('express')

const app = express()
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const usersDb = require('../models/db/db.js')


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

app.use(express.static('public'))


app.get('/', (req, res) => {
  res.render('splash')
})

app.get('/signup', (req, res) => {
  res.render('signup', {message: ""})
})

app.post('/signup', (req, res) => {
  const {email, password, confirmedPassword} = req.body
  if(password != confirmedPassword){
    res.render('signup', {message: "Passwords do not match."})
  } else {
    usersDb.find(email)
    .then(users => {
      if(users[0]){
        res.render('signup', {message: "Account already exists."})
      } else {
        usersDb.createUser(email, password)
          .then(createdUser => {
          return res.redirect('/')
        })
      }
    })
  }
})

app.get('/login', (req, res) => {
  res.render('login', {message: ""})
})

app.post('/login', (req, res) => {
  const {email, password} = req.body
  usersDb.find(email)
  .then(users => {
    if(users[0]){
      let correctPassword = (users[0].password === password)
      if(correctPassword){
        req.session.id = email
        res.render('profile')
      }
    } else {
      res.render('login', {message: "user does not exist."})
    }
  })
})

app.get('/logout', (req, res) => {
  req.session.id = null;
  loggedIn === undefined
  res.redirect('/')
})

app.get('/users/:id', (req, res) => {
  res.render('profile')
})

const port = process.env.PORT || 3003
app.listen(port, () => {
  console.log('Listening on===port:', port)
})
