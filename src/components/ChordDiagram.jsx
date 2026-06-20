const NUM_FRETS = 4
const STRING_GAP = 18
const FRET_GAP = 24
const LEFT = 16
const TOP = 30

function stringX(i) {
  return LEFT + i * STRING_GAP
}
function fretY(j) {
  return TOP + j * FRET_GAP
}

export default function ChordDiagram({ chord, size = 140, numStrings = 6 }) {
  const { frets, fingers = [], baseFret = 1, barre } = chord
  const width = LEFT * 2 + (numStrings - 1) * STRING_GAP
  const height = TOP + NUM_FRETS * FRET_GAP + 14

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={size}
      height={size * (height / width)}
      style={{ display: 'block', margin: '0 auto', overflow: 'visible' }}
    >
      <style>{`
        @keyframes chordDotPop {
          0% { transform: scale(0); opacity: 0; }
          70% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .chordDot { transform-origin: center; transform-box: fill-box; animation: chordDotPop .65s ease backwards; }
      `}</style>

      {baseFret > 1 && (
        <text
          x={LEFT - 12}
          y={fretY(0) + 5}
          fontSize="10"
          fill="var(--muted2)"
          fontFamily="'Space Mono', monospace"
        >
          {baseFret}
        </text>
      )}

      {/* nut / top edge */}
      <rect
        x={stringX(0)}
        y={fretY(0) - (baseFret === 1 ? 3 : 1)}
        width={stringX(numStrings - 1) - stringX(0)}
        height={baseFret === 1 ? 3 : 1}
        fill="var(--gold)"
      />

      {/* fret lines */}
      {Array.from({ length: NUM_FRETS + 1 }).map((_, j) => (
        <line
          key={`fret-${j}`}
          x1={stringX(0)} y1={fretY(j)}
          x2={stringX(numStrings - 1)} y2={fretY(j)}
          stroke="var(--border)" strokeWidth="1"
        />
      ))}

      {/* strings */}
      {Array.from({ length: numStrings }).map((_, i) => (
        <line
          key={`string-${i}`}
          x1={stringX(i)} y1={fretY(0)}
          x2={stringX(i)} y2={fretY(NUM_FRETS)}
          stroke="var(--border)" strokeWidth="1"
        />
      ))}

      {/* barre */}
      {barre && (
        <rect
          x={stringX(barre.fromString) - 6}
          y={fretY(barre.fret - 1) + FRET_GAP / 2 - 6}
          width={stringX(barre.toString) - stringX(barre.fromString) + 12}
          height="12"
          rx="6"
          fill="var(--gold)"
          opacity="0.85"
          className="chordDot"
          style={{ animationDelay: '0ms' }}
        />
      )}

      {/* open / muted markers above nut */}
      {frets.map((f, i) => {
        if (f > 0) return null
        const cy = fretY(0) - 12
        if (f === 0) {
          return (
            <circle
              key={`mark-${i}`}
              cx={stringX(i)} cy={cy} r="4"
              fill="none" stroke="var(--muted2)" strokeWidth="1.3"
              className="chordDot"
              style={{ animationDelay: `${i * 80}ms` }}
            />
          )
        }
        return (
          <text
            key={`mark-${i}`}
            x={stringX(i)} y={cy + 4}
            textAnchor="middle" fontSize="11"
            fill="var(--muted2)" fontFamily="'Space Mono', monospace"
            className="chordDot"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            ×
          </text>
        )
      })}

      {/* finger dots */}
      {frets.map((f, i) => {
        if (f <= 0) return null
        if (barre && f === barre.fret && i > barre.fromString && i < barre.toString) return null
        const cy = fretY(f - 1) + FRET_GAP / 2
        return (
          <g key={`dot-${i}`}>
            <circle
              cx={stringX(i)} cy={cy} r="7.5"
              fill="var(--gold)"
              className="chordDot"
              style={{ animationDelay: `${i * 80}ms` }}
            />
            {fingers[i] > 0 && (
              <text
                x={stringX(i)} y={cy + 3.5}
                textAnchor="middle" fontSize="9" fontWeight="700"
                fill="var(--bg)"
              >
                {fingers[i]}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}
