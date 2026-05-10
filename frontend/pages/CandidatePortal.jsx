import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CandidatePortal = () => {
  const { user, token, logout } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  if (!user || user.role !== 'candidate') {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h2>Access Denied</h2>
        <button onClick={() => navigate('/login')}>Go to Login</button>
      </div>
    );
  }

  useEffect(() => {
    const fetchMyApplications = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/applications/my-applications', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setApplications(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch applications', error);
        setLoading(false);
      }
    };

    fetchMyApplications();
  }, [token]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Submitted': return '#007bff';
      case 'Under Review': return '#fd7e14';
      case 'Shortlisted': return '#6f42c1';
      case 'Interview Scheduled': return '#17a2b8';
      case 'Selected': return '#28a745';
      case 'Rejected': return '#dc3545';
      default: return '#6c757d';
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', fontFamily: 'sans-serif', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #eee', paddingBottom: '20px', marginBottom: '30px' }}>
        <div>
          <h2 style={{ margin: 0 }}>Candidate Portal</h2>
          <p style={{ margin: '5px 0 0 0', color: '#666' }}>Welcome back, {user.name}!</p>
        </div>
      </div>

      <h3>My Applications</h3>
      
      {loading ? (
        <p>Loading your application history...</p>
      ) : applications.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px', background: '#f8f9fa', borderRadius: '8px' }}>
          <p>You haven't applied to any jobs yet.</p>
          <button onClick={() => navigate('/')} style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}>
            Browse Open Positions
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '15px' }}>
          {applications.map((app) => (
            <div key={app._id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ margin: '0 0 5px 0' }}>{app.job ? app.job.title : 'Job no longer available'}</h4>
                <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                  {app.job ? `${app.job.department} • ${app.job.branch}` : ''}
                </p>
                <small style={{ color: '#999', display: 'block', marginTop: '10px' }}>
                  Applied on: {new Date(app.createdAt).toLocaleDateString()}
                </small>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                <span style={{ background: getStatusColor(app.status), color: 'white', padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                  {app.status}
                </span>
                <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'none', fontSize: '0.9rem' }}>
                  📄 View Submitted Resume
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CandidatePortal;
