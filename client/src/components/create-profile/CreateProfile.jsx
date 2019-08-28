import React, { Component } from "react";
import "./CreateProfile.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextFieldGroup from "../common/TextFieldGroup";

import isEmpty from "../../validation/is-empty";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: "",
      bio: "",
      city: "",
      country: "",
      website: "",
      dob: new Date(),
      errors: {},
      editProfile: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (!isEmpty(nextProps.profile.profile)) {
      const profile = nextProps.profile.profile;
      this.setState({
        handle: profile.handle,
        bio: profile.bio,
        city: profile.location.city,
        country: profile.location.country,
        website: profile.website,
        dob: new Date(profile.dob),
        editProfile: true
      });
    }
  }
  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      bio: this.state.bio,
      location: {
        city: this.state.city,
        country: this.state.country
      },
      website: this.state.website,
      dob: this.state.dob
    };

    // console.log(profileData);
    this.props.createProfile(profileData, this.props.history);
  }
  onChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }
  onDateChange(date) {
    this.setState({
      dob: date
    });
  }
  render() {
    const { errors } = this.state;
    // console.log(errors);

    return (
      <div className="CreateProfile">
        <section className="section-title-container">
          <div className="section-title">
            <h2 className="section-title-heading">
              {this.state.editProfile ? "Edit Profile" : "Create Profile"}
            </h2>
          </div>
        </section>
        <section className="section-form-container">
          <form onSubmit={this.onSubmit}>
            <div className="create-profile-form">
              <div className="create-profle-form-item">
                <label htmlFor="user-handle">User Handle&#58;</label>
                <TextFieldGroup
                  id="user-handle"
                  placeholder="User handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                />
              </div>
              <div className="create-profle-form-item">
                <label htmlFor="bio">Bio&#58;</label>
                <TextFieldGroup
                  placeholder="Bio"
                  id="bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                />
              </div>
              <div className="create-profle-form-item">
                <label htmlFor="city">City&#58;</label>
                <TextFieldGroup
                  placeholder="City"
                  id="city"
                  name="city"
                  value={this.state.city}
                  onChange={this.onChange}
                  error={errors.city}
                />
              </div>
              <div className="create-profle-form-item">
                <label htmlFor="country">Country&#58;</label>
                <TextFieldGroup
                  placeholder="Country"
                  id="country"
                  name="country"
                  value={this.state.country}
                  onChange={this.onChange}
                  error={errors.country}
                />
              </div>
              <div className="create-profle-form-item">
                <label htmlFor="website">Website&#58;</label>
                <TextFieldGroup
                  placeholder="Website"
                  id="website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                />
              </div>
              <div className="create-profle-form-item">
                <label htmlFor="dob">Date of Birth&#58;</label>
                <div className="date-picker-container">
                  <DatePicker
                    id="dob"
                    className="create-profile-datepicker"
                    selected={this.state.dob}
                    onChange={this.onDateChange}
                    value={this.state.dob}
                  />
                </div>
              </div>
            </div>
            <div className="row button-container">
              <button className="create-profile-button" type="submit">
                {this.state.editProfile ? "Edit Profile" : "Create Profile"}
              </button>
            </div>
          </form>
        </section>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(CreateProfile));
