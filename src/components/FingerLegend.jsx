// Fingers fan outward from their base on the palm.
// Each entry: baseCx/baseY = rotation pivot (finger–palm junction),
//             w/h = finger rect dimensions, angle = rotation in SVG degrees.
const FINGERS = [
  { n: 1, baseCx: 42,  baseY: 107, w: 14, h: 63, angle: -9  },
  { n: 2, baseCx: 63,  baseY: 105, w: 14, h: 74, angle: -2  },
  { n: 3, baseCx: 85,  baseY: 104, w: 13, h: 69, angle:  3  },
  { n: 4, baseCx: 106, baseY: 111, w: 12, h: 50, angle:  11 },
]

export default function FingerLegend() {
  return (
    <div style={{ display: 'inline-block', textAlign: 'center' }}>
      <svg
        viewBox="0 0 150 170"
        width={130}
        height={147}
        style={{ display: 'block', margin: '0 auto', overflow: 'visible' }}
      >
        {/* organic palm shape — rounded corners + slight arch at bottom (wrist hint) */}
        <path
          d="M 32,162 Q 18,162 18,148 L 18,116 Q 18,100 33,100
             L 117,100 Q 132,100 132,116 L 132,148 Q 132,162 118,162
             Q 75,166 32,162 Z"
          fill="var(--s1)"
          stroke="var(--border)"
          strokeWidth={1.5}
        />

        {/* fingers — drawn on top of palm so they merge seamlessly at junction */}
        {FINGERS.map(f => {
          const tipCy = f.baseY - f.h + 8
          return (
            <g key={f.n} transform={`rotate(${f.angle}, ${f.baseCx}, ${f.baseY})`}>
              <rect
                x={f.baseCx - f.w / 2}
                y={f.baseY - f.h}
                width={f.w}
                height={f.h}
                rx={6}
                fill="var(--s1)"
                stroke="var(--border)"
                strokeWidth={1.5}
              />
              {/* number circle at fingertip */}
              <circle cx={f.baseCx} cy={tipCy} r={7} fill="var(--gold)" />
              <text
                x={f.baseCx} y={tipCy + 3.5}
                textAnchor="middle"
                fontSize="9" fontWeight="700"
                fontFamily="'Space Mono', monospace"
                fill="var(--bg)"
              >
                {f.n}
              </text>
            </g>
          )
        })}
      </svg>

      {/* legend key below the hand */}
      <div style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: '.58rem',
        color: 'var(--muted2)',
        lineHeight: 1.9,
        marginTop: '6px',
      }}>
        <div>
          <span style={{ color: 'var(--gold)', fontWeight: 700 }}>1</span> Index
          &nbsp;&nbsp;&nbsp;
          <span style={{ color: 'var(--gold)', fontWeight: 700 }}>2</span> Middle
        </div>
        <div>
          <span style={{ color: 'var(--gold)', fontWeight: 700 }}>3</span> Ring
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ color: 'var(--gold)', fontWeight: 700 }}>4</span> Pinky
        </div>
      </div>
    </div>
  )
}
