import { useState } from 'react';
import styles from './BillCard.module.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const BillCard = (props) => {
  const dispatch = useDispatch();
  const { total } = props;
  // const minBill = useSelector((state) => state.minBill);

  const [budget, setBudget] = useState(null);

  const handleCalculateBill = () => {
    dispatch({
      type: 'calculate_min_bill_with_budget_and_category',
      payload: budget,
    });
  };

  return (
    <div className={styles.billCard}>
      <p className={styles.primary}>Your bill for this month is ${total}</p>
      {/* <p className={styles.primary}>Min Bill to be paid ${minBill}</p> */}

      <div className={styles.budget}>
        <p>Enter monthly budget:</p>
        <input
          className={styles.input}
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        ></input>
      </div>
      <button
        className={styles.cta}
        disabled={!budget ? true : false}
        onClick={handleCalculateBill}
      >
        Calculate minimum bill
      </button>
    </div>
  );
};

export default BillCard;
