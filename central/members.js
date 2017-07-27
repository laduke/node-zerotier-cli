var chalk = require('chalk')
var { table } = require('table')

var { mergeEntities } = require('../util')

function list (ztCentral, db) {
  return function (vorpal, options) {
    vorpal
      .command('central members <networkId> ', 'lists network members')
      .autocomplete({
        data: function (input, callback) {
          db.get(['centralNetworks'], function (err, res) {
            if (err) res = {}

            callback(Object.values(res).map(function (n) {
              return n.id
            }))
          })
        }
      })
      .action(function (args, callback) {
        this.log('fetching members')
        var self = this

        ztCentral.getMembers(args.networkId, function (err, res) {
          if (err) return callback(err)

          mergeEntities(db, res, 'members', 'nodeId')

          var table = formatMembers(res)
          self.log(table)

          callback()
        })
      })
  }
}

function formatMembers (networks) {
  var headers = [
    [
      chalk.bold('id'),
      chalk.bold('name'),
      chalk.bold('online'),
      chalk.bold('physical address')
    ]
  ]

  var data = networks.map(network => [
    network.nodeId,
    network.name || '',
    network.online,
    network.physicalAddress
  ])

  return table(headers.concat(data), {})
}

module.exports = { list: list }
