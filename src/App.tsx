import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AthleteLogin from './components/AthleteLogin';
import CoachLogin from './components/CoachLogin';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/atleta" element={<AthleteLogin />} />
        <Route path="/coach" element={<CoachLogin />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;