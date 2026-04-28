import { useState, useRef, useCallback } from 'react'

const NOTE_NAMES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']

function autoCorrelate(buf, sampleRate) {
  let SIZE = buf.length, rms = 0
  for (let i = 0; i < SIZE; i++) rms += buf[i] * buf[i]
  rms = Math.sqrt(rms / SIZE)
  if (rms < 0.008) return -1

  let r1 = 0, r2 = SIZE - 1, thres = 0.2
  for (let i = 0; i < SIZE / 2; i++) if (Math.abs(buf[i]) < thres) { r1 = i; break }
  for (let i = 1; i < SIZE / 2; i++) if (Math.abs(buf[SIZE - i]) < thres) { r2 = SIZE - i; break }

  buf = buf.slice(r1, r2)
  SIZE = buf.length

  let c = new Float32Array(SIZE).fill(0)
  for (let i = 0; i < SIZE; i++)
    for (let j = 0; j < SIZE - i; j++)
      c[i] += buf[j] * buf[j + i]

  let d = 0
  while (c[d] > c[d + 1]) d++
  let maxval = -1, maxpos = -1
  for (let i = d; i < SIZE; i++) if (c[i] > maxval) { maxval = c[i]; maxpos = i }

  let T0 = maxpos
  const x1 = c[T0 - 1], x2 = c[T0], x3 = c[T0 + 1]
  const a = (x1 + x3 - 2 * x2) / 2, b = (x3 - x1) / 2
  if (a) T0 = T0 - b / (2 * a)

  return sampleRate / T0
}

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

  const audioCtxRef = useRef(null)
  const analyserRef = useRef(null)
  const micStreamRef = useRef(null)
  const loopRef = useRef(null)

  const detect = useCallback(() => {
    if (!analyserRef.current) return
    const buf = new Float32Array(analyserRef.current.fftSize)
    analyserRef.current.getFloatTimeDomainData(buf)
    const freq = autoCorrelate(buf, audioCtxRef.current.sampleRate)

    if (freq > 25 && freq < 2500) {
      const result = freqToNote(freq, refHz)
      setFrequency(Math.round(freq))
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
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const source = ctx.createMediaStreamSource(stream)
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 8192
      source.connect(analyser)

      audioCtxRef.current = ctx
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