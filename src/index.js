import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Link, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Products from './pages/products/Products'
import Contact from './pages/contact/Contact'
import ProductDetails from './pages/products/ProductDetails';
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
      path: '/products/:key/:imgIdx?',
      element: <ProductDetails />
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

reportWebVitals();
