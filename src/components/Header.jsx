export default function Header({ refHz, onChangeRef }) {
  return (
    <header style={{
      position: 'relative', zIndex: 10,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '1.5rem 2.5rem',
      borderBottom: '1px solid var(--border)',
      background: 'rgba(8,8,14,.8)',
      backdropFilter: 'blur(12px)',
    }}>
      <div>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.8rem', fontWeight: 600, letterSpacing: '-.01em'
        }}>
          Tune<em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Up</em>
        </div>
        <div style={{
          fontSize: '.55rem', letterSpacing: '.3em',
          textTransform: 'uppercase', color: 'var(--muted2)', marginTop: '.1rem'
        }}>
          Free Instrument Tuner
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '.5rem',
          padding: '.4rem .9rem', border: '1px solid var(--border)',
          borderRadius: '20px', fontSize: '.6rem',
          letterSpacing: '.1em', color: 'var(--muted2)',
          background: 'var(--s1)',
        }}>
          A4 =
          <button onClick={() => onChangeRef(-1)} style={{
            background: 'none', border: 'none', color: 'var(--muted2)',
            cursor: 'pointer', fontSize: '.8rem', padding: '0 .2rem'
          }}>−</button>
          <strong style={{ color: 'var(--gold)', fontSize: '.75rem' }}>{refHz}</strong>
          <button onClick={() => onChangeRef(1)} style={{
            background: 'none', border: 'none', color: 'var(--muted2)',
            cursor: 'pointer', fontSize: '.8rem', padding: '0 .2rem'
          }}>+</button>
          Hz
        </div>
      </div>
    </header>
  )
}