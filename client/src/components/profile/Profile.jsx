import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getProfileByHandle } from "../../actions/profileActions";
import Moment from "react-moment";

import { Link } from "react-router-dom";

import "./Profile.css";
class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push("/create-profile");
    }
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let profileContent;
    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div className="profileContent">
          <div className="profile-image-container">
            <img
              className="profile-image"
              src={`${window.location.protocol}//${window.location.host}/${user.avatar}`}
              alt="User avatar"
            />
          </div>
          <div className="profile-user-container">
            <div className="user-details-flex">
              <div className="user-details">
                <div className="user-name">
                  <h1 className="user-name-text">{`${user.name.first} ${user.name.last}`}</h1>
                </div>
                <div className="user-username">
                  <span>{`@${profile.handle}`}</span>
                </div>
                <div className="user-bio">
                  <p>{profile.bio}</p>
                </div>
              </div>
              <div className="user-edit-profile">
                <Link to="/edit-profile" className="edit-profile-button">
                  Edit Profile
                </Link>
              </div>
            </div>
            <div className="user-more-details">
              <div className="user-more-details-flex">
                <div className="user-location">
                  <i className="fas fa-map-marker-alt location-icon"></i>
                  {`${profile.location.city}, ${profile.location.country}`}
                </div>
                <div className="user-website">
                  <i className="fas fa-link link-icon"></i>
                  <a href={profile.website}>{profile.website}</a>
                </div>
              </div>
              <div className="user-more-details-flex">
                <div className="user-dob cake">
                  <i className="fas fa-birthday-cake cake-icon"></i>
                  Born &nbsp;
                  <Moment format="MMMM Do, YYYY">{profile.dob}</Moment>
                </div>
                <div className="user-joined">
                  <i className="far fa-calendar-alt calender-icon"></i>
                  Joined &nbsp;
                  <Moment format="MMMM, YYYY">{user.joined_on}</Moment>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="Profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
