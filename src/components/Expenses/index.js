import { useSelector } from 'react-redux';
import styles from './Expenses.module.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

const Expenses = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const bills = useSelector((state) => state.bills);

  const options = {
    responsive: true,
    plugins: {},
  };

  const data = {
    labels: bills
      .map((bill) => bill.date)
      .sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
      }),
    datasets: [
      {
        label: 'Expenses',
        data: bills
          .map((bill) => bill.amount)
          .sort(function (a, b) {
            return new Date(a.date) - new Date(b.date);
          }),
        borderColor: '#0F4124',
        backgroundColor: '#0F4124',
      },
    ],
  };

  return (
    <div className={styles.container}>
      <h2 style={{ textAlign: 'center' }}>Expense History</h2>
      <Line options={options} data={data} />
    </div>
  );
};

export default Expenses;
