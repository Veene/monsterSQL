const { Router } = require('express');
const AccountTable = require('../account/table.js');

const router = new Router();

router.post('/signup', (req, res, next) => {
  // const { username, password } = req.body;
  const account = req.body;

  AccountTable.storeAccount(account)
    .then(() => res.json({ message: 'success!' }))
    .catch(e => next(e));
})

module.exports = router;