const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require('passport');


// Mongoose internally uses a promise-like object,
// but its better to make Mongoose use built in es6 promises
mongoose.Promise = global.Promise;

// mongo db configuration
const { PORT, DATABASE_URL } = require("../config");
const { Day } = require("../models/days");

const { router: authRouter} = require('../auth');
const jwtAuth = passport.authenticate('jwt', { session: false });
passport.use(jwtAuth);

// GET requests to /days
router.get('/', jwtAuth, (req, res) => {
  console.log("req.user.id", req.user.id);
  Day
    .find({"user.id": req.user.id})
    // we're limiting because restaurants db has > 25,000
    // documents, and that's too much to process/return
    .limit(10)
    // success callback: for each day we got back, we'll
    // models.js in order to only expose the data we want the API return.    
    .then(days => {
      res.json(days);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});


// POST - Create a new Day or Update existing
router.post('/', jwtAuth, (req, res) => {
  console.log("req.user", req.user)
  console.log('req.body', req.body)
  //query for the day... unique day _id
  let query = {'_id': (req.body._id || new mongoose.mongo.ObjectID())};
  console.log('query', query);
  let updates = {
    $set: {
      user: req.user,
      date: req.body.date,
      grateful: req.body.grateful,
      greatness: req.body.greatness,
      affirmation: req.body.affirmation
    }
  };

  let options = {upsert: true, returnNewDocument: false, new: true};

  Day
    .findOneAndUpdate(query, updates, options)
    .then(day => res.status(201).json(day))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });

});



// DELETE - No need for this at MVP stage

module.exports = {router};