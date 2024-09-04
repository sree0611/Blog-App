import React from "react";
import Logo from "../img/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      {/* <img src={Logo} alt="" /> */}
      <Link to="/" className="navbar_logo">
        <img src={Logo} alt="" />
        <span>Blog Nest</span>
      </Link>
      <span>
        <b> "Your Stories Matter – Let Them Shine on Blog Nest."</b>
      </span>
    </footer>
  );
};

export default Footer;
