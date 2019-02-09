const uuid = require('uuid/v4');
const { hash } = require('./helper.js');

const SEPARATOR = '|';

class Session {
  constructor({ username }) {
    this.username = username;
    this.id = uuid();
  }
  toString() {
    const { username, id } = this;
    //method, so session instances can call static func to get the string version
    return Session.sessionString({ username, id });
  }
  static parse(sessionString) {
    const sessionData = sessionString.split(SEPARATOR);

    return {
      username: sessionData[0],
      id: sessionData[1],
      sessionHash: sessionData[2]
    };
  }

  static verify(sessionString) {
    const {username, id, sessionHash } = Session.parse(sessionString);

    const accountData = Session.accountData({ username, id });
    //the final check to see if everything is hashing properly
    return hash(accountData) === sessionHash;
  }
  //concatenate them so we can hash it
  static accountData({ username, id }) {
    return `${username}${SEPARATOR}${id}`;
  }
  //build off of accountData function to get hash of both
  static sessionString({ username, id }) {
    const accountData = Session.accountData({ username, id });

    return `${accountData}${SEPARATOR}${hash(accountData)}`
  }
}

const foo = new Session({ username: 'foo' });
const fooString = foo.toString();

console.log('Session.parse(fooString) :', Session.parse(fooString));
console.log('Session.verify(fooString)', Session.verify(fooString));

const fakeFooString = `admin_${fooString}`;
console.log('Session.verify(fakeFooString)', Session.verify(fakeFooString));

module.exports = Session;