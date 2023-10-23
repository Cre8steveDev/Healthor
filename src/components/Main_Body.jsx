// Main Body Compnent that will house the
// Home Page, sidebars and the main content

import "./comp_styles/main_body.css";

const Main_Body = () => {
  return (
    <div className="main_body">
      <div className="main_body-text">
        <div className="title-div">
          <h1>ARE YOU FEELING SICK?</h1>
        </div>
        <br />
        <p className="text-intro">
          Healthor offers a platform to help you understand your symptoms and
          make recommendations using Artificial Intelligence (AI) and access to
          medical data.
        </p>
        <br />
        <div className="main_body-btn-container">
          <input id="diagnosis_btn" type="button" value="Check Diagnosis" />

          <input id="hospitals_btn" type="button" value="Hospitals Near Me" />
        </div>
      </div>

      <div className="main_body-photo">
        <img
          src="/home_image.png"
          alt="Image of a Doctor Holding a Mobile Tablet"
        />
      </div>
    </div>
  );
};

export default Main_Body;
