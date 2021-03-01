import './App.css';
import './CalculatePay.js';

function App() {
  return (
    <div className="BabysitterApp">
      <h2 className="app-title">Child's Pay</h2>
      <form onSubmit={CalculatePay.calculatePay}>
        <label>Start Time</label>
        <input type="text" id=""></input>
        <h1>Bed Time</h1>
        <input></input>
        <h1>End Time</h1>
        <input></input>
        <input type="submit"></input>
      </form>
    </div>
  );
}

export default App;
