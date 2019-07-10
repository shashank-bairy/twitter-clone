const Validator = require("validator");
const isEmpty = require("./is-empty");

const validateRegisterInput = data => {
  let errors = {};
  data.name.first = !isEmpty(data.name.first) ? data.name.first : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmPassword = !isEmpty(data.confirmPassword)
    ? data.confirmPassword
    : "";
  data.avatar = !isEmpty(data.avatar) ? data.avatar : "";

  // name
  if (!Validator.isLength(data.name.first, { min: 2, max: 40 })) {
    errors.name = "First name must be between 2 and 40 characters";
  }
  if (Validator.isEmpty(data.name.first)) {
    errors.name = "First name field is required";
  }
  // email
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  // password
  if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(data.password)) {
    errors.password =
      "Password should have minimum 8 characters with atleast one letter and number";
  }
  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "Password and Confirm passwords must match";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Confirm password field is required";
  }
  // avatar
  if (data.avatar !== "" && !Validator.isURL(data.avatar)) {
    errors.avatar = "Invalid avatar URL";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateRegisterInput;
