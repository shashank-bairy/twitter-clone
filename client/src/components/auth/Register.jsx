import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import twitter_bird_url from "../../img/twitter-bird.png";
import "./Register.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      avatar: null,
      password: "",
      confirmPassword: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onAvatarChange = this.onAvatarChange.bind(this);
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    // const newUser = {
    //   name: {
    //     first: this.state.firstName,
    //     last: this.state.lastName
    //   },
    //   avatar: this.state.avatar,
    //   email: this.state.email,
    //   password: this.state.password,
    //   confirmPassword: this.state.confirmPassword
    // };

    let formData = new FormData();
    formData.append("firstName", this.state.firstName);
    formData.append("lastName", this.state.lastName);
    formData.append("avatar", this.state.avatar);
    formData.append("email", this.state.email);
    formData.append("password", this.state.password);
    formData.append("confirmPassword", this.state.confirmPassword);
    // this.props.registerUser(newUser, this.props.history);
    this.props.registerUser(formData, this.props.history);
  }
  onAvatarChange(e) {
    // e.preventDefault();
    this.setState({ avatar: e.target.files[0] });
  }
  render() {
    const { errors } = this.state;

    return (
      <div className="Register">
        <div className="Register__container">
          <div className="Register__heading">
            <img
              className="Register__twitter-bird"
              src={twitter_bird_url}
              alt="Twitter bird"
            />
            <h1 className="Register__page-title">Join Twitter today</h1>
          </div>
          <div className="Register__form-container">
            <form
              className="Register__form"
              noValidate
              onSubmit={this.onSubmit}
            >
              <TextFieldGroup
                placeholder="First Name"
                name="firstName"
                value={this.state.firstName}
                onChange={this.onChange}
                error={errors.name}
              />
              <TextFieldGroup
                placeholder="Last Name"
                name="lastName"
                value={this.state.lastName}
                onChange={this.onChange}
                error={null}
              />
              <TextFieldGroup
                placeholder="Email"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                error={errors.email}
              />
              <TextFieldGroup
                placeholder="Password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.onChange}
                error={errors.password}
              />
              <TextFieldGroup
                placeholder="Confirm password"
                name="confirmPassword"
                type="password"
                value={this.state.confirmPassword}
                onChange={this.onChange}
                error={errors.confirmPassword}
              />
              <input type="file" name="avatar" onChange={this.onAvatarChange} />
              <button type="submit" className="Register__button">
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
