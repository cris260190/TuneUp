import { useNavigate } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { useLanguage } from '../hooks/useLanguage'
import { useSEO } from '../hooks/useSEO'
import { SEO } from '../data/seoData'
import { getSharedAudioCtx, unlockSharedAudioCtx } from '../hooks/useAudioContext'
import FretboardMap from './FretboardMap'

const pillBtn = {
  background: 'transparent',
  border: '1px solid var(--border)',
  borderRadius: '999px',
  color: 'var(--text)',
  cursor: 'pointer',
  fontSize: '1rem',
  padding: '0.3rem 0.9rem',
}

const TAB_STYLE = (active) => ({
  fontFamily: "'Space Mono', monospace",
  fontSize: '.72rem', letterSpacing: '.05em',
  padding: '.3rem 1rem',
  borderRadius: '999px',
  border: active ? '1.5px solid var(--gold)' : '1px solid var(--border)',
  background: active ? 'var(--gold)' : 'transparent',
  color: active ? 'var(--bg)' : 'var(--text)',
  cursor: 'pointer',
  transition: 'all .15s',
})

export default function FretboardPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()
  useSEO(SEO.chordsGuitarFretboard)

  function playNote(freq) {
    unlockSharedAudioCtx()
    const ctx = getSharedAudioCtx()
    if (!ctx) return

    const rate   = ctx.sampleRate
    const period = Math.round(rate / freq)
    const dur    = 2.0                       // seconds of output
    const n      = Math.ceil(rate * dur)

    // Karplus-Strong plucked-string synthesis:
    // seed one period with white noise, then repeatedly average
    // adjacent samples — this naturally decays like a real string.
    const buf = new Float32Array(n)
    for (let i = 0; i < period; i++) buf[i] = Math.random() * 2 - 1
    const damping = 0.997
    for (let i = period; i < n; i++) {
      buf[i] = damping * 0.5 * (buf[i - period] + buf[i - period + 1])
    }

    const audioBuf = ctx.createBuffer(1, n, rate)
    audioBuf.getChannelData(0).set(buf)

    const src  = ctx.createBufferSource()
    src.buffer = audioBuf

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.6, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur)

    src.connect(gain)
    gain.connect(ctx.destination)
    src.start(ctx.currentTime)
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
        <button onClick={toggleTheme} style={pillBtn}>{theme === 'dark' ? '☀️' : '🌙'}</button>
      </header>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1.5rem', width: '100%' }}>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '2.2rem', fontWeight: 600,
          color: 'var(--gold)', marginBottom: '.5rem',
        }}>
          Guitar Fretboard Map
        </h1>
        <p style={{ color: 'var(--muted2)', fontSize: '.9rem', marginBottom: '1.5rem' }}>
          Every note on all 6 strings across 12 frets, color-coded by note name.
          Tap any note to hear it.
        </p>

        {/* tab strip — mirrors ChordLibraryPage */}
        <div style={{ display: 'flex', gap: '.4rem', marginBottom: '1.8rem' }}>
          <button onClick={() => navigate('/chords/guitar')} style={TAB_STYLE(false)}>
            Chords
          </button>
          <button style={TAB_STYLE(true)}>
            Fretboard Map
          </button>
        </div>

        <FretboardMap onNoteClick={playNote} />

        <div style={{ marginTop: '3rem', display: 'flex', gap: '.75rem' }}>
          <button onClick={() => navigate('/chords/guitar')} style={{ ...pillBtn, fontSize: '1rem', padding: '0.5rem 1.4rem' }}>
            {t?.chordBackToLibrary || '← All Chords'}
          </button>
          <button onClick={() => navigate('/guitar')} style={{ ...pillBtn, fontSize: '1rem', padding: '0.5rem 1.4rem' }}>
            {t?.chordBackToTuner || '← Guitar Tuner'}
          </button>
        </div>
      </main>
    </div>
  )
}
