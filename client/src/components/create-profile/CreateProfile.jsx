import React, { Component } from "react";
import "./CreateProfile.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { createProfile } from "../../actions/profileActions";

import TextFieldGroup from "../common/TextFieldGroup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
      errors: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
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

    this.props.createProfile(profileData, this.props.history);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onDateChange(date) {
    this.setState({
      dob: date
    });
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="CreateProfile">
        <section className="section-title-container">
          <div className="section-title">
            <h2 className="section-title-heading">Create Profile</h2>
          </div>
        </section>
        <section className="section-form-container">
          <form onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder="User handle"
              name="handle"
              value={this.state.handle}
              onChange={this.onChange}
              error={errors.handle}
            />
            <TextFieldGroup
              placeholder="Bio"
              name="bio"
              value={this.state.bio}
              onChange={this.onChange}
              error={errors.handle}
            />
            <TextFieldGroup
              placeholder="City"
              name="city"
              value={this.state.city}
              onChange={this.onChange}
              error={errors.handle}
            />
            <TextFieldGroup
              placeholder="Country"
              name="country"
              value={this.state.country}
              onChange={this.onChange}
              error={errors.handle}
            />
            <TextFieldGroup
              placeholder="Website"
              name="website"
              value={this.state.website}
              onChange={this.onChange}
              error={errors.handle}
            />
            <DatePicker
              selected={this.state.dob}
              onChange={this.onDateChange}
              value={this.state.dob}
            />
            <button type="submit">Create Profile</button>
          </form>
        </section>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
