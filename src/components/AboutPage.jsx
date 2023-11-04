// About Page - JSX

import "./comp_styles/about.css";
import { useContext } from "react";
import { AppContext } from "./StateProvider";

const AboutPage = () => {
  const { appState } = useContext(AppContext);

  const style =
    appState.theme === "Dark"
      ? { backgroundColor: "var(--primary_blue)", color: "white" }
      : {};
  return (
    <>
      <div style={style} className="about-container">
        <div className="author-photo">
          <img
            src="/about_photo.jpg"
            alt="Photo of the Developer, Omoregie Stephen"
            className="about-photo"
          />
        </div>
        <div className="about-text">
          <h2 className="about-title">About Healthor.com</h2>
          <p className="about-intro">
            Welcome to Healthor.com, a transformative project fueled by the
            passion for leveraging Artificial Intelligence to address real-life
            health concerns. Initiated as my Final Year Project during my
            pursuit of a B.Sc in Computer Science at the National Open
            University of Nigeria, Healthor.com aims to revolutionize the way
            people seek health information online.
          </p>

          <h3 className="sub-heading">The Challenge</h3>
          <p>
            In an age where online searches for health-related queries are
            prevalent, the reliability and relevance of information can be a
            significant challenge. Traditional search engines often prioritize
            popularity over accuracy, leading to misinformation and confusion
            among users.
          </p>

          <h3 className="sub-heading">Bridging The Gap</h3>
          <p>
            Healthor.com steps in to bridge this gap. By harnessing the power of
            AI, our platform goes beyond conventional search methods. Trained on
            a diverse dataset, our AI system provides precise and factual
            answers to users&apos health-related questions. No more blindly
            sifting through generic search results – Healthor.com prioritizes
            relevance and factuality.
          </p>
        </div>
      </div>
      <div className="bottom-grid">
        <div className="features">
          <h3 className="sub-heading">Features</h3>
          <p>
            <span style={{ fontWeight: 600 }}>1. AI-Powered Insights:</span> The
            OpenAI (ChatGPT) system is the cornerstone of Healthor.com. It has
            undergone rigorous training on a vast array of datasets to deliver
            trustworthy information and answers to your health queries.
          </p>
          <p>
            <span style={{ fontWeight: 600 }}>
              2. Body Mass Index (BMI) Calculator:
            </span>{" "}
            Take control of your health with our Body Mass Index (BMI)
            Calculator. A user-friendly tool that helps you assess your body
            composition and set personalized health goals.
          </p>
          <p>
            <span style={{ fontWeight: 600 }}>
              3. Health Facilities Locator:
            </span>{" "}
            Locate health facilities near you with ease. Our integrated map
            system, powered by Google Maps API and LocationIQ API, allows users
            to find healthcare providers in their vicinity quickly.
          </p>
        </div>

        <div className="technologies">
          <h3 className="sub-heading">Technologies Used</h3>
          <ul>
            <li>
              HTML, CSS, Javascript (ReactJS): Ensuring a seamless and
              responsive user experience.{" "}
            </li>
            <li>
              Git for Version Control: Enabling efficient collaboration and code
              management.
            </li>
            <li>OpenAI API: Powering our AI-driven insights.</li>
            <li>
              Google Maps API, LocationIQ API: Facilitating precise
              location-based services.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
