


import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import './index.css';
import Persona from './pages/Persona';
import Insights from './pages/Insights';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/persona" element={<Persona />} />
        <Route path="/insights" element={<Insights />} />
      </Routes>
    </Router>
  </React.StrictMode>
)
