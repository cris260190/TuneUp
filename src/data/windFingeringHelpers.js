const NOTE_SEMITONES = { C: 0, 'C#': 1, D: 2, 'D#': 3, E: 4, F: 5, 'F#': 6, G: 7, 'G#': 8, A: 9, 'A#': 10, B: 11 }

export function noteToMidi(name) {
  const m = String(name).match(/^([A-G]#?)(\d)$/)
  if (!m || NOTE_SEMITONES[m[1]] == null) return 0
  return NOTE_SEMITONES[m[1]] + (parseInt(m[2], 10) + 1) * 12
}

export function noteToFreq(name) {
  return 440 * Math.pow(2, (noteToMidi(name) - 69) / 12)
}

const LABELS = {
  C: 'Do', 'C#': 'Do#', D: 'Re', 'D#': 'Re#', E: 'Mi', F: 'Fa', 'F#': 'Fa#',
  G: 'Sol', 'G#': 'Sol#', A: 'La', 'A#': 'La#', B: 'Si',
}

export function keys(lh1, lh2, lh3, lh4, rh1, rh2, rh3, rh4) {
  return {
    LH1: !!lh1, LH2: !!lh2, LH3: !!lh3, LH4: !!lh4,
    RH1: !!rh1, RH2: !!rh2, RH3: !!rh3, RH4: !!rh4,
  }
}

export function note(name, keySet, { thumb = true, register = false, notes = null } = {}) {
  const m = name.match(/^([A-G]#?)(\d)$/)
  return {
    name,
    display: name,
    label: m ? LABELS[m[1]] : '',
    octave: m ? parseInt(m[2], 10) : 4,
    keys: keySet,
    thumb,
    register,
    notes,
  }
}

export function byOctave(notes, octave) {
  return notes.filter(n => n.octave === octave)
}
