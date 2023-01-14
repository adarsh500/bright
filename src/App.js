import { useSelector } from 'react-redux';
import styles from './App.module.css';
import { useState } from 'react';
import Modal from './components/Modal';
import Bill from './components/Bill';
import { useDispatch } from 'react-redux';
import Expenses from './components/Expenses';
import BillCard from './components/BillCard';

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
    <div className={styles.App}>
      <div className={styles.header}>
        <h1>Bill Tracker</h1>
      </div>
      <div className={styles.body}>
        <div>
          <div className={styles.left}>
            <div className={styles.bills}>
              <button
                className={styles.primaryButton}
                onClick={() => setOpen(!open)}
              >
                Add Bill
              </button>
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
                    .sort((a, b) => new Date(a.date) - new Date(b.date()))
                    .map((bill) => (
                      <Bill
                        key={bill.id}
                        bill={bill}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                      />
                    ))}
            </div>
            {open && <Modal setIsOpen={setOpen} />}
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.filters}>
            <p className={styles.secondary}>Filter Bills by : </p>
            <select onChange={(e) => filterBills(e)}>
              {categories.map((category) => (
                <option value={category} id={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <Expenses />
          <div className={styles.dueAmount}>
            <BillCard total={total} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
