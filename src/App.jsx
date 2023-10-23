import "./App.css";
import "./index.css";
import Loader from "./utilities/Loader";
import Header from "./components/Header";
// import Main_Body from "./components/Main_Body";
// import Footer from "./components/Footer";
import Diagnosis from "./components/Diagnosis";

import { useState, useEffect } from "react";

const App = () => {
  const [UI, setUI] = useState({ loader: true, App: false });

  //  Timeout for Load Screen
  useEffect(() => {
    setTimeout(() => setUI({ loader: false, App: true }), 3000);
  }, []);

  return (
    <>
      {UI.loader && <Loader />}

      {/* {Main application begins here} */}

      {UI.App && (
        <div className="main-app">
          <Header />
          {/* <Main_Body />
          <Footer /> */}

          <Diagnosis />
        </div>
      )}
    </>
  );
};

export default App;
