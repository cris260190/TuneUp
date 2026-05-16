import { useState, useRef, useCallback } from 'react'
import { PitchDetector } from 'pitchy'
import { getSharedAudioCtx, unlockSharedAudioCtx } from './useAudioContext'

// ...existing code...

  const audioCtxRef = useRef(null)

  const startListening = useCallback(async () => {
    try {
      await unlockSharedAudioCtx()
      const ctx = getSharedAudioCtx()
      audioCtxRef.current = ctx

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

  // ...existing code...

  return {
    isListening,
    frequency,
    note,
    cents,
    toggleListening,
    audioCtx: audioCtxRef,
    analyser: analyserRef,
  }
