var config = {
  servicePort: process.env.ZT_PORT || 9993,
  serviceHost: process.env.ZT_HOST || 'localhost',
  serviceSecret: process.env.ZT_AUTH || '',

  centralHost: process.env.CENTRAL_HOST || 'https://my.zerotier.com',
  centralPort: process.env.CENTRAL_PORT || 443,
  centralToken: process.env.CENTRAL_TOKEN || ''
}

module.exports = config
