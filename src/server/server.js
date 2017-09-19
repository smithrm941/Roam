const express = require('express')

const app = express()
const bodyParser = require('body-parser')

const createUser = require('../models/db/db.js')


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use(express.static('public'))


app.get('/', (req, res) => {
  res.render('splash')
})

app.get('/signup', (req, res) => {
  res.render('signup')
})

app.post('/signup', (req, res) => {
  const {email, password, confirmedPassword} = req.body
  createUser(email, password)
    .then(createdUser => {
      return res.redirect('/')
    })
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
