import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import AuthContext from '../context/AuthContext';
import SkillCard from '../components/SkillCard';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await api.get('/skills');
        setSkills(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch skills. Please try again later.');
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return (
    <div className="container" style={{ padding: '40px 20px', flex: 1 }}>
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>
          Welcome back, <span style={{ color: 'var(--primary)' }}>{user?.name?.split(' ')[0]}</span>!
        </h2>
        <p style={{ color: 'var(--text-muted)' }}>
          Explore available skills and start learning today.
        </p>
      </div>

      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Available Skills</h3>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
          Loading skills...
        </div>
      ) : error ? (
        <div style={{ 
          background: 'rgba(239, 68, 68, 0.1)', 
          color: '#ef4444', 
          padding: '16px', 
          borderRadius: '8px',
          border: '1px solid rgba(239, 68, 68, 0.2)'
        }}>
          {error}
        </div>
      ) : skills.length === 0 ? (
        <div className="glass" style={{ textAlign: 'center', padding: '60px', borderRadius: 'var(--radius)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>No skills currently available.</p>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '24px' 
        }}>
          {skills.map(skill => (
            <SkillCard key={skill._id} skill={skill} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
