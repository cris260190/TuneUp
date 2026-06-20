import { useState } from 'react'

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

const NOTE_COLORS = [
  '#ff4757', '#ff6348', '#ffa502', '#7bed9f', '#2ed573',
  '#1e90ff', '#70a1ff', '#5352ed', '#eccc68', '#ff6b81',
  '#a29bfe', '#00cec9',
]

// Mandolin: G D A E — same pitches as violin, but fretted
const OPEN   = [7, 2, 9, 4]
const FREQS  = [196.00, 293.66, 440.00, 659.25]   // G3 D4 A4 E5
const LABELS = ['G', 'D', 'A', 'E']

const POSITIONS = [
  { fret: 3,  label: 'III'  },
  { fret: 5,  label: 'V'    },
  { fret: 7,  label: 'VII'  },
  { fret: 9,  label: 'IX'   },
  { fret: 12, label: 'XII'  },
]

const NUM_FRETS = 12
const FRET_W   = 46
const STRING_H = 26
const LEFT     = 52
const TOP      = 52
const DOT_R    = 10
const OPEN_X   = 20
const SVG_W    = LEFT + NUM_FRETS * FRET_W + 16
const SVG_H    = TOP + 3 * STRING_H + 28   // 4 strings → 3 gaps

function noteX(fret)     { return fret === 0 ? OPEN_X : LEFT + (fret - 0.5) * FRET_W }
function fretLineX(fret) { return LEFT + fret * FRET_W }
function stringY(i)      { return TOP + i * STRING_H }

export default function MandolinFretboardMap({ onNoteClick }) {
  const [playingKey, setPlayingKey] = useState(null)

  function handleClick(si, fi) {
    if (!onNoteClick) return
    const freq = FREQS[si] * Math.pow(2, fi / 12)
    const key  = `${si}-${fi}`
    onNoteClick(freq)
    setPlayingKey(key)
    setTimeout(() => setPlayingKey(k => k === key ? null : k), 600)
  }

  return (
    <div>
      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', width: '100%' }}>
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          width={SVG_W}
          height={SVG_H}
          style={{ display: 'block' }}
        >
          <style>{`
            @keyframes mandoNoteRing {
              0%   { opacity: 0.9; transform: scale(1);    }
              100% { opacity: 0;   transform: scale(1.75); }
            }
            .mandoNoteRing {
              transform-box: fill-box;
              transform-origin: center;
              animation: mandoNoteRing 0.6s ease-out forwards;
            }
          `}</style>

          {/* position labels */}
          {POSITIONS.map(({ fret, label }) => {
            const x = fretLineX(fret)
            return (
              <g key={`pos-${fret}`}>
                <text x={x} y={TOP - 34} textAnchor="middle" fontSize="9" fontWeight="700"
                  fontFamily="'Space Mono', monospace" fill="var(--gold)">{label}</text>
                <line x1={x} y1={TOP - 26} x2={x} y2={TOP - 18}
                  stroke="var(--gold)" strokeWidth={1} opacity={0.5} />
              </g>
            )
          })}

          {/* fret numbers */}
          <text x={OPEN_X} y={TOP - 12} textAnchor="middle" fontSize="9"
            fontFamily="'Space Mono', monospace" fill="var(--muted2)">0</text>
          {Array.from({ length: NUM_FRETS }, (_, i) => (
            <text key={i + 1} x={noteX(i + 1)} y={TOP - 12} textAnchor="middle" fontSize="9"
              fontFamily="'Space Mono', monospace" fill="var(--muted2)">{i + 1}</text>
          ))}

          {/* nut */}
          <rect x={LEFT - 3} y={TOP - 2} width={4} height={3 * STRING_H + 4} fill="var(--gold)" />

          {/* fret lines */}
          {Array.from({ length: NUM_FRETS }, (_, i) => (
            <line key={i + 1}
              x1={fretLineX(i + 1)} y1={TOP}
              x2={fretLineX(i + 1)} y2={TOP + 3 * STRING_H}
              stroke="var(--border)" strokeWidth={i + 1 === 12 ? 2.5 : 1} />
          ))}

          {/* strings — uniform gauge (mandolin metal strings are similar thickness) */}
          {[0, 1, 2, 3].map(i => (
            <line key={i}
              x1={LEFT} y1={stringY(i)} x2={LEFT + NUM_FRETS * FRET_W} y2={stringY(i)}
              stroke="var(--border)" strokeWidth={1.5} />
          ))}

          {/* string labels */}
          {LABELS.map((lbl, i) => (
            <text key={i} x={LEFT - 30} y={stringY(i) + 4} textAnchor="middle"
              fontSize="11" fontWeight="600"
              fontFamily="'Space Mono', monospace" fill="var(--muted2)">{lbl}</text>
          ))}

          {/* position marker dots */}
          {[3, 5, 7, 9].map(f => (
            <circle key={f} cx={noteX(f)} cy={TOP + 3 * STRING_H + 15} r={4} fill="var(--border)" />
          ))}
          <circle cx={noteX(12) - 8} cy={TOP + 3 * STRING_H + 15} r={4} fill="var(--border)" />
          <circle cx={noteX(12) + 8} cy={TOP + 3 * STRING_H + 15} r={4} fill="var(--border)" />

          {/* note circles */}
          {OPEN.map((openNote, si) =>
            Array.from({ length: NUM_FRETS + 1 }, (_, fi) => {
              const idx  = (openNote + fi) % 12
              const cx   = noteX(fi)
              const cy   = stringY(si)
              const name = NOTE_NAMES[idx]
              const key  = `${si}-${fi}`
              return (
                <g key={key} onClick={() => handleClick(si, fi)}
                  style={{ cursor: onNoteClick ? 'pointer' : 'default' }}>
                  {playingKey === key && (
                    <circle cx={cx} cy={cy} r={DOT_R + 3}
                      fill="none" stroke="#fff" strokeWidth={1.5}
                      className="mandoNoteRing" />
                  )}
                  <circle cx={cx} cy={cy} r={DOT_R} fill={NOTE_COLORS[idx]} />
                  <text x={cx} y={cy + 3.5} textAnchor="middle"
                    fontSize={name.length > 1 ? '6.5' : '8'} fontWeight="700"
                    fontFamily="'Space Mono', monospace" fill="#fff">
                    {name}
                  </text>
                </g>
              )
            })
          )}
        </svg>
      </div>

      {/* colour legend */}
      <div style={{
        display: 'flex', flexWrap: 'wrap',
        gap: '6px 14px', marginTop: '18px', justifyContent: 'center',
      }}>
        {NOTE_NAMES.map((note, i) => (
          <div key={note} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{
              width: 13, height: 13, borderRadius: '50%',
              background: NOTE_COLORS[i], flexShrink: 0,
            }} />
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '.65rem', color: 'var(--text)',
            }}>{note}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
