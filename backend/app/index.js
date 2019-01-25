const express = require('express')
const GenerationEngine = require('./generation/engine.js')
const dragonRouter = require('./api/dragon.js')
const generationRouter = require('./api/generation.js')

const app = express()
const engine = new GenerationEngine();

app.locals.engine = engine;
app.use('/dragon', dragonRouter)
app.use('/generation', generationRouter)

//this is where the magic happens. recursive build is called for generations
engine.start();
app.get('/', (req, res) => {
  res.send('Hello John');
})
//app.get( /dragon/new ) => gets new dragon in json format moved to api folder and is using ROUTER from express

module.exports = app;
