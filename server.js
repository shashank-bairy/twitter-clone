const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to mongodb
mongoose
  .connect('mongodb://localhost:27017/social-network', { useNewUrlParser: true })
  .then(() => console.log('Connected to Mongodb'))
  .catch(err => console.log(err));

app.get('/', function (req, res) {
  res.send('hello world');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});