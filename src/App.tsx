import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AthleteLogin from './components/AthleteLogin';
import CoachLogin from './components/CoachLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/atleta" element={<AthleteLogin />} />
        <Route path="/coach" element={<CoachLogin />} />
      </Routes>
    </Router>
  );
}

export default App;