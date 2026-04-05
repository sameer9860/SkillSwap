import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiEdit2, FiSave, FiX, FiUser, FiMail, FiCalendar } from 'react-icons/fi';
import api from '../services/api';
import AuthContext from '../context/AuthContext';

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    password: ''
  });

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put('/auth/profile', formData);
      setUser({ ...user, ...res.data });
      localStorage.setItem('user', JSON.stringify(res.data));
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Failed to update profile');
    }
  };

  return (
    <div className="container" style={{ padding: '40px 20px', flex: 1 }}>
      <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>User Settings</h2>
          <p style={{ color: 'var(--text-muted)' }}>Manage your public identity and view your learning progress.</p>
        </div>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)} 
            className="btn-outline" 
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px' }}
          >
            <FiEdit2 /> Edit Profile
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px', alignItems: 'flex-start' }}>
        {/* Left Column: Stats & Basic Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass" style={{ padding: '32px', borderRadius: 'var(--radius)', textAlign: 'center' }}>
            <div style={{ 
              width: '100px', 
              height: '100px', 
              borderRadius: '50%', 
              background: 'linear-gradient(45deg, var(--primary), #818cf8)', 
              color: 'white', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '2.5rem',
              margin: '0 auto 20px auto',
              fontWeight: 800,
              boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)'
            }}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{user?.name}</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
              <span style={{ 
                background: 'rgba(99, 102, 241, 0.1)', 
                color: 'var(--primary)', 
                padding: '4px 12px', 
                borderRadius: '20px', 
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'uppercase'
              }}>
                {user?.role}
              </span>
            </div>
            
            <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '20px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <FiMail style={{ color: 'var(--text-muted)' }} />
                <div>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>Email</p>
                  <p style={{ margin: 0, fontWeight: 500 }}>{user?.email}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FiCalendar style={{ color: 'var(--text-muted)' }} />
                <div>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>Joined</p>
                  <p style={{ margin: 0, fontWeight: 500 }}>April 2026</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass" style={{ padding: '24px', borderRadius: 'var(--radius)' }}>
            <h4 style={{ marginBottom: '16px' }}>Bio</h4>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.95rem' }}>
              {user?.bio || "You haven't added a bio yet. Tell the community about your skills and interests!"}
            </p>
          </div>
        </div>

        {/* Right Column: Edit/Bookings */}
        <div>
          {isEditing ? (
            <div className="glass" style={{ padding: '32px', borderRadius: 'var(--radius)', animation: 'slideUp 0.3s ease-out' }}>
              <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FiEdit2 /> Edit Your Profile
              </h3>
              <form onSubmit={handleUpdate}>
                <div className="input-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Bio</label>
                  <textarea 
                    rows="4"
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    style={{ 
                      width: '100%', 
                      padding: '12px 16px', 
                      background: 'rgba(15, 23, 42, 0.5)', 
                      border: '1px solid var(--border-color)', 
                      borderRadius: '8px',
                      color: 'white',
                      fontFamily: 'inherit',
                      outline: 'none'
                    }}
                  />
                </div>
                <div className="input-group">
                  <label>New Password (leave blank to keep current)</label>
                  <input 
                    type="password" 
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="••••••••"
                  />
                </div>
                
                <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
                  <button type="submit" className="btn-primary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <FiSave /> Save Changes
                  </button>
                  <button type="button" onClick={() => setIsEditing(false)} className="btn-outline" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <FiX /> Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="glass" style={{ padding: '32px', borderRadius: 'var(--radius)' }}>
              <h3 style={{ fontSize: '1.4rem', margin: '0 0 24px 0', borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px' }}>
                {user?.role === 'mentor' ? 'Session Management' : 'Academic Roadmap'}
              </h3>

              {loading ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                   <div className="spinner" style={{ border: '3px solid rgba(255,255,255,0.1)', borderTop: '3px solid var(--primary)', borderRadius: '50%', width: '30px', height: '30px', animation: 'spin 1s linear infinite', margin: '0 auto' }} />
                </div>
              ) : bookings.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '16px' }}>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>No session history discovered yet.</p>
                  {user?.role === 'student' && (
                    <button className="btn-primary" onClick={() => navigate('/dashboard')} style={{ width: 'auto', padding: '12px 32px' }}>Browse Skills</button>
                  )}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {bookings.map((booking) => (
                    <div key={booking._id} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      padding: '20px',
                      background: 'rgba(15, 23, 42, 0.4)',
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      transition: 'transform 0.2s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateX(5px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
                    >
                      <div>
                        <h4 style={{ margin: '0 0 4px 0', color: 'var(--text-main)', fontSize: '1.1rem' }}>
                          {booking.skill?.title || 'Knowledge Session'}
                        </h4>
                        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                          {user?.role === 'mentor' ? 'Student: ' : 'Mentor: '}
                          <span style={{ color: 'var(--primary)', fontWeight: 500 }}>
                            {user?.role === 'mentor' ? booking.student?.name : booking.mentor?.name}
                          </span>
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ margin: '0 0 6px 0', fontSize: '1rem', fontWeight: 600 }}>
                          {new Date(booking.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                        <span style={{ 
                          background: 'rgba(16, 185, 129, 0.1)', 
                          color: '#10b981', 
                          padding: '4px 12px', 
                          borderRadius: '20px', 
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          textTransform: 'uppercase'
                        }}>
                          Active
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        textarea:focus { border-color: var(--primary) !important; box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2); }
      `}</style>
    </div>
  );
};

export default Profile;
