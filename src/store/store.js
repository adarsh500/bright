import { createStore } from 'redux';

const initialState = {
  bills: [
    {
      id: 1,
      description: 'Dominoes',
      category: 'FoodNDining',
      amount: '430',
      date: '01-02-2020',
      due: false,
    },
    {
      id: 2,
      description: 'Car wash',
      category: 'utility',
      amount: '500',
      date: '01-06-2020',
      due: false,
    },
    {
      id: 3,
      description: 'Amazon',
      category: 'shopping',
      amount: '2030',
      date: '01-07-2020',
      due: false,
    },
    {
      id: 4,
      description: 'House rent',
      category: 'Food & Dining',
      amount: '35900',
      date: '01-03-2020',
      due: false,
    },
    {
      id: 5,
      description: 'Tuition',
      category: 'education',
      amount: '2200',
      date: '01-12-2020',
      due: false,
    },
    {
      id: 6,
      description: 'Laundry',
      category: 'Personal Care',
      amount: '320',
      date: '01-14-2020',
      due: false,
    },
    {
      id: 7,
      description: 'Vacation',
      category: 'Travel',
      amount: '3430',
      date: '01-18-2020',
      due: false,
    },
  ],
  total: 44810,
  minBill: 0,
  categories: [
    'All',
    'Food & Dining',
    'FoodNDining',
    'shopping',
    'Travel',
    'Personal Care',
    'education',
    'utility',
  ],
};

const reducer = (state = initialState, action) => {
  console.log('this is state', state);
  switch (action.type) {
    case 'ADD_BILL':
      const id = state.bills.length + 1;
      const payload = { ...action.payload, id };
      return {
        ...state,
        bills: [...state.bills, payload].sort((a, b) => {
          const dateA = a.date.split('-');
          const dateB = b.date.split('-');
          const date1 = new Date(dateA[2], dateA[0] - 1, dateA[1]);
          const date2 = new Date(dateB[2], dateB[0] - 1, dateB[1]);
          return date1 - date2;
        }),
      };
    case 'DELETE_BILL':
      return {
        ...state,
        bills: state.bills.filter((bill) => bill.id !== action.payload),
      };
    case 'EDIT_BILL':
      return {
        ...state,
        bills: state.bills
          .map((bill) =>
            bill.id === action.payload.id ? action.payload : bill
          )
          .sort((a, b) => {
            const dateA = a.date.split('-');
            const dateB = b.date.split('-');
            const date1 = new Date(dateA[2], dateA[0] - 1, dateA[1]);
            const date2 = new Date(dateB[2], dateB[0] - 1, dateB[1]);
            return date1 - date2;
          }),
      };
    case 'SORT_BILL':
      const newBills = state.bills
        .sort((a, b) => parseInt(a.amount) - parseInt(b.amount))
        .reverse();
      console.log('new bills', newBills);
      return {
        ...state,
        bills: newBills.map((bill) => bill),
      };
    case 'FILTER_BILL':
      return {
        ...state,
        bills: state.bills.filter((bill) => bill.category === action.payload),
      };
    case 'CALCULATE_BILL':
      if (action.payload === 'All' || action.payload === undefined || null) {
        return {
          ...state,
          total: state.bills.reduce((a, b) => a + parseInt(b.amount), 0),
        };
      }
      return {
        ...state,
        total: state.bills
          .filter((bill) => bill.category === action.payload)
          .reduce((a, b) => a + parseInt(b.amount), 0),
      };

    case 'MIN_BILL':
      const { budget } = action.payload;
      console.log('budget', action.payload);
      let minBill = 0;

      return {
        ...state,
        bills: state.bills.map((bill) => {
          console.log('          billi', bill);
          if (minBill + parseInt(bill.amount) < parseInt(budget)) {
            minBill += parseInt(bill.amount);
            return {
              ...bill,
              due: true,
            };
          }
          return {
            ...bill,
            due: false,
          };
        }),
      };

    default:
      return state;
  }
};

export function createReduxStore() {
  const store = createStore(reducer);
  return store;
}
