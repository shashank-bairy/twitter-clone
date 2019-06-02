const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const keys = require('../../config/keys');
const User = require('../../models/User');

// Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', (req, res, next) => {
  const { errors , isValid } = validateRegisterInput(req.body);

  if(!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({email: req.body.email.toLowerCase()})
    .then(user => {
      if(user) {
        errors.email = 'Email already exists';
        res.status(400).json(errors);
      } else {
        // storing avatar in databasae  

        const newUser = new User({
          name: {
            first: req.body.first,
            last: req.body.last
          },
          email: req.body.email,
          avatar: (req.body.avatar)?req.body.avatar:'',
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          if(err)
            throw err;
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if(err)
              throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.status(200).json(user))
              .catch(err => res.status(400).json(err));
          });
        });
      }
    })
    .catch(err => console.log(err));
});

// @route POST api/users/login
// @desc Login user
// @access Public
router.post('/login', (req, res, next) => {
  const { errors , isValid } = validateLoginInput(req.body);

  if(!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find if a user with same email exists
  User.findOne({ email: email })
    .then(user => {
      if(!user) {
        errors.email = 'Email incorrect';
        return res.status(404).json(errors);
      }
      
      // check password
      bcrypt.compare(password, user.password)
      .then(isMatch => {
        if(!isMatch) {
          errors.password = 'Password incorrect';
          return res.status(404).json(errors);
        }

        // User matched
        const payLoad = {
          _id: user._id,
          name: user.name,
        }

        // Sign token
        jwt.sign(payLoad, keys.secretOrKey, {expiresIn: 3600}, (err, token) => {
          res.status(200).json({
            success: true,
            token: 'Bearer ' + token
          });
        });

      })
      .catch(err => console.error(err))
    })
    .catch(err => console.error(err));
});

// @route GET api/users/current
// @desc Return current user
// @access Private
router.get('/current', passport.authenticate('jwt',{ session: false }), (req, res, next) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email
  });
});

module.exports = router;