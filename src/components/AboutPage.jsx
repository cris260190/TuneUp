import { useNavigate } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { useLanguage } from '../hooks/useLanguage'

const pillBtn = {
  background: 'transparent',
  border: '1px solid var(--border)',
  borderRadius: '999px',
  color: 'var(--text)',
  cursor: 'pointer',
  fontSize: '1rem',
  padding: '0.3rem 0.9rem',
}

export default function AboutPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <header style={{
        padding: '1.5rem 2.5rem',
        borderBottom: '1px solid var(--border)',
        background: 'rgba(8,8,14,.8)',
        backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 600 }}>
            Tune<em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Up</em>
          </div>
        </div>
        <button onClick={toggleTheme} style={pillBtn}>{theme === 'dark' ? '☀️' : '🌙'}</button>
      </header>

      <main style={{
        maxWidth: '680px',
        margin: '4rem auto',
        padding: '0 1.5rem',
        color: 'var(--text)',
        fontFamily: "'Cormorant Garamond', serif",
        lineHeight: 1.8,
      }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--gold)' }}>
          {t?.aboutTitle}
        </h1>

        <p style={{ fontSize: '1.15rem', marginBottom: '1.2rem' }}>
          {t?.aboutDesc}
        </p>

        <p style={{ fontSize: '1.15rem', marginBottom: '1.2rem' }}>
          {t?.aboutBuilt}
        </p>

        <p style={{ fontSize: '1.15rem', marginBottom: '2.5rem', color: 'var(--gold)' }}>
          {t?.aboutMic}
        </p>

        <button onClick={() => navigate('/')} style={{
          ...pillBtn,
          fontSize: '1rem',
          padding: '0.5rem 1.4rem',
        }}>
          ← Back
        </button>
      </main>
    </div>
  )
}