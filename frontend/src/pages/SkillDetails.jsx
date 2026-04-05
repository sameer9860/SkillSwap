import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiCalendar, FiUser, FiClock, FiDollarSign, FiStar, FiMessageSquare, FiSend, FiArrowLeft } from 'react-icons/fi';
import api from '../services/api';
import AuthContext from '../context/AuthContext';

const SkillDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [skill, setSkill] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [date, setDate] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  
  // Review form state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

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

    const fetchReviews = async () => {
      try {
        const res = await api.get(`/reviews/skill/${id}`);
        setReviews(res.data);
        setReviewsLoading(false);
      } catch (err) {
        console.error('Failed to fetch reviews', err);
        setReviewsLoading(false);
      }
    };

    fetchSkillDetails();
    fetchReviews();
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
      toast.error(err.response?.data?.msg || 'Failed to book session.');
    } finally {
      setBookingLoading(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error('Please add a comment to your review.');
      return;
    }

    setSubmittingReview(true);
    try {
      const res = await api.post('/reviews', { skillId: id, rating, comment });
      setReviews([res.data, ...reviews]);
      setComment('');
      setRating(5);
      toast.success('Review submitted successfully!');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Failed to submit review. You must book this session first.');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <div className="spinner" style={{ border: '4px solid rgba(255,255,255,0.1)', borderTop: '4px solid var(--primary)', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto 20px auto' }} />
        <p style={{ color: 'var(--text-muted)' }}>Loading knowledge session details...</p>
      </div>
    );
  }

  if (error || !skill) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <p style={{ color: '#ef4444', marginBottom: '24px', fontSize: '1.2rem' }}>{error || 'Skill not found.'}</p>
        <button className="btn-outline" onClick={() => navigate('/dashboard')}>Return to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 20px', flex: 1 }}>
      <button 
        className="btn-outline" 
        style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px' }}
        onClick={() => navigate(-1)}
      >
        <FiArrowLeft /> Back
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px', alignItems: 'flex-start' }}>
        {/* Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div className="glass" style={{ padding: '40px', borderRadius: 'var(--radius)' }}>
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <h1 style={{ fontSize: '2.8rem', fontWeight: 800, margin: 0 }}>{skill.title}</h1>
                <div style={{ textAlign: 'right' }}>
                   <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>${skill.price}</div>
                   <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>per {skill.duration} min</div>
                </div>
              </div>
              <span style={{ 
                background: 'rgba(99, 102, 241, 0.1)', 
                color: 'var(--primary)', 
                padding: '6px 16px', 
                borderRadius: '20px', 
                fontSize: '0.85rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {skill.category}
              </span>
            </div>

            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '16px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '10px' }}>
                Description
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.05rem' }}>{skill.description}</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                 <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>
                    {skill.mentor?.name?.charAt(0).toUpperCase()}
                 </div>
                 <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Expert Mentor</div>
                    <div style={{ fontWeight: 600 }}>{skill.mentor?.name}</div>
                 </div>
              </div>
              <div style={{ width: '1px', height: '30px', background: 'var(--glass-border)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                <FiClock /> <span>{skill.duration} Minutes</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                <FiStar style={{ color: '#fbbf24' }} /> <span>{reviews.length} Reviews</span>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="glass" style={{ padding: '40px', borderRadius: 'var(--radius)' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <FiMessageSquare /> Student Feedback
            </h3>

            {user?.role === 'student' && (
              <form onSubmit={handleReviewSubmit} style={{ marginBottom: '48px', background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
                <h4 style={{ marginBottom: '16px', fontSize: '1rem' }}>Share your experience</h4>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <button 
                      key={star} 
                      type="button" 
                      onClick={() => setRating(star)}
                      style={{ background: 'transparent', color: rating >= star ? '#fbbf24' : 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}
                    >
                      <FiStar fill={rating >= star ? '#fbbf24' : 'transparent'} />
                    </button>
                  ))}
                </div>
                <textarea 
                  placeholder="What did you learn? How was the mentor?"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '16px', 
                    background: 'rgba(15, 23, 42, 0.5)', 
                    border: '1px solid var(--glass-border)', 
                    borderRadius: '12px',
                    color: 'white',
                    marginBottom: '16px',
                    outline: 'none',
                    fontFamily: 'inherit',
                    resize: 'none'
                  }}
                  rows="3"
                />
                <button 
                  type="submit" 
                  disabled={submittingReview}
                  className="btn-primary" 
                  style={{ width: 'auto', padding: '10px 24px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  {submittingReview ? 'Submitting...' : <><FiSend /> Post Review</>}
                </button>
              </form>
            )}

            {reviewsLoading ? (
              <p style={{ color: 'var(--text-muted)' }}>Loading reviews...</p>
            ) : reviews.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                No reviews yet. Be the first to share your feedback!
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {reviews.map(review => (
                  <div key={review._id} style={{ paddingBottom: '24px', borderBottom: '1px solid var(--glass-border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 600 }}>
                          {review.user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{review.user?.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{new Date(review.createdAt).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '2px', color: '#fbbf24' }}>
                        {[...Array(5)].map((_, i) => (
                           <FiStar key={i} size={14} fill={i < review.rating ? '#fbbf24' : 'transparent'} />
                        ))}
                      </div>
                    </div>
                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.95rem', margin: 0 }}>{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar: Booking */}
        <div style={{ position: 'sticky', top: '40px' }}>
          <div className="glass" style={{ padding: '32px', borderRadius: 'var(--radius)' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '24px' }}>Book This Session</h3>
            
            {user?.role === 'student' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="input-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FiCalendar /> Select Date
                  </label>
                  <input 
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    style={{ colorScheme: 'dark' }}
                  />
                </div>
                <button 
                  className="btn-primary" 
                  style={{ width: '100%', padding: '14px', borderRadius: '12px', fontSize: '1.1rem', boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)' }}
                  onClick={handleBooking}
                  disabled={bookingLoading}
                >
                  {bookingLoading ? 'Processing...' : 'Reserve Session'}
                </button>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                   You won't be charged until the session is confirmed by the mentor.
                </p>
              </div>
            ) : !user ? (
              <div style={{ textAlign: 'center' }}>
                <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Please log in to book this session.</p>
                <Link to="/login" className="btn-primary" style={{ display: 'inline-block', width: '100%' }}>Log In</Link>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
                <p style={{ color: '#ef4444', margin: 0, fontSize: '0.9rem' }}>Only students can book sessions.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default SkillDetails;
