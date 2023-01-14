import React, { useState, useEffect } from 'react';
import styles from './Bill.module.css';

const Bill = (props) => {
  const { bill, handleDelete, handleEdit } = props;
  const [editBillData, setEditBillData] = useState({});
  //   setEditBillData(bill);

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setEditBillData(bill);
  }, [bill]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setEditBillData({ ...editBillData, [name]: value });
  };

  return (
    <div className={styles.bill}>
      <div className={styles.info}>
        {isEdit ? (
          <input
            name="description"
            type="text"
            value={editBillData.description}
            onChange={handleFormChange}
          />
        ) : (
          <p>{bill.description}</p>
        )}
        <div className={styles.billInfo}>
          {isEdit ? (
            <input
              name="category"
              type="text"
              value={editBillData.category}
              onChange={handleFormChange}
            />
          ) : (
            <p className={styles.category}>{bill.category}</p>
          )}
          {isEdit ? (
            <input
              name="date"
              type="text"
              value={editBillData.date}
              onChange={handleFormChange}
            />
          ) : (
            <p className={styles.date}>{bill.date}</p>
          )}
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.amount}>
          {isEdit ? (
            <input
              name="amount"
              type="text"
              value={editBillData.amount}
              onChange={handleFormChange}
            />
          ) : (
            <p>{bill.amount}</p>
          )}
        </div>
        <div className={styles.actions}>
          {isEdit ? (
            <button
              onClick={() => {
                setIsEdit(false);
                handleEdit(editBillData);
              }}
            >
              Save{' '}
            </button>
          ) : (
            <button onClick={() => setIsEdit(true)}>Edit</button>
          )}
          {isEdit ? (
            <button onClick={() => setIsEdit(false)}>Cancel </button>
          ) : (
            <button onClick={() => handleDelete(bill.id)}>Delete</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bill;