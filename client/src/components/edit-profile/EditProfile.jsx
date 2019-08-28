import React, { Component } from "react";

import "./EditProfile.css";

class EditProfile extends Component {
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
    console.log(profileData);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="EditProfile">
        <div className="EditProfile__heading">Edit Profile</div>
      </div>
    );
  }
}

export default EditProfile;
