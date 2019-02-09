const pool = require('../../databasePool.js');

class AccountTable {
  static storeAccount(account) {
    const { usernameHash, passwordHash } = account;
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO account ("usernameHash", "passwordHash")
        VALUES ($1, $2) RETURNING id`,
        [usernameHash, passwordHash],
        (error, response) => {
          if(error) return reject(error);

          const accountId = response.rows[0].id;
          // console.log('storing accountId: ', accountId)
          resolve(accountId)
        }
      )
    })
  }
  static getAccount(username) {
    const { usernameHash } = username;
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT id, "passwordHash" FROM account 
         WHERE "usernameHash" = $1`,
         [usernameHash],
         (error, response) => {
           if (error) return reject(error);
           console.log('getAccount static function response.rows[0]: ', response.rows[0])
           resolve({ account: response.rows[0] });
         }
      )
    });
  }
  static updateSessionId({ sessionId, usernameHash }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE account SET "sessionId" = $1 WHERE "usernameHash" = $2`,
        [sessionId, usernameHash],
        (error, response) => {
          if(error) return reject(error);

          resolve();
        }
      )
    })
  } 
}

module.exports = AccountTable;