import { getSharedAudioCtx, unlockSharedAudioCtx } from '../hooks/useAudioContext'
import { noteToFreq } from '../data/windFingeringHelpers'

export { noteToFreq }

const TIMBRES = {
  flute:     { h2: 0.10, h3: 0.03, h4: 0,    attack: 0.06,  type: 'sine' },
  reed:      { h2: 0.22, h3: 0.14, h4: 0.06, attack: 0.03,  type: 'sawtooth' },
  double:    { h2: 0.28, h3: 0.18, h4: 0.08, attack: 0.025, type: 'triangle' },
  recorder:  { h2: 0.08, h3: 0.04, h4: 0,    attack: 0.04,  type: 'sine' },
  brass:     { h2: 0.42, h3: 0.14, h4: 0.05, attack: 0.045, type: 'triangle', peak: 0.32 },
  harmonica: { h2: 0.38, h3: 0.18, h4: 0.06, attack: 0.02,  type: 'sawtooth', peak: 0.16 },
}

export function playWindNote(freq, timbreKey) {
  unlockSharedAudioCtx()
  const ctx = getSharedAudioCtx()
  if (!ctx) return

  const t = TIMBRES[timbreKey] || TIMBRES.flute
  const now = ctx.currentTime
  const dur = 1.8

  const osc1 = ctx.createOscillator()
  osc1.type = t.type === 'sawtooth' ? 'sawtooth' : t.type
  osc1.frequency.setValueAtTime(freq, now)

  const osc2 = ctx.createOscillator()
  osc2.type = 'sine'
  osc2.frequency.setValueAtTime(freq * 2, now)

  const osc3 = ctx.createOscillator()
  osc3.type = 'sine'
  osc3.frequency.setValueAtTime(freq * 3, now)

  const osc4 = ctx.createOscillator()
  osc4.type = 'sine'
  osc4.frequency.setValueAtTime(freq * 4, now)

  function env(gainNode, peak) {
    gainNode.gain.setValueAtTime(0, now)
    gainNode.gain.linearRampToValueAtTime(peak, now + t.attack)
    gainNode.gain.setValueAtTime(peak, now + dur - 0.25)
    gainNode.gain.linearRampToValueAtTime(0, now + dur)
  }

  const g1 = ctx.createGain(); env(g1, t.peak ?? (t.type === 'sawtooth' ? 0.18 : 0.48))
  const g2 = ctx.createGain(); env(g2, t.h2)
  const g3 = ctx.createGain(); env(g3, t.h3)
  const g4 = ctx.createGain(); env(g4, t.h4)

  const master = ctx.createGain()
  master.gain.setValueAtTime(0.7, now)

  osc1.connect(g1); g1.connect(master)
  osc2.connect(g2); g2.connect(master)
  osc3.connect(g3); g3.connect(master)
  osc4.connect(g4); g4.connect(master)
  master.connect(ctx.destination)

  ;[osc1, osc2, osc3, osc4].forEach(o => { o.start(now); o.stop(now + dur) })
}
