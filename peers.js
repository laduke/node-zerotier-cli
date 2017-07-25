var chalk = require('chalk')
var { table } = require('table')
var pad = require('pad') // LOL

var { mergeEntities } = require('./util')

function listPeers (ztOne, db) {
  return function (vorpal, options) {
    vorpal
      .command('peers ', 'lists peers')
      .option('-a, --active', 'exclude inactive nodes')
      .option('-p, --planets', 'exclude leaf nodes')
      .option('-l, --leaves', 'exclude planet nodes')
      .option('-c, --cache', 'print stored peers')
      .action(function (args, callback) {
        this.log('fetching peers')
        var self = this
        ztOne.getPeers(function (err, res) {
          if (err) return callback(err)

          var peers = filterPeers(res, args.options)
          var table = formatPeers(peers)

          self.log(table)
          self.log(peers.length + ' peers')

          mergeEntities(db, res, 'peers')

          callback()
        })
      })
  }
}

function filterPeers (peers, options) {
  return peers
      .filter(rejectInactive(options.active))
      .filter(rejectLeaves(options.planets))
      .filter(rejectPlanets(options.leaves))
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
