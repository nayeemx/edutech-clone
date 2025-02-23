// src/main.jsx (or index.jsx)
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Your main CSS
import { RouterProvider } from 'react-router-dom';
import { router } from './App'; // Import the *router* object

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} /> {/* Pass the router object here */}
  </React.StrictMode>
);