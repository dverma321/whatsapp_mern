import React from 'react';
import ReactDOM from 'react-dom'; // Changed import statement
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom'; // Removed Routes and Route since they are not used here
import { AuthContextProvider } from '../context/AuthContext.jsx';
import { SocketContextProvider } from '../context/SocketContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <SocketContextProvider>
        <App />
        </SocketContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
