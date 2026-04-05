import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiArrowRight, FiBookOpen, FiUsers, FiAward } from 'react-icons/fi';
import api from '../services/api';
import SkillCard from '../components/SkillCard';

const Home = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchTopSkills = async () => {
      try {
        const res = await api.get('/skills?limit=3');
        setSkills(res.data.skills);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch skills', err);
        setLoading(false);
      }
    };
    fetchTopSkills();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/dashboard?keyword=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div style={{ flex: 1 }}>
      {/* Hero Section */}
      <section style={{ 
        padding: '100px 20px', 
        textAlign: 'center',
        background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', 
            fontWeight: 800, 
            lineHeight: 1.1, 
            marginBottom: '24px',
            background: 'linear-gradient(to bottom right, #fff, #94a3b8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Master New Skills <br /> Through Peer Exchange
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            color: 'var(--text-muted)', 
            maxWidth: '600px', 
            margin: '0 auto 40px auto',
            lineHeight: 1.6
          }}>
            The premium platform for experts to share knowledge and for learners to find their next mentor. 
            Join 10,000+ people swapping skills today.
          </p>

          <form onSubmit={handleSearch} style={{ 
            maxWidth: '600px', 
            margin: '0 auto', 
            display: 'flex', 
            gap: '12px',
            background: 'rgba(255, 255, 255, 0.03)',
            padding: '8px',
            borderRadius: '16px',
            border: '1px solid var(--glass-border)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
              <FiSearch style={{ position: 'absolute', left: '16px', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="What skill do you want to learn?" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '14px 14px 14px 44px', 
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                  outline: 'none',
                  fontSize: '1rem'
                }}
              />
            </div>
            <button type="submit" className="btn-primary" style={{ width: 'auto', padding: '0 24px', borderRadius: '12px' }}>
              Search
            </button>
          </form>

          <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
              <FiBookOpen /> <span>500+ Skills</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
              <FiUsers /> <span>Verified Mentors</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
              <FiAward /> <span>Review System</span>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div style={{ 
          position: 'absolute', 
          top: '-10%', 
          left: '0', 
          width: '300px', 
          height: '300px', 
          background: 'var(--primary)', 
          filter: 'blur(150px)', 
          opacity: 0.1,
          borderRadius: '50%'
        }} />
      </section>

      {/* Featured Skills */}
      <section style={{ padding: '80px 20px' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>Explore Featured Skills</h2>
              <p style={{ color: 'var(--text-muted)' }}>Handpicked sessions from our top-rated mentors.</p>
            </div>
            <Link to="/dashboard" style={{ color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              View all <FiArrowRight />
            </Link>
          </div>

          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
              {[1, 2, 3].map(i => (
                <div key={i} className="glass" style={{ height: '350px', borderRadius: 'var(--radius)', animation: 'pulse 1.5s infinite' }} />
              ))}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
              {skills.map(skill => (
                <SkillCard key={skill._id} skill={skill} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to action */}
      <section style={{ padding: '80px 20px' }}>
        <div className="container">
          <div className="glass" style={{ 
            padding: '60px 40px', 
            borderRadius: '24px', 
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(30, 41, 59, 0.5))'
          }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Ready to share your expertise?</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 32px auto' }}>
              Become a mentor on SkillSwap and help others grow while building your reputation.
            </p>
            <Link to="/register" className="btn-primary" style={{ display: 'inline-block', width: 'auto', padding: '14px 32px', fontSize: '1.1rem' }}>
              Get Started for Free
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes pulse {
          0% { opacity: 0.5; }
          50% { opacity: 0.8; }
          100% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default Home;
