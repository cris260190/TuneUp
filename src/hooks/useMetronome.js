import { useState, useRef, useCallback } from 'react'

export function useMetronome(audioCtxRef) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [bpm, setBpm] = useState(120)
  const [signature, setSignature] = useState(4)
  const [currentBeat, setCurrentBeat] = useState(-1)

  const nextNoteRef = useRef(0)
  const beatRef = useRef(0)
  const workerRef = useRef(null)

  const scheduleClick = useCallback((beat, time) => {
    const ctx = audioCtxRef.current
    if (!ctx) return
    const osc = ctx.createOscillator()
    const env = ctx.createGain()
    osc.connect(env)
    env.connect(ctx.destination)
    osc.frequency.value = beat === 0 ? 1000 : 800
    osc.type = 'sine'
    env.gain.setValueAtTime(beat === 0 ? 0.4 : 0.2, time)
    env.gain.exponentialRampToValueAtTime(0.001, time + 0.05)
    osc.start(time)
    osc.stop(time + 0.06)
  }, [audioCtxRef])

  const schedule = useCallback((bpmVal, sig) => {
    const ctx = audioCtxRef.current
    if (!ctx) return
    while (nextNoteRef.current < ctx.currentTime + 0.1) {
      const beat = beatRef.current
      scheduleClick(beat, nextNoteRef.current)
      const delay = Math.max(0, (nextNoteRef.current - ctx.currentTime) * 1000)
      const beatCopy = beat
      setTimeout(() => setCurrentBeat(beatCopy), delay)
      beatRef.current = (beat + 1) % sig
      nextNoteRef.current += 60.0 / bpmVal
    }
  }, [audioCtxRef, scheduleClick])

  const start = useCallback((bpmVal, sig) => {
    let ctx = audioCtxRef.current
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)()
      audioCtxRef.current = ctx
    }

    const silentBuffer = ctx.createBuffer(1, 1, 22050)
    const source = ctx.createBufferSource()
    source.buffer = silentBuffer
    source.connect(ctx.destination)
    source.start(0)

    ctx.resume().then(() => {
      beatRef.current = 0
      nextNoteRef.current = ctx.currentTime + 0.05
      setIsPlaying(true)
      workerRef.current = setInterval(() => schedule(bpmVal, sig), 25)
    })
  }, [audioCtxRef, schedule])

  const stop = useCallback(() => {
    clearInterval(workerRef.current)
    setIsPlaying(false)
    setCurrentBeat(-1)
    beatRef.current = 0
  }, [])

  const toggle = useCallback(() => {
    isPlaying ? stop() : start(bpm, signature)
  }, [isPlaying, stop, start, bpm, signature])

  const updateBpm = useCallback((val) => {
    setBpm(val)
    if (isPlaying) { stop(); start(val, signature) }
  }, [isPlaying, stop, start, signature])

  const updateSignature = useCallback((val) => {
    setSignature(val)
    beatRef.current = 0
    if (isPlaying) { stop(); start(bpm, val) }
  }, [isPlaying, stop, start, bpm])

  return { isPlaying, bpm, signature, currentBeat, toggle, updateBpm, updateSignature }
}