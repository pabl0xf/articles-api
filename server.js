'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv');
const mongoose = require('mongoose');
const app = express();
const auth = require('./app/controllers/auth.controller.js');

if (!process.env.ENVIRONMENT) {
  process.env.ENVIRONMENT = 'development';
}

console.log("Environment: ", process.env.ENVIRONMENT);
env.config({ path: './config/' + process.env.ENVIRONMENT +'.env' });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");    
}).catch(err => {
  console.log('Could not connect to the database.');
  process.exit();
});

app.use(auth);

require('./app/routes/article.routes.js')(app);
require('./app/routes/user.routes.js')(app);

// Default 
app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(process.env.PORT, () => {
  console.log("Server is listening on port ", process.env.PORT);
});

module.exports = app
