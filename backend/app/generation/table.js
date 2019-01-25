const pool = require('../../databasePool.js')

const GenerationTable = {
  storeGeneration: (generation) => {
    return new Promise((resolve, reject) => {
      pool.query(
        //key concept here is the RETURNING id, so a row is returned in response and we grab id
        'INSERT INTO generation(expiration) VALUES($1) RETURNING id',
        [generation.expiration],
        (error, response) => {
          if (error) return reject(error);

          const generationId = response.rows[0].id;
          console.log('from the query return: ',generationId)

          resolve({ generationId });
        }
      );
    });
  },
}
module.exports = GenerationTable;