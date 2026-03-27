import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';
import AuthContext from '../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get('/bookings');
        setBookings(res.data);
        setLoading(false);
      } catch (err) {
        toast.error('Failed to load bookings');
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="container" style={{ padding: '40px 20px', flex: 1 }}>
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>My Profile</h2>
        <p style={{ color: 'var(--text-muted)' }}>Manage your personal details and view your session history.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', alignItems: 'flex-start' }}>
        <div className="glass" style={{ padding: '32px', borderRadius: 'var(--radius)' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              borderRadius: '50%', 
              background: 'var(--primary)', 
              color: 'white', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '2rem',
              margin: '0 auto 16px auto',
              fontWeight: 'bold'
            }}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '1.4rem' }}>{user?.name}</h3>
            <span style={{ 
              background: 'rgba(99, 102, 241, 0.2)', 
              color: 'var(--primary)', 
              padding: '4px 12px', 
              borderRadius: '20px', 
              fontSize: '0.8rem',
              fontWeight: 600,
              textTransform: 'capitalize'
            }}>
              {user?.role}
            </span>
          </div>

          <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '20px' }}>
            <p style={{ margin: '0 0 8px 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Email Address</p>
            <p style={{ margin: '0 0 16px 0', fontWeight: 500 }}>{user?.email}</p>
          </div>
        </div>

        <div className="glass" style={{ padding: '32px', borderRadius: 'var(--radius)' }}>
          <h3 style={{ fontSize: '1.4rem', margin: '0 0 24px 0', borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px' }}>
            {user?.role === 'mentor' ? 'Upcoming Sessions with Students' : 'My Booked Learning Sessions'}
          </h3>

          {loading ? (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>Loading sessions...</p>
          ) : bookings.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(15, 23, 42, 0.3)', borderRadius: '8px' }}>
              <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>You have no scheduled sessions yet.</p>
              {user?.role === 'student' && (
                <button className="btn-primary" onClick={() => navigate('/dashboard')}>Explore Skills</button>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {bookings.map((booking) => (
                <div key={booking._id} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '16px',
                  background: 'rgba(15, 23, 42, 0.5)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', color: 'var(--text-main)' }}>
                      {booking.skill?.title || 'Unknown Skill'}
                    </h4>
                    <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      {user?.role === 'mentor' ? 'Student: ' : 'Mentor: '}
                      <span style={{ color: 'var(--text-main)' }}>
                        {user?.role === 'mentor' ? booking.student?.name : booking.mentor?.name}
                      </span>
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ margin: '0 0 4px 0', color: 'var(--primary)', fontWeight: 'bold' }}>
                      {new Date(booking.date).toLocaleDateString()}
                    </p>
                    <span style={{ 
                      background: 'rgba(16, 185, 129, 0.2)', 
                      color: '#10b981', 
                      padding: '2px 8px', 
                      borderRadius: '12px', 
                      fontSize: '0.75rem' 
                    }}>
                      Confirmed
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
