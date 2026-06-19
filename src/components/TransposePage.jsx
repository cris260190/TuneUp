import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { useLanguage } from '../hooks/useLanguage'
import { useSEO } from '../hooks/useSEO'
import { SEO } from '../data/seoData'

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

// Flat spellings → sharp equivalents for input parsing
const FLAT_MAP = { Bb: 'A#', Eb: 'D#', Ab: 'G#', Db: 'C#', Gb: 'F#', Cb: 'B', Fb: 'E' }

function parseRoot(str) {
  if (str.length >= 2) {
    const two = str.slice(0, 2)
    if (FLAT_MAP[two]) return { root: FLAT_MAP[two], len: 2 }
    if (NOTES.includes(two)) return { root: two, len: 2 }
  }
  const one = str[0]
  if (one && NOTES.includes(one)) return { root: one, len: 1 }
  return null
}

function transposeRoot(root, semitones) {
  const idx = NOTES.indexOf(root)
  if (idx === -1) return root
  return NOTES[((idx + semitones) % 12 + 12) % 12]
}

function transposeChord(chord, semitones) {
  // Handle slash chords: G/B → transpose both parts
  if (chord.includes('/')) {
    return chord.split('/').map(p => transposeChord(p, semitones)).join('/')
  }
  const parsed = parseRoot(chord)
  if (!parsed) return chord
  return transposeRoot(parsed.root, semitones) + chord.slice(parsed.len)
}

function transposeText(text, semitones) {
  if (!semitones) return text
  // Split preserving whitespace so output keeps the same formatting
  return text.split(/(\s+)/).map(tok =>
    /^\s+$/.test(tok) ? tok : transposeChord(tok, semitones)
  ).join('')
}

function keysToSemitones(from, to) {
  const fi = NOTES.indexOf(from)
  const ti = NOTES.indexOf(to)
  if (fi === -1 || ti === -1) return 0
  let diff = ti - fi
  if (diff > 6) diff -= 12
  if (diff < -6) diff += 12
  return diff
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

const selectStyle = {
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: '1.2rem',
  fontWeight: 600,
  background: 'var(--bg)',
  color: 'var(--text)',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  padding: '.4rem .8rem',
  cursor: 'pointer',
  width: '100%',
}

const circleBtn = (disabled) => ({
  width: 34,
  height: 34,
  borderRadius: '50%',
  border: '1px solid var(--border)',
  background: 'transparent',
  color: 'var(--text)',
  cursor: disabled ? 'default' : 'pointer',
  fontSize: '1.3rem',
  lineHeight: 1,
  opacity: disabled ? 0.3 : 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
})

export default function TransposePage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()
  useSEO(SEO.transpose)

  const [input, setInput] = useState('G Em C D')
  const [fromKey, setFromKey] = useState('C')
  const [semitones, setSemitones] = useState(0)
  const [copied, setCopied] = useState(false)

  const toKey = NOTES[((NOTES.indexOf(fromKey) + semitones) % 12 + 12) % 12]
  const output = transposeText(input, semitones)
  const semiLabel = semitones === 0 ? '0' : semitones > 0 ? `+${semitones}` : `${semitones}`

  function handleToKeyChange(key) {
    setSemitones(keysToSemitones(fromKey, key))
  }

  function handleSemiDelta(delta) {
    setSemitones(prev => Math.max(-12, Math.min(12, prev + delta)))
  }

  function handleCopy() {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
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
          {t?.transposeTitle || 'Transpose Calculator'}
        </h1>
        <p style={{ color: 'var(--muted2)', fontSize: '.9rem', marginBottom: '2rem' }}>
          {t?.transposeSubtitle || 'Shift guitar chords to any key instantly. Supports major, minor, 7th, maj7, sus, and slash chords.'}
        </p>

        {/* Controls */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '1rem',
          flexWrap: 'wrap',
          marginBottom: '2rem',
          padding: '1.2rem 1.5rem',
          background: 'var(--s1)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
        }}>
          {/* From Key */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.35rem', flex: '1 1 100px', minWidth: 90 }}>
            <label style={labelStyle}>{t?.transposeFromKey || 'From Key'}</label>
            <select value={fromKey} onChange={e => setFromKey(e.target.value)} style={selectStyle}>
              {NOTES.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>

          {/* Semitone counter */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.35rem', flex: '0 0 auto' }}>
            <label style={labelStyle}>{t?.transposeSemitones || 'Semitones'}</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
              <button onClick={() => handleSemiDelta(-1)} disabled={semitones <= -12} style={circleBtn(semitones <= -12)}>−</button>
              <span style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '1.3rem', fontWeight: 700,
                color: semitones === 0 ? 'var(--muted)' : 'var(--gold)',
                minWidth: '3.2ch', textAlign: 'center',
              }}>
                {semiLabel}
              </span>
              <button onClick={() => handleSemiDelta(+1)} disabled={semitones >= 12} style={circleBtn(semitones >= 12)}>+</button>
            </div>
          </div>

          {/* To Key */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.35rem', flex: '1 1 100px', minWidth: 90 }}>
            <label style={labelStyle}>{t?.transposeToKey || 'To Key'}</label>
            <select value={toKey} onChange={e => handleToKeyChange(e.target.value)} style={selectStyle}>
              {NOTES.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>

        {/* Input / Output */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.2rem',
        }}>
          {/* Input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
            <label style={labelStyle}>{t?.transposeInput || 'Chord list'}</label>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={t?.transposePlaceholder || 'e.g.  G  Em  C  D'}
              rows={8}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '1rem', lineHeight: 1.9,
                background: 'var(--s1)',
                color: 'var(--text)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                padding: '.9rem 1.1rem',
                resize: 'vertical',
                outline: 'none',
                width: '100%',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Output */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label style={labelStyle}>{t?.transposeOutput || 'Transposed chords'}</label>
              {output && (
                <button
                  onClick={handleCopy}
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '.65rem', letterSpacing: '.04em',
                    padding: '.2rem .7rem',
                    borderRadius: '999px',
                    border: '1px solid var(--border)',
                    background: copied ? 'var(--gold)' : 'transparent',
                    color: copied ? 'var(--bg)' : 'var(--muted2)',
                    cursor: 'pointer',
                    transition: 'all .15s',
                  }}
                >
                  {copied ? (t?.transposeCopied || '✓ Copied') : (t?.transposeCopy || 'Copy')}
                </button>
              )}
            </div>
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '1rem', lineHeight: 1.9,
              background: 'var(--s1)',
              color: output ? 'var(--text)' : 'var(--muted)',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              padding: '.9rem 1.1rem',
              minHeight: '12rem',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              userSelect: 'text',
            }}>
              {output || (t?.transposeOutputPlaceholder || 'Transposed chords appear here')}
            </div>
          </div>
        </div>

        {/* Back navigation */}
        <div style={{ marginTop: '3rem', display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/guitar')} style={{ ...pillBtn, fontSize: '1rem', padding: '0.5rem 1.4rem' }}>
            {t?.navTuner || '← Tuner'}
          </button>
          <button onClick={() => navigate('/chords/guitar')} style={{ ...pillBtn, fontSize: '1rem', padding: '0.5rem 1.4rem' }}>
            {t?.navChords || 'Chords'}
          </button>
        </div>
      </main>
    </div>
  )
}
