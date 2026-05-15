import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useParams } from 'react-router-dom'
import { CATS } from './data/instruments'
import { usePitchDetection } from './hooks/usePitchDetection'
import { useMetronome } from './hooks/useMetronome'
import Header from './components/Header'
import CategoryNav from './components/CategoryNav'
import SubNav from './components/SubNav'
import TunerPanel from './components/TunerPanel'
import SidePanel from './components/SidePanel'
import MetronomePage from './components/MetronomePage'

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

  const activeCat = CATS[category] ? category : 'guitar'
  const activeSub = sub && CATS[activeCat]?.subs[sub]
    ? sub
    : Object.keys(CATS[activeCat].subs)[0]

  const [refHz, setRefHz] = useState(440)

  const { isListening, frequency, note, cents, toggleListening, analyser, audioCtx } =
    usePitchDetection(refHz)

  const metronome = useMetronome(audioCtx)

  function handleSetCat(key) {
    const firstSub = Object.keys(CATS[key].subs)[0]
    navigate(`/${key}/${firstSub}`)
  }

  function handleChangeRef(delta) {
    setRefHz(prev => Math.max(415, Math.min(466, prev + delta)))
  }

  return (
    <div>
      <Header refHz={refHz} onChangeRef={handleChangeRef} />

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
        minHeight: 'calc(100vh - 160px)'
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
          />
        )}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/metronome" element={<MetronomePage />} />
      <Route path="/:category/:sub" element={<TunerPage />} />
      <Route path="/:category" element={<TunerPage />} />
      <Route path="/" element={<TunerPage />} />
    </Routes>
  )
}