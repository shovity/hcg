const fs = require('fs'),
  uri = __dirname + '/data.json'

var data = {
  getAll:  () => {
    var data = fs.readFileSync(uri)
    data = JSON.parse(data)
    return data
  },

  getEvents: () => {
    var data = fs.readFileSync(uri)
    data = JSON.parse(data)
    return data.events
  },

  getRoles: () => {
    var data = fs.readFileSync(uri)
    data = JSON.parse(data)
    return data.roles
  },

  removeEvent: (i) => {
    var data = fs.readFileSync(uri)
    data = JSON.parse(data)
    data.events.splice(i, 1)
    fs.writeFileSync(uri, JSON.stringify(data))
  },

  removeRole: (i) => {
    var data = fs.readFileSync(uri)
    data = JSON.parse(data)
    data.roles.splice(i, 1)
    fs.writeFileSync(uri, JSON.stringify(data))
  },

  addEvents: (id, name) => {
    var data = fs.readFileSync(uri)
    data = JSON.parse(data)
    data.events.push({id, name})
    fs.writeFileSync(uri, JSON.stringify(data))
  },

  addRoles: (left, right) => {
    var data = fs.readFileSync(uri)
    data = JSON.parse(data)
    data.roles.push({left, right})
    fs.writeFileSync(uri, JSON.stringify(data))
  },

  editEvent: (i, id, name) => {
    var data = fs.readFileSync(uri)
    data = JSON.parse(data)
    data.events[i] = {id, name}
    fs.writeFileSync(uri, JSON.stringify(data))
  },

  editRole: (i, left, right) => {
    var data = fs.readFileSync(uri)
    data = JSON.parse(data)
    data.roles[i] = {left, right}
    fs.writeFileSync(uri, JSON.stringify(data))
  }
}

module.exports = data
