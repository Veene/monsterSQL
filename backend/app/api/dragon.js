const { Router } = require('express');
const DragonTable = require('../dragon/table.js')

const router = new Router();

router.get('/new', (req, res, next) => {
  const dragon = req.app.locals.engine.generation.newDragon() //create
  // const traits = dragon.traits.forEach(trait => {
  //   TraitTable.getTraitId({ trait.traitType, trait.traitValue})
  // })

  

  DragonTable.storeDragon(dragon) //stores created dragon
    .then(({ dragonId }) => { //dragonId resolves from promise, its result of table giving the dragon an ID
      console.log('dragonId: ', dragonId)

      //grab that id created on table, so that we can reference dragon inside table
      dragon.dragonId = dragonId

      //PUTS THIS OUT TO PAGE, so when fetched with an api, the api grabs this json
      res.json({ dragon });
    })
    .catch((error) => next(error));
});

module.exports = router;