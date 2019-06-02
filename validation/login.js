const Validator = require('validator');
const isEmpty = require('./is-empty');

const validateLoginInput = (data) => {
  const errors ={};
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  // email
  if(!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if(Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }
  // password
  if(!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(data.password))) {
    errors.password = 'Password should have minimum 8 characters with atleast one letter and number';
  }
  if(Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateLoginInput;