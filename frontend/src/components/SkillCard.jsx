import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiUser, FiClock, FiDollarSign } from 'react-icons/fi';

const SkillCard = ({ skill }) => {
  return (
    <div className="glass" style={{ 
      padding: '28px', 
      borderRadius: '20px', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '16px',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      border: '1px solid var(--glass-border)',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'default'
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-8px)';
      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
      e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
      e.currentTarget.style.borderColor = 'var(--glass-border)';
    }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ 
          background: 'rgba(99, 102, 241, 0.1)', 
          color: 'var(--primary)', 
          padding: '4px 12px', 
          borderRadius: '20px', 
          fontSize: '0.75rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {skill.category}
        </span>
        <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)' }}>
           ${skill.price}
        </div>
      </div>
      
      <div>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 8px 0', color: 'var(--text-main)', lineHeight: 1.2 }}>
          {skill.title}
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0, lineBreak: 'anywhere', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {skill.description}
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', borderTop: '1px solid var(--glass-border)', paddingTop: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.8rem' }}>
             {skill.mentor?.name?.charAt(0).toUpperCase()}
          </div>
          <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{skill.mentor?.name}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
           <FiClock size={14} /> <span>{skill.duration}m</span>
        </div>
      </div>

      <Link 
        to={`/skills/${skill._id}`} 
        style={{ 
          textAlign: 'center', 
          marginTop: '8px', 
          padding: '12px',
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '12px',
          color: 'var(--text-main)',
          fontSize: '0.95rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--primary)';
            e.currentTarget.style.transform = 'scale(1.02)';
        }}
        onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
            e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        Session Details <FiArrowRight />
      </Link>
    </div>
  );
};

export default SkillCard;
