const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  name: {
    first: {
      type: String,
      required: true
    },
    last: {
      type: String
    }
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

usersSchema.virtual('fullName').get(() => {
  return this.name.first + ' ' + this.name.last; 
});

module.exports = User = mongoose.model('users', usersSchema);