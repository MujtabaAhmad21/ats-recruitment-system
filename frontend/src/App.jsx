import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import HrDashboard from './pages/HrDashboard';
import CareerPortal from './pages/CareerPortal'; // <-- Import the new portal

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Make the Career Portal the default home page */}
          <Route path="/" element={<CareerPortal />} /> 
          
          <Route path="/login" element={<Login />} />
          <Route path="/hr-dashboard" element={<HrDashboard />} />
          <Route path="/candidate-portal" element={<h2>Candidate Portal (Coming Soon)</h2>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
