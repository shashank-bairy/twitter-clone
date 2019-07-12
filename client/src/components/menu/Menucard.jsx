import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import {
  clearCurrentProfile,
  deleteAccount
} from "../../actions/profileActions";
import "./Menucard.css";

class Menucard extends Component {
  constructor(props) {
    super(props);
    this.onLogoutClick = this.onLogoutClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
    window.location.href = "/";
    this.props.clearCurrentProfile();
  }
  onDeleteClick(e) {
    e.preventDefault();
    this.props.deleteAccount();
  }
  render() {
    return (
      <div className="Menucard">
        <div className="Menucard__items">
          <Link className="Menucard__Link" onClick={this.onDeleteClick}>
            Delete&nbsp;account
          </Link>
          <Link className="Menucard__Link" onClick={this.onLogoutClick}>
            Log&nbsp;out
          </Link>
        </div>
      </div>
    );
  }
}

Menucard.propTypes = {
  deleteAccount: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, deleteAccount }
)(Menucard);
