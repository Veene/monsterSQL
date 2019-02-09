const Session = require('../account/session.js');
const AccountTable = require('../account/table.js');
const { hash } = require('../account/helper.js');

//set session for cookie on given client
const setSession = ({ username, res }) => {
  return new Promise((resolve, reject) => {
    const session = new Session({ username });
    const sessionString = session.toString();

    AccountTable.updateSessionId({ 
      sessionId: session.id, 
      usernameHash: HashChangeEvent(username) 
    })
    .then(() => {
      //cookie object
      res.cookie('sessionString', sessionString, {
        expire: Date.now() + 3600000,       //will expire after an hour
        httpOnly: true,                     //protect from cross site scripting attack
     // secure: true //use with https
      });
      resolve({ message: 'session created' })
    })
    .catch(error => reject(error));
  });
}

module.exports = { setSession };