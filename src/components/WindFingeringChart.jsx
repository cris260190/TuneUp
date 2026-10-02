import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { useLanguage } from '../hooks/useLanguage'
import { useSEO } from '../hooks/useSEO'
import { noteToFreq, playWindNote } from './windAudio'
import WindFingeringDiagram from './WindFingeringDiagram'

const pillBtn = {
  background: 'transparent',
  border: '1px solid var(--border)',
  borderRadius: '999px',
  color: 'var(--text)',
  cursor: 'pointer',
  fontSize: '1rem',
  padding: '0.3rem 0.9rem',
}

const TAB = (active) => ({
  fontFamily: "'Space Mono', monospace",
  fontSize: '.72rem', letterSpacing: '.05em',
  padding: '.3rem 1rem', borderRadius: '999px',
  border: active ? '1.5px solid var(--gold)' : '1px solid var(--border)',
  background: active ? 'var(--gold)' : 'transparent',
  color: active ? 'var(--bg)' : 'var(--text)',
  cursor: 'pointer', transition: 'all .15s',
})

function Legend({ config }) {
  const row = {
    display: 'flex', gap: '1.4rem', flexWrap: 'wrap',
    fontFamily: "'Space Mono', monospace", fontSize: '.65rem',
    color: 'var(--muted2)',
    padding: '1rem 1.2rem',
    border: '1px solid var(--border)', borderRadius: '8px',
    background: 'var(--s1)', marginBottom: '2.5rem',
  }
  const item = { display: 'flex', alignItems: 'center', gap: '.5rem' }
  const dot = (filled) => ({
    width: 14, height: 14, borderRadius: '50%', flexShrink: 0,
    background: filled ? 'var(--gold)' : 'transparent',
    border: filled ? 'none' : '1.5px solid var(--muted2)',
  })

  if (config.diagram === 'valves') {
    return (
      <div style={row}>
        <div style={item}><div style={dot(true)} />Pressed</div>
        <div style={item}><div style={dot(false)} />Up</div>
        <div>Valve 1 is nearest the mouthpiece</div>
      </div>
    )
  }
  if (config.diagram === 'slide') {
    return (
      <div style={row}>
        <div style={item}><div style={dot(true)} />Active position</div>
        <div style={item}><div style={dot(false)} />Other positions</div>
        <div>1 is all the way in · 7 is all the way out</div>
      </div>
    )
  }
  if (config.diagram === 'harmonica') {
    return (
      <div style={row}>
        <div style={item}><div style={dot(true)} />Hole and breath for this note</div>
        <div>bend = lower the draw · overblow = a separate, advanced technique</div>
      </div>
    )
  }
  return (
    <div style={row}>
      <div style={item}><div style={dot(true)} />Covered / pressed</div>
      <div style={item}><div style={dot(false)} />Open / not pressed</div>
      <div style={item}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', border: '1.5px solid var(--muted2)', flexShrink: 0 }} />
        {config.thumbLabel}
      </div>
      {config.legendExtra && <div>{config.legendExtra}</div>}
    </div>
  )
}

