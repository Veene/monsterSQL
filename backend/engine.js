const Generation = require('./generation.js')

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

    console.log('new gen: ', this.generation)

    this.timer = setTimeout(() => {
      this.buildNewGeneration()
    },this.generation.expiration.getTime() - Date.now() ); //getTime returns milliseconds, date.now returns milliseconds
  }
}

module.exports = GenerationEngine