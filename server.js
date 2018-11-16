'use strict'
require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const morgan = require('morgan');
const passport = require('passport');

//routers
const { router: dayRouter } = require('./controllers/daysRouter');
const { router: usersRouter } = require('./controllers/users');
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');

// Mongoose internally uses a promise-like object,
// but its better to make Mongoose use built in es6 promises
mongoose.Promise = global.Promise;

// mongo db configuration
const { PORT, DATABASE_URL } = require("./config");

const app = express();

//??? What does this do???
app.use(express.json());

//logging
app.use(morgan('common'));

//CORS
const cors = require('cors');
const {CLIENT_ORIGIN} = require('./config');
app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
)

passport.use(localStrategy);
passport.use(jwtStrategy);

// app.use ('/days', dayRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

const jwtAuth = passport.authenticate('jwt', { session: false });

// A protected endpoint which needs a valid JWT to access it
app.get('/api/protected', jwtAuth, (req, res) => {
  return res.json({
    data: 'rosebud'
  });
});





//insert runServer and closeServer functions here that include the connection to the mongo db
//examples can be found in the curriculum 'node-restaurants-app-mongoose'

// closeServer needs access to a server object, but that only
// gets created when `runServer` runs, so we declare `server` here
// and then assign a value to it in run
let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      databaseUrl,
      err => {
        if (err) {
          return reject(err);
        }
        server = app
          .listen(port, () => {
            console.log(`Your app is listening on port ${port}`);
            resolve();
          })
          .on("error", err => {
            mongoose.disconnect();
            reject(err);
          });
      }
    );
  });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log("Closing server");
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };

// app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// module.exports = {app};