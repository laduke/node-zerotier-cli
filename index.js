require('dotenv').config()
var vorpal = require('vorpal')()
var less = require('vorpal-less')
var grep = require('vorpal-grep')

var { ztOne } = require('./setup')

var { listPeers } = require('./peers')

vorpal.use(listPeers(ztOne))

vorpal.delimiter('zt$').use(less).use(grep).show()
