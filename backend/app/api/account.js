const { Router } = require('express');
const AccountTable = require('../account/table.js');
const { hash } = require('../account/helper.js');
const { setSession } = require('./helper.js');

const router = new Router();

router.post('/signup', (req, res, next) => {
  // const { username, password } = req.body;
  const { username, password } = req.body;
  const usernameHash = hash(username);
  const passwordHash = hash(password)

  //need to do a quick check to see if username already exists in DB
  AccountTable.getAccount({ usernameHash })
    .then(({ account }) => {
      if(!account) {
        return AccountTable.storeAccount({ usernameHash, passwordHash })
      } else {
        const error = new Error('This username has already been taken');

        error.statusCode = 409;

        throw error;
      }
    })
    .then(() => {
      setSession({ username, res });
      
      res.json({ message: 'success!' });
    })
    .catch(error => next(error));
  
})

module.exports = router;