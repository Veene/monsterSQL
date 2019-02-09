//hashes input straight to SHA256
const SHA256 = require('crypto-js/sha256');
//custom hash method to add another layer of hash
const { APP_SECRET } = require('../../secrets/index.js');


const hash = str => {
  //bloat it for extra security, sha256 returns a complicated obj need toString()
  return SHA256(`${APP_SECRET}${str}${APP_SECRET}`).toString();
}

module.exports = { hash: hash };