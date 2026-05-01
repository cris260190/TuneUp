import { useState,useEffect } from 'react'
import { CATS } from './data/instruments'
import { usePitchDetection } from './hooks/usePitchDetection'
import { useMetronome } from './hooks/useMetronome'
import Header from './components/Header'
import CategoryNav from './components/CategoryNav'
import SubNav from './components/SubNav'
import TunerPanel from './components/TunerPanel'
import SidePanel from './components/SidePanel'
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return isMobile
}
export default function App() {
  const isMobile = useIsMobile()
  const [activeCat, setActiveCat] = useState('guitar')
  const [activeSub, setActiveSub] = useState('Standard')
  const [refHz, setRefHz] = useState(440)

  const { isListening, frequency, note, cents, toggleListening, analyser, audioCtx } =
    usePitchDetection(refHz)

  const metronome = useMetronome(audioCtx)

  function handleSetCat(key) {
    setActiveCat(key)
    setActiveSub(Object.keys(CATS[key].subs)[0])
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
        onSetSub={setActiveSub}
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

        <SidePanel
          analyser={analyser}
          isListening={isListening}
          refHz={refHz}
          onChangeRef={handleChangeRef}
          note={note}
          cents={cents}
          metronome={metronome}
        />
      </div>
    </div>
  )
}