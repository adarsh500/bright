import { createStore } from 'redux';

const initialState = {
  bills: [
    {
      id: 1,
      description: 'Dominoes',
      category: 'FoodNDining',
      amount: '430',
      date: '01-02-2020',
    },
    {
      id: 2,
      description: 'Car wash',
      category: 'utility',
      amount: '500',
      date: '01-06-2020',
    },
    {
      id: 3,
      description: 'Amazon',
      category: 'shopping',
      amount: '2030',
      date: '01-07-2020',
    },
    {
      id: 4,
      description: 'House rent',
      category: 'Food & Dining',
      amount: '35900',
      date: '01-03-2020',
    },
    {
      id: 5,
      description: 'Tuition',
      category: 'education',
      amount: '2200',
      date: '01-12-2020',
    },
    {
      id: 6,
      description: 'Laundry',
      category: 'Personal Care',
      amount: '320',
      date: '01-14-2020',
    },
    {
      id: 7,
      description: 'Vacation',
      category: 'Travel',
      amount: '3430',
      date: '01-18-2020',
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
  console.log(state);
  switch (action.type) {
    case 'ADD_BILL':
      const id = state.bills.length + 1;
      const payload = { ...action.payload, id };
      return {
        ...state,
        bills: [...state.bills, payload],
      };
    case 'DELETE_BILL':
      return {
        ...state,
        bills: state.bills.filter((bill) => bill.id !== action.payload),
      };
    case 'EDIT_BILL':
      return {
        ...state,
        bills: state.bills.map((bill) =>
          bill.id === action.payload.id ? action.payload : bill
        ),
      };
    case 'SORT_BILL':
      return {
        ...state,
        bills: state.bills.sort((a, b) => {
          if (a.date < b.date) {
            return -1;
          } else if (a.date > b.date) {
            return 1;
          }
          return 0;
        }),
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
    case 'calculate_min_bill_with_budget': {
      const minBill = state.bills.reduce((a, b) => {
        if (a.amount < b.amount) {
          return a;
        }
        return b;
      });
      return {
        ...state,
        minBill,
      };
    }

    default:
      return state;
  }
};

export function createReduxStore() {
  const store = createStore(reducer);
  return store;
}
