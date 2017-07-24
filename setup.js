var utils = require('node-zerotier-utils')
var config = require('./config')

var serviceConfig = {
  port: config.servicePort,
  host: config.serviceHost,
  secret: config.serviceSecret
}

var service = utils.service(serviceConfig)

var centralConfig = {
  port: config.centralPort,
  host: config.centralHost,
  secret: config.centralToken
}

var central = utils.central(centralConfig)

module.exports = {
  ztOne: service,
  ztCentral: central
}
