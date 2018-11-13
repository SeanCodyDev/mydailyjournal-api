const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

const dayRouter = require('./controllers/days');

app.get('/', (req, res) => {
res.json({ok: true});
});

const cors = require('cors');
const {CLIENT_ORIGIN} = require('./config');

app.use('/days', dayRouter);

app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = {app};