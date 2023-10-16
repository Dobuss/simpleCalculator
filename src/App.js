import { useState } from "react";
import logo from "./assets/investment-calculator-logo.png";
import { Calculator } from "./components/Calculator";
import { Statistics } from "./components/Statistics";

function App() {
  const [results, setResults] = useState(null);

  const calculateHandler = (userInput) => {
    setResults(userInput);
  }
    const yearlyData = []; // per-year results

    if(results){
      let currentSavings = +results["current-savings"]; // feel free to change the shape of this input object!
      const yearlyContribution = +results["yearly-contribution"]; // as mentioned: feel free to change the shape...
      const expectedReturn = +results["expected-return"] / 100;
      const duration = +results["duration"];
  
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
  };

  return (
    <div>
      <header className="header">
        <img src={logo} alt="logo" />
        <h1>Investment Calculator</h1>
      </header>

      <Calculator onCalculate={calculateHandler} />

      {/* Todo: Show below table conditionally (only once result data is available) */}
      {/* Show fallback text if no data is available */}
      {!results && <p>No results available!</p>}
      {results && <Statistics data={yearlyData} initialInvestment={results['current-savings']} />}
    </div>
  );
}

export default App;
