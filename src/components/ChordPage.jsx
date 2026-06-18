import { useNavigate, useParams } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { useLanguage } from '../hooks/useLanguage'
import { useSEO } from '../hooks/useSEO'
import { getChordBySlug } from '../data/chordData'
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

const STRING_NAMES = ['E', 'A', 'D', 'G', 'B', 'e']

export default function ChordPage() {
  const navigate = useNavigate()
  const { chord: chordSlug } = useParams()
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()
  const chord = getChordBySlug(chordSlug || '')

  useSEO(chord ? {
    title: `${chord.name} Chord Guitar — How to Play ${chord.fullName} | TuneUp`,
    description: `Free ${chord.name} guitar chord diagram with finger positions. Learn how to play ${chord.fullName} on guitar — string by string, no app needed.`,
    url: `https://freetuner.app/chords/guitar/${chord.name.toLowerCase()}`,
  } : { title: 'Chord Not Found | TuneUp', description: '', url: '' })

  if (!chord) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button onClick={() => navigate('/chords/guitar')} style={pillBtn}>{t?.chordBackToLibrary || '← All Chords'}</button>
      </div>
    )
  }

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

      <main style={{ maxWidth: '480px', margin: '0 auto', padding: '3.5rem 1.5rem', width: '100%', textAlign: 'center' }}>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '2.6rem', fontWeight: 600,
          color: 'var(--gold)', marginBottom: '.25rem',
        }}>
          {chord.name}
        </h1>
        <p style={{ color: 'var(--muted2)', fontSize: '.85rem', marginBottom: '2rem' }}>
          {chord.fullName} — {t?.chordHowToPlay}
        </p>

        <div style={{
          border: '1px solid var(--border)', borderRadius: '16px',
          background: 'var(--s1)', padding: '2rem 1rem', marginBottom: '2.5rem',
        }}>
          <ChordDiagram chord={chord} size={180} />
        </div>

        <h2 style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '.65rem', letterSpacing: '.15em',
          textTransform: 'uppercase', color: 'var(--gold)',
          marginBottom: '.8rem', textAlign: 'left',
        }}>
          {t?.chordFingerPosition}
        </h2>

        <div style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
          {chord.frets.map((f, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '.5rem 0', borderBottom: '1px solid var(--border)',
              fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem',
              color: 'var(--text)',
            }}>
              <span>{STRING_NAMES[i]} {t?.stringLabel || 'String'}</span>
              <span style={{ color: 'var(--muted2)' }}>
                {f === -1 ? (t?.chordMutedString || 'Muted') : f === 0 ? (t?.chordOpenString || 'Open') : `${t?.fretLabel || 'Fret'} ${f}`}
              </span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '.75rem', justifyContent: 'center' }}>
          <button onClick={() => navigate('/chords/guitar')} style={{
            ...pillBtn,
            fontSize: '1rem',
            padding: '0.5rem 1.4rem',
          }}>
            {t?.chordBackToLibrary || '← All Chords'}
          </button>
          <button onClick={() => navigate('/guitar')} style={{
            ...pillBtn,
            fontSize: '1rem',
            padding: '0.5rem 1.4rem',
          }}>
            {t?.chordBackToTuner || '← Guitar Tuner'}
          </button>
        </div>
      </main>
    </div>
  )
}
