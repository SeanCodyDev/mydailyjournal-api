const express = require("express");
const router = express.Router();

const Day = require('../models/days');


//hello
router.get('/', (req, res) => {
	res.json({dayRouter: true})
});

//create a new day for entries
//model after Endeavors addDay route
router.post('/', (req, res) => {
	console.log('post new Day called')
	let day = new Day();
	    day['date'] = "today";
	    day.save();
	    return res.json({
	        data: 'bacon'
    }); 
})

// 1 - Create model for Days, import model - DONE
// 2 - Create POST endpoint for creating a day
// 3 - Configure for local db collection
// 3 - Test endpoint for creating a Day using Postman



module.exports = router;