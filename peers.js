var chalk = require('chalk')
var { table } = require('table')
var pad = require('pad') // LOL

function listPeers (ztOne) {
  return function (vorpal, options) {
    vorpal
      .command('peers ', 'lists peers')
      .option('-a, --active', 'exclude inactive nodes')
      .option('-p, --planets', 'exclude leaf nodes')
      .option('-l, --leaves', 'exclude planet nodes')
      .action(function (args, callback) {
        this.log('fetching peers')
        var self = this
        ztOne.getPeers(function (err, res) {
          if (err) return callback(err)

          var peers = res
              .filter(rejectInactive(args.options.active))
              .filter(rejectLeaves(args.options.planets))
              .filter(rejectPlanets(args.options.leaves))

          var table = formatPeers(peers)
          self.log(table)
          self.log(peers.length + ' peers')

          callback()
        })
      })
  }
}

function rejectInactive (excludeInactive) {
  return function (peer) {
    return excludeInactive ? peer.paths.length : true
  }
}

function rejectLeaves (excludeLeaves) {
  return function (peer) {
    return excludeLeaves ? peer.role !== 'LEAF' : true
  }
}

function rejectPlanets (excludePlanets) {
  return function (peer) {
    return excludePlanets ? peer.role !== 'PLANET' : true
  }
}

function formatPeers (peers) {
  var headers = [
    [
      chalk.bold('address'),
      chalk.bold('role'),
      chalk.bold('latency'),
      chalk.bold('paths')
    ]
  ]

  var data = peers.map(peer => [
    peer.address,
    peer.role,
    peer.latency,
    formatPaths(peer.paths)
  ])

  return table(headers.concat(data), {
    columns: {
      3: {
        width: 60
      }
    }
  })
}

function formatPaths (paths) {
  return paths
    .map(path =>
      Object.entries(path)
        .map(entry => pad(entry.join(': '), 60))
        .join('')
        .concat(pad('--', 60))
    )
    .join('')
}

module.exports = { listPeers: listPeers }
