import { useNavigate } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { useLanguage } from '../hooks/useLanguage'
import { useState } from 'react'
import { useSEO } from '../hooks/useSEO'
import { SEO } from '../data/seoData'

const pillBtn = {
  background: 'transparent',
  border: '1px solid var(--border)',
  borderRadius: '999px',
  color: 'var(--text)',
  cursor: 'pointer',
  fontSize: '1rem',
  padding: '0.3rem 0.9rem',
}

export default function ContactPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()
  const [status, setStatus] = useState('idle')
  useSEO(SEO.contact)

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    const form = e.target
    const data = new FormData(form)

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
      })
      if (res.ok) {
        setStatus('sent')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
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

      <main style={{
        maxWidth: '580px',
        margin: '4rem auto',
        padding: '0 1.5rem',
        color: 'var(--text)',
        fontFamily: "'Cormorant Garamond', serif",
        lineHeight: 1.8,
        width: '100%',
      }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 600, marginBottom: '2rem', color: 'var(--gold)' }}>
          {t?.contactTitle}
        </h1>

        {status === 'sent' ? (
          <p style={{ fontSize: '1.2rem', color: 'var(--gold)' }}>{t?.contactSent}</p>
        ) : (
          <form
            name="feedback"
            method="POST"
            data-netlify="true"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="form-name" value="feedback" />

            <textarea
              name="message"
              required
              placeholder={t?.contactPlaceholder}
              rows={6}
              style={{
                width: '100%',
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                color: 'var(--text)',
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.1rem',
                padding: '1rem',
                resize: 'vertical',
                boxSizing: 'border-box',
              }}
            />

            {status === 'error' && (
              <p style={{ color: '#e05', marginTop: '0.5rem' }}>{t?.contactError}</p>
            )}

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.2rem', alignItems: 'center' }}>
              <button
                type="submit"
                disabled={status === 'sending'}
                style={{
                  ...pillBtn,
                  padding: '0.5rem 1.6rem',
                  opacity: status === 'sending' ? 0.6 : 1,
                }}
              >
                {status === 'sending' ? '...' : t?.contactSend}
              </button>
              <button onClick={() => navigate('/')} type="button" style={{ ...pillBtn, padding: '0.5rem 1.4rem' }}>
                {t?.navBack || '← Back'}
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  )
}