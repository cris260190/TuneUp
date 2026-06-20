import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { useLanguage } from '../hooks/useLanguage'
import { useSEO } from '../hooks/useSEO'
import { SEO } from '../data/seoData'
import {
  UKULELE_CHORDS, UKULELE_BARITONE_CHORDS,
  UKULELE_CHORD_ROOTS, UKULELE_CHORD_TYPES,
} from '../data/ukuleleChordData'
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

const TAB = (active) => ({
  fontFamily: "'Space Mono', monospace",
  fontSize: '.72rem', letterSpacing: '.05em',
  padding: '.3rem 1rem', borderRadius: '999px',
  border: active ? '1.5px solid var(--gold)' : '1px solid var(--border)',
  background: active ? 'var(--gold)' : 'transparent',
  color: active ? 'var(--bg)' : 'var(--text)',
  cursor: 'pointer', transition: 'all .15s',
})

export default function UkuleleChordLibraryPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()
  useSEO(SEO.chordsUkulele)

  const [tuning, setTuning] = useState('standard')   // 'standard' | 'baritone'
  const [selectedRoot, setSelectedRoot] = useState('C')
  const [selectedType, setSelectedType] = useState('All')

  const chords = tuning === 'standard' ? UKULELE_CHORDS : UKULELE_BARITONE_CHORDS

  const availableTypes = ['All', ...UKULELE_CHORD_TYPES.filter(tp =>
    chords.some(c => c.root === selectedRoot && c.type === tp)
  )]

  const filtered = chords.filter(c => {
    if (c.root !== selectedRoot) return false
    if (selectedType !== 'All' && c.type !== selectedType) return false
    return true
  })

  function handleRootChange(root) {
    setSelectedRoot(root)
    setSelectedType('All')
  }

  function handleTuningChange(t) {
    setTuning(t)
    setSelectedType('All')
  }

  function handleChordClick(chord) {
    navigate(`/chords/ukulele/${encodeURIComponent(chord.name.toLowerCase())}`)
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

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1.5rem', width: '100%' }}>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '2.2rem', fontWeight: 600,
          color: 'var(--gold)', marginBottom: '.5rem',
        }}>
          Ukulele Chord Library
        </h1>
        <p style={{ color: 'var(--muted2)', fontSize: '.9rem', marginBottom: '1.8rem' }}>
          Chord diagrams for Standard (G C E A) and Baritone (D G B E) ukulele. Click a chord to see both voicings.
        </p>

        {/* Chords | Fretboard Map tab strip */}
        <div style={{ display: 'flex', gap: '.4rem', marginBottom: '1.8rem' }}>
          <button style={TAB(true)}>Chords</button>
          <button onClick={() => navigate('/chords/ukulele/fretboard')} style={TAB(false)}>Fretboard Map</button>
        </div>

        {/* Standard / Baritone toggle */}
        <div style={{ display: 'flex', gap: '.4rem', marginBottom: '1.8rem' }}>
          <button onClick={() => handleTuningChange('standard')} style={TAB(tuning === 'standard')}>
            Standard — G C E A
          </button>
          <button onClick={() => handleTuningChange('baritone')} style={TAB(tuning === 'baritone')}>
            Baritone — D G B E
          </button>
        </div>

        {/* Root tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem', marginBottom: '1.2rem' }}>
          {UKULELE_CHORD_ROOTS.map(root => {
            const hasChords = chords.some(c => c.root === root)
            const isActive  = root === selectedRoot
            return (
              <button
                key={root}
                onClick={() => hasChords && handleRootChange(root)}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.1rem', fontWeight: 600,
                  padding: '.3rem .9rem', borderRadius: '8px',
                  border: isActive ? '1.5px solid var(--gold)' : '1px solid var(--border)',
                  background: isActive ? 'var(--gold)' : 'transparent',
                  color: isActive ? 'var(--bg)' : hasChords ? 'var(--text)' : 'var(--muted)',
                  cursor: hasChords ? 'pointer' : 'default',
                  opacity: hasChords ? 1 : 0.35,
                  transition: 'all .15s',
                  minWidth: '2.4rem', textAlign: 'center',
                }}
              >
                {root}
              </button>
            )
          })}
        </div>

        {/* Type pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem', marginBottom: '2rem' }}>
          {availableTypes.map(tp => {
            const isActive = tp === selectedType
            return (
              <button
                key={tp}
                onClick={() => setSelectedType(tp)}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '.72rem', letterSpacing: '.05em',
                  padding: '.25rem .75rem', borderRadius: '999px',
                  border: isActive ? '1.5px solid var(--gold)' : '1px solid var(--border)',
                  background: isActive ? 'var(--gold)' : 'transparent',
                  color: isActive ? 'var(--bg)' : 'var(--text)',
                  cursor: 'pointer', transition: 'all .15s',
                }}
              >
                {tp}
              </button>
            )
          })}
        </div>

        {/* Chord grid */}
        {filtered.length === 0 ? (
          <div style={{ color: 'var(--muted2)', fontSize: '.9rem', padding: '2rem 0' }}>
            No chords for {selectedRoot} {selectedType === 'All' ? '' : selectedType}.
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
            gap: '1.2rem',
          }}>
            {filtered.map(chord => (
              <div
                key={chord.name}
                onClick={() => handleChordClick(chord)}
                style={{
                  border: '1px solid var(--border)', borderRadius: '12px',
                  padding: '1.2rem 1rem',
                  background: 'var(--s1)', cursor: 'pointer',
                  textAlign: 'center', transition: 'border-color .2s, transform .2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <ChordDiagram chord={chord} size={90} numStrings={chord.frets.length} />
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.3rem', fontWeight: 600,
                  color: 'var(--text)', marginTop: '.6rem',
                }}>
                  {chord.name}
                </div>
                <div style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '.6rem', color: 'var(--muted2)', marginTop: '.15rem',
                }}>
                  {chord.type}
                </div>
              </div>
            ))}
          </div>
        )}

        <button onClick={() => navigate('/strings/Ukulele')} style={{
          ...pillBtn, fontSize: '1rem', padding: '0.5rem 1.4rem', marginTop: '3rem',
        }}>
          {t?.chordBackToTuner || '← Ukulele Tuner'}
        </button>
      </main>
    </div>
  )
}
