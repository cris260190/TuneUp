import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { getSharedAudioCtx, unlockSharedAudioCtx } from '../hooks/useAudioContext'

const NOTES = [
  { name: 'C', freq: 261.63 },
  { name: 'C#', freq: 277.18 },
  { name: 'D', freq: 293.66 },
  { name: 'D#', freq: 311.13 },
  { name: 'E', freq: 329.63 },
  { name: 'F', freq: 349.23 },
  { name: 'F#', freq: 369.99 },
  { name: 'G', freq: 392.00 },
  { name: 'G#', freq: 415.30 },
  { name: 'A', freq: 440.00 },
  { name: 'A#', freq: 466.16 },
  { name: 'B', freq: 493.88 },
]

const OCTAVES = [3, 4, 5]

export default function PitchPipePage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const oscRef = useRef(null)
  const [playing, setPlaying] = useState(null)
  const [octave, setOctave] = useState(4)
  const [waveform, setWaveform] = useState('sine')
  const [unlocked, setUnlocked] = useState(false)

  function getFreq(note, oct) {
    const base = NOTES.find(n => n.name === note).freq
    const diff = oct - 4
    return base * Math.pow(2, diff)
  }

  // SINCRON - nu async!
  function unlockAudio() {
    unlockSharedAudioCtx()
    setUnlocked(true)
  }

  // SINCRON - nu async!
  function playNote(note) {
    const key = `${note}${octave}`
    if (playing === key) { stopNote(); return }
    stopNote()

    const ctx = unlockSharedAudioCtx()

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = getFreq(note, octave)
    osc.type = waveform
    gain.gain.setValueAtTime(0, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05)
    osc.start()
    oscRef.current = { osc, gain, ctx }
    setPlaying(key)
  }

  function stopNote() {
    if (oscRef.current) {
      const { osc, gain, ctx } = oscRef.current
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.1)
      osc.stop(ctx.currentTime + 0.1)
      oscRef.current = null
    }
    setPlaying(null)
  }

  const isBlack = (name) => name.includes('#')

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
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.8rem', fontWeight: 600,
          }}>
            Tune<em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Up</em>
            <span style={{ color: 'var(--muted2)', fontSize: '1rem', marginLeft: '.75rem' }}>
              — Pitch Pipe
            </span>
          </div>
          <div style={{ fontSize: '.55rem', letterSpacing: '.3em', textTransform: 'uppercase', color: 'var(--muted2)', marginTop: '.1rem' }}>
            Free Online Pitch Pipe
          </div>
        </div>
        <div style={{ display: 'flex', gap: '.75rem' }}>
          <button onClick={() => navigate('/metronome')} style={pillBtn}>Metronome</button>
          <button onClick={() => navigate('/')} style={pillBtn}>← Tuner</button>
          <button onClick={toggleTheme} style={pillBtn}>{theme === 'dark' ? '☀️' : '🌙'}</button>
        </div>
      </header>

      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '3rem 2rem', gap: '2.5rem'
      }}>

        {!unlocked && (
          <button onClick={unlockAudio} style={{
            padding: '.75rem 2rem',
            background: 'var(--gold)',
            border: 'none', borderRadius: '8px',
            fontFamily: "'Space Mono', monospace",
            fontSize: '.65rem', letterSpacing: '.15em',
            textTransform: 'uppercase',
            color: 'var(--bg)', cursor: 'pointer',
            fontWeight: 700,
          }}>
            🔊 Tap to enable audio
          </button>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '.6rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--muted2)' }}>Octave</span>
          {OCTAVES.map(o => (
            <button key={o} onClick={() => { setOctave(o); stopNote() }} style={{
              padding: '.4rem .9rem',
              border: `1px solid ${octave === o ? 'var(--gold)' : 'var(--border)'}`,
              borderRadius: '20px', fontSize: '.7rem',
              background: octave === o ? 'rgba(212,168,71,.1)' : 'var(--s1)',
              color: octave === o ? 'var(--gold)' : 'var(--muted2)',
              cursor: 'pointer', transition: 'all .2s',
            }}>{o}</button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '.6rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--muted2)' }}>Sound</span>
          {['sine', 'triangle', 'square'].map(w => (
            <button key={w} onClick={() => setWaveform(w)} style={{
              padding: '.4rem .9rem',
              border: `1px solid ${waveform === w ? 'var(--teal)' : 'var(--border)'}`,
              borderRadius: '20px', fontSize: '.6rem',
              textTransform: 'uppercase', letterSpacing: '.1em',
              background: waveform === w ? 'rgba(45,212,191,.08)' : 'var(--s1)',
              color: waveform === w ? 'var(--teal)' : 'var(--muted2)',
              cursor: 'pointer', transition: 'all .2s',
            }}>{w}</button>
          ))}
        </div>

        <div style={{ position: 'relative', display: 'flex', height: '200px', gap: '4px' }}>
          {NOTES.filter(n => !isBlack(n.name)).map((note) => {
            const key = `${note.name}${octave}`
            const isPlaying = playing === key
            return (
              <div key={note.name} onClick={() => playNote(note.name)} style={{
                width: '64px', height: '100%',
                background: isPlaying ? 'var(--gold)' : 'var(--text)',
                border: `2px solid ${isPlaying ? 'var(--gold)' : 'var(--border)'}`,
                borderRadius: '0 0 8px 8px',
                cursor: 'pointer', transition: 'all .15s',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'flex-end',
                paddingBottom: '1rem', position: 'relative',
                boxShadow: isPlaying ? `0 0 20px var(--gold)` : 'none',
              }}>
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.2rem', fontWeight: 600,
                  color: 'var(--bg)',
                }}>{note.name}</span>
                <span style={{ fontSize: '.5rem', color: isPlaying ? 'var(--bg)' : 'var(--muted)' }}>
                  {getFreq(note.name, octave).toFixed(1)} Hz
                </span>
              </div>
            )
          })}

          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '60%', pointerEvents: 'none' }}>
            {[
              { name: 'C#', pos: 1 },
              { name: 'D#', pos: 2 },
              { name: 'F#', pos: 4 },
              { name: 'G#', pos: 5 },
              { name: 'A#', pos: 6 },
            ].map(({ name, pos }) => {
              const key = `${name}${octave}`
              const isPlaying = playing === key
              return (
                <div key={name} onClick={() => playNote(name)} style={{
                  position: 'absolute',
                  left: `${pos * 68 - 22}px`,
                  width: '40px', height: '100%',
                  background: isPlaying ? 'var(--gold)' : '#1a1a2e',
                  border: `1px solid ${isPlaying ? 'var(--gold)' : 'var(--border)'}`,
                  borderRadius: '0 0 6px 6px',
                  cursor: 'pointer', pointerEvents: 'all',
                  transition: 'all .15s', zIndex: 2,
                  boxShadow: isPlaying ? `0 0 16px var(--gold)` : 'none',
                  display: 'flex', alignItems: 'flex-end',
                  justifyContent: 'center', paddingBottom: '.5rem',
                }}>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '.8rem', color: isPlaying ? 'var(--bg)' : 'var(--muted2)',
                  }}>{name}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div style={{
          fontSize: '.65rem', letterSpacing: '.2em',
          textTransform: 'uppercase', color: 'var(--muted2)',
          minHeight: '1.5em', textAlign: 'center',
        }}>
          {playing
            ? <span style={{ color: 'var(--gold)' }}>♪ Playing {playing}</span>
            : 'Click a note to play'}
        </div>

        {playing && (
          <button onClick={stopNote} style={{
            padding: '.6rem 1.5rem',
            border: '1px solid var(--red)',
            borderRadius: '20px', fontSize: '.6rem',
            letterSpacing: '.15em', textTransform: 'uppercase',
            background: 'none', color: 'var(--red)',
            cursor: 'pointer', transition: 'all .2s',
          }}>■ Stop</button>
        )}
      </div>
    </div>
  )
}

const pillBtn = {
  padding: '.4rem .9rem',
  border: '1px solid var(--border)',
  borderRadius: '20px', fontSize: '.6rem',
  letterSpacing: '.1em', textTransform: 'uppercase',
  color: 'var(--muted2)', background: 'var(--s1)',
  cursor: 'pointer',
}