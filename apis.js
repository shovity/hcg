const express = require('express'),
  data = require('./database/data'),
  router = express.Router()

router.post('/add/event', (req, res) => {
  data.addEvents(req.body.id, req.body.name)
  res.end('ok')
})

router.post('/add/role', (req, res) => {
  data.addRoles(req.body.id, req.body.name)
  res.end('ok')
})

router.post('/remove/event', (req, res) => {
  data.removeEvent(req.body.index)
  res.end('ok')
})

router.post('/remove/role', (req, res) => {
  data.removeRole(req.body.index)
  res.end('ok')
})

router.post('/edit/event', (req, res) => {
  data.editEvent(req.body.index, req.body.id, req.body.name)
  console.log(req.body);
  res.end('ok')
})

router.post('/edit/role', (req, res) => {
  data.editRole(req.body.index, req.body.id, req.body.name)
  console.log(req.body);
  res.end('ok')
})

router.get('/get/events', (req, res) => {
  res.json(data.getEvents())
})

router.get('/get/roles', (req, res) => {
  res.json(data.getRoles())
})

router.get('/get/all', (req, res) => {
  res.json(data.getAll()) 
})

router.get('/', (req, res) => {
  res.json({me: 'awsome apis'})
});

module.exports = router
