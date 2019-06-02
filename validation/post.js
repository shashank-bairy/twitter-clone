const Validator = require('validator');
const isEmpty = require('./is-empty');

// validates both post and comment
const validatePostInput = (data) => {
  const errors ={};
  data.text = !isEmpty(data.text) ? data.text : '';

  // text
  if(Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required';
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validatePostInput;