import styles from './Modal.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const Modal = ({ setIsOpen, isEdit }) => {
  const [bill, setBill] = useState({});
  const dispatch = useDispatch();

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setBill({ ...bill, [name]: value });
  };

  const register = () => {
    dispatch({ type: 'ADD_BILL', payload: bill });
    dispatch({
      type: 'CALCULATE_BILL',
    });
  };

  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h3 className={styles.heading}>Add a new bill</h3>
          </div>
          <div className={styles.modalBody}>
            <form
              className={styles.form}
              onSubmit={register}
              name="registration_form"
            >
              <div className={styles.inputField}>
                <label>Description</label>
                <div className={styles.input}>
                  <input
                    name="description"
                    type="text"
                    placeholder="Fuel"
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              <div className={styles.inputField}>
                <label>Amount</label>
                <div className={styles.input}>
                  <input
                    name="amount"
                    type="text"
                    placeholder="99$"
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              <div className={styles.inputField}>
                <label>Category</label>
                <div className={styles.input}>
                  {/* <HiOutlineLockClosed className={styles.icon} /> */}
                  <input
                    name="category"
                    type="text"
                    placeholder="Utilities"
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              <div className={styles.inputField}>
                <label>Date of purchase</label>
                <div className={styles.input}>
                  <input
                    name="date"
                    type="text"
                    placeholder="mm-dd-yyyy"
                    onChange={handleFormChange}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button
                className={styles.primaryButton}
                onClick={() => {
                  register();
                  setIsOpen(false);
                }}
              >
                Add bill
              </button>
              <button
                className={styles.secondary}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
