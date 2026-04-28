export default function SubNav({ subs, activeSub, onSetSub }) {
  return (
    <div style={{
      display: 'flex', gap: '.5rem',
      padding: '.75rem 2rem',
      borderBottom: '1px solid var(--border)',
      background: 'var(--bg)',
      overflowX: 'auto',
      minHeight: '54px', alignItems: 'center',
      position: 'relative', zIndex: 10,
    }}>
      {subs.map(sub => (
        <button
          key={sub}
          onClick={() => onSetSub(sub)}
          style={{
            padding: '.35rem .9rem',
            fontFamily: "'Space Mono', monospace",
            fontSize: '.6rem', letterSpacing: '.1em',
            textTransform: 'uppercase',
            color: activeSub === sub ? 'var(--bg)' : 'var(--muted2)',
            background: activeSub === sub ? 'var(--gold)' : 'var(--s1)',
            border: activeSub === sub ? '1px solid var(--gold)' : '1px solid var(--border)',
            borderRadius: '20px',
            cursor: 'pointer', whiteSpace: 'nowrap',
            transition: 'all .2s',
          }}
        >
          {sub}
        </button>
      ))}
    </div>
  )
}