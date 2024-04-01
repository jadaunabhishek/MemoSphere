const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');

connectToMongo();
const app = express()
const port = 4001

// to allow frontend to connect with backend
app.use(cors())

// we write this to allow to take user input using body
app.use(express.json())

// Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotes backend listening on port ${port}`)
})


