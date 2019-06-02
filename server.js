const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

require('./models/User');
require('./models/Profile');
require('./models/Post');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to mongodb
mongoose
  .connect('mongodb://localhost:27017/twitter-clone', { useNewUrlParser: true })
  .then(() => console.log('Connected to Mongodb'))
  .catch(err => console.log(err));
mongoose.set('useFindAndModify', false);

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.get('/', function (req, res, next) {
  res.send('Landing page!');
});

 // Handle 404
app.use(function(req, res) {
  res.status(404).send('404: Page not Found');
});

// Handle 500
app.use(function(error, req, res, next) {
  res.status(500).send('500: Internal Server Error');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});