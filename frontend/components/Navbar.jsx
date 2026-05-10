import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ background: '#343a40', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white', fontFamily: 'sans-serif' }}>
      
      {/* Brand Logo / Home Link */}
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 'bold' }}>
        🚀 ATS Pro
      </Link>

      {/* Dynamic Links based on Auth State */}
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/" style={{ color: '#ddd', textDecoration: 'none' }}>Job Board</Link>
        
        {!user ? (
          <Link to="/login" style={{ padding: '8px 16px', background: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
            Login
          </Link>
        ) : (
          <>
            {user.role === 'hr' || user.role === 'admin' ? (
              <Link to="/hr-dashboard" style={{ color: '#ddd', textDecoration: 'none' }}>HR Dashboard</Link>
            ) : (
              <Link to="/candidate-portal" style={{ color: '#ddd', textDecoration: 'none' }}>My Applications</Link>
            )}
            <button onClick={handleLogout} style={{ padding: '8px 16px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
