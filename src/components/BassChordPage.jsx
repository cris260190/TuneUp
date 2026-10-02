import { useNavigate, useParams } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { useLanguage } from '../hooks/useLanguage'
import { useSEO } from '../hooks/useSEO'
import { getBass4ChordBySlug, getBass5ChordBySlug } from '../data/bassChordData'
import ChordDiagram from './ChordDiagram'
import PalmGuide from './PalmGuide'

const pillBtn = {
  background: 'transparent',
  border: '1px solid var(--border)',
  borderRadius: '999px',
  color: 'var(--text)',
  cursor: 'pointer',
  fontSize: '1rem',
  padding: '0.3rem 0.9rem',
}

const STRINGS_4 = ['E', 'A', 'D', 'G']
const STRINGS_5 = ['B', 'E', 'A', 'D', 'G']

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

export default function BassChordPage({ doubleBass = false }) {
  const navigate = useNavigate()
  const { chord: slug } = useParams()
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()
  const libraryPath = doubleBass ? '/chords/double-bass' : '/chords/bass'

  const chord4 = getBass4ChordBySlug(slug || '')
  const chord5 = getBass5ChordBySlug(slug || '')
  const chord  = chord4 || chord5

  useSEO(chord ? {
    title: doubleBass
      ? `${chord.name} Double Bass Chord — How to Play ${chord.fullName} | TuneUp`
      : `${chord.name} Bass Chord — How to Play ${chord.fullName} on Bass | TuneUp`,
    description: doubleBass
      ? `Free ${chord.name} double bass chord diagram with finger positions. ${chord.fullName} on double bass tuning E A D G.`
      : `Free ${chord.name} bass chord diagrams for 4-string and 5-string bass guitar. Finger positions for ${chord.fullName} — no app needed.`,
    url: `https://freetuner.app${libraryPath}/${chord.name.toLowerCase()}`,
  } : { title: doubleBass ? 'Double Bass Chord Not Found | TuneUp' : 'Bass Chord Not Found | TuneUp', description: '', url: '' })

  if (!chord) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button onClick={() => navigate(libraryPath)} style={pillBtn}>{t?.chordBackToLibrary || '← All Chords'}</button>
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
          {chord.fullName} — {t?.chordHowToPlay || 'How to play'}{doubleBass ? ' · Double Bass' : ''}
        </p>

        {/* Side-by-side voicings */}
        <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2.5rem' }}>
          {chord4 && <VoicingPanel chord={chord4} stringNames={STRINGS_4} label="4-String" />}
          {chord5 && <VoicingPanel chord={chord5} stringNames={STRINGS_5} label="5-String" />}
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
          <PalmGuide />
          {doubleBass && (
            <p style={{
              margin: '1.1rem auto 0',
              maxWidth: '34rem',
              textAlign: 'left',
              fontFamily: "'Space Mono', monospace",
              fontSize: '.72rem',
              lineHeight: 1.6,
              color: 'var(--text)',
            }}>
              {t?.doubleBassFingerNote || '* On the double bass, lower positions usually use fingers 1, 2 and 4. Finger 2 is not a normal stop. Higher up, the thumb stops the string, as on the cello in thumb position. That grip is in the lesson, not on this chart.'}
            </p>
          )}
        </div>

        <div style={{ display: 'flex', gap: '.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate(libraryPath)} style={{ ...pillBtn, fontSize: '1rem', padding: '0.5rem 1.4rem' }}>
            {t?.chordBackToLibrary || '← All Chords'}
          </button>
          <button onClick={() => navigate('/')} style={{ ...pillBtn, fontSize: '1rem', padding: '0.5rem 1.4rem' }}>
            {t?.navMain || '← Main page'}
          </button>
        </div>
      </main>
    </div>
  )
}
