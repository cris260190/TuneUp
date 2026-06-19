import { useState, useEffect } from 'react'

function useIsMobile() {
  const [m, setM] = useState(window.innerWidth < 768)
  useEffect(() => {
    const h = () => setM(window.innerWidth < 768)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])
  return m
}
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { useLanguage } from '../hooks/useLanguage'
import { useSEO } from '../hooks/useSEO'
import { SEO } from '../data/seoData'

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

const SCALES = {
  major: {
    intervals:    [0, 2, 4, 5, 7, 9, 11],
    qualities:    ['', 'm', 'm', '', '', 'm', 'dim'],
    numerals:     ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'],
    progressions: [
      { name: 'Pop',        pattern: 'I – V – vi – IV',    degrees: [0, 4, 5, 3] },
      { name: 'Blues',      pattern: 'I – IV – V',          degrees: [0, 3, 4] },
      { name: '50s',        pattern: 'I – vi – IV – V',     degrees: [0, 5, 3, 4] },
      { name: 'Jazz',       pattern: 'ii – V – I',          degrees: [1, 4, 0] },
      { name: 'Classic',    pattern: 'I – IV – V – I',      degrees: [0, 3, 4, 0] },
      { name: 'Turnaround', pattern: 'I – vi – ii – V',     degrees: [0, 5, 1, 4] },
      { name: 'Ascending',  pattern: 'I – iii – IV – V',    degrees: [0, 2, 3, 4] },
    ],
  },
  minor: {
    intervals:    [0, 2, 3, 5, 7, 8, 10],
    qualities:    ['m', 'dim', '', 'm', 'm', '', ''],
    numerals:     ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'],
    progressions: [
      { name: 'Dark Rock',   pattern: 'i – VII – VI – VII',  degrees: [0, 6, 5, 6] },
      { name: 'Minor Blues', pattern: 'i – iv – v',           degrees: [0, 3, 4] },
      { name: 'Epic',        pattern: 'i – VI – III – VII',   degrees: [0, 5, 2, 6] },
      { name: 'Descending',  pattern: 'i – VII – VI – V',     degrees: [0, 6, 5, 4] },
      { name: 'Ballad',      pattern: 'i – iv – VII – III',   degrees: [0, 3, 6, 2] },
      { name: 'Jazz Minor',  pattern: 'ii° – V – i',          degrees: [1, 4, 0] },
    ],
  },
}

function buildChords(rootNote, scaleKey) {
  const scale = SCALES[scaleKey]
  const rootIdx = NOTES.indexOf(rootNote)
  return scale.intervals.map((interval, i) => {
    const noteIdx = (rootIdx + interval) % 12
    const note    = NOTES[noteIdx]
    const quality = scale.qualities[i]
    return { note, quality, numeral: scale.numerals[i], name: note + quality }
  })
}

const pillBtn = {
  background: 'transparent',
  border: '1px solid var(--border)',
  borderRadius: '999px',
  color: 'var(--text)',
  cursor: 'pointer',
  fontSize: '1rem',
  padding: '0.3rem 0.9rem',
}

const labelStyle = {
  fontFamily: "'Space Mono', monospace",
  fontSize: '.65rem',
  color: 'var(--muted2)',
  letterSpacing: '.08em',
  textTransform: 'uppercase',
}

