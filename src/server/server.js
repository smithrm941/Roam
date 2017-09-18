const express = require('express')
const app = express()


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('splash')
})

app.get('/signup', (req, res) => {
  res.render('signup')
})

app.post('/signup', (req, res) => {

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
