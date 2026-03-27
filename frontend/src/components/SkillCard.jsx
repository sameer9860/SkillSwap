import React from 'react';
import { Link } from 'react-router-dom';

const SkillCard = ({ skill }) => {
  return (
    <div className="glass" style={{ 
      padding: '24px', 
      borderRadius: 'var(--radius)', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '12px',
      transition: 'var(--transition)',
      border: '1px solid var(--glass-border)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--text-main)' }}>{skill.title}</h3>
        <span style={{ 
          background: 'rgba(99, 102, 241, 0.2)', 
          color: 'var(--primary)', 
          padding: '4px 12px', 
          borderRadius: '20px', 
          fontSize: '0.8rem',
          fontWeight: 600
        }}>
          {skill.category}
        </span>
      </div>
      
      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: '8px 0', flex: 1 }}>
        {skill.description.length > 80 ? `${skill.description.substring(0, 80)}...` : skill.description}
      </p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
        <div>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Mentor</p>
          <p style={{ margin: 0, fontWeight: 500, color: 'var(--text-main)' }}>{skill.mentor?.name || 'Unknown'}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)' }}>
            ${skill.price}
          </p>
          <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            per {skill.duration} mins
          </p>
        </div>
      </div>

      <Link 
        to={`/skills/${skill._id}`} 
        className="btn-primary" 
        style={{ 
          textAlign: 'center', 
          marginTop: '16px', 
          padding: '10px',
          textDecoration: 'none'
        }}
      >
        View Details
      </Link>
    </div>
  );
};

export default SkillCard;