export default function WindFingeringChart({ config }) {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const { lang, t } = useLanguage()
  useSEO(config.seo)

  const octaves = config.octaves
  const firstNote = config.notes[0].name
  const firstOct = config.notes[0].octave

  const [selectedOctave, setSelectedOctave] = useState(firstOct)
  const [selectedNote, setSelectedNote] = useState(firstNote)
  const [isPlaying, setIsPlaying] = useState(false)

  const noteObj = config.notes.find(n => n.name === selectedNote) || config.notes[0]
  const notesInOctave = config.getByOctave(selectedOctave)
  const guide = config.guide?.[lang] || config.guide?.en

  function handleSelectNote(name) {
    setSelectedNote(name)
    playWindNote(noteToFreq(name), config.timbre)
    setIsPlaying(true)
    setTimeout(() => setIsPlaying(false), 1800)
  }

  function handleOctave(oct) {
    setSelectedOctave(oct)
    const first = config.getByOctave(oct)[0]
    if (first) handleSelectNote(first.name)
  }

  function handlePlay() {
    playWindNote(noteToFreq(noteObj.name), config.timbre)
    setIsPlaying(true)
    setTimeout(() => setIsPlaying(false), 1800)
  }

  const thumbActive = config.thumbPinch ? noteObj.thumb || noteObj.register : noteObj.thumb
  const info = config.registerInfo?.(noteObj)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <header style={{
        padding: '1.5rem 2.5rem',
        borderBottom: '1px solid var(--border)',
        background: 'rgba(8,8,14,.8)',
        backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 600 }}>
            Tune<em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Up</em>
          </div>
        </div>
        <button onClick={toggleTheme} style={pillBtn}>{theme === 'dark' ? '☀️' : '🌙'}</button>
      </header>

      <main style={{ maxWidth: '820px', margin: '0 auto', padding: '3rem 1.5rem', width: '100%' }}>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '2.2rem', fontWeight: 600,
          color: 'var(--gold)', marginBottom: '.5rem',
        }}>
          {config.title}
        </h1>
        <p style={{ color: 'var(--muted2)', fontSize: '.9rem', marginBottom: '1rem', lineHeight: 1.55 }}>
          {config.subtitle}
        </p>
        {guide && (
          <p style={{ color: 'var(--text)', fontSize: '.92rem', lineHeight: 1.65, marginTop: 0, marginBottom: '1.2rem' }}>
            {guide}
          </p>
        )}

        <div style={{ display: 'flex', gap: '.4rem', marginBottom: '1.4rem' }}>
          <button style={TAB(true)}>{t?.navFingering || 'Fingering'}</button>
          <button onClick={() => navigate(config.chordPath)} style={TAB(false)}>{t?.navChords || 'Chords'}</button>
        </div>

        <div style={{ display: 'flex', gap: '.4rem', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
          {octaves.map(oct => {
            const hasNotes = config.getByOctave(oct).length > 0
            const isActive = oct === selectedOctave
            return (
              <button key={oct} onClick={() => hasNotes && handleOctave(oct)} style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '.72rem', letterSpacing: '.05em',
                padding: '.3rem .9rem', borderRadius: '999px',
                border: isActive ? '1.5px solid var(--gold)' : '1px solid var(--border)',
                background: isActive ? 'var(--gold)' : 'transparent',
                color: isActive ? 'var(--bg)' : 'var(--text)',
                cursor: hasNotes ? 'pointer' : 'default',
                opacity: hasNotes ? 1 : 0.35,
                transition: 'all .15s',
              }}>
                Octave {oct}
              </button>
            )
          })}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem', marginBottom: '2.2rem' }}>
          {notesInOctave.map(n => {
            const isActive = n.name === selectedNote
            return (
              <button key={n.name} onClick={() => handleSelectNote(n.name)} style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.1rem', fontWeight: 600,
                padding: '.3rem .9rem', borderRadius: '8px',
                border: isActive ? '1.5px solid var(--gold)' : '1px solid var(--border)',
                background: isActive ? 'var(--gold)' : 'transparent',
                color: isActive ? 'var(--bg)' : 'var(--text)',
                cursor: 'pointer', transition: 'all .15s',
                minWidth: '3rem', textAlign: 'center',
              }}>
                {n.display}
              </button>
            )
          })}
        </div>

        <div style={{
          border: '1px solid var(--border)', borderRadius: '16px',
          background: 'var(--s1)', padding: '2rem 1.5rem',
          marginBottom: '1.5rem',
        }}>
          <WindFingeringDiagram note={noteObj} config={config} />
        </div>

        <div style={{
          border: '1px solid var(--border)', borderRadius: '12px',
          background: 'var(--s1)', padding: '1.4rem 1.6rem',
          marginBottom: '2rem',
          display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '3rem', fontWeight: 600, color: 'var(--gold)', lineHeight: 1,
              }}>{noteObj.display}</div>
              <div style={{
                fontFamily: "'Space Mono', monospace", fontSize: '.65rem',
                color: 'var(--muted2)', marginTop: '.25rem',
              }}>{noteObj.label}</div>
            </div>
            <button onClick={handlePlay} title="Play note" style={{
              width: 42, height: 42, borderRadius: '50%',
              border: `1.5px solid ${isPlaying ? 'var(--gold)' : 'var(--border)'}`,
              background: isPlaying ? 'var(--gold)' : 'transparent',
              color: isPlaying ? 'var(--bg)' : 'var(--gold)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all .15s', flexShrink: 0,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </button>
          </div>

          <div>
            {info && (
              <div style={{
                display: 'inline-flex', alignItems: 'center',
                fontFamily: "'Space Mono', monospace", fontSize: '.65rem',
                color: info.color,
                border: `1px solid ${info.color}`,
                borderRadius: '6px', padding: '.2rem .55rem',
                marginBottom: '.5rem',
              }}>
                {info.label}
              </div>
            )}
            {config.diagram === 'keys' && thumbActive && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: '.45rem',
                fontFamily: "'Space Mono', monospace", fontSize: '.65rem',
                color: 'var(--gold)',
              }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
                {config.thumbPinch && noteObj.register ? 'Thumb pinched (half-hole)' : `${config.thumbLabel} active`}
              </div>
            )}
            {config.showRegister && noteObj.register && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: '.45rem',
                fontFamily: "'Space Mono', monospace", fontSize: '.65rem',
                color: 'var(--gold)', marginTop: '.35rem',
              }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
                {config.registerLabel} key active
              </div>
            )}
          </div>

          {noteObj.notes && (
            <div style={{
              width: '100%',
              fontFamily: "'Space Mono', monospace", fontSize: '.65rem',
              color: 'var(--muted2)', lineHeight: 1.55,
              borderTop: '1px solid var(--border)', paddingTop: '.75rem',
            }}>
              {noteObj.notes}
            </div>
          )}
        </div>

        <Legend config={config} />

        <button onClick={() => navigate('/')} style={{
          ...pillBtn, fontSize: '1rem', padding: '0.5rem 1.4rem',
        }}>
          {t?.navMain || '← Main page'}
        </button>
      </main>
    </div>
  )
}
