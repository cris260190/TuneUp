import { useNavigate, useParams } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { useLanguage } from '../hooks/useLanguage'
import { useSEO } from '../hooks/useSEO'
import { getBanjoChordBySlug } from '../data/banjoChordData'
import ChordDiagram from './ChordDiagram'
import FingerLegend from './FingerLegend'

const pillBtn = {
  background: 'transparent',
  border: '1px solid var(--border)',
  borderRadius: '999px',
  color: 'var(--text)',
  cursor: 'pointer',
  fontSize: '1rem',
  padding: '0.3rem 0.9rem',
}

// Index 0 = 5th string (short drone), indices 1-4 = 4th → 1st string
const STRING_LABELS = ['g (5th)', 'D (4th)', 'G (3rd)', 'B (2nd)', 'd (1st)']

export default function BanjoChordPage() {
  const navigate = useNavigate()
  const { chord: slug } = useParams()
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()

  const chord = getBanjoChordBySlug(slug || '')

  useSEO(chord ? {
    title: `${chord.name} Banjo Chord — How to Play ${chord.fullName} | TuneUp`,
    description: `Free ${chord.name} banjo chord diagram with finger positions. ${chord.fullName} on 5-string banjo Open G tuning — no app needed.`,
    url: `https://freetuner.app/chords/banjo/${chord.name.toLowerCase()}`,
  } : { title: 'Banjo Chord Not Found | TuneUp', description: '', url: '' })

  if (!chord) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button onClick={() => navigate('/chords/banjo')} style={pillBtn}>← All Banjo Chords</button>
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

      <main style={{ maxWidth: '560px', margin: '0 auto', padding: '3.5rem 1.5rem', width: '100%', textAlign: 'center' }}>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '2.6rem', fontWeight: 600,
          color: 'var(--gold)', marginBottom: '.25rem',
        }}>
          {chord.name}
        </h1>
        <p style={{ color: 'var(--muted2)', fontSize: '.85rem', marginBottom: '2rem' }}>
          {chord.fullName} — {t?.chordHowToPlay || 'How to play'} · Open G (g D G B d)
        </p>

        {/* Chord diagram */}
        <div style={{
          border: '1px solid var(--border)', borderRadius: '16px',
          background: 'var(--s1)', padding: '2rem 1.5rem',
          display: 'inline-block', marginBottom: '2rem',
        }}>
          <ChordDiagram chord={chord} size={180} numStrings={chord.frets.length} />
        </div>

        {/* String table */}
        <div style={{ marginBottom: '2rem', textAlign: 'left' }}>
          {chord.frets.map((f, i) => {
            let fretLabel
            if (f === -1) {
              fretLabel = t?.chordMutedString || 'Muted'
            } else if (f === 0) {
              fretLabel = t?.chordOpenString || 'Open'
            } else if (i === 0) {
              // 5th string: fret number is absolute (not relative to baseFret)
              fretLabel = `${t?.fretLabel || 'Fret'} ${f}`
            } else {
              fretLabel = `${t?.fretLabel || 'Fret'} ${f + (chord.baseFret - 1)}`
            }
            return (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '.4rem 0', borderBottom: '1px solid var(--border)',
                fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem',
                color: 'var(--text)',
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                  {STRING_LABELS[i]}
                  {i === 0 && (
                    <span style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '.55rem', color: 'var(--gold)',
                      border: '1px solid var(--gold)', borderRadius: '4px',
                      padding: '1px 4px', letterSpacing: '.05em',
                    }}>drone</span>
                  )}
                </span>
                <span style={{ color: 'var(--muted2)' }}>{fretLabel}</span>
              </div>
            )
          })}
        </div>

        <h2 style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '.65rem', letterSpacing: '.15em',
          textTransform: 'uppercase', color: 'var(--gold)',
          marginBottom: '.8rem', textAlign: 'left',
        }}>
          {t?.fingerGuide || 'Finger Guide'}
        </h2>
        <div style={{ marginBottom: '2.5rem' }}>
          <FingerLegend />
        </div>

        <div style={{ display: 'flex', gap: '.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/chords/banjo')} style={{ ...pillBtn, fontSize: '1rem', padding: '0.5rem 1.4rem' }}>
            ← All Banjo Chords
          </button>
          <button onClick={() => navigate('/strings/Banjo 5-str')} style={{ ...pillBtn, fontSize: '1rem', padding: '0.5rem 1.4rem' }}>
            {t?.chordBackToTuner || '← Banjo Tuner'}
          </button>
        </div>
      </main>
    </div>
  )
}
