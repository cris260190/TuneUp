import { HarmonicaHands, KeyFinger, SlideGrip, WoodwindFingers } from './WindHand'

const SVG_W = 680
const SVG_H = 155
const TUBE_X = 30
const TUBE_Y = 80
const TUBE_H = 22
const TUBE_W = 622
const KEY_Y = 91
const KEY_R = 14
const THUMB_X = 108
const THUMB_Y = 45
const THUMB_R = 10
const REG_X = 148
const REG_Y = 45

const DEFAULT_KEYS = ['LH1', 'LH2', 'LH3', 'LH4', 'RH1', 'RH2', 'RH3', 'RH4']
const KEY_X = { LH1: 165, LH2: 220, LH3: 275, LH4: 330, RH1: 410, RH2: 465, RH3: 520, RH4: 575 }

const font = { fontFamily: "'Space Mono', monospace", fill: 'var(--muted2)' }

function Frame({ children, height = SVG_H }) {
  return (
    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
      <svg viewBox={`0 0 ${SVG_W} ${height}`} style={{ display: 'block', width: '100%', height: 'auto', minWidth: 520 }}>
        {children}
      </svg>
    </div>
  )
}

function Tube() {
  return (
    <rect x={TUBE_X} y={TUBE_Y} width={TUBE_W} height={TUBE_H} rx={11}
      fill="var(--s1)" stroke="var(--border)" strokeWidth="1.5" />
  )
}

function KeysDiagram({ note, config, idPrefix }) {
  const { keys, thumb, register } = note
  const keyNames = config.keyNames || DEFAULT_KEYS
  const showRegister = config.showRegister
  const pinch = config.thumbPinch && register
  const clipId = `${idPrefix || 'fig'}-${note.name}-thumb`

  return (
    <Frame>
      <text x={238} y={14} textAnchor="middle" fontSize="8.5" {...font} letterSpacing="0.1em">LEFT HAND</text>
      <text x={492} y={14} textAnchor="middle" fontSize="8.5" {...font} letterSpacing="0.1em">RIGHT HAND</text>
      <Tube />
      {config.showEmbouchure && (
        <>
          <ellipse cx={70} cy={KEY_Y} rx={8} ry={6}
            fill="none" stroke="var(--muted2)" strokeWidth="1.5" strokeDasharray="2 2" />
          <text x={70} y={KEY_Y + 22} textAnchor="middle" fontSize="8" {...font}>emb</text>
        </>
      )}
      <line x1={372} y1={TUBE_Y} x2={372} y2={TUBE_Y + TUBE_H}
        stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3" />
      <line x1={THUMB_X} y1={THUMB_Y + THUMB_R} x2={THUMB_X} y2={TUBE_Y}
        stroke="var(--border)" strokeWidth="1" />
      <text x={showRegister ? THUMB_X - 4 : THUMB_X} y={THUMB_Y - 17} textAnchor="middle" fontSize="8" {...font}>
        {config.thumbLabel}
      </text>
      {pinch ? (
        <>
          <defs>
            <clipPath id={clipId}>
              <rect x={THUMB_X - THUMB_R} y={THUMB_Y - THUMB_R} width={THUMB_R} height={THUMB_R * 2} />
            </clipPath>
          </defs>
          <circle cx={THUMB_X} cy={THUMB_Y} r={THUMB_R}
            fill="var(--bg)" stroke="var(--gold)" strokeWidth="1.5" />
          <circle cx={THUMB_X} cy={THUMB_Y} r={THUMB_R}
            fill="var(--gold)" clipPath={`url(#${clipId})`} />
        </>
      ) : (
        <circle cx={THUMB_X} cy={THUMB_Y} r={THUMB_R}
          fill={thumb ? 'var(--gold)' : 'var(--bg)'}
          stroke={thumb ? 'var(--gold)' : 'var(--muted2)'}
          strokeWidth="1.5" />
      )}
      {showRegister && (
        <>
          <line x1={REG_X} y1={REG_Y + THUMB_R} x2={REG_X} y2={TUBE_Y}
            stroke="var(--border)" strokeWidth="1" />
          <text x={REG_X + 8} y={THUMB_Y - 17} textAnchor="middle" fontSize="8" {...font}>{config.registerLabel}</text>
          <circle cx={REG_X} cy={REG_Y} r={THUMB_R}
            fill={register ? 'var(--gold)' : 'var(--bg)'}
            stroke={register ? 'var(--gold)' : 'var(--muted2)'}
            strokeWidth="1.5" />
        </>
      )}
      {keyNames.map(name => {
        const covered = keys[name]
        const cx = KEY_X[name]
        return (
          <g key={name}>
            <circle cx={cx} cy={KEY_Y} r={KEY_R}
              fill={covered ? 'var(--gold)' : 'var(--bg)'}
              stroke={covered ? 'var(--gold)' : 'var(--muted2)'}
              strokeWidth="1.5" />
            <text x={cx} y={KEY_Y + KEY_R + 13} textAnchor="middle" fontSize="8.5" {...font}>{name}</text>
          </g>
        )
      })}
      <WoodwindFingers note={note} config={config} />
    </Frame>
  )
}

