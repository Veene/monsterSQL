const pool = require('../../databasePool.js');
const DragonTable = require('../dragon/table.js')
const Dragon = require('./index.js')

const getDragonWithTraits = ({ dragonId }) => {
  return Promise.all([
    DragonTable.getDragon({ dragonId: dragonId }), //gets [birthday, nickname, "generationId"] from dragon.id selection
    new Promise((resolve, reject) => {
      pool.query(
        `SELECT "traitType", "traitValue"
        FROM trait
        INNER JOIN dragonTrait ON trait.id = dragonTrait."traitId"
        WHERE dragonTrait."dragonId" = $1`,
        [dragonId],
        (error, response) => {
          if(error) return reject(error);

          resolve(response.rows); //gets 4 rows of ["traitType", "traitValue"] from "dragonId"
        }
      )
    })
  ])
  .then(([dragon, dragonTraits]) => {
    return new Dragon({ //basically creating a new Dragon but it doesnt affect our database just making an instance to much easier show as the dragon u own
      ...dragon, //spread out [birthday, nickname, generationId]
      dragonId : dragonId,
      traits: dragonTraits
    })
  })
  .catch((error) => console.error(error));
  
};
// //debug
// getDragonWithTraits({ dragonId: 1 }).then(dragon => console.log('dragon from getDragonWithTraits from helper: ', dragon))
// .catch(error => console.log(error));

module.exports = { getDragonWithTraits: getDragonWithTraits };