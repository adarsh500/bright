import { useState } from 'react';
import styles from './BillCard.module.css';

const BillCard = (props) => {
  const { total } = props;
  const [budget, setBudget] = useState(null);
  return (
    <div className={styles.billCard}>
      <h2>Your bill for this month is {total}$</h2>
      <div className={styles.budget}>
        <p>Enter monthly budget</p>
        <input
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        ></input>
      </div>
      <button className={styles.cta} disabled={!budget ? true : false}>
        Calculate minimum bill
      </button>
    </div>
  );
};

export default BillCard;
