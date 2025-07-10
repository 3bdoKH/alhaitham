import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App, { CartProvider } from './App';
import { HelmetProvider } from 'react-helmet-async'; // <-- Add this
import reportWebVitals from './reportWebVitals';
import { Link, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Products from './pages/products/Products'
import Contact from './pages/contact/Contact'
import ProductDetails from './pages/products/ProductDetails';
import Cart from './pages/products/Cart';
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
      path: '/cart',
      element: <Cart />
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
    <HelmetProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
