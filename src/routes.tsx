import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './Containers/er-tool';
// import App  from './Appcopy';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route key={'home'} path={'/'} element={<App />} />
      </Routes>
    </Router>
  );
}
