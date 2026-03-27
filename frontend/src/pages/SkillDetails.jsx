import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const SkillDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Mentored by</p>
            <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>{skill.mentor?.name || 'Unknown Mentor'}</p>
          </div>
          <button className="btn-primary" style={{ padding: '12px 32px' }}>
            Book Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillDetails;
