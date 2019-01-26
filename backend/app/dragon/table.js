const pool = require('../../databasePool.js');
const DragonTraitTable = require('../dragonTrait/table.js')

class DragonTable {
  static storeDragon(dragon) {
    const { birthdate, nickname, generationId } = dragon
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO dragon (birthdate, nickname, "generationId") 
        VALUES ($1, $2, $3) RETURNING id`,
        [birthdate, nickname, generationId],
        (error, response) => {
          if(error) return reject(error);

          const dragonId = response.rows[0].id;

          Promise.all(
            dragon.traits.map(({ traitType, traitValue }) => {
              return DragonTraitTable.storeDragonTrait({
                dragonId: dragonId,
                traitType: traitType,
                traitValue: traitValue
              });
            })).then(() => resolve({ dragonId: dragonId }))
            .catch((error) => reject(error));
        })
    })
  }
  static getDragon({ dragonId }) {
      return new Promise((resolve, reject) => {
        pool.query(
          `SELECT birthdate, nickname, "generationId" 
          FROM dragon 
          WHERE dragon.id = $1`,
          [dragonId],
          (error, response) => {
            if(error) return reject(error);
            if(response.rows.length === 0) return reject(new Error('no dragon'))
            resolve(response.rows[0]); //gets [birthday, nickname, "generationId"] from dragon.id selection
          }
        )
    })
  }
}

// //debug code
// DragonTable.getDragon({ dragonId : 2 })
//   .then(dragon => console.log('full dragon resolved: ', dragon))
//   .catch((error) => console.log(error))

module.exports = DragonTable;