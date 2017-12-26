const express = require('express'),
	bodyParser = require('body-parser'),
	apis = require('./apis')

const app = express()

app.set('view engine', 'jade')

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', apis)

app.get('/', (req, res, next) => {
	res.render('home', {title: 'Home', name: 'home' })
})

app.get('/quan-ly-su-kien', (req, res, next) => {
	res.render('quan-ly-su-kien.jade', {title: 'Quan lý sự kiện', name: 'quan-ly-su-kien' })
})

app.get('/quan-ly-luat', (req, res, next) => {
	res.render('quan-ly-luat.jade', {title: 'Quản lý luật', name: 'quan-ly-luat'})
})

module.exports = app
