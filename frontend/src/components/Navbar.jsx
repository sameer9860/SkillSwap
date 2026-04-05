import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut, FiUser, FiActivity, FiPlusCircle } from 'react-icons/fi';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass" style={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 1000, 
      background: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--glass-border)'
    }}>
      <div className="container" style={{ 
        height: '80px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <h1 style={{ fontSize: '1.8rem', margin: 0 }}>
          <Link to="/" style={{ fontWeight: 850, letterSpacing: '-1px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Skill<span style={{ color: 'var(--primary)', fontWeight: 900 }}>Swap</span>
          </Link>
        </h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {user ? (
            <>
              <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: 'var(--text-muted)', transition: 'all 0.3s' }}>
                <FiActivity /> Dashboard
              </Link>
              <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: 'var(--text-muted)', transition: 'all 0.3s' }}>
                <FiUser /> Profile
              </Link>
              {user.role === 'mentor' && (
                <Link to="/skills/new" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: 'var(--primary)' }}>
                  <FiPlusCircle /> Create
                </Link>
              )}
              <div style={{ width: '1px', height: '24px', background: 'var(--glass-border)' }} />
              <button 
                onClick={handleLogout} 
                className="btn-outline" 
                style={{ 
                  borderRadius: '12px', 
                  fontSize: '0.9rem', 
                  padding: '8px 16px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  background: 'rgba(239, 68, 68, 0.05)',
                  borderColor: 'rgba(239, 68, 68, 0.1)',
                  color: '#ef4444'
                }}
              >
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.95rem' }}>Log In</Link>
              <Link to="/register" className="btn-primary" style={{ 
                borderRadius: '12px', 
                fontSize: '0.95rem', 
                padding: '10px 24px',
                width: 'auto',
                boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)'
              }}>
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
      
      <style>{`
        nav a:hover { color: var(--primary) !important; transform: translateY(-1px); }
        .btn-outline:hover { background: rgba(239, 68, 68, 0.1) !important; color: #ef4444 !important; border-color: #ef4444 !important; }
      `}</style>
    </nav>
  );
};

export default Navbar;
