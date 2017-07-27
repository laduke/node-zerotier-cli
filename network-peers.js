var service = require('./service')

function networkPeers (db) {
  return function (vorpal, options) {
    vorpal
      .command('network peers <networkId>', 'peers related to a network')
      .autocomplete({
        data: function (input, callback) {
          db.get(['centralNetworks'], function (err, res) {
            if (err) res = {}

            callback(
              Object.values(res).map(function (n) {
                return n.id
              })
            )
          })
        }
      })
      .action(function (args, callback) {
        var self = this
        db.get(['peers'], function (err, peers) {
          if (err) {
            self.log('something went wrong')
            return callback()
          }
          if (!Object.values(peers).length) {
            self.log('no peers loaded')
            return callback()
          }
          db.get(['members', args.networkId], function (err, members) {
            if (err) {
              self.log('something went wrong')
              return callback()
            }
            if (!Object.values(members).length) {
              self.log('no members loaded')
              return callback()
            }

            var networkMembers = Object.values(members).map(function (m) {
              return m.nodeId
            })

            var networkPeers = Object.values(peers).filter(function (peer) {
              return networkMembers.includes(peer.address)
            })

            var table = service.peers.formatPeers(networkPeers)
            self.log(table)

            callback()
          })
        })
      })
  }
}
module.exports = networkPeers
