const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//still a work in progress
const DaySchema = new Schema({
    user: {
    	type: Object,
    	email: String,
    	id: String,
    },
    date: String,
    grateful: {
    	type: Array,
        text: String
    }
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


module.exports = mongoose.model('Day', DaySchema);