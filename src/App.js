import './App.css';
import CalculatePayForm from './components/CalculatePayForm.js';

function App() {
  return (
    <div className="BabysitterApp">
      <h2 className="app-title">Child's Pay</h2>
      <CalculatePayForm></CalculatePayForm>
    </div>
  );
}

function calculatePay(){
  return 0;
};

export default App;
