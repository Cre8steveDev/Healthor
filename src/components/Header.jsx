/* eslint-disable react/prop-types */
/**Defining the Header Component */

import "./comp_styles/header.css";
import "../index.css";

import Navigation from "./Navigation";

// Define the links as a component

const Header = () => {
  return (
    <div className="header">
      <div className="header-logo flex-r-c">
        <img src="/logo.png" alt="Healthor Logo" />
      </div>
      <Navigation header={true} />
    </div>
  );
};

export default Header;
