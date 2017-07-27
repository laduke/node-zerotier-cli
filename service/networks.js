var chalk = require('chalk')
var { table } = require('table')

var { mergeEntities } = require('../util')

function list (ztOne, db) {
  return function (vorpal, options) {
    vorpal
      .command('service networks ', 'lists networks')
      .action(function (args, callback) {
        this.log('fetching networks')
        var self = this
        ztOne.getNetworks(function (err, res) {
          if (err) return callback(err)

          var table = formatNetworks(res)
          self.log(table)

          mergeEntities(db, res, 'networks', 'nwid')

          callback()
        })
      })
  }
}

function formatNetworks (networks) {
  var headers = [
    [
      chalk.bold('id'),
      chalk.bold('name'),
      chalk.bold('status'),
      chalk.bold('type'),
      chalk.bold('if'),
      chalk.bold('allow global'),
      chalk.bold('allow default')
    ]
  ]

  var data = networks.map(network => [
    network.id,
    network.name,
    network.status,
    network.type,
    network.portDeviceName,
    network.allowGlobal,
    network.allowDefault
  ])

  return table(headers.concat(data))
}

module.exports = { list: list }
