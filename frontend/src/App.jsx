import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* We will build these placeholder routes next */}
          <Route path="/candidate-portal" element={<h2>Candidate Portal (Coming Soon)</h2>} />
          <Route path="/hr-dashboard" element={<h2>HR Dashboard (Coming Soon)</h2>} />
          <Route path="/" element={<h2>Welcome to the ATS! <a href="/login">Login here</a></h2>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
