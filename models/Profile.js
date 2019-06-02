const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  location: {
    city: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  },
  website: {
    type: String
  },
  dob: {
    type: Date,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', profileSchema);