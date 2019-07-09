import React, { Component } from "react";
import "./Register.css";

import TextFieldGroup from "../common/TextFieldGroup";

import twitter_bird_url from "../../img/twitter-bird.png";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {}
  componentWillReceiveProps() {}
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: {
        first: this.state.firstName,
        last: this.state.lastName
      },
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };
    console.log(newUser);
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
              alt=""
            />
            <h1 className="Register__page-title">Sign up for Twitter</h1>
          </div>
          <div className="Register__form-container">
            <form noValidate onSubmit={this.onSubmit}>
              <TextFieldGroup
                placeholder="First Name"
                name="firstName"
                value={this.state.firstName}
                onChange={this.onChange}
                error={errors.name}
              />
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
