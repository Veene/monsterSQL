const app = require('../app/index.js')

const port = 3000

//this is the entry point of the whole server in app.listen
app.listen(port, () => console.log(`listening on port ${port}`))