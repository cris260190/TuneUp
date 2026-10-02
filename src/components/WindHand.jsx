import { FINGER_COLORS, FINGER_INK } from './fingerColors'

// Geometry matches WindFingeringDiagram and FluteFingeringChart.
const KEY_Y = 91
const THUMB_X = 108
const THUMB_Y = 45
const REG_X = 148
const REG_Y = 45
const KEY_X = { LH1: 165, LH2: 220, LH3: 275, LH4: 330, RH1: 410, RH2: 465, RH3: 520, RH4: 575 }
const DEFAULT_KEYS = ['LH1', 'LH2', 'LH3', 'LH4', 'RH1', 'RH2', 'RH3', 'RH4']

const SKIN = '#f3d2b4'
const EDGE = '#b88862'
const NAIL = '#f8e7d6'

function fingerFromName(name) {
  const n = Number(String(name).replace(/\D/g, ''))
  return n >= 1 && n <= 4 ? n : 0
}

export function KeyFinger({ cx, cy, n }) {
  const color = FINGER_COLORS[n] || FINGER_COLORS[1]
  const padY = cy - 1
  return (
    <g>
      <rect x={cx - 6.5} y={padY - 46} width={13} height={34} rx={6.5}
        fill={SKIN} stroke={EDGE} strokeWidth="1" />
      <ellipse cx={cx} cy={padY - 22} rx={5.2} ry={2.2}
        fill="none" stroke={EDGE} strokeWidth="0.8" opacity="0.7" />
      <ellipse cx={cx} cy={padY} rx={12} ry={13}
        fill={SKIN} stroke={EDGE} strokeWidth="1.15" />
      <ellipse cx={cx} cy={padY - 6.5} rx={5.4} ry={4}
        fill={NAIL} stroke={EDGE} strokeWidth="0.6" />
      <circle cx={cx} cy={padY + 4.5} r={6.3} fill={color} />
      <text
        x={cx} y={padY + 4.5}
        textAnchor="middle" dominantBaseline="central"
        fontSize="8.5" fontWeight="700"
        fontFamily="'Space Mono', monospace"
        fill={FINGER_INK}
      >{n}</text>
    </g>
  )
}

export function ThumbPad({ cx, cy, pinch = false }) {
  const padX = pinch ? cx - 11 : cx
  const rx = pinch ? 8 : 11
  return (
    <g>
      <rect x={padX - 28} y={cy - 6} width={20} height={12} rx={6}
        fill={SKIN} stroke={EDGE} strokeWidth="1" />
      <ellipse cx={padX} cy={cy} rx={rx} ry={10}
        fill={SKIN} stroke={EDGE} strokeWidth="1.1" />
      <ellipse cx={padX - 2.5} cy={cy - 2} rx={3.4} ry={2.5}
        fill={NAIL} stroke={EDGE} strokeWidth="0.5" />
      <circle cx={padX + (pinch ? 1 : 3.5)} cy={cy + 2} r={5}
        fill="#1a1408" stroke="#d4a847" strokeWidth="1" />
      <text
        x={padX + (pinch ? 1 : 3.5)} y={cy + 2}
        textAnchor="middle" dominantBaseline="central"
        fontSize="7" fontWeight="700"
        fontFamily="'Space Mono', monospace"
        fill="#d4a847"
      >T</text>
    </g>
  )
}

export function WoodwindFingers({ note, config }) {
  const keys = note?.keys || {}
  const keyNames = config?.keyNames || DEFAULT_KEYS
  const pinch = !!(config?.thumbPinch && note?.register)
  const registerOn = !!(config?.showRegister && note?.register === true)
  return (
    <g>
      {keyNames.map(name => {
        const n = fingerFromName(name)
        if (!n || !keys[name]) return null
        return <KeyFinger key={name} cx={KEY_X[name]} cy={KEY_Y} n={n} />
      })}
      {pinch && <ThumbPad cx={THUMB_X} cy={THUMB_Y} pinch />}
      {!pinch && note?.thumb === true && <ThumbPad cx={THUMB_X} cy={THUMB_Y} />}
      {registerOn && <ThumbPad cx={REG_X} cy={REG_Y} />}
    </g>
  )
}

export function SlideGrip({ cx, cy }) {
  return (
    <g>
      <ellipse cx={cx} cy={cy + 8} rx={16} ry={17}
        fill={SKIN} stroke={EDGE} strokeWidth="1.1" />
      <rect x={cx - 14} y={cy - 24} width={7} height={20} rx={3.5}
        fill={SKIN} stroke={EDGE} strokeWidth="0.9" />
      <rect x={cx - 5} y={cy - 28} width={7.5} height={24} rx={3.5}
        fill={SKIN} stroke={EDGE} strokeWidth="0.9" />
      <rect x={cx + 5} y={cy - 24} width={7} height={20} rx={3.5}
        fill={SKIN} stroke={EDGE} strokeWidth="0.9" />
      <ellipse cx={cx - 12} cy={cy - 16} rx={3.2} ry={2.2} fill={NAIL} />
      <ellipse cx={cx - 1} cy={cy - 20} rx={3.4} ry={2.3} fill={NAIL} />
      <ellipse cx={cx + 8.5} cy={cy - 16} rx={3.2} ry={2.2} fill={NAIL} />
      <ellipse cx={cx + 13} cy={cy + 10} rx={6.5} ry={4.5}
        fill={SKIN} stroke={EDGE} strokeWidth="0.8" />
    </g>
  )
}

function CupHand({ cx, flip }) {
  const s = flip ? -1 : 1
  return (
    <g transform={`translate(${cx} 86) scale(${s} 1)`}>
      <ellipse cx="0" cy="0" rx="16" ry="34" fill={SKIN} stroke={EDGE} strokeWidth="1.15" />
      {[-20, -8, 4, 16].map((y, i) => (
        <rect key={y} x="10" y={y} width={14 - i} height="8" rx="4"
          fill={SKIN} stroke={EDGE} strokeWidth="0.8" />
      ))}
      <ellipse cx="5" cy="26" rx="7" ry="4.5" fill={SKIN} stroke={EDGE} strokeWidth="0.8" />
    </g>
  )
}

export function HarmonicaHands() {
  return (
    <g>
      <CupHand cx={30} flip={false} />
      <CupHand cx={650} flip />
    </g>
  )
}
