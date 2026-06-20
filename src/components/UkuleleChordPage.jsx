import { useNavigate, useParams } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { useLanguage } from '../hooks/useLanguage'
import { useSEO } from '../hooks/useSEO'
import { getUkuleleChordBySlug, getUkuleleBaritoneChordBySlug } from '../data/ukuleleChordData'
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

const STRINGS_STANDARD = ['G', 'C', 'E', 'A']
const STRINGS_BARITONE  = ['D', 'G', 'B', 'E']

function VoicingPanel({ chord, stringNames, label }) {
  const { t } = useLanguage()
  return (
    <div style={{
      flex: '1 1 220px',
      border: '1px solid var(--border)', borderRadius: '16px',
      background: 'var(--s1)', padding: '2rem 1.2rem',
      textAlign: 'center',
    }}>
      <div style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: '.65rem', letterSpacing: '.12em',
        textTransform: 'uppercase', color: 'var(--gold)',
        marginBottom: '1.2rem',
      }}>
        {label}
      </div>

      <ChordDiagram chord={chord} size={160} numStrings={stringNames.length} />

      <div style={{ textAlign: 'left', marginTop: '1.5rem' }}>
        {chord.frets.map((f, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between',
            padding: '.4rem 0', borderBottom: '1px solid var(--border)',
            fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem',
            color: 'var(--text)',
          }}>
            <span>{stringNames[i]} {t?.stringLabel || 'String'}</span>
            <span style={{ color: 'var(--muted2)' }}>
              {f === -1
                ? (t?.chordMutedString || 'Muted')
                : f === 0
                  ? (t?.chordOpenString || 'Open')
                  : `${t?.fretLabel || 'Fret'} ${f + (chord.baseFret - 1)}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function UkuleleChordPage() {
  const navigate = useNavigate()
  const { chord: slug } = useParams()
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()

  const chordStd  = getUkuleleChordBySlug(slug || '')
  const chordBari = getUkuleleBaritoneChordBySlug(slug || '')
  const chord     = chordStd || chordBari

  useSEO(chord ? {
    title: `${chord.name} Ukulele Chord — Standard & Baritone Voicings | TuneUp`,
    description: `Free ${chord.name} ukulele chord diagrams for standard (G C E A) and baritone (D G B E) tuning. Finger positions for ${chord.fullName} — no app needed.`,
    url: `https://freetuner.app/chords/ukulele/${chord.name.toLowerCase()}`,
  } : { title: 'Ukulele Chord Not Found | TuneUp', description: '', url: '' })

  if (!chord) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button onClick={() => navigate('/chords/ukulele')} style={pillBtn}>← All Ukulele Chords</button>
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

      <main style={{ maxWidth: '680px', margin: '0 auto', padding: '3.5rem 1.5rem', width: '100%', textAlign: 'center' }}>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '2.6rem', fontWeight: 600,
          color: 'var(--gold)', marginBottom: '.25rem',
        }}>
          {chord.name}
        </h1>
        <p style={{ color: 'var(--muted2)', fontSize: '.85rem', marginBottom: '2.5rem' }}>
          {chord.fullName} — {t?.chordHowToPlay || 'How to play'}
        </p>

        {/* Side-by-side voicings */}
        <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2.5rem' }}>
          {chordStd  && <VoicingPanel chord={chordStd}  stringNames={STRINGS_STANDARD} label="Standard — G C E A" />}
          {chordBari && <VoicingPanel chord={chordBari} stringNames={STRINGS_BARITONE}  label="Baritone — D G B E" />}
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
          <button onClick={() => navigate('/chords/ukulele')} style={{ ...pillBtn, fontSize: '1rem', padding: '0.5rem 1.4rem' }}>
            ← All Ukulele Chords
          </button>
          <button onClick={() => navigate('/strings/Ukulele')} style={{ ...pillBtn, fontSize: '1rem', padding: '0.5rem 1.4rem' }}>
            {t?.chordBackToTuner || '← Ukulele Tuner'}
          </button>
        </div>
      </main>
    </div>
  )
}
