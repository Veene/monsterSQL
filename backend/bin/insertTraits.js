const pool = require('../databasePool.js');
const TRAITS = require('../data/traits.json');

TRAITS.forEach((trait) => {
  const traitType = trait.type;
  const traitValues = trait.values;

  traitValues.forEach((traitValue) => {
    pool.query(
      `INSERT INTO trait("traitType", "traitValue") 
      VALUES($1, $2) RETURNING id`,
      [traitType, traitValue],
      (error, response) => {
        if(error) console.error(error);

        const traitId = response.rows[0].id;

        console.log(`Inserted trait - id: ${traitId}`)
      })
  })
})

