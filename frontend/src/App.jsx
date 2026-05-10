import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import HrDashboard from './pages/HrDashboard';
import CareerPortal from './pages/CareerPortal';
import ApplyJob from './pages/ApplyJob'; // <-- 1. Import it

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CareerPortal />} />
          <Route path="/login" element={<Login />} />
          <Route path="/hr-dashboard" element={<HrDashboard />} />
          
          {/* 2. Add the dynamic route that accepts a Job ID */}
          <Route path="/apply/:jobId" element={<ApplyJob />} /> 
          
          <Route path="/candidate-portal" element={<h2>Candidate Portal (Coming Soon)</h2>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
