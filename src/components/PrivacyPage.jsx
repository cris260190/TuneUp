import { useNavigate } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { useLanguage } from '../hooks/useLanguage'
import { PRIVACY_SECTIONS } from '../data/privacyContent'
import { useSEO } from '../hooks/useSEO'
import { SEO } from '../data/seoData'

export default function PrivacyPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const { t, lang } = useLanguage()
  useSEO(SEO.privacy)

  const sections = PRIVACY_SECTIONS[lang] || PRIVACY_SECTIONS.en

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
        <button onClick={toggleTheme} style={pillBtn}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </header>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 2rem', color: 'var(--text)', width: '100%' }}>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '3rem', fontWeight: 600,
          marginBottom: '0.5rem', color: 'var(--gold)',
        }}>
          {t?.privacyTitle}
        </h1>

        <p style={{ color: 'var(--muted2)', fontSize: '.8rem', marginBottom: '3rem' }}>
          {t?.privacyDate}
        </p>

        {sections.map((section, i) => (
          <div key={i} style={{ marginBottom: '2.5rem' }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.4rem', fontWeight: 600,
              color: 'var(--text)', marginBottom: '1rem',
              borderBottom: '1px solid var(--border)', paddingBottom: '.5rem',
            }}>
              {section.title}
            </h2>

            {section.blocks.map((block, j) => {
              if (block.type === 'p') {
                return (
                  <p key={j} style={{ fontSize: '.9rem', lineHeight: 1.8, color: 'var(--muted2)', marginBottom: '.75rem' }}>
                    {block.text}
                  </p>
                )
              }
              if (block.type === 'list') {
                return (
                  <ul key={j} style={{ marginBottom: '.75rem', paddingLeft: '1.5rem' }}>
                    {block.items.map((item, k) => (
                      <li key={k} style={{ fontSize: '.9rem', lineHeight: 1.8, color: 'var(--muted2)', marginBottom: '.35rem' }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )
              }
              if (block.type === 'sub') {
                return (
                  <div key={j} style={{ marginBottom: '1rem' }}>
                    <h3 style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '.6rem', letterSpacing: '.15em',
                      textTransform: 'uppercase', color: 'var(--gold)',
                      marginBottom: '.4rem',
                    }}>
                      {block.subtitle}
                    </h3>
                    <p style={{ fontSize: '.9rem', lineHeight: 1.8, color: 'var(--muted2)' }}>
                      {block.text}
                    </p>
                  </div>
                )
              }
              return null
            })}
          </div>
        ))}
      </div>

      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '1.5rem 2.5rem',
        display: 'flex', justifyContent: 'center', gap: '2rem',
        fontSize: '.6rem', letterSpacing: '.1em',
        textTransform: 'uppercase', color: 'var(--muted)',
        marginTop: 'auto',
      }}>
        <span onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>TuneUp</span>
        <span onClick={() => navigate('/metronome')} style={{ cursor: 'pointer' }}>{t?.metronome || 'Metronome'}</span>
        <span onClick={() => navigate('/pitch-pipe')} style={{ cursor: 'pointer' }}>{t?.pitchPipe || 'Pitch Pipe'}</span>
        <span onClick={() => navigate('/about')} style={{ cursor: 'pointer' }}>{t?.navAbout || 'About'}</span>
        <span onClick={() => navigate('/contact')} style={{ cursor: 'pointer' }}>{t?.navContact || 'Contact'}</span>
      </footer>
    </div>
  )
}

const pillBtn = {
  padding: '.4rem .9rem',
  border: '1px solid var(--border)',
  borderRadius: '20px', fontSize: '.6rem',
  letterSpacing: '.1em', textTransform: 'uppercase',
  color: 'var(--muted2)', background: 'var(--s1)',
  cursor: 'pointer',
}
