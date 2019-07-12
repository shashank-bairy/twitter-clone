const Validator = require("validator");
const isEmpty = require("./is-empty");

const validateProfileInput = data => {
  const errors = {};
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.location.city = !isEmpty(data.location.city) ? data.location.city : "";
  data.location.country = !isEmpty(data.location.country)
    ? data.location.country
    : "";
  data.website = !isEmpty(data.website) ? data.website : "";
  data.dob = !isEmpty(data.dob) ? data.dob : "";

  // handle
  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Handle field is required";
  }
  // City
  if (Validator.isEmpty(data.location.city)) {
    errors.location.city = "City field is required";
  }
  // Country
  if (Validator.isEmpty(data.location.country)) {
    errors.location.country = "Country field is required";
  }
  // website
  if (data.website !== "" && !Validator.isURL(data.website)) {
    errors.website = "Invalid URL";
  }
  // date of birth
  if (!Validator.toDate(data.dob)) {
    errors.dob = "Invalid date format. Required format is yyyy-mm-dd";
  }
  if (Validator.isEmpty(data.dob)) {
    errors.dob = "Date of Birth field is required";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateProfileInput;
