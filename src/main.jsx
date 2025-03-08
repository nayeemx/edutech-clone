// src/main.jsx (or index.jsx)
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Your main CSS
import { RouterProvider } from 'react-router-dom';
import { router } from './App'; // Import the *router* object
import AuthProvider from './provider/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} /> {/* Pass the router object here */}
    </AuthProvider>
  </React.StrictMode>
);