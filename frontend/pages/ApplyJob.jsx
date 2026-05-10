import { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const ApplyJob = () => {
  const { jobId } = useParams(); // Grabs the job ID from the URL
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Security Check: Must be logged in
  if (!user) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'sans-serif' }}>
        <h2>Authentication Required</h2>
        <p>Please log in or register as a Candidate to apply for this job.</p>
        <button onClick={() => navigate('/login')} style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Go to Login
        </button>
      </div>
    );
  }

  // 2. Handle File Selection
  const handleFileChange = (e) => {
    // We grab the actual file object from the input
    setResume(e.target.files[0]);
  };

  // 3. Submit to Cloudinary & Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume) {
      setMessage('❌ Please select a resume file.');
      return;
    }

    setIsSubmitting(true);
    setMessage('Uploading to secure cloud vault... Please wait.');

    // We CANNOT use standard JSON for files. We must build a FormData object.
    const formData = new FormData();
    formData.append('jobId', jobId);
    formData.append('resume', resume); // The name 'resume' MUST match what we put in upload.single('resume') on the backend!

    try {
      const response = await axios.post('http://localhost:5001/api/applications/apply', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      
      setMessage(`✅ Success! ${response.data.message}`);
      setIsSubmitting(false);
      
      // Redirect back to home after 2 seconds
      setTimeout(() => navigate('/'), 2000);

    } catch (error) {
      setMessage(`❌ Error: ${error.response?.data?.message || 'Failed to submit application'}`);
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', fontFamily: 'sans-serif', padding: '30px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <h2>Submit Your Application</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>Upload your resume below (PDF, DOC, DOCX).</p>

      {message && <div style={{ padding: '10px', marginBottom: '15px', borderRadius: '4px', background: message.includes('Success') ? '#d4edda' : '#f8d7da', color: message.includes('Success') ? '#155724' : '#721c24' }}>
        {message}
      </div>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        <div style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center', borderRadius: '4px' }}>
          <input 
            type="file" 
            accept=".pdf,.doc,.docx" 
            onChange={handleFileChange} 
            required
            style={{ width: '100%' }}
          />
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          style={{ padding: '12px', background: isSubmitting ? '#ccc' : '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: isSubmitting ? 'not-allowed' : 'pointer', fontSize: '16px', fontWeight: 'bold' }}
        >
          {isSubmitting ? 'Uploading...' : 'Submit Application'}
        </button>

      </form>
    </div>
  );
};

export default ApplyJob;
