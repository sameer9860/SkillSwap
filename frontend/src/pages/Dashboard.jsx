import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../services/api';
import AuthContext from '../context/AuthContext';
import SkillCard from '../components/SkillCard';
import { FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [searchQuery, setSearchQuery] = useState(queryParams.get('keyword') || '');
  const [selectedCategory, setSelectedCategory] = useState(queryParams.get('category') || '');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const categories = [
    'Programming', 'Design', 'Marketing', 'Business', 
    'Music', 'Photography', 'Cooking', 'Language', 'Fitness'
  ];

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const isMentor = user?.role === 'mentor';
      let url = `/skills?page=${page}&limit=6`;
      
      if (searchQuery) url += `&keyword=${encodeURIComponent(searchQuery)}`;
      if (selectedCategory) url += `&category=${encodeURIComponent(selectedCategory)}`;
      
      const res = await api.get(url);
      
      // If mentor, we still might want to filter only their skills on the backend 
      // or just show all but handle 'My Hosted Skills' view.
      // For now, let's assume the mentor view shows all skills they can manage.
      // If the requirement is ONLY their skills, we should add a mentorId filter to the API.
      
      let fetchedSkills = res.data.skills;
      if (isMentor) {
        // If we want to show ONLY mentor's skills in dashboard:
        // fetchedSkills = fetchedSkills.filter(s => s.mentor?._id === user?._id);
        // But better to let user see everything and have a 'My Skills' toggle.
      }

      setSkills(fetchedSkills);
      setPages(res.data.pages);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch skills. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, [page, selectedCategory]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchSkills();
  };

  const isMentor = user?.role === 'mentor';

  return (
    <div className="container" style={{ padding: '40px 20px', flex: 1 }}>
      <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>
            Welcome back, <span style={{ color: 'var(--primary)' }}>{user?.name?.split(' ')[0]}</span>!
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>
            {isMentor ? 'Manage your hosted skills and sessions.' : 'Explore available skills and start learning today.'}
          </p>
        </div>
        {isMentor && (
          <Link to="/skills/new" className="btn-primary" style={{ width: 'auto', padding: '12px 24px' }}>
            + Create New Skill
          </Link>
        )}
      </div>

      {/* Filters & Search */}
      <div className="glass" style={{ 
        padding: '24px', 
        borderRadius: 'var(--radius)', 
        marginBottom: '32px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        alignItems: 'center'
      }}>
        <form onSubmit={handleSearchSubmit} style={{ flex: 1, minWidth: '300px', position: 'relative' }}>
          <FiSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search skills, topics, or mentors..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              width: '100%',
              padding: '12px 12px 12px 40px',
              background: 'rgba(15, 23, 42, 0.5)',
              border: '1px solid var(--glass-border)',
              borderRadius: '8px',
              color: 'white',
              outline: 'none'
            }}
          />
        </form>

        <select 
          value={selectedCategory}
          onChange={(e) => { setSelectedCategory(e.target.value); setPage(1); }}
          style={{ 
            padding: '12px 16px', 
            borderRadius: '8px', 
            border: '1px solid var(--glass-border)',
            background: 'rgba(15, 23, 42, 0.5)',
            color: 'var(--text-main)',
            outline: 'none',
            cursor: 'pointer',
            minWidth: '180px'
          }}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        
        <button onClick={fetchSkills} className="btn-outline" style={{ padding: '12px 20px', borderRadius: '8px' }}>
          Apply Filters
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="glass" style={{ height: '280px', borderRadius: 'var(--radius)', animation: 'pulse 1.5s infinite' }} />
          ))}
        </div>
      ) : error ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#ef4444' }}>{error}</div>
      ) : skills.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>No skills found matching your criteria.</p>
          <button onClick={() => { setSearchQuery(''); setSelectedCategory(''); setPage(1); }} className="btn-primary" style={{ width: 'auto', marginTop: '16px' }}>
            Clear all filters
          </button>
        </div>
      ) : (
        <>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '24px',
            marginBottom: '40px'
          }}>
            {skills.map(skill => (
              <SkillCard key={skill._id} skill={skill} />
            ))}
          </div>

          {/* Pagination */}
          {pages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
              <button 
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="btn-outline"
                style={{ padding: '10px', borderRadius: '50%', display: 'flex', opacity: page === 1 ? 0.5 : 1 }}
              >
                <FiChevronLeft size={20} />
              </button>
              
              <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>
                Page {page} of {pages}
              </span>

              <button 
                disabled={page === pages}
                onClick={() => setPage(p => p + 1)}
                className="btn-outline"
                style={{ padding: '10px', borderRadius: '50%', display: 'flex', opacity: page === pages ? 0.5 : 1 }}
              >
                <FiChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      )}

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

export default Dashboard;
