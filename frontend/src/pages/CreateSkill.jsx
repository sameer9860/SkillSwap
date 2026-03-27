import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';
import AuthContext from '../context/AuthContext';

const CreateSkill = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    duration: ''
  });
  
  const [loading, setLoading] = useState(false);

  // If user is not a mentor, bounce them
  if (user?.role !== 'mentor') {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h2 style={{ color: '#ef4444' }}>Access Denied</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Only mentors can create skills.</p>
        <button className="btn-primary" onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
      </div>
    );
  }

  const { title, description, category, price, duration } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await api.post('/skills', {
        title,
        description,
        category,
        price: Number(price),
        duration: Number(duration)
      });
      
      toast.success('Skill created successfully!');
      navigate('/dashboard'); // Go back to dashboard where "My Hosted Skills" will show it
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Failed to create skill.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '40px 20px', flex: 1, maxWidth: '800px', margin: '0 auto' }}>
      <button 
        className="btn-outline" 
        style={{ marginBottom: '24px', display: 'inline-block' }}
        onClick={() => navigate(-1)}
      >
        &larr; Back
      </button>

      <div className="glass" style={{ padding: '40px', borderRadius: 'var(--radius)' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '8px', color: 'var(--text-main)' }}>Create a New Skill</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
          Share your expertise. Define what you'll teach, for how long, and your rate.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Skill Title</label>
            <input 
              type="text" 
              name="title"
              placeholder="e.g., Advanced React Patterns"
              value={title} 
              onChange={onChange} 
              required 
            />
          </div>

          <div className="input-group">
            <label>Description</label>
            <textarea 
              name="description"
              placeholder="Describe what the student will learn in this session..."
              value={description} 
              onChange={onChange} 
              required 
              rows="5"
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'rgba(15, 23, 42, 0.4)',
                color: 'var(--text-main)',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
            />
          </div>

          <div className="input-group">
            <label>Category</label>
            <select 
              name="category"
              value={category} 
              onChange={onChange}
              required
            >
              <option value="" disabled>Select a category</option>
              <option value="Programming">Programming</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Business">Business</option>
              <option value="Language">Language</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="input-group">
              <label>Price ($)</label>
              <input 
                type="number" 
                name="price"
                placeholder="0"
                min="0"
                value={price} 
                onChange={onChange} 
                required 
              />
            </div>

            <div className="input-group">
              <label>Duration (minutes)</label>
              <input 
                type="number" 
                name="duration"
                placeholder="60"
                min="15"
                step="15"
                value={duration} 
                onChange={onChange} 
                required 
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ marginTop: '20px', width: '100%', padding: '14px', fontSize: '1.1rem' }}
            disabled={loading}
          >
            {loading ? 'Publishing...' : 'Publish Skill'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSkill;
