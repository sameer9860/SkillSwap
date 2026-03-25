import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="glass" style={{ postion: 'sticky', top: 0, zIndex: 1000 }}>
      <div className="container" style={{ 
        height: '70px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <h1 style={{ fontSize: '1.5rem', margin: 0 }}>
          <Link to="/" style={{ fontWeight: 800, letterSpacing: '-0.5px' }}>
            Skill<span style={{ color: 'var(--primary)' }}>Swap</span>
          </Link>
        </h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {user ? (
            <>
              <Link to="/dashboard" style={{ fontWeight: 500, color: 'var(--text-muted)' }}>Dashboard</Link>
              <button 
                onClick={logout} 
                className="btn-outline" 
                style={{ borderRadius: '8px', fontSize: '0.9rem' }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ fontWeight: 500, color: 'var(--text-muted)' }}>Login</Link>
              <Link to="/register" className="btn-primary" style={{ 
                padding: '8px 20px', 
                borderRadius: '8px', 
                fontSize: '0.9rem',
                textAlign: 'center'
              }}>
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
