var chalk = require('chalk')
var { table } = require('table')

function list (ztOne, db) {
  return function (vorpal, options) {
    vorpal
      .command('service status ', 'your node status')
      .action(function (args, callback) {
        this.log('fetching status')
        var self = this
        ztOne.getStatus(function (err, res) {
          if (err) return callback(err)

          var table = formatStatus(res)
          self.log(table)

          db.put(['status'], res, function noop () {})

          callback()
        })
      })
  }
}

function formatStatus (status) {
  var headers = [
    [
      chalk.bold('address'),
      chalk.bold('online'),
      chalk.bold('tcp fallback active'),
      chalk.bold('version')
    ]
  ]

  var data = [[
    status.address,
    status.online,
    status.tcpFallbackActive ? chalk.bgRed('yes') : chalk.bgGreen('no'),
    status.version
  ]]

  return table(headers.concat(data))
}

module.exports = { list: list }
