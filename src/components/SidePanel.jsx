import { useRef, useEffect } from 'react'

export default function SidePanel({ 
  analyser, isListening, refHz, onChangeRef,
  note, cents, metronome 
}) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const historyRef = useRef([])

  // adaugă în history când se detectează o notă nouă
  useEffect(() => {
    if (!note) return
    const last = historyRef.current[0]
    if (!last || last.note !== note) {
      historyRef.current = [
        { note, cents: Math.round(cents) },
        ...historyRef.current
      ].slice(0, 10)
    }
  }, [note, cents])

  // waveform
  useEffect(() => {
    if (!isListening || !analyser.current) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const draw = () => {
      const buf = new Uint8Array(analyser.current.frequencyBinCount)
      analyser.current.getByteTimeDomainData(buf)
      const w = canvas.width, h = canvas.height
      ctx.fillStyle = '#08080e'
      ctx.fillRect(0, 0, w, h)
      ctx.beginPath()
      ctx.strokeStyle = '#d4a847'
      ctx.lineWidth = 1.5
      const sw = w / buf.length
      for (let i = 0; i < buf.length; i++) {
        const y = (buf[i] / 128.0) * (h / 2)
        i === 0 ? ctx.moveTo(0, y) : ctx.lineTo(i * sw, y)
      }
      ctx.stroke()
      animRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animRef.current)
  }, [isListening, analyser])

  const { isPlaying, bpm, signature, currentBeat, 
          toggle, updateBpm, updateSignature } = metronome

  const SIGS = [2, 3, 4, 5, 6, 7]

  return (
    <div style={{
      padding: '2rem 1.75rem',
      background: 'var(--s1)',
      display: 'flex', flexDirection: 'column', gap: '2rem'
    }}>

      {/* Waveform */}
      <div>
        <div style={{
          fontSize: '.55rem', letterSpacing: '.3em',
          textTransform: 'uppercase', color: 'var(--muted)',
          marginBottom: '1rem'
        }}>Waveform</div>
        <canvas ref={canvasRef} width={320} height={72} style={{
          width: '100%', height: '72px', display: 'block',
          border: '1px solid var(--border)', borderRadius: '8px',
          background: 'var(--bg)'
        }} />
      </div>

      {/* Reference tone */}
      <div>
        <div style={{
          fontSize: '.55rem', letterSpacing: '.3em',
          textTransform: 'uppercase', color: 'var(--muted)',
          marginBottom: '1rem'
        }}>Reference Pitch</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
          <button onClick={() => onChangeRef(-1)} style={adjBtn}>−</button>
          <div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '2rem', fontWeight: 700, color: 'var(--text)'
            }}>{refHz}</div>
            <div style={{ fontSize: '.55rem', color: 'var(--muted2)' }}>Hz — A4</div>
          </div>
          <button onClick={() => onChangeRef(1)} style={adjBtn}>+</button>
        </div>
      </div>

      {/* Metronome */}
      <div>
        <div style={{
          fontSize: '.55rem', letterSpacing: '.3em',
          textTransform: 'uppercase', color: 'var(--muted)',
          marginBottom: '1rem'
        }}>Metronome</div>

        {/* BPM + dots */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '3rem', fontWeight: 300, color: 'var(--gold)', lineHeight: 1
            }}>{bpm}</div>
            <div style={{ fontSize: '.5rem', color: 'var(--muted2)', letterSpacing: '.2em', textTransform: 'uppercase' }}>BPM</div>
          </div>
          {/* beat dots */}
          <div style={{ display: 'flex', gap: '.4rem' }}>
            {Array.from({ length: signature }, (_, i) => (
              <div key={i} style={{
                width: '10px', height: '10px', borderRadius: '50%',
                background: currentBeat === i
                  ? i === 0 ? 'var(--red)' : 'var(--gold)'
                  : 'var(--border)',
                boxShadow: currentBeat === i
                  ? i === 0 ? '0 0 10px var(--red)' : '0 0 8px var(--gold)'
                  : 'none',
                transition: 'background .05s, box-shadow .05s'
              }} />
            ))}
          </div>
        </div>

        {/* Slider BPM */}
        <input type="range" min={40} max={240} value={bpm}
          onChange={e => updateBpm(parseInt(e.target.value))}
          style={{ width: '100%', marginBottom: '1rem', accentColor: 'var(--gold)' }}
        />

        {/* Time signature */}
        <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          {SIGS.map(s => (
            <button key={s} onClick={() => updateSignature(s)} style={{
              padding: '.3rem .6rem',
              background: signature === s ? 'rgba(212,168,71,.1)' : 'var(--s2)',
              border: `1px solid ${signature === s ? 'var(--gold)' : 'var(--border)'}`,
              borderRadius: '6px',
              fontFamily: "'Space Mono', monospace",
              fontSize: '.6rem',
              color: signature === s ? 'var(--gold)' : 'var(--muted2)',
              cursor: 'pointer', transition: 'all .2s'
            }}>{s}/4</button>
          ))}
        </div>

        {/* Start/Stop */}
        <button onClick={toggle} style={{
          width: '100%', padding: '.7rem',
          border: isPlaying ? 'none' : '1px solid var(--border)',
          borderRadius: '8px',
          fontFamily: "'Space Mono', monospace",
          fontSize: '.65rem', letterSpacing: '.15em',
          textTransform: 'uppercase', fontWeight: 700,
          cursor: 'pointer', transition: 'all .2s',
          background: isPlaying ? 'var(--teal)' : 'var(--s2)',
          color: isPlaying ? 'var(--bg)' : 'var(--muted2)',
        }}>
          {isPlaying ? '■ Stop Metronome' : '▶ Start Metronome'}
        </button>
      </div>

      {/* History */}
      <div>
        <div style={{
          fontSize: '.55rem', letterSpacing: '.3em',
          textTransform: 'uppercase', color: 'var(--muted)',
          marginBottom: '1rem'
        }}>Detection History</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.35rem' }}>
          {historyRef.current.length === 0 ? (
            <div style={{ color: 'var(--muted)', fontSize: '.6rem', textAlign: 'center', padding: '.5rem' }}>
              No detections yet
            </div>
          ) : historyRef.current.map((h, i) => {
            const isIn = Math.abs(h.cents) < 5
            const isFlat = h.cents < 0
            const statusColor = isIn ? 'var(--green)' : isFlat ? 'var(--blue)' : 'var(--red)'
            const statusLabel = isIn ? 'In tune' : isFlat ? `${Math.abs(h.cents)}¢ flat` : `${h.cents}¢ sharp`
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '.45rem .7rem', background: 'var(--bg)', borderRadius: '5px',
                fontSize: '.6rem'
              }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', color: 'var(--gold)' }}>{h.note}</span>
                <span style={{ color: 'var(--muted2)' }}>{h.cents > 0 ? '+' : ''}{h.cents}¢</span>
                <span style={{ fontSize: '.5rem', letterSpacing: '.1em', textTransform: 'uppercase', color: statusColor }}>{statusLabel}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Ad slot */}
      <div style={{
        marginTop: 'auto', padding: '1.25rem',
        border: '1px dashed var(--border)', borderRadius: '8px',
        textAlign: 'center', color: 'var(--muted)',
        fontSize: '.55rem', letterSpacing: '.15em',
        textTransform: 'uppercase', background: 'rgba(30,30,48,.3)'
      }}>
        Advertisement · Google AdSense
      </div>
    </div>
  )
}

const adjBtn = {
  width: '36px', height: '36px', borderRadius: '50%',
  border: '1px solid var(--border)', background: 'none',
  color: 'var(--muted2)', cursor: 'pointer',
  fontSize: '1rem', display: 'flex',
  alignItems: 'center', justifyContent: 'center',
  transition: 'all .2s'
}