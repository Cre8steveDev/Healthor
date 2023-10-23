import "./Utilities.css";

const Loader = () => {
  return (
    <>
      <div className="loader-container flex-column">
        <div className="loader">
          <h1 className="title-splash-screen">Healthor</h1>
          <img className="loader-img" src="loader.gif" alt="Loading" />
        </div>
      </div>
    </>
  );
};

export default Loader;
