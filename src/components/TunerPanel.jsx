export default function TunerPanel({ 
  instrument, activeSub, frequency, note, cents, 
  isListening, onToggleListen, onSelectRef, t
}) {
  const inst = instrument.subs[activeSub]
  
  const tuneState = note && Math.abs(cents) < 5 ? 'in-tune' 
    : cents < 0 ? 'flat' : 'sharp'
  
  const needlePos = note ? Math.max(0, Math.min(100, 50 + cents)) : 50
  
  const freqColor = !note ? 'var(--text)' 
    : tuneState === 'in-tune' ? 'var(--green)'
    : tuneState === 'flat' ? 'var(--blue)' : 'var(--red)'

  const needleColor = !note ? 'var(--gold)'
    : tuneState === 'in-tune' ? 'var(--green)'
    : tuneState === 'flat' ? 'var(--blue)' : 'var(--red)'

  const centsText = !note ? '—'
    : Math.abs(cents) < 5 ? (t?.inTune || '✓ In Tune')
    : cents < 0 ? `♭ ${Math.abs(Math.round(cents))} ${t?.flat || 'cents flat'}`
    : `♯ ${Math.round(cents)} ${t?.sharp || 'cents sharp'}`

  const centsColor = !note ? 'var(--muted2)'
    : tuneState === 'in-tune' ? 'var(--green)'
    : tuneState === 'flat' ? 'var(--blue)' : 'var(--red)'

  return (
    <div style={{
      padding: '2.5rem',
      borderRight: '1px solid var(--border)',
    }}>
      {/* Titlu */}
      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: '2.2rem', fontWeight: 600, marginBottom: '.25rem'
      }}>
        {instrument.label} — {activeSub}
      </div>
      <div style={{
        fontSize: '.6rem', letterSpacing: '.15em',
        textTransform: 'uppercase', color: 'var(--muted2)',
        marginBottom: '2.5rem'
      }}>
        {inst.desc}
      </div>

      {/* Frecvență */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '.75rem', marginBottom: '.4rem' }}>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '6rem', fontWeight: 300, lineHeight: 1,
          color: freqColor, transition: 'color .3s',
        }}>
          {frequency ?? '—'}
        </div>
        <div style={{ fontSize: '.9rem', color: 'var(--muted2)', paddingBottom: '.8rem' }}>Hz</div>
      </div>

      <div style={{
        marginBottom: '2.5rem', minHeight: '1.4em',
        fontSize: '.65rem', letterSpacing: '.15em',
        textTransform: 'uppercase', color: 'var(--muted2)',
      }}>
        {note ? (
          <>{t?.detected || 'Detected'}: <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.4rem', fontWeight: 400,
            color: 'var(--gold)', letterSpacing: 0,
            marginRight: '.3rem'
          }}>{note}</span></>
        ) : (t?.pressListen || 'Press Listen to start')}
      </div>

      {/* Meter */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          fontSize: '.55rem', letterSpacing: '.2em',
          textTransform: 'uppercase', color: 'var(--muted)',
          marginBottom: '.6rem'
        }}>
          <span>♭ {t?.flatLabel || 'Flat'}</span>
          <span>{t?.inTuneLabel || 'In Tune'}</span>
          <span>{t?.sharpLabel || 'Sharp'} ♯</span>
        </div>
        <div style={{
          position: 'relative', height: '6px',
          background: 'var(--s2)', borderRadius: '3px',
          marginBottom: '.75rem',
        }}>
          <div style={{
            position: 'absolute', top: 0, height: '100%',
            width: '10%', left: '45%',
            background: 'rgba(52,211,153,.15)', borderRadius: '3px'
          }} />
          <div style={{
            position: 'absolute', top: '-7px',
            width: '3px', height: '20px', borderRadius: '2px',
            background: needleColor,
            left: needlePos + '%',
            transform: 'translateX(-50%)',
            transition: 'left .08s ease, background .2s',
            boxShadow: `0 0 10px ${needleColor}`,
          }} />
        </div>
        <div style={{
          textAlign: 'center', fontSize: '.65rem',
          letterSpacing: '.15em', textTransform: 'uppercase',
          color: centsColor,
        }}>
          {centsText}
        </div>
      </div>

      {/* Strings / Notes */}
      <div style={{
        fontSize: '.55rem', letterSpacing: '.3em',
        textTransform: 'uppercase', color: 'var(--muted)',
        marginBottom: '1rem'
      }}>
        {inst.type === 'strings' 
          ? (t?.refStrings || 'Reference Strings') 
          : (t?.refNotes || 'Reference Notes')}
      </div>

      {inst.type === 'strings' ? (
        <div style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {inst.strings.map((s, i) => (
            <div key={i} onClick={() => onSelectRef(s)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: '.25rem', padding: '.8rem 1rem', minWidth: '68px',
                background: 'var(--s1)', border: '1px solid var(--border)',
                borderRadius: '10px', cursor: 'pointer', transition: 'all .2s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(212,168,71,.4)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.6rem', color: 'var(--gold)', lineHeight: 1
              }}>{s.n.replace(/\d/, '')}</span>
              <span style={{ fontSize: '.5rem', color: 'var(--muted2)', letterSpacing: '.1em', textTransform: 'uppercase' }}>
                String {i + 1}
              </span>
              <span style={{ fontSize: '.55rem', color: 'var(--muted)' }}>{s.f.toFixed(1)} Hz</span>
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '.4rem', marginBottom: '2.5rem'
        }}>
          {inst.range.map((s, i) => (
            <div key={i} onClick={() => onSelectRef(s)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: '.2rem', padding: '.6rem .4rem',
                background: 'var(--s1)', border: '1px solid var(--border)',
                borderRadius: '8px', cursor: 'pointer', transition: 'all .2s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(45,212,191,.4)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', color: 'var(--teal)', lineHeight: 1 }}>
                {s.n.replace(/\d/, '')}
              </span>
              <span style={{ fontSize: '.5rem', color: 'var(--muted2)' }}>{s.n.match(/\d+/)?.[0] || ''}</span>
              <span style={{ fontSize: '.5rem', color: 'var(--muted)' }}>{s.f.toFixed(0)}</span>
            </div>
          ))}
        </div>
      )}

      {/* Listen button */}
      <button onClick={onToggleListen} style={{
        display: 'inline-flex', alignItems: 'center', gap: '.6rem',
        padding: '.85rem 1.8rem', borderRadius: '8px', border: 'none',
        fontFamily: "'Space Mono', monospace", fontSize: '.65rem',
        letterSpacing: '.15em', textTransform: 'uppercase',
        cursor: 'pointer', fontWeight: 700,
        background: isListening ? 'var(--red)' : 'var(--gold)',
        color: 'var(--bg)', transition: 'all .25s',
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
          <line x1="12" y1="19" x2="12" y2="23"/>
          <line x1="8" y1="23" x2="16" y2="23"/>
        </svg>
        {isListening 
          ? (t?.listenStop || 'Stop Listening') 
          : (t?.listenStart || 'Start Listening')}
      </button>
    </div>
  )
}