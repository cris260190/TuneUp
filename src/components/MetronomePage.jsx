import { useState, useRef } from 'react'
import { useMetronome } from '../hooks/useMetronome'

const SIGS = [2, 3, 4, 5, 6, 7]
const TEMPOS = [
  { name: 'Larghissimo', range: [20, 40] },
  { name: 'Largo', range: [40, 60] },
  { name: 'Andante', range: [60, 80] },
  { name: 'Moderato', range: [80, 100] },
  { name: 'Allegro', range: [100, 140] },
  { name: 'Vivace', range: [140, 168] },
  { name: 'Presto', range: [168, 200] },
  { name: 'Prestissimo', range: [200, 240] },
]

function getTempoName(bpm) {
  return TEMPOS.find(t => bpm >= t.range[0] && bpm < t.range[1])?.name || 'Prestissimo'
}

export default function MetronomePage() {
  const audioCtxRef = useRef(null)
  const { isPlaying, bpm, signature, currentBeat, toggle, updateBpm, updateSignature } =
    useMetronome(audioCtxRef)

  const tempoName = getTempoName(bpm)

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header simplu */}
      <header style={{
        padding: '1.5rem 2.5rem',
        borderBottom: '1px solid var(--border)',
        background: 'rgba(8,8,14,.8)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.8rem', fontWeight: 600,
          }}>
            Tune<em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Up</em>
            <span style={{ color: 'var(--muted2)', fontSize: '1rem', marginLeft: '.75rem' }}>
              — Metronome
            </span>
          </div>
          <div style={{
            fontSize: '.55rem', letterSpacing: '.3em',
            textTransform: 'uppercase', color: 'var(--muted2)', marginTop: '.1rem'
          }}>Free Online Metronome</div>
        </div>
        <a href="/" style={{
          padding: '.4rem .9rem',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          fontSize: '.6rem', letterSpacing: '.1em',
          textTransform: 'uppercase', color: 'var(--muted2)',
          textDecoration: 'none', background: 'var(--s1)',
          transition: 'all .2s',
        }}>← Tuner</a>
      </header>

      {/* Main */}
      <div style={{
        flex: 1, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        padding: '3rem 2rem',
      }}>
        <div style={{ width: '100%', maxWidth: '480px' }}>

          {/* BPM display */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '8rem', fontWeight: 300,
              color: 'var(--gold)', lineHeight: 1,
            }}>{bpm}</div>
            <div style={{
              fontSize: '.6rem', letterSpacing: '.3em',
              textTransform: 'uppercase', color: 'var(--muted2)',
            }}>BPM — {tempoName}</div>
          </div>

          {/* Beat dots */}
          <div style={{
            display: 'flex', justifyContent: 'center',
            gap: '.75rem', marginBottom: '2.5rem',
          }}>
            {Array.from({ length: signature }, (_, i) => (
              <div key={i} style={{
                width: '18px', height: '18px', borderRadius: '50%',
                background: currentBeat === i
                  ? i === 0 ? 'var(--red)' : 'var(--gold)'
                  : 'var(--border)',
                boxShadow: currentBeat === i
                  ? i === 0 ? '0 0 16px var(--red)' : '0 0 14px var(--gold)'
                  : 'none',
                transition: 'background .05s, box-shadow .05s',
              }} />
            ))}
          </div>

          {/* Slider */}
          <div style={{ marginBottom: '1.5rem' }}>
            <input
              type="range" min={40} max={240} value={bpm}
              onChange={e => updateBpm(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--gold)', marginBottom: '.5rem' }}
            />
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              fontSize: '.55rem', color: 'var(--muted)', letterSpacing: '.1em',
            }}>
              <span>40 — Largo</span>
              <span>240 — Prestissimo</span>
            </div>
          </div>

          {/* BPM buttons */}
          <div style={{
            display: 'flex', justifyContent: 'center',
            gap: '.5rem', marginBottom: '1.5rem',
          }}>
            {[60, 80, 100, 120, 140, 160].map(b => (
              <button key={b} onClick={() => updateBpm(b)} style={{
                padding: '.4rem .7rem',
                background: bpm === b ? 'rgba(212,168,71,.1)' : 'var(--s1)',
                border: `1px solid ${bpm === b ? 'var(--gold)' : 'var(--border)'}`,
                borderRadius: '6px',
                fontFamily: "'Space Mono', monospace",
                fontSize: '.55rem', color: bpm === b ? 'var(--gold)' : 'var(--muted2)',
                cursor: 'pointer', transition: 'all .2s',
              }}>{b}</button>
            ))}
          </div>

          {/* Time signature */}
          <div style={{
            display: 'flex', justifyContent: 'center',
            gap: '.5rem', marginBottom: '2rem', flexWrap: 'wrap',
          }}>
            {SIGS.map(s => (
              <button key={s} onClick={() => updateSignature(s)} style={{
                padding: '.4rem .8rem',
                background: signature === s ? 'rgba(212,168,71,.1)' : 'var(--s1)',
                border: `1px solid ${signature === s ? 'var(--gold)' : 'var(--border)'}`,
                borderRadius: '6px',
                fontFamily: "'Space Mono', monospace",
                fontSize: '.6rem', color: signature === s ? 'var(--gold)' : 'var(--muted2)',
                cursor: 'pointer', transition: 'all .2s',
              }}>{s}/4</button>
            ))}
          </div>

          {/* Start/Stop */}
          <button onClick={toggle} style={{
            width: '100%', padding: '1rem',
            border: 'none', borderRadius: '10px',
            fontFamily: "'Space Mono', monospace",
            fontSize: '.75rem', letterSpacing: '.2em',
            textTransform: 'uppercase', fontWeight: 700,
            cursor: 'pointer', transition: 'all .25s',
            background: isPlaying ? 'var(--red)' : 'var(--gold)',
            color: 'var(--bg)',
          }}>
            {isPlaying ? '■ Stop' : '▶ Start'}
          </button>

        </div>
      </div>
    </div>
  )
}