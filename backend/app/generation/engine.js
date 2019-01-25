const Generation = require('./index.js')
const GenerationTable = require('./table.js')

class GenerationEngine {
  constructor() {
    this.generation = null
    this.timer = null
  }
  start() {
    this.buildNewGeneration();
  }
  stop() {
    clearTimeout(this.timer)
  }
  buildNewGeneration() {
    const generation = new Generation();

    //everytime buildNewGen runs, pool from module pg(node-postgre) inserts query
    GenerationTable.storeGeneration(generation)
      //storeGen now resolves a promise with generationId
      .then(({ generationId }) => {
        this.generation = generation;
        //we created this.generationId on generation to be undefined
        this.generation.generationId = generationId;

        console.log('new generation: ', this.generation)

        this.timer = setTimeout(() => {
          this.buildNewGeneration()
        },this.generation.expiration.getTime() - Date.now() ); //getTime returns milliseconds, date.now returns milliseconds
      })
      .catch((error) => console.error(error));
  }
}

module.exports = GenerationEngine