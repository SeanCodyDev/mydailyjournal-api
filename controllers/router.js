const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
// const passport = require('passport');
// const jwt = require('jsonwebtoken');
// const config = require('../config');
// const {basicStrategy, jwtStrategy} = require('./strategies');

const router = express.Router();

// const jsonParser = bodyParser.json();

const DayController = require('./days');

router.route('/')
	.get((req, res) => {
		res.send('hello router');
	});

app.use('/', router);

// router.get('/', (req, res) => {
// 	res.json({ok: true});
// });

// router.get('/getday', (req, res) => {
// res.json({getday: true});
// });

//Get Days
router.get('/getday', DayController.getDays);
// router.get('/getDay', [passport.authenticate('jwt', {session: false}), jsonParser],DayController.getDays);



module.exports = {router};

// module.exports = {router, basicStrategy, jwtStrategy};
