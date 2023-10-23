// BMI Calculator Component
import { useState } from "react";
import "./comp_styles/bmicalculator.css";

const BmiCalculator = () => {
  const bmi = {
    gender: "Male",
    age: 18,
    weight: 50,
    height: 100,
  };

  const [BMIData, setBMIData] = useState(bmi);

  return (
    <div className="bmi-container">
      <h2>BMI CALCULATOR</h2>

      <div className="gender-box shared">
        <p className="gender-title">Gender</p>
        <label htmlFor="male">
          <input
            type="radio"
            name="gender"
            id="male"
            checked={BMIData.gender === "Male"}
            value={"Male"}
            onChange={(e) => setBMIData({ ...BMIData, gender: e.target.value })}
          />{" "}
          Male
        </label>

        <label htmlFor="female">
          <input
            type="radio"
            name="gender"
            id="female"
            checked={BMIData.gender === "Female"}
            value={"Female"}
            onChange={(e) => setBMIData({ ...BMIData, gender: e.target.value })}
          />{" "}
          Female
        </label>
      </div>

      <div className="age-weight-box">
        <div className="age-box shared">
          <p className="age-text-title">Age</p>
          <p id="sub-text">(Year)</p>
          <p className="age-text-value">{BMIData.age}</p>

          <div className="adjust-value">
            <div
              className="adjust-reduce"
              onClick={() => setBMIData({ ...BMIData, age: BMIData.age - 1 })}
            >
              -
            </div>
            <div
              className="adjust-increase"
              onClick={() => setBMIData({ ...BMIData, age: BMIData.age + 1 })}
            >
              +
            </div>
          </div>
        </div>

        <div className="weight-box shared">
          <p className="weight-text-title">Weight</p>
          <p id="sub-text">(Kg)</p>
          <p className="weight-text-value">{BMIData.weight}</p>

          <div className="adjust-value">
            <div
              className="adjust-reduce"
              onClick={() =>
                setBMIData({ ...BMIData, weight: BMIData.weight - 1 })
              }
            >
              -
            </div>
            <div
              className="adjust-increase"
              onClick={() =>
                setBMIData({ ...BMIData, weight: BMIData.weight + 1 })
              }
            >
              +
            </div>
          </div>
        </div>
      </div>

      <div className="height-box shared">
        <p className="height-text-title">Height</p>
        <p className="height-text-value">{BMIData.height}cm</p>
        <p className="height-text-value-feet">
          {(BMIData.height * 0.0328).toFixed(2)}feet
        </p>
        <input
          type="range"
          name="Range"
          id="height-range"
          step={1}
          min={10}
          max={300}
          value={BMIData.height}
          onChange={(e) => setBMIData({ ...BMIData, height: +e.target.value })}
        />
      </div>
      <input id="calculate" type="button" value={"CALCULATE BMI"} />

      {/* <div className="BMIResult">
        THIS IS THE RESULT OF THE BMI CALCULATION!
      </div> */}
    </div>
  );
};

export default BmiCalculator;
