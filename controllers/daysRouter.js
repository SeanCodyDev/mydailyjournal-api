const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Mongoose internally uses a promise-like object,
// but its better to make Mongoose use built in es6 promises
mongoose.Promise = global.Promise;

// mongo db configuration
const { PORT, DATABASE_URL } = require("../config");
const { Day } = require("../models/days");

// GET requests to /days
router.get('/', (req, res) => {
  Day.find()
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


// POST - Create a new Day
// No validation needed?
// IMPROVEMENT - But if nothing is sent in the one of the lists, don't save that in the document?
router.post('/', (req, res) => {
  Day.create({
    user: req.body.user,
    date: req.body.date,
    grateful: req.body.grateful,
    greatness: req.body.greatness,
    affirmation: req.body.affirmation
  })
    .then(day => res.status(201).json(day))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

// PUT - Update 
// No validation needed?
// IMPROVEMENT - But if nothing is sent in the one of the lists, don't save that in the document?
router.put('/:id', (req, res) => {
	Day.update(
		{"_id": req.params.id},
		{
			$set: {
				grateful: req.body.grateful,
				greatness: req.body.greatness,
				affirmation: req.body.affirmation
			}
		}
	)
	.then(day => res.status(201).json(day))
	.catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

// DELETE - No need for this at MVP stage

module.exports = router;