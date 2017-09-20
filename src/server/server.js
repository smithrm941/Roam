const express = require('express')

const app = express()
const bodyParser = require('body-parser')

const user = require('../models/db/db.js')


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

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
    user.find(email)
    .then(user => {
      if(user[0]){
        res.render('signup', {message: "Account already exists."})
      } else {
        user.create(email, password)
          .then(createdUser => {
          return res.redirect('/')
        })
      }
    })
  }
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/users/:id', (req, res) => {
  res.render('profile')
})

const port = process.env.PORT || 3003
app.listen(port, () => {
  console.log('Listening on===port:', port)
})
