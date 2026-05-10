import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CareerPortal = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch jobs as soon as the page loads
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Remember we switched to port 5001 earlier!
        const response = await axios.get('http://localhost:5001/api/jobs');
        setJobs(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', fontFamily: 'sans-serif', padding: '0 20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #eee', paddingBottom: '20px', marginBottom: '30px' }}>
        <div>
          <h1 style={{ margin: 0, color: '#333' }}>Open Positions</h1>
          <p style={{ margin: '5px 0 0 0', color: '#666' }}>Join our team and build the future with us.</p>
        </div>
        <button 
          onClick={() => navigate('/login')} 
          style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Candidate / HR Login
        </button>
      </div>

      {/* Job Postings Grid */}
      {loading ? (
        <p>Loading available jobs...</p>
      ) : jobs.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666', marginTop: '50px' }}>No jobs are currently published. Check back later!</p>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {jobs.map((job) => (
            <div key={job._id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>{job.title}</h3>
                  <div style={{ display: 'flex', gap: '15px', color: '#666', fontSize: '0.9rem', marginBottom: '15px' }}>
                    <span style={{ background: '#f8f9fa', padding: '4px 8px', borderRadius: '4px' }}>🏢 {job.department}</span>
                    <span style={{ background: '#f8f9fa', padding: '4px 8px', borderRadius: '4px' }}>📍 {job.branch}</span>
                    <span style={{ background: '#f8f9fa', padding: '4px 8px', borderRadius: '4px' }}>👥 {job.availableSeats} Seat(s)</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => navigate('/candidate-portal')} // We will build the application logic later
                  style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Apply Now
                </button>
              </div>
              
              <p style={{ color: '#555', lineHeight: '1.6', whiteSpace: 'pre-wrap', marginTop: '10px' }}>
                {job.description}
              </p>
              
              <small style={{ color: '#999', display: 'block', marginTop: '15px' }}>
                Posted on: {new Date(job.createdAt).toLocaleDateString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CareerPortal;
