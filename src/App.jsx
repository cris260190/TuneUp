import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useParams } from 'react-router-dom'
import { CATS } from './data/instruments'
import { usePitchDetection } from './hooks/usePitchDetection'
import { useMetronome } from './hooks/useMetronome'
import { useLanguage } from './hooks/useLanguage'
import { useTheme } from './hooks/useTheme'
import Header from './components/Header'
import CategoryNav from './components/CategoryNav'
import SubNav from './components/SubNav'
import TunerPanel from './components/TunerPanel'
import SidePanel from './components/SidePanel'
import MetronomePage from './components/MetronomePage'
import PitchPipePage from './components/PitchPipePage'
import PrivacyPage from './components/PrivacyPage'
import AboutPage from './components/AboutPage'
import ContactPage from './components/ContactPage'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return isMobile
}

function TunerPage() {
  const { category = 'guitar', sub } = useParams()
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const { lang, setLang, t } = useLanguage()

  const activeCat = CATS[category] ? category : 'guitar'
  const activeSub = sub && CATS[activeCat]?.subs[sub]
    ? sub
    : Object.keys(CATS[activeCat].subs)[0]

  const [refHz, setRefHz] = useState(440)

  const { isListening, frequency, note, cents, toggleListening, analyser } =
    usePitchDetection(refHz)

  const metronome = useMetronome()

  function handleSetCat(key) {
    const firstSub = Object.keys(CATS[key].subs)[0]
    navigate(`/${key}/${firstSub}`)
  }

  function handleChangeRef(delta) {
    setRefHz(prev => Math.max(415, Math.min(466, prev + delta)))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header
        refHz={refHz}
        onChangeRef={handleChangeRef}
        lang={lang}
        setLang={setLang}
        t={t}
      />

      <CategoryNav
        cats={CATS}
        activeCat={activeCat}
        onSetCat={handleSetCat}
      />

      <SubNav
        subs={Object.keys(CATS[activeCat].subs)}
        activeSub={activeSub}
        onSetSub={(s) => navigate(`/${activeCat}/${s}`)}
      />

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 360px',
        flexGrow: 1,
      }}>
        <TunerPanel
          instrument={CATS[activeCat]}
          activeSub={activeSub}
          frequency={frequency}
          note={note}
          cents={cents}
          isListening={isListening}
          onToggleListen={toggleListening}
          onSelectRef={() => {}}
          t={t}
        />

        {!isMobile && (
          <SidePanel
            analyser={analyser}
            isListening={isListening}
            refHz={refHz}
            onChangeRef={handleChangeRef}
            note={note}
            cents={cents}
            metronome={metronome}
            t={t}
          />
        )}
      </div>

      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '1.5rem 2.5rem',
        display: 'flex', justifyContent: 'center', gap: '2rem',
        fontSize: '.6rem', letterSpacing: '.1em',
        textTransform: 'uppercase', color: 'var(--muted)',
      }}>
        <span onClick={() => navigate('/about')} style={{ cursor: 'pointer' }}>About</span>
        <span onClick={() => navigate('/contact')} style={{ cursor: 'pointer' }}>Contact</span>
        <span onClick={() => navigate('/privacy')} style={{ cursor: 'pointer' }}>Privacy</span>
      </footer>
    </div>
  )
}

export default function App() {
  useTheme()

  return (
    <Routes>
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/pitch-pipe" element={<PitchPipePage />} />
      <Route path="/metronome" element={<MetronomePage />} />
      <Route path="/:category/:sub" element={<TunerPage />} />
      <Route path="/:category" element={<TunerPage />} />
      <Route path="/" element={<TunerPage />} />
    </Routes>
  )
}