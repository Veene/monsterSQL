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
            })).then(() => resolve({ dragonId }))
            .catch((error) => reject(error));
        })
    })
  }
}

module.exports = DragonTable;