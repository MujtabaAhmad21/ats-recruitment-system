import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const HrDashboard = () => {
  const { user, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    branch: 'Islamabad', // Default branch
    availableSeats: 1,
    description: ''
  });
  const [message, setMessage] = useState('');

  // 1. Basic Protection: If no user is logged in, or they aren't HR/Admin, block access.
  if (!user || (user.role !== 'hr' && user.role !== 'admin')) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'sans-serif' }}>
        <h2>Access Denied.</h2>
        <p>You must be logged in as an HR Manager to view this page.</p>
        <button onClick={() => navigate('/login')} style={{ padding: '10px', marginTop: '10px' }}>Go to Login</button>
      </div>
    );
  }

  // 2. Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Submit the new job to the backend
  const handleCreateJob = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/jobs', formData, {
        headers: {
          Authorization: `Bearer ${token}` // This is how we pass the security check!
        }
      });
      setMessage(`✅ Success! Job "${response.data.title}" has been published.`);
      // Clear the form for the next job
      setFormData({ title: '', department: '', branch: 'Islamabad', availableSeats: 1, description: '' }); 
    } catch (error) {
      setMessage(`❌ Error: ${error.response?.data?.message || 'Failed to create job'}`);
    }
  };

  // 4. Logout functionality
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      {/* Header section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #eee', paddingBottom: '20px' }}>
        <h2>HR Management Dashboard</h2>
        <button onClick={handleLogout} style={{ padding: '8px 16px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Logout
        </button>
      </div>
      
      <p style={{ marginTop: '20px', fontSize: '1.1rem' }}>Welcome back, <strong>{user.name}</strong></p>

      {/* Job Creation Form */}
      <div style={{ background: '#f8f9fa', padding: '30px', borderRadius: '8px', marginTop: '30px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginTop: 0 }}>Post a New Job Opening</h3>
        
        {message && <div style={{ padding: '10px', marginBottom: '15px', borderRadius: '4px', background: message.includes('Success') ? '#d4edda' : '#f8d7da', color: message.includes('Success') ? '#155724' : '#721c24' }}>
          {message}
        </div>}
        
        <form onSubmit={handleCreateJob} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="text" name="title" placeholder="Job Title (e.g., Senior React Developer)" value={formData.title} onChange={handleChange} required style={{ padding: '12px', borderRadius: '4px', border: '1px solid #ccc' }} />
          <input type="text" name="department" placeholder="Department (e.g., Engineering)" value={formData.department} onChange={handleChange} required style={{ padding: '12px', borderRadius: '4px', border: '1px solid #ccc' }} />
          
          <select name="branch" value={formData.branch} onChange={handleChange} style={{ padding: '12px', borderRadius: '4px', border: '1px solid #ccc' }}>
            <option value="Islamabad">Islamabad Office</option>
            <option value="Lahore">Lahore Office</option>
            <option value="Karachi">Karachi Office</option>
            <option value="Remote">Remote</option>
          </select>
          
          <input type="number" name="availableSeats" placeholder="Available Seats" min="1" value={formData.availableSeats} onChange={handleChange} required style={{ padding: '12px', borderRadius: '4px', border: '1px solid #ccc' }} />
          
          <textarea name="description" placeholder="Full Job Description and Requirements..." value={formData.description} onChange={handleChange} required style={{ padding: '12px', borderRadius: '4px', border: '1px solid #ccc', minHeight: '120px', fontFamily: 'inherit' }} />
          
          <button type="submit" style={{ padding: '12px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>
            Publish Job to Career Portal
          </button>
        </form>
      </div>
    </div>
  );
};

export default HrDashboard;
