const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.js');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");    
}).catch(err => {
  console.log('Could not connect to the database.');
  process.exit();
});

app.get('/api', (req, res) => {
  res.json({ info: 'Api version 1.0.0'});
});

require('./app/routes/article.routes.js')(app);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});