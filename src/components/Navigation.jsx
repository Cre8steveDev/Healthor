import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const Nav_Link = ({ text, address }) => {
  return (
    <Link to={address}>
      <li>{text}</li>
    </Link>
  );
};

const Navigation = ({ header }) => {
  return (
    <nav className="header-navigation">
      <ul className="navigation flex-r-c">
        {header ? <Nav_Link text="Home" address="/" /> : ""}
        {header ? <Nav_Link text="Check Diagnosis" address="/diagnosis" /> : ""}

        {header ? (
          <Nav_Link text="Hospitals Near Me" address="/hospitals" />
        ) : (
          ""
        )}

        <Nav_Link text="About the APP" address="/about" />
      </ul>
    </nav>
  );
};

export default Navigation;
