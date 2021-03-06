//const http = require('http');
//const handlers = require('./handlers');

const port = 3030;
const config = require('./config/config');
const database = require('./config/database.config');
const express = require('express');

let app = express();
let environment = process.env.NODE_ENV || 'development';

database(config[environment]);
require('./config/express')(app, config[environment]);
require('./config/routes')(app);
app.listen(port, () => {
    console.log(`Server is runing on http://localhost:${port}/`)
});