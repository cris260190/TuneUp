import { useNavigate } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { useLanguage } from '../hooks/useLanguage'
import { useSEO } from '../hooks/useSEO'
import { SEO } from '../data/seoData'
import { GUITAR_CHORDS } from '../data/chordData'
import ChordDiagram from './ChordDiagram'

const pillBtn = {
  background: 'transparent',
  border: '1px solid var(--border)',
  borderRadius: '999px',
  color: 'var(--text)',
  cursor: 'pointer',
  fontSize: '1rem',
  padding: '0.3rem 0.9rem',
}

export default function ChordLibraryPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()
  useSEO(SEO.chordsGuitar)

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

      <main style={{ maxWidth: '820px', margin: '0 auto', padding: '3.5rem 1.5rem', width: '100%' }}>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '2.2rem', fontWeight: 600,
          color: 'var(--gold)', marginBottom: '.5rem',
        }}>
          {t?.chordLibraryTitle}
        </h1>
        <p style={{ color: 'var(--muted2)', fontSize: '.9rem', marginBottom: '2.5rem' }}>
          {t?.chordLibrarySubtitle}
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: '1.2rem',
        }}>
          {GUITAR_CHORDS.map(chord => (
            <div
              key={chord.name}
              onClick={() => navigate(`/chords/guitar/${chord.name.toLowerCase()}`)}
              style={{
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '1.2rem 1rem',
                background: 'var(--s1)',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'border-color .2s, transform .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <ChordDiagram chord={chord} size={100} />
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.3rem', fontWeight: 600,
                color: 'var(--text)', marginTop: '.6rem',
              }}>
                {chord.name}
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => navigate('/guitar')} style={{
          ...pillBtn,
          fontSize: '1rem',
          padding: '0.5rem 1.4rem',
          marginTop: '3rem',
        }}>
          {t?.chordBackToTuner || '← Back to Guitar Tuner'}
        </button>
      </main>
    </div>
  )
}
