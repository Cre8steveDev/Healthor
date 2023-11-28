import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "./StateProvider";

/* eslint-disable react/prop-types */
const Nav_Link = ({ text, address }) => {
  const { setAppState } = useContext(AppContext);

  return (
    <Link to={address}>
      <li onClick={() => setAppState(false)}>{text}</li>
    </Link>
  );
};

const Navigation = ({ mobile }) => {
  const containerClass = mobile ? "mobile-navigation" : "header-navigation";
  const listClass = mobile ? "mob-nav" : "navigation flex-r-c";

  return (
    <nav className={containerClass}>
      <ul className={listClass}>
        <Nav_Link text="Home" address="/" />
        <Nav_Link text="Check Diagnosis" address="/diagnosis" />

        <Nav_Link text="Hospitals Near Me" address="/hospitals" />

        <Nav_Link text="About the APP" address="/about" />
      </ul>
    </nav>
  );
};

export default Navigation;
