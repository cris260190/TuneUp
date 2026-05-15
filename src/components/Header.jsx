import { useNavigate } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { LANGUAGES } from '../data/translations'

export default function Header({ refHz, onChangeRef, lang, setLang, t }) {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()

  return (
    <header style={{
      position: 'relative', zIndex: 10,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '1.5rem 2.5rem',
      borderBottom: '1px solid var(--border)',
      background: 'rgba(8,8,14,.8)',
      backdropFilter: 'blur(12px)',
    }}>
      {/* Logo — clickabil */}
      <div onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.8rem', fontWeight: 600, letterSpacing: '-.01em'
        }}>
          Tune<em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Up</em>
        </div>
        <div style={{
          fontSize: '.55rem', letterSpacing: '.3em',
          textTransform: 'uppercase', color: 'var(--muted2)', marginTop: '.1rem'
        }}>
          {t?.tagline || 'Free Instrument Tuner'}
        </div>
      </div>

      {/* Dreapta */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', flexWrap: 'wrap' }}>

        {/* Ref Hz */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '.5rem',
          padding: '.4rem .9rem', border: '1px solid var(--border)',
          borderRadius: '20px', fontSize: '.6rem',
          letterSpacing: '.1em', color: 'var(--muted2)',
          background: 'var(--s1)',
        }}>
          A4 =
          <button onClick={() => onChangeRef(-1)} style={{
            background: 'none', border: 'none', color: 'var(--muted2)',
            cursor: 'pointer', fontSize: '.8rem', padding: '0 .2rem'
          }}>−</button>
          <strong style={{ color: 'var(--gold)', fontSize: '.75rem' }}>{refHz}</strong>
          <button onClick={() => onChangeRef(1)} style={{
            background: 'none', border: 'none', color: 'var(--muted2)',
            cursor: 'pointer', fontSize: '.8rem', padding: '0 .2rem'
          }}>+</button>
          Hz
        </div>

        {/* Link Metronome */}
        <button onClick={() => navigate('/metronome')} style={{
          padding: '.4rem .9rem',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          fontSize: '.6rem', letterSpacing: '.1em',
          textTransform: 'uppercase', color: 'var(--muted2)',
          background: 'var(--s1)',
          cursor: 'pointer',
        }}>{t?.metronome || 'Metronome'}</button>

        <button onClick={() => navigate('/pitch-pipe')} style={{
  padding: '.4rem .9rem',
  border: '1px solid var(--border)',
  borderRadius: '20px',
  fontSize: '.6rem', letterSpacing: '.1em',
  textTransform: 'uppercase', color: 'var(--muted2)',
  background: 'var(--s1)', cursor: 'pointer',
}}>Pitch Pipe</button>
        

        {/* Language selector */}
        <div style={{ display: 'flex', gap: '.3rem' }}>
          {LANGUAGES.map(l => (
            <button key={l.code} onClick={() => setLang(l.code)} style={{
              padding: '.3rem .5rem',
              border: `1px solid ${lang === l.code ? 'var(--gold)' : 'var(--border)'}`,
              borderRadius: '6px',
              fontSize: '.6rem',
              background: lang === l.code ? 'rgba(212,168,71,.1)' : 'var(--s1)',
              color: lang === l.code ? 'var(--gold)' : 'var(--muted2)',
              cursor: 'pointer',
              transition: 'all .2s',
            }}>{l.flag} {l.label}</button>
          ))}
        </div>

        {/* Dark/Light toggle */}
        <button onClick={toggleTheme} style={{
          padding: '.4rem .9rem',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          fontSize: '.8rem',
          background: 'var(--s1)',
          cursor: 'pointer',
          color: 'var(--muted2)',
        }}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

      </div>
    </header>
  )
}