import { getSharedAudioCtx, unlockSharedAudioCtx } from '../hooks/useAudioContext'

export function playPianoMidi(midis) {
  unlockSharedAudioCtx()
  const ctx = getSharedAudioCtx()
  if (!ctx) return

  const list = (Array.isArray(midis) ? midis : [midis]).filter(n => Number.isFinite(n))
  if (!list.length) return

  const now = ctx.currentTime
  const master = ctx.createGain()
  master.gain.setValueAtTime(Math.min(0.9, 1.15 / Math.sqrt(list.length)), now)
  master.connect(ctx.destination)

  for (const midi of list) {
    const freq = 440 * Math.pow(2, (midi - 69) / 12)
    const fundamental = ctx.createOscillator()
    fundamental.type = 'triangle'
    fundamental.frequency.setValueAtTime(freq, now)

    const octave = ctx.createOscillator()
    octave.type = 'sine'
    octave.frequency.setValueAtTime(freq * 2, now)

    const g1 = ctx.createGain()
    const g2 = ctx.createGain()
    g1.gain.setValueAtTime(0.0001, now)
    g1.gain.exponentialRampToValueAtTime(0.3, now + 0.012)
    g1.gain.exponentialRampToValueAtTime(0.0001, now + 1.45)
    g2.gain.setValueAtTime(0.0001, now)
    g2.gain.exponentialRampToValueAtTime(0.08, now + 0.01)
    g2.gain.exponentialRampToValueAtTime(0.0001, now + 1.05)

    fundamental.connect(g1); g1.connect(master)
    octave.connect(g2); g2.connect(master)
    fundamental.start(now); octave.start(now)
    fundamental.stop(now + 1.5); octave.stop(now + 1.5)
  }
}
