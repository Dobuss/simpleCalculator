import { useState } from "react";

const defaultValues = {
    "current-savings": 10000,
    "yearly-contribution": 1200,
    "expected-return": 7,
    "duration": 10  
};

export const Calculator = () => {
    const [userInput, setUserInput] = useState(defaultValues);

  const submitHandler = (event) => {
    event.preventDefault();
  };

  const resetHandler = () => {
    setUserInput(defaultValues)
  };

  const changeHandler = (input, value) => {
    setUserInput((prev) => {
        return {
            ...prev,
            [input]: value
        }
    })
  };

  const calculateHandler = (event, userInput) => {
    event.preventDefault();
    // Should be triggered when form is submitted
    // You might not directly want to bind it to the submit event on the form though...

    const yearlyData = []; // per-year results

    let currentSavings = +userInput["current-savings"]; // feel free to change the shape of this input object!
    const yearlyContribution = +userInput["yearly-contribution"]; // as mentioned: feel free to change the shape...
    const expectedReturn = +userInput["expected-return"] / 100;
    const duration = +userInput["duration"];

    // The below code calculates yearly results (total savings, interest etc)
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        // feel free to change the shape of the data pushed to the array!
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }

    // do something with yearlyData ...
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <div className="input-group">
        <p>
          <label htmlFor="current-savings">Current Savings ($)</label>
          <input
            onChange={(e) => changeHandler("current-savings", e.target.value)}
            type="number"
            id="current-savings"
            value={userInput["current-savings"]}
          />
        </p>
        <p>
          <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
          <input
            onChange={(e) =>
              changeHandler("yearly-contribution", e.target.value)
            }
            type="number"
            id="yearly-contribution"
            value={userInput["yearly-contribution"]}
          />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label htmlFor="expected-return">
            Expected Interest (%, per year)
          </label>
          <input
            onChange={(e) => changeHandler("expected-return", e.target.value)}
            type="number"
            id="expected-return"
            value={userInput["expected-return"]}
          />
        </p>
        <p>
          <label htmlFor="duration">Investment Duration (years)</label>
          <input
            onChange={(e) => changeHandler("duration", e.target.value)}
            type="number"
            id="duration"
            value={userInput.duration}
          />
        </p>
      </div>
      <p className="actions">
        <button onClick={resetHandler} type="reset" className="buttonAlt">
          Reset
        </button>
        <button type="submit" className="button" onClick={calculateHandler}>
          Calculate
        </button>
      </p>
    </form>
  );
};
