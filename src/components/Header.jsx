import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { LANGUAGES } from '../data/translations'

function useIsMobile() {
  const [m, setM] = useState(window.innerWidth < 768)
  useEffect(() => {
    const h = () => setM(window.innerWidth < 768)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])
  return m
}

function LangDropdown({ lang, setLang }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    function onDown(e) {
      if (!ref.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  const current = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0]

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: '.35rem',
          padding: '.3rem .6rem',
          border: '1px solid var(--gold)',
          borderRadius: '6px',
          fontSize: '.6rem', letterSpacing: '.05em',
          background: 'rgba(212,168,71,.08)',
          color: 'var(--gold)',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        {current.flag} {current.label}
        <span style={{ fontSize: '.5rem', opacity: .7 }}>▾</span>
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 6px)',
          right: 0,
          background: 'var(--s1)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '.3rem',
          zIndex: 200,
          display: 'flex', flexDirection: 'column', gap: '.15rem',
          minWidth: '90px',
          boxShadow: '0 8px 24px rgba(0,0,0,.45)',
        }}>
          {LANGUAGES.map(l => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code); setOpen(false) }}
              style={{
                display: 'flex', alignItems: 'center', gap: '.5rem',
                padding: '.3rem .55rem',
                border: 'none', borderRadius: '5px',
                fontSize: '.6rem', letterSpacing: '.04em',
                background: lang === l.code ? 'rgba(212,168,71,.15)' : 'transparent',
                color: lang === l.code ? 'var(--gold)' : 'var(--text)',
                cursor: 'pointer',
                textAlign: 'left', width: '100%',
              }}
            >
              {l.flag} {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const NAV_BTN = {
  padding: '.4rem .9rem',
  border: '1px solid var(--border)',
  borderRadius: '20px',
  fontSize: '.6rem', letterSpacing: '.1em',
  textTransform: 'uppercase', color: 'var(--muted2)',
  background: 'var(--s1)', cursor: 'pointer',
  whiteSpace: 'nowrap', flexShrink: 0,
}

export default function Header({ refHz, onChangeRef, lang, setLang, t }) {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const isMobile = useIsMobile()

  return (
    <header style={{
      position: 'relative', zIndex: 20,
      borderBottom: '1px solid var(--border)',
      background: 'rgba(8,8,14,.8)',
      backdropFilter: 'blur(12px)',
    }}>

      {/* ── Main row ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: isMobile ? '1rem 1.2rem' : '1.5rem 2.5rem',
      }}>
        {/* Logo */}
        <div onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.8rem', fontWeight: 600, letterSpacing: '-.01em',
          }}>
            Tune<em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Up</em>
          </div>
          {!isMobile && (
            <div style={{
              fontSize: '.55rem', letterSpacing: '.3em',
              textTransform: 'uppercase', color: 'var(--muted2)', marginTop: '.1rem',
            }}>
              {t?.tagline || 'Free Instrument Tuner'}
            </div>
          )}
        </div>

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
          {/* A4 reference */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '.4rem',
            padding: '.4rem .8rem', border: '1px solid var(--border)',
            borderRadius: '20px', fontSize: '.6rem',
            letterSpacing: '.1em', color: 'var(--muted2)',
            background: 'var(--s1)',
          }}>
            A4 =
            <button onClick={() => onChangeRef(-1)} style={{
              background: 'none', border: 'none', color: 'var(--muted2)',
              cursor: 'pointer', fontSize: '.8rem', padding: '0 .2rem',
            }}>−</button>
            <strong style={{ color: 'var(--gold)', fontSize: '.75rem' }}>{refHz}</strong>
            <button onClick={() => onChangeRef(1)} style={{
              background: 'none', border: 'none', color: 'var(--muted2)',
              cursor: 'pointer', fontSize: '.8rem', padding: '0 .2rem',
            }}>+</button>
            Hz
          </div>

          {/* Desktop-only tool nav */}
          {!isMobile && (
            <>
              <button onClick={() => navigate('/metronome')} style={NAV_BTN}>{t?.metronome || 'Metronome'}</button>
              <button onClick={() => navigate('/pitch-pipe')} style={NAV_BTN}>{t?.pitchPipe || 'Pitch Pipe'}</button>
              <button onClick={() => navigate('/transpose')} style={NAV_BTN}>{t?.navTranspose || 'Transpose'}</button>
              <button onClick={() => navigate('/progressions')} style={NAV_BTN}>{t?.navProgressions || 'Progressions'}</button>
            </>
          )}

          <LangDropdown lang={lang} setLang={setLang} />

          <button onClick={toggleTheme} style={{
            padding: '.4rem .9rem',
            border: '1px solid var(--border)',
            borderRadius: '20px',
            fontSize: '.8rem',
            background: 'var(--s1)',
            cursor: 'pointer',
            color: 'var(--muted2)',
          }}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      {/* ── Mobile tool strip ── */}
      {isMobile && (
        <div style={{
          display: 'flex', gap: '.5rem',
          overflowX: 'auto', WebkitOverflowScrolling: 'touch',
          padding: '.5rem 1.2rem .7rem',
          borderTop: '1px solid rgba(255,255,255,.06)',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}>
          <button onClick={() => navigate('/metronome')} style={NAV_BTN}>{t?.metronome || 'Metronome'}</button>
          <button onClick={() => navigate('/pitch-pipe')} style={NAV_BTN}>{t?.pitchPipe || 'Pitch Pipe'}</button>
          <button onClick={() => navigate('/transpose')} style={NAV_BTN}>{t?.navTranspose || 'Transpose'}</button>
          <button onClick={() => navigate('/progressions')} style={NAV_BTN}>{t?.navProgressions || 'Progressions'}</button>
        </div>
      )}

    </header>
  )
}
