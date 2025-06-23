import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Link, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Products from './pages/products/Products'
import Contact from './pages/contact/Contact'
const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />
    },
    {
      path: '/products',
      element:<Products />
    },
    {
      path: '/contact',
      element:<Contact />
    },
    {
      path: '*',
      element: <div>Page Not Found <Link to='/'>Back To Home Page</Link></div>
    }
  ]
)
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
