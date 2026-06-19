const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const OPEN = [4, 9, 2, 7, 11, 4]   // E A D G B e
const STRING_LABELS = ['E', 'A', 'D', 'G', 'B', 'e']

const NOTE_COLORS = [
  '#ff4757', // C
  '#ff6348', // C#
  '#ffa502', // D
  '#7bed9f', // D#
  '#2ed573', // E
  '#1e90ff', // F
  '#70a1ff', // F#
  '#5352ed', // G
  '#eccc68', // G#
  '#ff6b81', // A
  '#a29bfe', // A#
  '#00cec9', // B
]

// Roman-numeral positions: the fret where the index finger sits
const POSITIONS = [
  { fret: 1,  label: 'I'   },
  { fret: 5,  label: 'V'   },
  { fret: 7,  label: 'VII' },
  { fret: 9,  label: 'IX'  },
  { fret: 12, label: 'XII' },
]

const NUM_FRETS = 12
const FRET_W    = 46
const STRING_H  = 26
const LEFT      = 52   // space for string name labels + nut
const TOP       = 52   // increased to fit position-label row above fret numbers
const DOT_R     = 10
const OPEN_X    = 20   // x-center for fret-0 (open strings) column

const SVG_W = LEFT + NUM_FRETS * FRET_W + 16
const SVG_H = TOP + 5 * STRING_H + 28   // +28 for position-marker dots below strings

// Note circle: centred in the space between fret (f-1) and fret f
function noteX(fret) {
  return fret === 0 ? OPEN_X : LEFT + (fret - 0.5) * FRET_W
}
// Fret wire: the vertical line at the right edge of fret f
function fretLineX(fret) {
  return LEFT + fret * FRET_W
}
function stringY(i) {
  return TOP + i * STRING_H
}

export default function FretboardMap() {
  return (
    <div>
      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', width: '100%' }}>
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          width={SVG_W}
          height={SVG_H}
          style={{ display: 'block' }}
        >
          {/* ── position labels (row 1) ── */}
          {POSITIONS.map(({ fret, label }) => {
            const x = fretLineX(fret)
            return (
              <g key={`pos-${fret}`}>
                <text
                  x={x} y={TOP - 34}
                  textAnchor="middle" fontSize="9" fontWeight="700"
                  fontFamily="'Space Mono', monospace"
                  fill="var(--gold)"
                >
                  {label}
                </text>
                {/* thin tick connecting label to fret-number row */}
                <line
                  x1={x} y1={TOP - 26}
                  x2={x} y2={TOP - 18}
                  stroke="var(--gold)" strokeWidth={1} opacity={0.5}
                />
              </g>
            )
          })}

          {/* ── fret numbers (row 2) ── */}
          <text
            x={OPEN_X} y={TOP - 12}
            textAnchor="middle" fontSize="9"
            fontFamily="'Space Mono', monospace"
            fill="var(--muted2)"
          >
            0
          </text>
          {Array.from({ length: NUM_FRETS }, (_, i) => (
            <text
              key={i + 1}
              x={noteX(i + 1)} y={TOP - 12}
              textAnchor="middle" fontSize="9"
              fontFamily="'Space Mono', monospace"
              fill="var(--muted2)"
            >
              {i + 1}
            </text>
          ))}

          {/* ── nut ── */}
          <rect
            x={LEFT - 3} y={TOP - 2}
            width={4} height={5 * STRING_H + 4}
            fill="var(--gold)"
          />

          {/* ── fret lines ── */}
          {Array.from({ length: NUM_FRETS }, (_, i) => (
            <line
              key={i + 1}
              x1={fretLineX(i + 1)} y1={TOP}
              x2={fretLineX(i + 1)} y2={TOP + 5 * STRING_H}
              stroke="var(--border)"
              strokeWidth={i + 1 === 12 ? 2.5 : 1}
            />
          ))}

          {/* ── strings (thicker toward low E) ── */}
          {Array.from({ length: 6 }, (_, i) => (
            <line
              key={i}
              x1={LEFT} y1={stringY(i)}
              x2={LEFT + NUM_FRETS * FRET_W} y2={stringY(i)}
              stroke="var(--border)"
              strokeWidth={1 + (5 - i) * 0.2}
            />
          ))}

          {/* ── string name labels ── */}
          {STRING_LABELS.map((lbl, i) => (
            <text
              key={i}
              x={LEFT - 30} y={stringY(i) + 4}
              textAnchor="middle"
              fontSize="11" fontWeight="600"
              fontFamily="'Space Mono', monospace"
              fill="var(--muted2)"
            >
              {lbl}
            </text>
          ))}

          {/* ── position-marker dots below strings (3 5 7 9 •• 12) ── */}
          {[3, 5, 7, 9].map(f => (
            <circle key={f}
              cx={noteX(f)} cy={TOP + 5 * STRING_H + 15}
              r={4} fill="var(--border)"
            />
          ))}
          <circle cx={noteX(12) - 8} cy={TOP + 5 * STRING_H + 15} r={4} fill="var(--border)" />
          <circle cx={noteX(12) + 8} cy={TOP + 5 * STRING_H + 15} r={4} fill="var(--border)" />

          {/* ── note circles — 6 strings × 13 positions (frets 0–12) ── */}
          {OPEN.flatMap((openNote, si) =>
            Array.from({ length: NUM_FRETS + 1 }, (_, fi) => {
              const idx  = (openNote + fi) % 12
              const cx   = noteX(fi)
              const cy   = stringY(si)
              const name = NOTE_NAMES[idx]
              return (
                <g key={`${si}-${fi}`}>
                  <circle cx={cx} cy={cy} r={DOT_R} fill={NOTE_COLORS[idx]} />
                  <text
                    x={cx} y={cy + 3.5}
                    textAnchor="middle"
                    fontSize={name.length > 1 ? '6.5' : '8'}
                    fontWeight="700"
                    fontFamily="'Space Mono', monospace"
                    fill="#fff"
                  >
                    {name}
                  </text>
                </g>
              )
            })
          )}
        </svg>
      </div>

      {/* ── color legend ── */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '6px 14px',
        marginTop: '18px', justifyContent: 'center',
      }}>
        {NOTE_NAMES.map((note, i) => (
          <div key={note} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{
              width: 13, height: 13,
              borderRadius: '50%',
              background: NOTE_COLORS[i],
              flexShrink: 0,
            }} />
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '.65rem',
              color: 'var(--text)',
            }}>
              {note}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
