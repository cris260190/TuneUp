import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { useLanguage } from '../hooks/useLanguage'
import { useSEO } from '../hooks/useSEO'
import { SEO } from '../data/seoData'
import { CHORD_ROOTS, CHORD_TYPES, degreeText, explainText, typeLabel } from '../data/windChordData'
import {
  INVERSIONS, buildPianoChord, inversionLabel, pianoUi,
} from '../data/pianoChordData'
import { playPianoMidi } from './pianoAudio'
import PianoKeyboard from './PianoKeyboard'

const pillBtn = {
  background: 'transparent',
  border: '1px solid var(--border)',
  borderRadius: '999px',
  color: 'var(--text)',
  cursor: 'pointer',
  fontSize: '.95rem',
  padding: '0.3rem 0.9rem',
}

export default function PianoChordPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const { lang, t } = useLanguage()
  const ui = pianoUi(lang)
  const [rootName, setRootName] = useState('C')
  const [typeId, setTypeId] = useState('Major')
  const [inversion, setInversion] = useState(0)
  const [playing, setPlaying] = useState([])
  const timers = useRef([])

  useSEO(SEO.pianoChords)
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const chord = buildPianoChord(rootName, typeId, inversion)
  const fullName = `${chord.root.name} ${typeLabel(chord.type, lang)}`
  const bassLine = ui.bassLine.replace('{degree}', degreeText(chord.tones[0].degree, lang))

  function stopTimers() {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  function playChord() {
    stopTimers()
    const midis = chord.tones.map(tone => tone.midi)
    setPlaying(midis)
    playPianoMidi(midis)
    timers.current.push(setTimeout(() => setPlaying([]), 1500))
  }

  function playOne(midi) {
    stopTimers()
    setPlaying([midi])
    playPianoMidi(midi)
    timers.current.push(setTimeout(() => setPlaying([]), 1200))
  }

  function playArpeggio() {
    stopTimers()
    const midis = chord.tones.map(tone => tone.midi).sort((a, b) => a - b)
    midis.forEach((midi, i) => {
      timers.current.push(setTimeout(() => {
        setPlaying([midi])
        playPianoMidi(midi)
        if (i === midis.length - 1) {
          timers.current.push(setTimeout(() => setPlaying([]), 1200))
        }
      }, i * 320))
    })
  }

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
        <button type="button" onClick={toggleTheme} style={pillBtn}>{theme === 'dark' ? '☀️' : '🌙'}</button>
      </header>

      <main style={{ maxWidth: '920px', margin: '0 auto', padding: '3rem 1.5rem', width: '100%' }}>
        <div style={{
          fontFamily: "'Space Mono', monospace", fontSize: '.68rem',
          letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--gold)',
          marginBottom: '.35rem',
        }}>
          {ui.kicker}
        </div>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '2.2rem', fontWeight: 600,
          color: 'var(--gold)', margin: '0 0 .5rem',
        }}>
          Piano
        </h1>
        <p style={{ color: 'var(--text)', fontSize: '.92rem', lineHeight: 1.65, marginTop: 0, marginBottom: '1.2rem' }}>
          {ui.intro}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem', marginBottom: '.7rem' }}>
          {CHORD_ROOTS.map(root => {
            const on = root.name === rootName
            return (
              <button key={root.name} type="button" onClick={() => setRootName(root.name)} style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.05rem', fontWeight: 600,
                padding: '.25rem .75rem', borderRadius: '8px', minWidth: '2.6rem',
                border: on ? '1.5px solid var(--gold)' : '1px solid var(--border)',
                background: on ? 'var(--gold)' : 'transparent',
                color: on ? '#1a1408' : 'var(--text)',
                cursor: 'pointer',
              }}>
                {root.name}
              </button>
            )
          })}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem', marginBottom: '.7rem' }}>
          {CHORD_TYPES.map(type => {
            const on = type.id === typeId
            return (
              <button key={type.id} type="button" onClick={() => setTypeId(type.id)} style={{
                fontFamily: "'Space Mono', monospace", fontSize: '.68rem',
                padding: '.3rem .7rem', borderRadius: '999px',
                border: on ? '1.5px solid var(--gold)' : '1px solid var(--border)',
                background: on ? 'var(--gold)' : 'transparent',
                color: on ? '#1a1408' : 'var(--text)',
                cursor: 'pointer',
              }}>
                {type.id}
              </button>
            )
          })}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem', marginBottom: '1.4rem', alignItems: 'center' }}>
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: '.62rem',
            letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--muted2)',
            marginRight: '.2rem',
          }}>
            {ui.inversion}
          </span>
          {INVERSIONS.slice(0, chord.type.intervals.length).map((name, i) => {
            const on = i === chord.inversion
            return (
              <button key={name.en} type="button" onClick={() => setInversion(i)} style={{
                fontFamily: "'Space Mono', monospace", fontSize: '.66rem',
                padding: '.3rem .7rem', borderRadius: '999px',
                border: on ? '1.5px solid var(--teal)' : '1px solid var(--border)',
                background: on ? 'var(--teal)' : 'transparent',
                color: on ? '#06221f' : 'var(--text)',
                cursor: 'pointer',
              }}>
                {inversionLabel(i, lang)}
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
              <div data-symbol={chord.symbol} style={{
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
              <div style={{
                fontFamily: "'Space Mono', monospace", fontSize: '.68rem',
                color: 'var(--teal)', marginTop: '.3rem',
              }}>
                {inversionLabel(chord.inversion, lang)} · {bassLine}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '.45rem', flexWrap: 'wrap' }}>
              <button type="button" onClick={playChord} style={{
                ...pillBtn, borderColor: 'var(--gold)', background: 'var(--gold)', color: '#1a1408',
              }}>
                {ui.play}
              </button>
              <button type="button" onClick={playArpeggio} style={{ ...pillBtn, borderColor: 'var(--gold)', color: 'var(--gold)' }}>
                {ui.arp}
              </button>
            </div>
          </div>
          <p style={{ color: 'var(--muted2)', fontSize: '.82rem', lineHeight: 1.5, margin: '1rem 0 0' }}>
            {ui.concert}
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
          {ui.hands}
        </h2>
        <PianoKeyboard
          tones={chord.tones}
          playing={playing}
          onKey={playOne}
          leftLabel={ui.left}
          rightLabel={ui.right}
        />
        <p style={{ color: 'var(--muted2)', fontSize: '.78rem', lineHeight: 1.5, margin: '.7rem 0 1.2rem' }}>
          {ui.tap}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.55rem' }}>
          {chord.tones.map(tone => {
            const on = playing.includes(tone.midi)
            const handColor = tone.hand === 'L' ? 'var(--teal)' : 'var(--gold)'
            const edge = on ? 'var(--gold)' : 'var(--border)'
            return (
              <button
                key={tone.midi}
                type="button"
                data-midi={tone.midi}
                data-hand={tone.hand}
                onClick={() => playOne(tone.midi)}
                style={{
                  textAlign: 'left', cursor: 'pointer',
                  borderTop: `3px solid ${handColor}`,
                  borderRight: `1px solid ${edge}`,
                  borderBottom: `1px solid ${edge}`,
                  borderLeft: `1px solid ${edge}`,
                  background: 'var(--s1)', borderRadius: 12,
                  padding: '.65rem .85rem', minWidth: 118,
                }}
              >
                <div style={{
                  fontFamily: "'Space Mono', monospace", fontSize: '.6rem',
                  letterSpacing: '.06em', textTransform: 'uppercase', color: handColor,
                }}>
                  {tone.hand === 'L' ? ui.left : ui.right}
                </div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.55rem', fontWeight: 600, lineHeight: 1.1, color: 'var(--text)',
                }}>
                  {tone.spelled}
                </div>
                <div style={{
                  fontFamily: "'Space Mono', monospace", fontSize: '.6rem',
                  color: 'var(--muted2)', marginTop: '.2rem',
                }}>
                  {degreeText(tone.degree, lang)}
                </div>
              </button>
            )
          })}
        </div>

        <button type="button" onClick={() => navigate('/')} style={{ ...pillBtn, marginTop: '1.6rem' }}>
          {t?.navMain || '← Main page'}
        </button>
      </main>
    </div>
  )
}
