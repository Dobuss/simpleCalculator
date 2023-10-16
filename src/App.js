import logo from './assets/investment-calculator-logo.png';
import { Calculator } from './components/Calculator';
import { Statistics } from './components/Statistics';

function App() {
 
  return (
    <div>
      <header className="header">
        <img src={logo} alt="logo" />
        <h1>Investment Calculator</h1>
      </header>

      <Calculator />

      {/* Todo: Show below table conditionally (only once result data is available) */}
      {/* Show fallback text if no data is available */}

      <Statistics />
    </div>
  );
}

export default App;
