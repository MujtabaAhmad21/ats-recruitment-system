import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import HrDashboard from './pages/HrDashboard'; // <-- Import the new page here

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/hr-dashboard" element={<HrDashboard />} /> {/* <-- Update this line */}
          <Route path="/candidate-portal" element={<h2>Candidate Portal (Coming Soon)</h2>} />
          <Route path="/" element={<h2>Welcome to the ATS! <a href="/login">Login here</a></h2>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