function ValveDiagram({ note, config }) {
  const count = config.valveCount || 3
  const pressed = new Set(note.valves || [])
  const xs = count === 4 ? [200, 300, 400, 500] : [230, 340, 450]
  const open = pressed.size === 0

  return (
    <Frame>
      <text x={SVG_W / 2} y={36} textAnchor="middle" fontSize="11" {...font} letterSpacing="0.14em">
        {open ? 'OPEN' : 'VALVES'}
      </text>
      <Tube />
      {xs.map((cx, i) => {
        const n = i + 1
        const on = pressed.has(n)
        return (
          <g key={n}>
            <circle cx={cx} cy={KEY_Y} r={18}
              fill={on ? 'var(--gold)' : 'var(--bg)'}
              stroke={on ? 'var(--gold)' : 'var(--muted2)'}
              strokeWidth="1.5" />
            {on && <KeyFinger cx={cx} cy={KEY_Y} n={n} />}
            {!on && (
              <text x={cx} y={KEY_Y + 4} textAnchor="middle" fontSize="13"
                fontFamily="'Space Mono', monospace" fill="var(--muted2)">{n}</text>
            )}
            <text x={cx} y={KEY_Y + 36} textAnchor="middle" fontSize="8.5" {...font}>
              {on ? 'down' : 'up'}
            </text>
          </g>
        )
      })}
    </Frame>
  )
}

function SlideDiagram({ note }) {
  const xs = [70, 155, 240, 325, 410, 495, 580]
  const active = note.position

  return (
    <Frame>
      <text x={SVG_W / 2} y={36} textAnchor="middle" fontSize="11" {...font} letterSpacing="0.14em">
        SLIDE POSITION {active}
      </text>
      <line x1={50} y1={88} x2={630} y2={88} stroke="var(--border)" strokeWidth="3" strokeLinecap="round" />
      {xs.map((cx, i) => {
        const n = i + 1
        const on = n === active
        return (
          <g key={n}>
            {on && <SlideGrip cx={cx} cy={88} />}
            <circle cx={cx} cy={88} r={on ? 16 : 8}
              fill={on ? 'var(--gold)' : 'var(--bg)'}
              stroke={on ? 'var(--gold)' : 'var(--muted2)'}
              strokeWidth="1.5" />
            {on && (
              <text x={cx} y={93} textAnchor="middle" fontSize="12"
                fontFamily="'Space Mono', monospace" fill="var(--bg)">{n}</text>
            )}
            <text x={cx} y={122} textAnchor="middle" fontSize="9" {...font}>{n}</text>
          </g>
        )
      })}
      <text x={70} y={142} textAnchor="middle" fontSize="8" {...font}>IN</text>
      <text x={580} y={142} textAnchor="middle" fontSize="8" {...font}>OUT</text>
    </Frame>
  )
}

function HarmonicaDiagram({ note, config }) {
  const blow = config.layout?.blow || []
  const draw = config.layout?.draw || []
  const start = 78
  const gap = 58
  const xOf = (hole) => start + (hole - 1) * gap

  return (
    <Frame height={168}>
      <HarmonicaHands />
      <text x={8} y={28} fontSize="8" {...font}>BLOW</text>
      <text x={8} y={156} fontSize="8" {...font}>DRAW</text>
      {blow.map((letter, i) => {
        const hole = i + 1
        const cx = xOf(hole)
        const blowOn = note.hole === hole && note.breath === 'blow'
        const drawOn = note.hole === hole && note.breath === 'draw'
        const tag = note.hole === hole ? note.technique : null
        return (
          <g key={hole}>
            <circle cx={cx} cy={46} r={14}
              fill={blowOn ? 'var(--gold)' : 'var(--bg)'}
              stroke={blowOn ? 'var(--gold)' : 'var(--muted2)'}
              strokeWidth="1.5" />
            <text x={cx} y={50} textAnchor="middle" fontSize="9"
              fontFamily="'Space Mono', monospace" fill={blowOn ? 'var(--bg)' : 'var(--muted2)'}>{letter}</text>
            <text x={cx} y={84} textAnchor="middle" fontSize="9" {...font}>{hole}</text>
            <circle cx={cx} cy={122} r={14}
              fill={drawOn ? 'var(--gold)' : 'var(--bg)'}
              stroke={drawOn ? 'var(--gold)' : 'var(--muted2)'}
              strokeWidth="1.5" />
            <text x={cx} y={126} textAnchor="middle" fontSize="9"
              fontFamily="'Space Mono', monospace" fill={drawOn ? 'var(--bg)' : 'var(--muted2)'}>{draw[i]}</text>
            {tag && (
              <text x={cx} y={156} textAnchor="middle" fontSize="7.5"
                fontFamily="'Space Mono', monospace" fill="var(--gold)">{tag}</text>
            )}
          </g>
        )
      })}
    </Frame>
  )
}

export default function WindFingeringDiagram({ note, config, idPrefix }) {
  if (config.diagram === 'valves') return <ValveDiagram note={note} config={config} />
  if (config.diagram === 'slide') return <SlideDiagram note={note} />
  if (config.diagram === 'harmonica') return <HarmonicaDiagram note={note} config={config} />
  return <KeysDiagram note={note} config={config} idPrefix={idPrefix} />
}
