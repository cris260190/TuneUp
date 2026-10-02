import { useLanguage } from '../hooks/useLanguage'
import { FINGER_COLORS, FINGER_INK } from './fingerColors'

// Left fretting hand, palm toward you. Lengths follow a real hand:
// middle longest, then ring and index, pinky shortest, thumb off to the side.
const DIGITS = [
  { n: 1, x: 78,  base: 158, h: 112, w: 22, angle: -8 },
  { n: 2, x: 110, base: 156, h: 128, w: 23, angle: -1 },
  { n: 3, x: 142, base: 158, h: 118, w: 22, angle: 7 },
  { n: 4, x: 172, base: 166, h: 92,  w: 19, angle: 15 },
]

function Digit({ digit, active }) {
  const color = FINGER_COLORS[digit.n]
  const skin = active ? '#f3d2b4' : 'var(--s1)'
  const edge = active ? '#b88862' : 'var(--border)'
  const nail = active ? '#f8e7d6' : 'var(--s2)'
  const tipY = digit.base - digit.h
  return (
    <g transform={`rotate(${digit.angle} ${digit.x} ${digit.base})`}>
      <rect
        x={digit.x - digit.w / 2}
        y={tipY}
        width={digit.w}
        height={digit.h}
        rx={digit.w / 2}
        fill={skin}
        stroke={edge}
        strokeWidth="1.6"
      />
      <ellipse cx={digit.x} cy={tipY + digit.h * 0.46} rx={digit.w / 2 - 1.5} ry="3.2"
        fill="none" stroke={edge} strokeWidth="1" opacity="0.8" />
      <ellipse cx={digit.x} cy={tipY + digit.h * 0.7} rx={digit.w / 2 - 2} ry="2.8"
        fill="none" stroke={edge} strokeWidth="1" opacity="0.6" />
      <ellipse cx={digit.x} cy={tipY + 9} rx={digit.w / 2 - 4} ry="5.5"
        fill={nail} stroke={edge} strokeWidth="0.8" />
      <circle cx={digit.x} cy={tipY + 22} r="8" fill={active ? color : 'var(--s2)'} stroke={active ? color : edge} />
      <text
        x={digit.x} y={tipY + 25.5}
        textAnchor="middle"
        fontSize="10" fontWeight="700"
        fontFamily="'Space Mono', monospace"
        fill={active ? FINGER_INK : 'var(--muted2)'}
      >
        {digit.n}
      </text>
    </g>
  )
}

export default function FingerLegend({ fingers = null }) {
  const { t } = useLanguage()
  const names = {
    1: t?.finger1 || 'Index',
    2: t?.finger2 || 'Middle',
    3: t?.finger3 || 'Ring',
    4: t?.finger4 || 'Pinky',
  }
  const used = new Set((fingers || [1, 2, 3, 4]).filter(n => n > 0))
  const specific = Array.isArray(fingers)
  const ordered = [1, 2, 3, 4].filter(n => used.has(n))

  return (
    <div style={{ display: 'inline-block', textAlign: 'center', maxWidth: 280 }}>
      <svg viewBox="0 0 230 250" width="210" height="228" style={{ display: 'block', margin: '0 auto', overflow: 'visible' }}>
        <path
          d="M 58 168
             C 46 168 40 156 42 142
             C 44 128 58 122 74 122
             L 168 126
             C 190 128 202 142 200 160
             C 198 186 184 214 150 220
             C 112 228 78 220 62 200
             C 52 188 54 176 58 168 Z"
          fill="var(--s1)"
          stroke="var(--border)"
          strokeWidth="1.6"
        />
        <g transform="rotate(-48 62 176)">
          <rect x="40" y="132" width="26" height="62" rx="13"
            fill={specific ? 'var(--s1)' : '#f3d2b4'}
            stroke={specific ? 'var(--border)' : '#b88862'}
            strokeWidth="1.6" />
          <ellipse cx="53" cy="144" rx="7" ry="5" fill={specific ? 'var(--s2)' : '#f8e7d6'} stroke={specific ? 'var(--border)' : '#b88862'} strokeWidth="0.8" />
        </g>
        {DIGITS.map(digit => (
          <Digit key={digit.n} digit={digit} active={used.has(digit.n)} />
        ))}
      </svg>
      <div style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: '.62rem',
        color: 'var(--muted2)',
        lineHeight: 1.7,
        marginTop: '4px',
      }}>
        {specific && ordered.length === 0 && (t?.fingerOpen || 'No fretting fingers. These notes are open.')}
        {ordered.map(n => (
          <span key={n} style={{ display: 'inline-block', margin: '0 .45rem' }}>
            <span style={{
              display: 'inline-block', width: 16, height: 16, borderRadius: '50%',
              background: FINGER_COLORS[n], color: FINGER_INK,
              fontWeight: 700, lineHeight: '16px', marginRight: 4,
            }}>{n}</span>
            {names[n]}
          </span>
        ))}
      </div>
    </div>
  )
}
