import "./App.css";
import "./index.css";
import Loader from "./utilities/Loader";
import Header from "./components/Header";
import Main_Body from "./components/Main_Body";
import Footer from "./components/Footer";
import Diagnosis from "./components/Diagnosis";
import Hospital from "./components/Hospital";
import AboutPage from "./components/AboutPage";
import { AppContext } from "./components/StateProvider";
import BmiCalculator from "./components/BmiCalculator";
import Personalization from "./components/Personalization";
import Navigation from "./components/Navigation";

import { useState, useEffect, useContext } from "react";
import { HashRouter, Routes, Route, Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main_Body />} />
            <Route path="diagnosis" element={<Diagnosis />} />
            <Route path="hospitals" element={<Hospital key={"hospital"} />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="*" element={<div>Page not found!</div>} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
};

export default App;

export const Layout = () => {
  const [UI, setUI] = useState({ loader: true, App: false });
  const { appState } = useContext(AppContext);

  //  Timeout for Load Screen
  useEffect(() => {
    setTimeout(() => setUI({ loader: false, App: true }), 3000);
  }, []);

  // Dynamic class name for animation
  let animate = appState.mobile_menu ? "ani" : "ano";

  return (
    <>
      {UI.loader && <Loader />}
      {UI.App && (
        <div className="main-app">
          <Header />
          {appState.mobile_menu ? (
            <div id="mobile-sidebar" className={animate}>
              <BmiCalculator />
              <Personalization />
              <br />
              <hr />
              <Navigation mobile={true} />
            </div>
          ) : (
            ""
          )}
          <Outlet />
          <Footer />
        </div>
      )}
    </>
  );
};
