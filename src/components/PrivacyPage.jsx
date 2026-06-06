import { useNavigate } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { useLanguage } from '../hooks/useLanguage'

export default function PrivacyPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()

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
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.8rem', fontWeight: 600,
          }}>
            Tune<em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Up</em>
          </div>
        </div>
        <button onClick={toggleTheme} style={pillBtn}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </header>

      <div style={{
        maxWidth: '800px', margin: '0 auto',
        padding: '3rem 2rem', color: 'var(--text)',
      }}>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '3rem', fontWeight: 600,
          marginBottom: '2rem', color: 'var(--gold)',
        }}>
          {t?.privacyTitle}
        </h1>

        <p style={{ color: 'var(--muted2)', fontSize: '.8rem', marginBottom: '2rem' }}>
          {t?.privacyDate}
        </p>

        {[
          {
            title: t?.privacyMicTitle,
            text: t?.privacyMicText,
          },
          {
            title: 'Cookies & Local Storage',
            text: 'We use local storage to save your preferences such as language, theme, and reference pitch. This data stays on your device and is never transmitted to our servers.',
          },
          {
            title: 'Analytics',
            text: 'We use Google Analytics to understand how visitors use our site. This collects anonymous usage data. No personally identifiable information is collected.',
          },
          {
            title: 'Advertising',
            text: "We use Google AdSense to display advertisements. Google may use cookies to show relevant ads based on your browsing history. You can opt out via Google's Ad Settings at adssettings.google.com.",
          },
          {
            title: 'Third Party Services',
            text: 'Our site uses Google Analytics and Google AdSense. These services have their own privacy policies which we encourage you to review.',
          },
          {
            title: 'Contact',
            text: 'If you have any questions about this Privacy Policy, please use the feedback page or email us at hello@freetuner.app',
          },
        ].map((section, i) => (
          <div key={i} style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.5rem', fontWeight: 600,
              color: 'var(--text)', marginBottom: '.75rem',
            }}>{section.title}</h2>
            <p style={{
              fontSize: '.85rem', lineHeight: 1.8,
              color: 'var(--muted2)',
            }}>{section.text}</p>
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
        <span onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Tuner</span>
        <span onClick={() => navigate('/metronome')} style={{ cursor: 'pointer' }}>Metronome</span>
        <span onClick={() => navigate('/pitch-pipe')} style={{ cursor: 'pointer' }}>Pitch Pipe</span>
        <span onClick={() => navigate('/about')} style={{ cursor: 'pointer' }}>About</span>
        <span onClick={() => navigate('/contact')} style={{ cursor: 'pointer' }}>Contact</span>
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