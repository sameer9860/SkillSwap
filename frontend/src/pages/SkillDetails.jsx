import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';
import AuthContext from '../context/AuthContext';

const SkillDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [date, setDate] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const fetchSkillDetails = async () => {
      try {
        const res = await api.get(`/skills/${id}`);
        setSkill(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch skill details.');
        setLoading(false);
      }
    };

    fetchSkillDetails();
  }, [id]);

  const handleBooking = async () => {
    if (!date) {
      toast.error('Please select a date for the session.');
      return;
    }
    
    setBookingLoading(true);

    try {
      await api.post('/bookings', { skillId: id, date });
      toast.success('Session booked successfully!');
      setDate('');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Failed to book session. Please try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>Loading skill details...</div>;
  }

  if (error || !skill) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <p style={{ color: '#ef4444', marginBottom: '16px' }}>{error || 'Skill not found.'}</p>
        <button className="btn-outline" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 20px', flex: 1 }}>
      <button 
        className="btn-outline" 
        style={{ marginBottom: '24px', display: 'inline-block' }}
        onClick={() => navigate(-1)}
      >
        &larr; Back
      </button>

      <div className="glass" style={{ padding: '40px', borderRadius: 'var(--radius)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', margin: '0 0 8px 0', color: 'var(--text-main)' }}>{skill.title}</h1>
            <span style={{ 
              background: 'rgba(99, 102, 241, 0.2)', 
              color: 'var(--primary)', 
              padding: '6px 16px', 
              borderRadius: '20px', 
              fontSize: '0.9rem',
              fontWeight: 600
            }}>
              {skill.category}
            </span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--primary)', margin: 0 }}>${skill.price}</p>
            <p style={{ color: 'var(--text-muted)', margin: 0 }}>per {skill.duration} minutes</p>
          </div>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '8px' }}>
            About This Skill
          </h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{skill.description}</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--glass-border)', paddingTop: '24px' }}>
          <div>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Mentored by</p>
            <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>{skill.mentor?.name || 'Unknown Mentor'}</p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
            {user?.role === 'student' ? (
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <input 
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  style={{ 
                    padding: '10px 16px', 
                    borderRadius: '8px', 
                    border: '1px solid var(--border-color)',
                    background: 'rgba(15, 23, 42, 0.5)',
                    color: 'var(--text-main)',
                    outline: 'none',
                    colorScheme: 'dark'
                  }} 
                />
                <button 
                  className="btn-primary" 
                  style={{ padding: '12px 32px', opacity: bookingLoading ? 0.7 : 1, cursor: bookingLoading ? 'not-allowed' : 'pointer' }}
                  onClick={handleBooking}
                  disabled={bookingLoading}
                >
                  {bookingLoading ? 'Booking...' : 'Book Session'}
                </button>
              </div>
            ) : !user ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Log in as a student to book this session.</p>
            ) : (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Only students can book sessions.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillDetails;
