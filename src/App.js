import { useSelector } from 'react-redux';
import './App.css';
import { useState } from 'react';
import Modal from './components/Modal';

function App() {
  const total = useSelector((state) => state.total);
  const bills = useSelector((state) => state.bills);
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div className="App">
      <h1>Bill Tracker</h1>
      <div className="bills">
        {bills.map((bill) => (
          <div className="bill" key={bill.id}>
            <h3>
              {bill.description} {bill.amount}
            </h3>
            <p>{bill.category}</p>
            <p>{bill.date}</p>
          </div>
        ))}
      </div>
      <button onClick={() => setOpen(!open)}>Add Bill</button>
      <Modal show={open} onClose={() => setOpen(!open)} />
      <h2>Your bill for this month is {total}</h2>
    </div>
  );
}

export default App;
