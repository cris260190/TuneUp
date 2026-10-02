import { byOctave } from './windFingeringHelpers'

// Diatonic harmonica in C, Richter tuning, holes 1–10.
// technique: null (natural), 'bend' (draw bend on 1–6), 'overblow' (holes 1–6).
// ease: 0 natural, 1 ordinary bend, 2 overblow or a deep bend, 3 rare overblow.
// Chord pages prefer the lowest ease, so a natural note wins over a bend.

const LABELS = {
  C: 'Do', 'C#': 'Do#', D: 'Re', 'D#': 'Re#', E: 'Mi', F: 'Fa', 'F#': 'Fa#',
  G: 'Sol', 'G#': 'Sol#', A: 'La', 'A#': 'La#', B: 'Si',
}
const EMPTY_KEYS = { LH1: false, LH2: false, LH3: false, LH4: false, RH1: false, RH2: false, RH3: false, RH4: false }

// name, hole, breath, technique, ease, notes
const TABLE = [
  ['C4',  1, 'blow', null,       0, null],
  ['C#4', 1, 'draw', 'bend',     1, 'Draw bend on hole 1, one semitone down from D.'],
  ['D4',  1, 'draw', null,       0, null],
  ['D#4', 1, 'blow', 'overblow', 3, 'Overblow on hole 1. Advanced — D#5 is the note most players learn first.'],
  ['E4',  2, 'blow', null,       0, null],
  ['F4',  2, 'draw', 'bend',     1, 'Draw bend on hole 2, two semitones down from G.'],
  ['F#4', 2, 'draw', 'bend',     1, 'Draw bend on hole 2, one semitone down from G.'],
  ['G4',  3, 'blow', null,       0, 'Also available as a straight draw on hole 2.'],
  ['G#4', 3, 'draw', 'bend',     2, 'Deep draw bend on hole 3, three semitones down from B. G#5 is easier.'],
  ['A4',  3, 'draw', 'bend',     1, 'Draw bend on hole 3, two semitones down from B.'],
  ['A#4', 3, 'draw', 'bend',     1, 'Draw bend on hole 3, one semitone down from B. This is the first bend most people learn.'],
  ['B4',  3, 'draw', null,       0, null],
  ['C5',  4, 'blow', null,       0, null],
  ['C#5', 4, 'draw', 'bend',     1, 'Draw bend on hole 4, one semitone down from D.'],
  ['D5',  4, 'draw', null,       0, null],
  ['D#5', 4, 'blow', 'overblow', 2, 'Overblow on hole 4 — the usual way to play this note.'],
  ['E5',  5, 'blow', null,       0, null],
  ['F5',  5, 'draw', null,       0, null],
  ['F#5', 5, 'blow', 'overblow', 2, 'Overblow on hole 5.'],
  ['G5',  6, 'blow', null,       0, null],
  ['G#5', 6, 'draw', 'bend',     1, 'Draw bend on hole 6, one semitone down from A.'],
  ['A5',  6, 'draw', null,       0, null],
  ['A#5', 6, 'blow', 'overblow', 2, 'Overblow on hole 6.'],
  ['B5',  7, 'draw', null,       0, null],
  ['C6',  7, 'blow', null,       0, null],
]

function make(row) {
  const [name, hole, breath, technique, ease, notes] = row
  const m = name.match(/^([A-G]#?)(\d)$/)
  return {
    name,
    display: name,
    label: LABELS[m[1]],
    octave: parseInt(m[2], 10),
    keys: EMPTY_KEYS,
    thumb: false,
    register: false,
    hole,
    breath,
    technique,
    ease,
    notes,
  }
}

export const HARMONICA_NOTES = TABLE.map(make)

export function getHarmonicaNotesByOctave(octave) {
  return byOctave(HARMONICA_NOTES, octave)
}

export const HARMONICA_LAYOUT = {
  blow: ['C', 'E', 'G', 'C', 'E', 'G', 'C', 'E', 'G', 'C'],
  draw: ['D', 'G', 'B', 'D', 'F', 'A', 'B', 'D', 'F', 'A'],
}
