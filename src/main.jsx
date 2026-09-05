import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// This file's only job is to mount <App /> into the <div id="root"> from
// index.html. BrowserRouter is what makes React Router's <Routes> / <Link>
// work by reading and writing the browser's URL.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
