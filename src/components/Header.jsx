/* eslint-disable react/prop-types */
/**Defining the Header Component */

import "./comp_styles/header.css";
import "../index.css";
import { AppContext } from "./StateProvider";

import { useContext } from "react";

import Navigation from "./Navigation";

// Define the links as a component

const Header = () => {
  const { appState, setAppState } = useContext(AppContext);

  return (
    <div className="header">
      <div className="header-logo flex-r-c">
        <img src="/logo.png" alt="Healthor Logo" />
      </div>

      <Navigation mobile={false} />

      <img
        src="/menu.png"
        alt="menu-icon"
        id="menu-icon"
        onClick={() => {
          setAppState({ ...appState, mobile_menu: !appState.mobile_menu });
        }}
      />
    </div>
  );
};

export default Header;
