import { useSelector } from 'react-redux';
import './App.css';
import { useState } from 'react';
import Modal from './components/Modal';
import Bill from './components/Bill';
import { useDispatch } from 'react-redux';

function App() {
  const total = useSelector((state) => state.total);
  const bills = useSelector((state) => state.bills);
  const categories = useSelector((state) => state.categories);
  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch({
      type: 'DELETE_BILL',
      payload: id,
    });
    dispatch({
      type: 'CALCULATE_BILL',
    });
  };

  const handleEdit = (bill) => {
    dispatch({
      type: 'EDIT_BILL',
      payload: bill,
    });
    dispatch({
      type: 'CALCULATE_BILL',
    });
  };

  const filterBills = (e) => {
    setFilter(e.target.value);

    dispatch({
      type: 'CALCULATE_BILL',
      payload: e.target.value,
    });
  };

  return (
    <div className="App">
      <h1>Bill Tracker</h1>
      <div>
        <button onClick={() => setOpen(!open)}>Add Bill</button>
        <select onChange={(e) => filterBills(e)}>
          {categories.map((category) => (
            <option value={category} id={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="bills">
        {filter === 'All'
          ? bills.map((bill) => (
              <Bill
                key={bill.id}
                bill={bill}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))
          : bills
              .filter((bill) => bill.category === filter)
              .map((bill) => (
                <Bill
                  key={bill.id}
                  bill={bill}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              ))}
        {/* {bills.map((bill) => (
          <Bill
            bill={bill}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))} */}
      </div>
      {open && <Modal setIsOpen={setOpen} />}
      <h2>Your bill for this month is {total}</h2>
    </div>
  );
}

export default App;
