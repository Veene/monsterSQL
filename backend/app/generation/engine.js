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
    this.generation = new Generation()

    //everytime buildNewGen runs, pool from module pg(node-postgre) inserts query
    GenerationTable.storeGeneration(this.generation)

    console.log('new generation: ', this.generation)

    this.timer = setTimeout(() => {
      this.buildNewGeneration()
    },this.generation.expiration.getTime() - Date.now() ); //getTime returns milliseconds, date.now returns milliseconds
  }
}

module.exports = GenerationEngine