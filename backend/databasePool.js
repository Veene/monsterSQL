const { Pool } = require('pg') //pool class
const databaseConfiguration = require('./secrets/databaseConfiguration.js')

//instance can run query pools on tables
const pool = new Pool(databaseConfiguration); 

module.exports = pool;

//debug tool
// pool.query('SELECT foo FROM generation', (error, response) => {
//   if(error) return console.log('error', error);

//   console.log('response.rows', response.rows)
// });
