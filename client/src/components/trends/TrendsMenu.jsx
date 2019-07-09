import React, { Component } from "react";
import "./TrendsMenu.css";

class TrendsMenu extends Component {
  render() {
    return (
      <div className="TrendsMenu">
        <input
          className="search-input"
          type="text"
          placeholder="Search Twitter"
        />
        <div className="trends-box">
          <div className="trends-box-item">
            <h1 className="trends-box-heading">Trends for you</h1>
          </div>
          <div className="trends-box-item">
            <p className="trends-box-content">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum
            </p>
          </div>
          <div className="trends-box-item">
            <p className="trends-box-content">
              Latin words, combined with a handful of model sentence structures,
              to generate Lorem Ipsum which looks reasonable. The generated
              Lorem Ipsum is therefore always free from repetition, injected
              humour, or non-characteristic words etc.
            </p>
          </div>
          <div className="trends-box-item">
            <p className="trends-box-content">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default TrendsMenu;
