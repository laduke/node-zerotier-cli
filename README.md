# What's this?
Command line interface to ZeroTier Central and to your local ZeroTierOne service
With tab completion and stuff like that.

# Setup
- `git pull https://github.com/laduke/node-zerotier-cli.git`
- `npm install`
- Get your ZeroTier authtoken.secret 
  - `cat /Library/Application\ Support/ZeroTier/One/authtoken.secret `
- Get a ZeroTier Central API Token https://my.zerotier.com/
- `CENTRAL_TOKEN=mycentralapitoken ZT_AUTH=myauthtoken node index.js`
- or put 
```
CENTRAL_TOKEN=mycentralapitoken 
ZT_AUTH=myauthtoken
```
in a `.env` file in the project root

## Screenshot

![jul-24-2017 11-42-06](https://user-images.githubusercontent.com/11598/28539065-41cb97f6-7065-11e7-965c-a5feff868a91.gif)
