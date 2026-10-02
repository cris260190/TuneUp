import { PIANO_HIGH, PIANO_LOW } from '../data/pianoChordData'

const WHITE_PCS = new Set([0, 2, 4, 5, 7, 9, 11])
const WHITE_W = 36
const WHITE_H = 158
const BLACK_W = 24
const BLACK_H = 98
const NAMES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B']

function layout() {
  const keys = []
  let whiteIndex = 0
  for (let midi = PIANO_LOW; midi <= PIANO_HIGH; midi++) {
    const pc = midi % 12
    const white = WHITE_PCS.has(pc)
    if (white) {
      keys.push({ midi, pc, white: true, index: whiteIndex })
      whiteIndex += 1
    } else {
      keys.push({ midi, pc, white: false, index: whiteIndex - 1 })
    }
  }
  return { keys, whiteCount: whiteIndex }
}

const LAYOUT = layout()

function pitchName(midi) {
  return NAMES[midi % 12] + (Math.floor(midi / 12) - 1)
}

export default function PianoKeyboard({ tones, playing, onKey, leftLabel, rightLabel }) {
  const byMidi = new Map(tones.map(tone => [tone.midi, tone]))
  const width = LAYOUT.whiteCount * WHITE_W
  const leftWidth = 7 * WHITE_W

  function face(midi, white) {
    const tone = byMidi.get(midi)
    const pressed = playing.includes(midi)
    const hand = tone?.hand
    let background = white ? '#f4efe6' : '#16161e'
    let color = white ? '#5c564c' : '#b7b1a6'
    if (hand === 'L') { background = 'var(--teal)'; color = '#06221f' }
    if (hand === 'R') { background = 'var(--gold)'; color = '#1a1408' }
    return { tone, pressed, background, color }
  }

  function labelBlock(tone, octaveLabel, color, compact) {
    return (
      <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1.05, color, whiteSpace: 'nowrap' }}>
        {tone && (
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: compact ? '.5rem' : '.62rem', fontWeight: 700 }}>
            {tone.mark}
          </span>
        )}
        {tone && (
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: compact ? '.78rem' : '1.02rem', fontWeight: 600 }}>
            {tone.name}
          </span>
        )}
        {octaveLabel && (
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '.52rem', marginTop: 3, opacity: 0.75 }}>
            {octaveLabel}
          </span>
        )}
      </span>
    )
  }

  return (
    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
      <div style={{ width, position: 'relative' }}>
        <div style={{ display: 'flex', marginBottom: '.35rem', fontFamily: "'Space Mono', monospace", fontSize: '.62rem', letterSpacing: '.08em', textTransform: 'uppercase' }}>
          <div style={{ width: leftWidth, color: 'var(--teal)' }}>{leftLabel}</div>
          <div style={{ color: 'var(--gold)' }}>{rightLabel}</div>
        </div>
        <div style={{
          position: 'relative', height: WHITE_H, width, borderRadius: 12,
          overflow: 'hidden', background: '#111118', border: '1px solid var(--border)',
        }}>
          {LAYOUT.keys.filter(k => k.white).map(key => {
            const { tone, pressed, background, color } = face(key.midi, true)
            const octaveLabel = key.pc === 0 ? pitchName(key.midi) : ''
            return (
              <button
                key={key.midi}
                type="button"
                data-midi={key.midi}
                data-hand={tone?.hand || ''}
                data-spelled={tone?.spelled || ''}
                aria-label={tone ? `${tone.spelled}, ${tone.hand === 'L' ? leftLabel : rightLabel}` : pitchName(key.midi)}
                onClick={() => onKey(key.midi)}
                style={{
                  position: 'absolute', left: key.index * WHITE_W, top: 0,
                  width: WHITE_W, height: WHITE_H, padding: '0 0 8px',
                  borderTop: 'none', borderLeft: 'none', borderBottom: 'none',
                  borderRight: '1px solid #ddd4c6',
                  background, color, cursor: 'pointer',
                  display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                  boxShadow: pressed ? 'inset 0 8px 14px rgba(0,0,0,.28)' : 'inset 0 -10px 14px rgba(0,0,0,.06)',
                }}
              >
                {labelBlock(tone, octaveLabel, color, false)}
              </button>
            )
          })}
          {LAYOUT.keys.filter(k => !k.white).map(key => {
            const { tone, pressed, background, color } = face(key.midi, false)
            return (
              <button
                key={key.midi}
                type="button"
                data-midi={key.midi}
                data-hand={tone?.hand || ''}
                data-spelled={tone?.spelled || ''}
                aria-label={tone ? `${tone.spelled}, ${tone.hand === 'L' ? leftLabel : rightLabel}` : pitchName(key.midi)}
                onClick={() => onKey(key.midi)}
                style={{
                  position: 'absolute', zIndex: 2,
                  left: (key.index + 1) * WHITE_W - BLACK_W / 2, top: 0,
                  width: BLACK_W, height: BLACK_H, padding: '8px 0 0',
                  border: 'none', borderRadius: '0 0 5px 5px',
                  background, color, cursor: 'pointer',
                  boxShadow: pressed ? 'inset 0 6px 10px rgba(0,0,0,.45)' : '0 5px 8px rgba(0,0,0,.45)',
                }}
              >
                {labelBlock(tone, '', color, true)}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
