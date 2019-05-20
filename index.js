const express = require('express')
const app = express()
const mongoose = require('mongoose');

const dotenv = require('dotenv')

//Import Routes
const authRoute = require('./routes/auth')
const posts = require('./routes/posts')
const verifyToken = require('./routes/verifyToken')

//Dotenv to protect db acess_uri
dotenv.config();

// Connext to DB!
mongoose.connect(process.env.DB_CONNECT,
       { useNewUrlParser: true }, (err) => {
      if(err) throw 'MongoDB Connection'
      console.log('connected to db :)')
      })
 
// Middeleware
app.use(express.json())
// Route Middelware()
app.use('/api/user/', authRoute)
// app.use(verifyToken)
app.use('/api/posts', verifyToken, posts)
// Start the server
app.listen(3000, () => {
      console.log('Server Up and running')
})