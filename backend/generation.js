const Dragon = require('./dragon.js')
const GenerationEngine = require('./engine.js')
const { REFRESH_RATE, SECONDS } = require('./config.js')

const refreshRate = REFRESH_RATE * SECONDS

class Generation {
  constructor() {
    this.expiration = this.calculateExpiration();
  }
  calculateExpiration() {
    const expirationPeriod = Math.floor(Math.random() * (refreshRate/2))
    const msUntilExpiration = Math.random() < 0.5 ? refreshRate - expirationPeriod: refreshRate + expirationPeriod

    //date.now gives us all the milliseconds until now, so when you add few milliseconds, it just adds that to the time - bascially wat we want
    return new Date(Date.now() + msUntilExpiration)
  }
  newDragon() {
    if(Date.now() > this.expiration) {
      throw new Error('This generation expired on ' + this.expiration)
    }
    return new Dragon();
  }
}
module.exports = Generation