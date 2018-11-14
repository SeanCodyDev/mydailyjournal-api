'use strict';

const mongoose = require('mongoose');

//still a work in progress
const daySchema = mongoose.Schema({
    user: {
    	email: String,
    	id: String,
    },
    date: String,
    grateful: [{
        text: String,
        completed: String
    }]
    	// list: {
    	// 	title: String,
	    // 	tasks: {
	    // 		type: Array,
	    // 		task: {
		   //  		text: String,
		   //  		completed: Boolean,
		   //  		editing: Boolean
		   //  	}
	    // 	}
    	// }
    
});

//schema example
const restaurantSchema = mongoose.Schema({
  // the `name` property is String type and required
  name: {type: String, required: true},
  borough: {type: String, required: true},
  cuisine: {type: String, required: true},
  // the `address` property is an object
  address: {
    building: String,
    // coord will be an array of string values
    coord: [String],
    street: String,
    zipcode: String
  },
  // grades will be an array of objects
  grades: [{
    // Date type!
    date: Date,
    grade: String,
    score: Number
  }]
});

// Mongoose will use the first argument we pass to .model() ('day') to determine the collection in our database that corresponds to this model - db.days
const Day = mongoose.model('Day', daySchema);

module.exports = { Day };