import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useParams } from 'react-router-dom'
import { CATS } from './data/instruments'
import { usePitchDetection } from './hooks/usePitchDetection'
import { useMetronome } from './hooks/useMetronome'
import { useLanguage } from './hooks/useLanguage'
import { useTheme } from './hooks/useTheme'
import { useSEO } from './hooks/useSEO'
import { SEO } from './data/seoData'
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
import ChordLibraryPage from './components/ChordLibraryPage'
import ChordPage from './components/ChordPage'
import FretboardPage from './components/FretboardPage'
import TransposePage from './components/TransposePage'
import ProgressionsPage from './components/ProgressionsPage'
import BassChordLibraryPage from './components/BassChordLibraryPage'
import BassChordPage from './components/BassChordPage'
import BassFretboardPage from './components/BassFretboardPage'
import UkuleleChordLibraryPage from './components/UkuleleChordLibraryPage'
import UkuleleChordPage from './components/UkuleleChordPage'
import UkuleleFretboardPage from './components/UkuleleFretboardPage'
import CelloChordLibraryPage from './components/CelloChordLibraryPage'
import CelloChordPage from './components/CelloChordPage'
import CelloFretboardPage from './components/CelloFretboardPage'
import ViolaChordLibraryPage from './components/ViolaChordLibraryPage'
import ViolaChordPage from './components/ViolaChordPage'
import ViolaFretboardPage from './components/ViolaFretboardPage'
import MandolinChordLibraryPage from './components/MandolinChordLibraryPage'
import MandolinChordPage from './components/MandolinChordPage'
import MandolinFretboardPage from './components/MandolinFretboardPage'
import BanjoChordLibraryPage from './components/BanjoChordLibraryPage'
import BanjoChordPage from './components/BanjoChordPage'

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

  const seo = SEO[activeCat] || SEO.guitar
  useSEO({ title: seo.title, description: seo.description, url: seo.url })

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
        t={t}
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
          onViewChords={
            activeCat === 'guitar' ? () => navigate('/chords/guitar') :
            activeCat === 'bass'   ? () => navigate('/chords/bass')   :
            (activeCat === 'strings' && activeSub === 'Ukulele')   ? () => navigate('/chords/ukulele')   :
            (activeCat === 'strings' && activeSub === 'Mandolin')    ? () => navigate('/chords/mandolin')    :
            (activeCat === 'strings' && activeSub === 'Banjo 5-str') ? () => navigate('/chords/banjo')        :
            (activeCat === 'strings' && activeSub === 'Double Bass') ? () => navigate('/chords/bass')         :
            (activeCat === 'strings' && activeSub === 'Cello')       ? () => navigate('/chords/cello')        :
            (activeCat === 'strings' && activeSub === 'Viola')       ? () => navigate('/chords/viola')        : null
          }
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

      {seo.blurb && (
        <section style={{
          borderTop: '1px solid var(--border)',
          padding: '2rem 2.5rem',
          background: 'var(--s1)',
        }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.1rem', fontWeight: 600,
            color: 'var(--text)', marginBottom: '.6rem',
          }}>
            {seo.h1}
          </h2>
          <p style={{
            fontSize: '.75rem', lineHeight: 1.8,
            color: 'var(--muted2)', maxWidth: '680px',
          }}>
            {seo.blurb}
          </p>
        </section>
      )}

      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '1.5rem 2.5rem',
        display: 'flex', justifyContent: 'center', gap: '2rem',
        fontSize: '.6rem', letterSpacing: '.1em',
        textTransform: 'uppercase', color: 'var(--muted)',
      }}>
        <span onClick={() => navigate('/about')} style={{ cursor: 'pointer' }}>{t?.navAbout || 'About'}</span>
        <span onClick={() => navigate('/contact')} style={{ cursor: 'pointer' }}>{t?.navContact || 'Contact'}</span>
        <span onClick={() => navigate('/privacy')} style={{ cursor: 'pointer' }}>{t?.navPrivacy || 'Privacy'}</span>
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
      <Route path="/transpose" element={<TransposePage />} />
      <Route path="/chords/banjo/:chord" element={<BanjoChordPage />} />
      <Route path="/chords/banjo" element={<BanjoChordLibraryPage />} />
      <Route path="/chords/viola/fretboard" element={<ViolaFretboardPage />} />
      <Route path="/chords/viola/:chord" element={<ViolaChordPage />} />
      <Route path="/chords/viola" element={<ViolaChordLibraryPage />} />
      <Route path="/chords/cello/fretboard" element={<CelloFretboardPage />} />
      <Route path="/chords/cello/:chord" element={<CelloChordPage />} />
      <Route path="/chords/cello" element={<CelloChordLibraryPage />} />
      <Route path="/chords/mandolin/fretboard" element={<MandolinFretboardPage />} />
      <Route path="/chords/mandolin/:chord" element={<MandolinChordPage />} />
      <Route path="/chords/mandolin" element={<MandolinChordLibraryPage />} />
      <Route path="/chords/ukulele/fretboard" element={<UkuleleFretboardPage />} />
      <Route path="/chords/ukulele/:chord" element={<UkuleleChordPage />} />
      <Route path="/chords/ukulele" element={<UkuleleChordLibraryPage />} />
      <Route path="/chords/bass/fretboard" element={<BassFretboardPage />} />
      <Route path="/chords/bass/:chord" element={<BassChordPage />} />
      <Route path="/chords/bass" element={<BassChordLibraryPage />} />
      <Route path="/progressions" element={<ProgressionsPage />} />
      <Route path="/chords/guitar/fretboard" element={<FretboardPage />} />
      <Route path="/chords/guitar/:chord" element={<ChordPage />} />
      <Route path="/chords/guitar" element={<ChordLibraryPage />} />
      <Route path="/:category/:sub" element={<TunerPage />} />
      <Route path="/:category" element={<TunerPage />} />
      <Route path="/" element={<TunerPage />} />
    </Routes>
  )
}