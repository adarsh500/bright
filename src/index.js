import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Expenses from './components/Expenses'; 
import { Provider } from 'react-redux';
import { createReduxStore } from './store/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/expenses',
    element: <Expenses />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={createReduxStore()}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
