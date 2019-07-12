const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../../models/User");
const Profile = require("../../models/Profile");

// Validation
const validateProfileInput = require("../../validation/profile");

// @route GET api/profile
// @desc Get current user profile
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    const errors = {};

    Profile.findOne({ user: req.user._id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.status(200).json(profile);
      })
      .catch(() => {
        errors.internalError = "The server met an unexpected condition";
        res.status(500).json(errors);
      });
  }
);

// @route GET api/profile/all
// @desc Get all profiles
// @access Public
router.get("/all", (req, res, next) => {
  const errors = {};

  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }
      res.status(200).json(profiles);
    })
    .catch(() => {
      errors.internalError = "The server met an unexpected condition";
      res.status(500).json(errors);
    });
});

// @route GET api/profile/handle/:handle
// @desc Get profile by handle
// @access Public
router.get("/handle/:handle", (req, res, next) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(() => {
      errors.internalError = "The server met an unexpected condition";
      res.status(500).json(errors);
    });
});

// @route GET api/profile/handle/:handle
// @desc Get profile by handle
// @access Public
router.get("/user/:user_id", (req, res, next) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(() => {
      errors.internalError = "The server met an unexpected condition";
      res.status(500).json(errors);
    });
});

// @route POST api/profile
// @desc Create/Edit user Profile
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const profileFields = {};
    profileFields.user = req.user._id;
    profileFields.handle = req.body.handle;
    profileFields.bio = req.body.bio;
    profileFields.location = {};
    profileFields.location.city = req.body.location.city;
    profileFields.location.country = req.body.location.country;
    profileFields.website = req.body.website;
    profileFields.dob = req.body.dob;
    profileFields.updatedAt = Date.now();

    Profile.findOne({ user: req.user._id })
      .then(user => {
        if (user) {
          // Update profile
          Profile.findOneAndUpdate(
            { user: req.user._id },
            { $set: profileFields },
            { new: true }
          )
            .then(profile => res.json(profile))
            .catch(() => {
              errors.failedToUpdate = "Profile updation failed";
              res.status(503).json(errors);
            });
        } else {
          // Create new profile
          Profile.findOne({ handle: profileFields.handle })
            .then(profile => {
              if (profile) {
                errors.handle = "This handle already exists";
                return res.status(400).json(errors);
              }

              new Profile(profileFields)
                .save()
                .then(profile => res.status(200).json(profile))
                .catch(() => {
                  errors.failedToUpdate = "Profile creation failed";
                  res.status(503).json(errors);
                });
            })
            .catch(() => {
              errors.internalError = "The server met an unexpected condition";
              res.status(500).json(errors);
            });
        }
      })
      .catch(() => {
        errors.internalError = "The server met an unexpected condition";
        res.status(500).json(errors);
      });
  }
);

// @route DELETE api/profile
// @desc Delete user and profile
// @access Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Profile.findOneAndDelete({ user: req.user._id })
      .then(() => {
        User.findOneAndDelete({ _id: req.user._id })
          .then(() => res.json({ success: true }))
          .catch(err => res.status(404).json(err));
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
