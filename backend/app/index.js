const express = require('express');
const cors = require('cors'); //need this to grab from backend db
const bodyParser = require('body-parser');
const GenerationEngine = require('./generation/engine.js');
const dragonRouter = require('./api/dragon.js');
const generationRouter = require('./api/generation.js');
const accountRouter = require('./api/account.js');

const app = express()
const engine = new GenerationEngine();

app.locals.engine = engine;

//we had backend at localhost 3000 and frontend on localhost 1234, same origin policy blocked. so we need to use cors
app.use(cors({ origin: 'http://localhost:1234' })); //need same origin policy between backend and frontend to prevent cross site scripting attacks
app.use(bodyParser.json());

app.use('/dragon', dragonRouter);
app.use('/generation', generationRouter);
app.use('/account', accountRouter)

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
