require('dotenv').config()
var vorpal = require('vorpal')()
var less = require('vorpal-less')
var grep = require('vorpal-grep')

var { ztOne } = require('./setup')

var { listPeers } = require('./peers')
var { listNetworks } = require('./networks')

var level = require('level')
var Pathwise = require('level-pathwise')
var db = new Pathwise(level('db'))

vorpal
  .localStorage('ztUtil')
  .use(listPeers(ztOne, db))
  .use(listNetworks(ztOne, db))

  .command('stored', 'asdf')
  .action(function (args, callback) {
    db.get([], function (err, res) {
      console.log(err, res)
      callback()
    })
  })

vorpal.delimiter('zt$').use(less).use(grep).show()
