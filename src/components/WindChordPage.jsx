import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { useLanguage } from '../hooks/useLanguage'
import { useSEO } from '../hooks/useSEO'
import { noteToFreq, playWindNote } from './windAudio'
import WindFingeringDiagram from './WindFingeringDiagram'
import {
  CHORD_ROOTS, CHORD_TYPES, buildWindChord, chordUi, degreeText, explainText, typeLabel,
} from '../data/windChordData'
import { WIND_FINGERING } from '../data/windFingeringConfig'

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

export default function WindChordPage({ instrument }) {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const { lang, t } = useLanguage()
  const ui = chordUi(lang)
  const config = WIND_FINGERING[instrument]

  const [rootName, setRootName] = useState('C')
  const [typeId, setTypeId] = useState('Major')
  const [playing, setPlaying] = useState(null)
  const timers = useRef([])

  useSEO(config?.chordSeo || {
    title: `${instrument} Chords | TuneUp`,
    description: '',
    url: '',
  })

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  if (!config) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button onClick={() => navigate('/')} style={pillBtn}>{t?.navMain || '← Main page'}</button>
      </div>
    )
  }

  const chord = buildWindChord(instrument, rootName, typeId)
  const fullName = `${chord.root.name} ${typeLabel(chord.type, lang)}`

  function stopTimers() {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  function playOne(name) {
    stopTimers()
    setPlaying(name)
    playWindNote(noteToFreq(name), config.timbre)
    const id = setTimeout(() => setPlaying(null), 1700)
    timers.current.push(id)
  }

  function playArpeggio() {
    if (!chord.tones) return
    stopTimers()
    chord.tones.forEach((tone, i) => {
      const id = setTimeout(() => {
        setPlaying(tone.note.name)
        playWindNote(noteToFreq(tone.note.name), config.timbre)
        if (i === chord.tones.length - 1) {
          const end = setTimeout(() => setPlaying(null), 1700)
          timers.current.push(end)
        }
      }, i * 460)
      timers.current.push(id)
    })
  }

  const concertLine = chord.transposed
    ? ui.concertLine.replace('{written}', chord.symbol).replace('{concert}', chord.concertSymbol)
    : ui.concertSame

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
        <div style={{
          fontFamily: "'Space Mono', monospace", fontSize: '.68rem',
          letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--gold)',
          marginBottom: '.35rem',
        }}>
          {ui.chords}
        </div>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '2.2rem', fontWeight: 600,
          color: 'var(--gold)', margin: '0 0 .5rem',
        }}>
          {instrument}
        </h1>
        <p style={{ color: 'var(--text)', fontSize: '.92rem', lineHeight: 1.65, marginTop: 0, marginBottom: '1.2rem' }}>
          {ui.intro}
        </p>

        <div style={{ display: 'flex', gap: '.4rem', marginBottom: '1.4rem' }}>
          <button onClick={() => navigate(config.path)} style={TAB(false)}>{ui.fingering}</button>
          <button style={TAB(true)}>{ui.chords}</button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem', marginBottom: '.7rem' }}>
          {CHORD_ROOTS.map(root => {
            const on = root.name === rootName
            return (
              <button key={root.name} onClick={() => setRootName(root.name)} style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.05rem', fontWeight: 600,
                padding: '.25rem .75rem', borderRadius: '8px', minWidth: '2.6rem',
                border: on ? '1.5px solid var(--gold)' : '1px solid var(--border)',
                background: on ? 'var(--gold)' : 'transparent',
                color: on ? 'var(--bg)' : 'var(--text)',
                cursor: 'pointer',
              }}>
                {root.name}
              </button>
            )
          })}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem', marginBottom: '1.6rem' }}>
          {CHORD_TYPES.map(type => {
            const on = type.id === typeId
            return (
              <button key={type.id} onClick={() => setTypeId(type.id)} style={{
                fontFamily: "'Space Mono', monospace", fontSize: '.68rem',
                padding: '.3rem .7rem', borderRadius: '999px',
                border: on ? '1.5px solid var(--gold)' : '1px solid var(--border)',
                background: on ? 'var(--gold)' : 'transparent',
                color: on ? 'var(--bg)' : 'var(--text)',
                cursor: 'pointer',
              }}>
                {type.id}
              </button>
            )
          })}
        </div>

        <div style={{
          border: '1px solid var(--border)', borderRadius: '16px',
          background: 'var(--s1)', padding: '1.4rem 1.5rem', marginBottom: '1.2rem',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '2.4rem', fontWeight: 600, color: 'var(--gold)', lineHeight: 1,
              }}>
                {chord.symbol}
              </div>
              <div style={{ color: 'var(--text)', marginTop: '.35rem' }}>{fullName}</div>
              <div style={{
                fontFamily: "'Space Mono', monospace", fontSize: '.68rem',
                color: 'var(--muted2)', marginTop: '.45rem',
              }}>
                {ui.formula}: {chord.type.formula}
              </div>
            </div>
            <button onClick={playArpeggio} style={{ ...pillBtn, borderColor: 'var(--gold)', color: 'var(--gold)' }}>
              {ui.play}
            </button>
          </div>
          <p style={{ color: 'var(--muted2)', fontSize: '.82rem', lineHeight: 1.5, margin: '1rem 0 0' }}>
            {concertLine}
          </p>
        </div>

        <h2 style={{
          fontFamily: "'Space Mono', monospace", fontSize: '.68rem',
          letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gold)',
          margin: '0 0 .6rem',
        }}>
          {ui.how}
        </h2>
        <p style={{ color: 'var(--text)', fontSize: '.95rem', lineHeight: 1.7, marginTop: 0, marginBottom: '1.8rem' }}>
          {explainText(chord.type, lang)}
        </p>

        <h2 style={{
          fontFamily: "'Space Mono', monospace", fontSize: '.68rem',
          letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gold)',
          margin: '0 0 .8rem',
        }}>
          {ui.tones}
        </h2>

        {!chord.tones && (
          <p style={{ color: 'var(--muted2)' }}>{ui.missing}</p>
        )}

        {chord.tones?.map((tone, i) => (
          <section key={`${tone.spelled}-${i}`} style={{
            border: `1px solid ${playing === tone.note.name ? 'var(--gold)' : 'var(--border)'}`,
            borderRadius: '16px', background: 'var(--s1)',
            padding: '1.1rem 1.2rem 1.3rem', marginBottom: '1rem',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '.6rem' }}>
              <div>
                <div style={{
                  fontFamily: "'Space Mono', monospace", fontSize: '.65rem',
                  color: 'var(--gold)', letterSpacing: '.08em', textTransform: 'uppercase',
                }}>
                  {degreeText(tone.degree, lang)}
                </div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.8rem', fontWeight: 600, lineHeight: 1.1,
                }}>
                  {tone.spelled}
                </div>
              </div>
              <button onClick={() => playOne(tone.note.name)} title={ui.playNote} style={{
                width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                border: '1.5px solid var(--gold)', background: 'transparent', color: 'var(--gold)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </button>
            </div>
            <WindFingeringDiagram note={tone.note} config={config} idPrefix={`c${i}`} />
            {tone.note.notes && (
              <p style={{
                fontFamily: "'Space Mono', monospace", fontSize: '.65rem',
                color: 'var(--muted2)', lineHeight: 1.55, margin: '.7rem 0 0',
              }}>
                {tone.note.notes}
              </p>
            )}
          </section>
        ))}

        <button onClick={() => navigate('/')} style={{ ...pillBtn, marginTop: '1rem' }}>
          {t?.navMain || '← Main page'}
        </button>
      </main>
    </div>
  )
}
