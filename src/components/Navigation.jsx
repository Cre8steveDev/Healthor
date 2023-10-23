/* eslint-disable react/prop-types */
const Nav_Link = ({ text, address }) => {
  return (
    <a href={address}>
      <li>{text}</li>
    </a>
  );
};

const Navigation = ({ header }) => {
  return (
    <nav className="header-navigation">
      <ul className="navigation flex-r-c">
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
