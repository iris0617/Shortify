import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
class Header extends Component {
  render() {
    return (
      <nav className="z-depth-0">
        <div className="nav-wrapper">
          <Link
            to="/"
            id="title"
            className="center brand-logo"
            style={{ center: "0px", color: "black" }}
          >
            Shortify
          </Link>
        </div>
      </nav>
    );
  }
}

export default Header;