export default function ProgressionsPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()
  useSEO(SEO.progressions)

  const isMobile = useIsMobile()
  const [key, setKey]               = useState('C')
  const [scaleKey, setScaleKey]     = useState('major')
  const [selectedProg, setSelected] = useState(0)
  const [copiedIdx, setCopiedIdx]   = useState(null)

  const chords = buildChords(key, scaleKey)
  const { progressions, numerals } = SCALES[scaleKey]
  const activeProg  = progressions[selectedProg] ?? progressions[0]
  const progChords  = activeProg.degrees.map(d => chords[d])

  function handleScaleChange(s) {
    setScaleKey(s)
    setSelected(0)
  }

  function handleCopy(idx, e) {
    e.stopPropagation()
    const prog   = progressions[idx]
    const names  = prog.degrees.map(d => chords[d].name).join('  ')
    navigator.clipboard.writeText(names).then(() => {
      setCopiedIdx(idx)
      setTimeout(() => setCopiedIdx(c => c === idx ? null : c), 1800)
    })
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

      <main style={{ maxWidth: '820px', margin: '0 auto', padding: '3rem 1.5rem', width: '100%' }}>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '2.2rem', fontWeight: 600,
          color: 'var(--gold)', marginBottom: '.5rem',
        }}>
          {t?.progressionsTitle || 'Chord Progression Generator'}
        </h1>
        <p style={{ color: 'var(--muted2)', fontSize: '.9rem', marginBottom: '2rem' }}>
          {t?.progressionsSubtitle || 'Pick a key and scale, explore diatonic chords, and discover common progressions.'}
        </p>

        {/* Key + Scale selector */}
        <div style={{
          display: 'flex', alignItems: 'flex-end', gap: '1.5rem', flexWrap: 'wrap',
          padding: '1.2rem 1.5rem',
          background: 'var(--s1)', border: '1px solid var(--border)', borderRadius: '12px',
          marginBottom: '2rem',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.35rem' }}>
            <label style={labelStyle}>{t?.progressionsKey || 'Key'}</label>
            <select
              value={key}
              onChange={e => setKey(e.target.value)}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.2rem', fontWeight: 600,
                background: 'var(--bg)', color: 'var(--text)',
                border: '1px solid var(--border)', borderRadius: '8px',
                padding: '.4rem .8rem', cursor: 'pointer',
              }}
            >
              {NOTES.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '.35rem' }}>
            <label style={labelStyle}>{t?.progressionsScale || 'Scale'}</label>
            <div style={{ display: 'flex', gap: '.4rem' }}>
              {['major', 'minor'].map(s => (
                <button
                  key={s}
                  onClick={() => handleScaleChange(s)}
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '.72rem', letterSpacing: '.04em',
                    padding: '.4rem 1rem', borderRadius: '8px',
                    border: scaleKey === s ? '1.5px solid var(--gold)' : '1px solid var(--border)',
                    background: scaleKey === s ? 'var(--gold)' : 'transparent',
                    color: scaleKey === s ? 'var(--bg)' : 'var(--text)',
                    cursor: 'pointer', transition: 'all .15s',
                    textTransform: 'capitalize',
                  }}
                >
                  {s === 'major' ? (t?.progressionsMajor || 'Major') : (t?.progressionsMinor || 'Minor')}
                </button>
              ))}
            </div>
          </div>

          <div style={{ color: 'var(--muted2)', fontSize: '.8rem', alignSelf: 'center', paddingBottom: '.1rem' }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', color: 'var(--text)', fontWeight: 600 }}>
              {key} {scaleKey === 'major' ? 'Major' : 'Minor'}
            </span>
          </div>
        </div>

        {/* Diatonic chords */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ ...labelStyle, marginBottom: '.8rem', display: 'block' }}>
            {t?.progressionsDiatonic || 'Diatonic chords'}
          </div>
          <div style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap' }}>
            {chords.map((chord, i) => {
              const isInProg = activeProg.degrees.includes(i)
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    gap: '.25rem', padding: '.6rem .9rem',
                    border: isInProg ? '1.5px solid var(--gold)' : '1px solid var(--border)',
                    borderRadius: '10px',
                    background: isInProg ? 'rgba(212,168,71,.08)' : 'var(--s1)',
                    minWidth: '52px', textAlign: 'center',
                    transition: 'all .15s',
                  }}
                >
                  <span style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '.6rem', color: 'var(--muted2)',
                  }}>
                    {numerals[i]}
                  </span>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.15rem', fontWeight: 700,
                    color: isInProg ? 'var(--gold)' : 'var(--text)',
                  }}>
                    {chord.name}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Active progression highlight */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '.5rem',
          flexWrap: 'wrap', marginBottom: '1.8rem',
          padding: '1rem 1.4rem',
          background: 'rgba(212,168,71,.06)',
          border: '1.5px solid var(--gold)',
          borderRadius: '12px',
        }}>
          <span style={{ ...labelStyle, color: 'var(--gold)', marginRight: '.5rem' }}>
            {activeProg.name}
          </span>
          {progChords.map((chord, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.6rem', fontWeight: 700, color: 'var(--text)',
              }}>
                {chord.name}
              </span>
              {i < progChords.length - 1 && (
                <span style={{ color: 'var(--muted)', fontSize: '1rem' }}>→</span>
              )}
            </span>
          ))}
        </div>

        {/* Progression cards */}
        <div style={{ ...labelStyle, marginBottom: '.8rem', display: 'block' }}>
          {t?.progressionsCommon || 'Common progressions'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
          {progressions.map((prog, idx) => {
            const isActive = selectedProg === idx
            const names    = prog.degrees.map(d => chords[d].name)
            return (
              <div
                key={idx}
                onClick={() => setSelected(idx)}
                style={{
                  display: 'flex', alignItems: 'center',
                  gap: isMobile ? '.6rem' : '1rem',
                  padding: isMobile ? '.7rem 1rem' : '.85rem 1.2rem',
                  border: isActive ? '1.5px solid var(--gold)' : '1px solid var(--border)',
                  borderRadius: '10px',
                  background: isActive ? 'rgba(212,168,71,.06)' : 'var(--s1)',
                  cursor: 'pointer', transition: 'all .15s',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.borderColor = 'var(--muted2)' }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.borderColor = 'var(--border)' }}
              >
                {/* Name */}
                <span style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '.72rem', fontWeight: 700,
                  color: isActive ? 'var(--gold)' : 'var(--text)',
                  minWidth: isMobile ? '60px' : '80px',
                  flexShrink: 0,
                }}>
                  {prog.name}
                </span>

                {/* Roman numeral pattern — desktop only */}
                {!isMobile && (
                  <span style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '.65rem', color: 'var(--muted2)',
                    flex: '1 1 140px',
                  }}>
                    {prog.pattern}
                  </span>
                )}

                {/* Chord names */}
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.1rem', fontWeight: 600,
                  color: 'var(--text)', flex: 1,
                  letterSpacing: '.02em',
                }}>
                  {names.join('  –  ')}
                </span>

                {/* Copy */}
                <button
                  onClick={e => handleCopy(idx, e)}
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '.62rem', letterSpacing: '.04em',
                    padding: '.2rem .65rem', borderRadius: '999px',
                    border: '1px solid var(--border)',
                    background: copiedIdx === idx ? 'var(--gold)' : 'transparent',
                    color: copiedIdx === idx ? 'var(--bg)' : 'var(--muted2)',
                    cursor: 'pointer', transition: 'all .15s',
                    flexShrink: 0,
                  }}
                >
                  {copiedIdx === idx ? (t?.transposeCopied || '✓') : (t?.transposeCopy || 'Copy')}
                </button>
              </div>
            )
          })}
        </div>

        {/* Back nav */}
        <div style={{ marginTop: '3rem', display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/guitar')} style={{ ...pillBtn, fontSize: '1rem', padding: '0.5rem 1.4rem' }}>
            {t?.navTuner || '← Tuner'}
          </button>
          <button onClick={() => navigate('/transpose')} style={{ ...pillBtn, fontSize: '1rem', padding: '0.5rem 1.4rem' }}>
            {t?.navTranspose || 'Transpose'}
          </button>
          <button onClick={() => navigate('/chords/guitar')} style={{ ...pillBtn, fontSize: '1rem', padding: '0.5rem 1.4rem' }}>
            {t?.navChords || 'Chords'}
          </button>
        </div>
      </main>
    </div>
  )
}
