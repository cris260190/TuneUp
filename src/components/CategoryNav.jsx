export default function CategoryNav({ cats, activeCat, onSetCat }) {
  return (
    <nav style={{
      display: 'flex', gap: 0,
      borderBottom: '1px solid var(--border)',
      background: 'var(--s1)',
      overflowX: 'auto',
      position: 'relative', zIndex: 10,
    }}>
      {Object.entries(cats).map(([key, cat]) => (
        <button
          key={key}
          onClick={() => onSetCat(key)}
          style={{
            padding: '.9rem 1.75rem',
            fontFamily: "'Space Mono', monospace",
            fontSize: '.6rem', letterSpacing: '.2em',
            textTransform: 'uppercase',
            color: activeCat === key ? 'var(--gold)' : 'var(--muted2)',
            background: 'none', border: 'none',
            borderBottom: activeCat === key ? '2px solid var(--gold)' : '2px solid transparent',
            cursor: 'pointer', whiteSpace: 'nowrap',
            transition: 'all .2s',
          }}
        >
          <span style={{ marginRight: '.5rem' }}>{cat.icon}</span>
          {cat.label}
        </button>
      ))}
    </nav>
  )
}