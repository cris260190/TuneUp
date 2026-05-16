import { useState, useRef, useCallback } from 'react'
import { PitchDetector } from 'pitchy'
import { getSharedAudioCtx, unlockSharedAudioCtx } from './useAudioContext'

const NOTE_NAMES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']

function freqToNote(freq, refHz = 440) {
  const semi = 12 * Math.log2(freq / refHz) + 57
  const idx = Math.round(semi)
  const cents = (semi - idx) * 100
  const oct = Math.floor(idx / 12)
  const name = NOTE_NAMES[((idx % 12) + 12) % 12] + oct
  return { name, cents }
}

export function usePitchDetection(refHz) {
  const [isListening, setIsListening] = useState(false)
  const [frequency, setFrequency] = useState(null)
  const [note, setNote] = useState(null)
  const [cents, setCents] = useState(0)

  const analyserRef = useRef(null)
  const micStreamRef = useRef(null)
  const loopRef = useRef(null)

  const detect = useCallback(() => {
    if (!analyserRef.current) return
    const ctx = getSharedAudioCtx()
    const bufLength = analyserRef.current.fftSize
    const buf = new Float32Array(bufLength)
    analyserRef.current.getFloatTimeDomainData(buf)
    
    const detector = PitchDetector.forFloat32Array(bufLength)
    const [pitch, clarity] = detector.findPitch(buf, ctx.sampleRate)
    
    if (clarity > 0.85 && pitch > 25 && pitch < 2500) {
      const result = freqToNote(pitch, refHz)
      setFrequency(Math.round(pitch))
      setNote(result.name)
      setCents(result.cents)
    } else {
      setFrequency(null)
      setNote(null)
      setCents(0)
    }

    loopRef.current = setTimeout(detect, 80)
  }, [refHz])

  const startListening = useCallback(async () => {
    try {
      await unlockSharedAudioCtx()
      const ctx = getSharedAudioCtx()
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const source = ctx.createMediaStreamSource(stream)
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 8192
      source.connect(analyser)

      analyserRef.current = analyser
      micStreamRef.current = stream

      setIsListening(true)
      detect()
    } catch (e) {
      alert('Microphone access denied.')
    }
  }, [detect])

  const stopListening = useCallback(() => {
    clearTimeout(loopRef.current)
    if (micStreamRef.current)
      micStreamRef.current.getTracks().forEach(t => t.stop())
    setIsListening(false)
    setFrequency(null)
    setNote(null)
    setCents(0)
  }, [])

  const toggleListening = useCallback(() => {
    isListening ? stopListening() : startListening()
  }, [isListening, startListening, stopListening])

  // returnăm ref-ul shared pentru SidePanel waveform
  const audioCtxRef = useRef(null)
  audioCtxRef.current = getSharedAudioCtx()

  return {
    isListening,
    frequency,
    note,
    cents,
    toggleListening,
    audioCtx: audioCtxRef,
    analyser: analyserRef,
  }
}