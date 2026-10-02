import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { useLanguage } from '../hooks/useLanguage'
import { useSEO } from '../hooks/useSEO'
import { SEO } from '../data/seoData'
import { WIND_FINGERING } from '../data/windFingeringConfig'
import { FLUTE_NOTES, getFluteNotesByOctave } from '../data/fluteFingeringData'
import { WoodwindFingers } from './WindHand'
import { getSharedAudioCtx, unlockSharedAudioCtx } from '../hooks/useAudioContext'

const NOTE_SEMITONES = { C: 0, 'C#': 1, D: 2, 'D#': 3, E: 4, F: 5, 'F#': 6, G: 7, 'G#': 8, A: 9, 'A#': 10, B: 11 }

function noteToFreq(name) {
  const m = name.match(/^([A-G]#?)(\d)$/)
  if (!m) return 440
  const midi = NOTE_SEMITONES[m[1]] + (parseInt(m[2]) + 1) * 12
  return 440 * Math.pow(2, (midi - 69) / 12)
}

function playFlute(freq) {
  unlockSharedAudioCtx()
  const ctx = getSharedAudioCtx()
  if (!ctx) return

  const now = ctx.currentTime
  const dur = 1.8

  // Flute tone: fundamental sine + 2nd/3rd harmonics, soft attack
  const osc1 = ctx.createOscillator()
  osc1.type = 'sine'
  osc1.frequency.setValueAtTime(freq, now)

  const osc2 = ctx.createOscillator()
  osc2.type = 'sine'
  osc2.frequency.setValueAtTime(freq * 2, now)

  const osc3 = ctx.createOscillator()
  osc3.type = 'sine'
  osc3.frequency.setValueAtTime(freq * 3, now)

  const g1 = ctx.createGain()
  g1.gain.setValueAtTime(0, now)
  g1.gain.linearRampToValueAtTime(0.48, now + 0.06)
  g1.gain.setValueAtTime(0.48, now + dur - 0.25)
  g1.gain.linearRampToValueAtTime(0, now + dur)

  const g2 = ctx.createGain()
  g2.gain.setValueAtTime(0, now)
  g2.gain.linearRampToValueAtTime(0.10, now + 0.06)
  g2.gain.setValueAtTime(0.10, now + dur - 0.25)
  g2.gain.linearRampToValueAtTime(0, now + dur)

  const g3 = ctx.createGain()
  g3.gain.setValueAtTime(0, now)
  g3.gain.linearRampToValueAtTime(0.03, now + 0.08)
  g3.gain.setValueAtTime(0.03, now + dur - 0.25)
  g3.gain.linearRampToValueAtTime(0, now + dur)

  const master = ctx.createGain()
  master.gain.setValueAtTime(0.7, now)

  osc1.connect(g1); g1.connect(master)
  osc2.connect(g2); g2.connect(master)
  osc3.connect(g3); g3.connect(master)
  master.connect(ctx.destination)

  osc1.start(now); osc1.stop(now + dur)
  osc2.start(now); osc2.stop(now + dur)
  osc3.start(now); osc3.stop(now + dur)
}

const SVG_W    = 680
const SVG_H    = 155
const TUBE_X   = 30
const TUBE_Y   = 80
const TUBE_H   = 22
const TUBE_W   = 622
const KEY_Y    = 91
const KEY_R    = 14
const THUMB_X  = 108
const THUMB_Y  = 45
const THUMB_R  = 10

const KEY_NAMES = ['LH1', 'LH2', 'LH3', 'LH4', 'RH1', 'RH2', 'RH3', 'RH4']
const KEY_X     = { LH1: 165, LH2: 220, LH3: 275, LH4: 330, RH1: 410, RH2: 465, RH3: 520, RH4: 575 }
const OCTAVES   = [4, 5, 6, 7]

const REGISTER_LABELS = {
  normal: 'Low register',
  second: 'Middle register — octave key active',
  third:  'High register — overblown',
}
const REGISTER_COLORS = {
  normal: 'var(--teal)',
  second: 'var(--gold)',
  third:  'var(--red)',
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

const TAB = (active) => ({
  fontFamily: "'Space Mono', monospace",
  fontSize: '.72rem', letterSpacing: '.05em',
  padding: '.3rem 1rem', borderRadius: '999px',
  border: active ? '1.5px solid var(--gold)' : '1px solid var(--border)',
  background: active ? 'var(--gold)' : 'transparent',
  color: active ? 'var(--bg)' : 'var(--text)',
  cursor: 'pointer', transition: 'all .15s',
})

function FingeringDiagram({ note }) {
  const { keys, thumb } = note

  return (
    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        width={SVG_W}
        height={SVG_H}
        style={{ display: 'block', minWidth: SVG_W }}
      >
        {/* Section labels */}
        <text x={238} y={14} textAnchor="middle" fontSize="8.5"
          fontFamily="'Space Mono', monospace" fill="var(--muted2)" letterSpacing="0.1em">LEFT HAND</text>
        <text x={492} y={14} textAnchor="middle" fontSize="8.5"
          fontFamily="'Space Mono', monospace" fill="var(--muted2)" letterSpacing="0.1em">RIGHT HAND</text>

        {/* Flute tube */}
        <rect x={TUBE_X} y={TUBE_Y} width={TUBE_W} height={TUBE_H} rx={11}
          fill="var(--s1)" stroke="var(--border)" strokeWidth="1.5" />

        {/* Embouchure hole */}
        <ellipse cx={70} cy={KEY_Y} rx={8} ry={6}
          fill="none" stroke="var(--muted2)" strokeWidth="1.5" strokeDasharray="2 2" />
        <text x={70} y={KEY_Y + 22} textAnchor="middle" fontSize="8"
          fontFamily="'Space Mono', monospace" fill="var(--muted2)">emb</text>

        {/* Hand divider */}
        <line x1={372} y1={TUBE_Y} x2={372} y2={TUBE_Y + TUBE_H}
          stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3" />

        {/* Thumb connector + key */}
        <line x1={THUMB_X} y1={THUMB_Y + THUMB_R} x2={THUMB_X} y2={TUBE_Y}
          stroke="var(--border)" strokeWidth="1" />
        <text x={THUMB_X} y={THUMB_Y - 17} textAnchor="middle" fontSize="8"
          fontFamily="'Space Mono', monospace" fill="var(--muted2)">Thumb</text>
        <circle cx={THUMB_X} cy={THUMB_Y} r={THUMB_R}
          fill={thumb ? 'var(--gold)' : 'var(--bg)'}
          stroke={thumb ? 'var(--gold)' : 'var(--muted2)'}
          strokeWidth="1.5" />

        {/* Main keys */}
        {KEY_NAMES.map(name => {
          const cx      = KEY_X[name]
          const covered = keys[name]
          return (
            <g key={name}>
              <circle cx={cx} cy={KEY_Y} r={KEY_R}
                fill={covered ? 'var(--gold)' : 'var(--bg)'}
                stroke={covered ? 'var(--gold)' : 'var(--muted2)'}
                strokeWidth="1.5" />
              <text x={cx} y={KEY_Y + KEY_R + 13} textAnchor="middle" fontSize="8.5"
                fontFamily="'Space Mono', monospace" fill="var(--muted2)">{name}</text>
            </g>
          )
        })}
        <WoodwindFingers note={note} config={{ showRegister: false }} />
      </svg>
    </div>
  )
}

export default function FluteFingeringChart() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const { lang, t } = useLanguage()
  useSEO(SEO.fluteFingering)
  const guide = WIND_FINGERING.Flute.guide[lang] || WIND_FINGERING.Flute.guide.en

  const [selectedOctave, setSelectedOctave] = useState(4)
  const [selectedNote, setSelectedNote]     = useState('C4')
  const [isPlaying, setIsPlaying]           = useState(false)

  const noteObj       = FLUTE_NOTES.find(n => n.name === selectedNote) || FLUTE_NOTES[0]
  const notesInOctave = getFluteNotesByOctave(selectedOctave)

  function handleSelectNote(name) {
    setSelectedNote(name)
    playFlute(noteToFreq(name))
    setIsPlaying(true)
    setTimeout(() => setIsPlaying(false), 1800)
  }

  function handleOctave(oct) {
    setSelectedOctave(oct)
    const first = getFluteNotesByOctave(oct)[0]
    if (first) handleSelectNote(first.name)
  }

  function handlePlay() {
    playFlute(noteToFreq(noteObj.name))
    setIsPlaying(true)
    setTimeout(() => setIsPlaying(false), 1800)
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
          Flute Fingering Chart
        </h1>
        <p style={{ color: 'var(--muted2)', fontSize: '.9rem', marginBottom: '.8rem', lineHeight: 1.55 }}>
          Concert flute fingerings for all notes — C4 to D7. Select a note to see the key diagram.
        </p>
        <p style={{ color: 'var(--text)', fontSize: '.92rem', lineHeight: 1.65, marginTop: 0, marginBottom: '1.2rem' }}>
          {guide}
        </p>
        <div style={{ display: 'flex', gap: '.4rem', marginBottom: '1.4rem' }}>
          <button style={TAB(true)}>{t?.navFingering || 'Fingering'}</button>
          <button onClick={() => navigate('/chords/flute')} style={TAB(false)}>{t?.navChords || 'Chords'}</button>
        </div>

        {/* Octave tabs */}
        <div style={{ display: 'flex', gap: '.4rem', marginBottom: '1.2rem' }}>
          {OCTAVES.map(oct => {
            const hasNotes = getFluteNotesByOctave(oct).length > 0
            const isActive = oct === selectedOctave
            return (
              <button key={oct} onClick={() => hasNotes && handleOctave(oct)} style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '.72rem', letterSpacing: '.05em',
                padding: '.3rem .9rem', borderRadius: '999px',
                border: isActive ? '1.5px solid var(--gold)' : '1px solid var(--border)',
                background: isActive ? 'var(--gold)' : 'transparent',
                color: isActive ? 'var(--bg)' : 'var(--text)',
                cursor: hasNotes ? 'pointer' : 'default',
                opacity: hasNotes ? 1 : 0.35,
                transition: 'all .15s',
              }}>
                Octave {oct}
              </button>
            )
          })}
        </div>

        {/* Note selector */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem', marginBottom: '2.2rem' }}>
          {notesInOctave.map(n => {
            const isActive = n.name === selectedNote
            return (
              <button key={n.name} onClick={() => handleSelectNote(n.name)} style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.1rem', fontWeight: 600,
                padding: '.3rem .9rem', borderRadius: '8px',
                border: isActive ? '1.5px solid var(--gold)' : '1px solid var(--border)',
                background: isActive ? 'var(--gold)' : 'transparent',
                color: isActive ? 'var(--bg)' : 'var(--text)',
                cursor: 'pointer', transition: 'all .15s',
                minWidth: '3rem', textAlign: 'center',
              }}>
                {n.display}
              </button>
            )
          })}
        </div>

        {/* Fingering diagram */}
        <div style={{
          border: '1px solid var(--border)', borderRadius: '16px',
          background: 'var(--s1)', padding: '2rem 1.5rem',
          marginBottom: '1.5rem',
        }}>
          <FingeringDiagram note={noteObj} />
        </div>

        {/* Note info */}
        <div style={{
          border: '1px solid var(--border)', borderRadius: '12px',
          background: 'var(--s1)', padding: '1.4rem 1.6rem',
          marginBottom: '2rem',
          display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '3rem', fontWeight: 600, color: 'var(--gold)', lineHeight: 1,
              }}>{noteObj.display}</div>
              <div style={{
                fontFamily: "'Space Mono', monospace", fontSize: '.65rem',
                color: 'var(--muted2)', marginTop: '.25rem',
              }}>{noteObj.label}</div>
            </div>
            <button onClick={handlePlay} title="Play note" style={{
              width: 42, height: 42, borderRadius: '50%',
              border: `1.5px solid ${isPlaying ? 'var(--gold)' : 'var(--border)'}`,
              background: isPlaying ? 'var(--gold)' : 'transparent',
              color: isPlaying ? 'var(--bg)' : 'var(--gold)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all .15s', flexShrink: 0,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </button>
          </div>

          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center',
              fontFamily: "'Space Mono', monospace", fontSize: '.65rem',
              color: REGISTER_COLORS[noteObj.register],
              border: `1px solid ${REGISTER_COLORS[noteObj.register]}`,
              borderRadius: '6px', padding: '.2rem .55rem',
              marginBottom: '.5rem',
            }}>
              {REGISTER_LABELS[noteObj.register]}
            </div>
            {noteObj.thumb && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: '.45rem',
                fontFamily: "'Space Mono', monospace", fontSize: '.65rem',
                color: 'var(--gold)',
              }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
                Thumb key active
              </div>
            )}
          </div>

          {noteObj.notes && (
            <div style={{
              width: '100%',
              fontFamily: "'Space Mono', monospace", fontSize: '.65rem',
              color: 'var(--muted2)',
              borderTop: '1px solid var(--border)', paddingTop: '.75rem',
            }}>
              ⚠ {noteObj.notes}
            </div>
          )}
        </div>

        {/* Legend */}
        <div style={{
          display: 'flex', gap: '2rem', flexWrap: 'wrap',
          fontFamily: "'Space Mono', monospace", fontSize: '.65rem',
          color: 'var(--muted2)',
          padding: '1rem 1.2rem',
          border: '1px solid var(--border)', borderRadius: '8px',
          background: 'var(--s1)', marginBottom: '2.5rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
            <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
            Covered / pressed
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
            <div style={{ width: 14, height: 14, borderRadius: '50%', border: '1.5px solid var(--muted2)', flexShrink: 0 }} />
            Open / not pressed
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', border: '1.5px solid var(--muted2)', flexShrink: 0 }} />
            Thumb key
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
            <div style={{ width: 14, height: 9, border: '1px dashed var(--muted2)', flexShrink: 0 }} />
            Embouchure hole
          </div>
        </div>

        <button onClick={() => navigate('/')} style={{
          ...pillBtn, fontSize: '1rem', padding: '0.5rem 1.4rem',
        }}>
          {t?.navMain || '← Main page'}
        </button>
      </main>
    </div>
  )
}
