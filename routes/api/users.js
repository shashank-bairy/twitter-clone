const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const multer = require("multer");
const sharp = require("sharp");

const keys = require("../../config/keys");
const User = require("../../models/User");

// Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "files");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true); // if you want to accept that file
  } else {
    cb(null, false); // if wanna reject storing that file
  }
};

const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", upload.single("avatar"), (req, res, next) => {
  let { errors, isValid } = validateRegisterInput(req.body);

  if (!req.file) {
    errors.avatar = "Please upload your avatar image.";
    if (isValid) isValid = !isValid;
  }

  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email.toLowerCase() })
    .then(user => {
      if (user) {
        errors.email = "Email already exists";
        res.status(400).json(errors);
      } else {
        const newUser = new User({
          name: {
            first: req.body.firstName,
            last: req.body.lastName
          },
          email: req.body.email,
          avatar: req.file.filename, // if path required? use req.file.path
          password: req.body.password
        });

        // sharp(req.file.path)
        //   .resize(300, 300)
        //   .toBuffer()
        //   .then(data => console.log(data))
        //   .catch(err => console.log(err));

        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
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
router.post("/login", (req, res, next) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find if a user with same email exists
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        errors.email = "Email incorrect";
        return res.status(404).json(errors);
      }

      // check password
      bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) {
            errors.password = "Password incorrect";
            return res.status(404).json(errors);
          }

          // User matched
          const payLoad = {
            _id: user._id,
            name: user.name,
            avatar: user.avatar,
            joined_on: user.date
          };

          // Sign token
          jwt.sign(
            payLoad,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.status(200).json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        })
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
});

// @route GET api/users/current
// @desc Return current user
// @access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
