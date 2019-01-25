const express = require('express')
const GenerationEngine = require('./generation/engine.js')
const dragonRouter = require('./api/dragon.js')
const generationRouter = require('./api/generation.js')

const app = express()
const engine = new GenerationEngine();

app.locals.engine = engine;
app.use('/dragon', dragonRouter);
app.use('/generation', generationRouter);

//express recongnizes 4 argument middleware as error handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500 //internal error code

  res.status(statusCode).json({
    type: 'error', message: err.message
  })
});

//this is where the magic happens. recursive build is called for generations
engine.start();
app.get('/', (req, res, next) => {
  res.send('Hello John');
})
//app.get( /dragon/new ) => gets new dragon in json format moved to api folder and is using ROUTER from express

module.exports = app;
