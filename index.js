require('dotenv').config()
var vorpal = require('vorpal')()
var less = require('vorpal-less')
var grep = require('vorpal-grep')

var { ztOne, ztCentral } = require('./setup')

var service = require('./service')
var central = require('./central')

var level = require('level')
var Pathwise = require('level-pathwise')
var db = new Pathwise(level('db'))

vorpal
  .use(service.peers.list(ztOne, db))
  .use(service.networks.list(ztOne, db))
  .use(service.status.list(ztOne, db))
  .use(central.networks.list(ztCentral, db))
  .use(central.members.list(ztCentral, db))

  .command('stored', 'asdf')
  .action(function (args, callback) {
    db.get([], function (err, res) {
      console.log(err, res)
      callback()
    })
  })

vorpal
  .delimiter('zt$')
  .use(less)
  .use(grep)
  .show()
