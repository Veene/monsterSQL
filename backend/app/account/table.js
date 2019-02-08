const pool = require('../../databasePool.js');

class AccountTable {
  static storeAccount(account) {
    const { username, password } = account;
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO account (username, password)
        VALUES ($1, $2) RETURNING id`,
        [username, password],
        (error, response) => {
          if(error) return reject(error);

          const accountId = response.rows[0].id;
          // console.log('storing accountId: ', accountId)
          resolve(accountId)
        }
      )
    })
  } 
}

module.exports = AccountTable;