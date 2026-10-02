import { byOctave } from './windFingeringHelpers'

// Valve and slide charts are built from the harmonic series.
// Each open partial is the tempered note nearest fundamental * n.
// Valves (or the slide) only lower that partial, by 0–6 semitones:
//   0 open, 2 = −1, 1 = −2, 1+2 = −3, 2+3 = −4, 1+3 = −5, 1+2+3 = −6.
// Partials 7, 11, 13 and 14 are left out — they sit too far from equal temperament
// to be the primary fingering. A note that needs 1+3 is flagged, because that
// combination runs sharp.

const PC = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const LABELS = {
  C: 'Do', 'C#': 'Do#', D: 'Re', 'D#': 'Re#', E: 'Mi', F: 'Fa', 'F#': 'Fa#',
  G: 'Sol', 'G#': 'Sol#', A: 'La', 'A#': 'La#', B: 'Si',
}
const EMPTY_KEYS = { LH1: false, LH2: false, LH3: false, LH4: false, RH1: false, RH2: false, RH3: false, RH4: false }
const VALVES_FOR_DELTA = {
  0: [],
  1: [2],
  2: [1],
  3: [1, 2],
  4: [2, 3],
  5: [1, 3],
  6: [1, 2, 3],
}

function partialMidi(fundamental, n) {
  return Math.round(fundamental + 12 * Math.log2(n))
}

function scoreChoice(choice) {
  const sharp = choice.valves.includes(1) && choice.valves.includes(3) ? 1 : 0
  return choice.valves.length * 10 + sharp * 8 + choice.delta
}

function buildBrass({ fundamental, partials, minMidi, maxMidi, sharpNote, slide = false, annotate }) {
  const opens = partials.map(n => ({ n, midi: partialMidi(fundamental, n) }))
  const notes = []

  for (let midi = minMidi; midi <= maxMidi; midi++) {
    const options = []
    for (const open of opens) {
      const delta = open.midi - midi
      if (delta < 0 || delta > 6) continue
      options.push({ delta, valves: VALVES_FOR_DELTA[delta], partial: open.n })
    }
    if (!options.length) continue
    options.sort((a, b) => scoreChoice(a) - scoreChoice(b))
    const best = options[0]
    const pc = ((midi % 12) + 12) % 12
    const octave = Math.floor(midi / 12) - 1
    const name = PC[pc] + octave
    const position = best.delta + 1
    const sharp = best.valves.includes(1) && best.valves.includes(3)
    let text = sharp && sharpNote ? sharpNote : null
    if (annotate) text = annotate(midi, best, text)
    notes.push({
      name,
      display: name,
      label: LABELS[PC[pc]],
      octave,
      keys: EMPTY_KEYS,
      thumb: false,
      register: false,
      valves: best.valves,
      position: slide ? position : null,
      notes: text,
      ease: 0,
    })
  }
  return notes
}

const TRUMPET_SHARP = 'Valves 1 and 3 together run sharp. Lip the note down a little.'
const TUBA_SHARP = 'Valves 1 and 3 together run sharp. Lip down, or play it with the 4th valve if you have one.'

export const TRUMPET_NOTES = buildBrass({
  // Written pitch. Open low C (C4) is the 2nd partial, so the written fundamental is C3.
  fundamental: 48,
  partials: [2, 3, 4, 5, 6, 8],
  minMidi: 54, // F#3
  maxMidi: 84, // C6
  sharpNote: TRUMPET_SHARP,
})

export const HORN_NOTES = buildBrass({
  // Written pitch, F horn. Open written C4 is the 4th partial, fundamental written C2.
  fundamental: 36,
  partials: [3, 4, 5, 6, 8, 9, 10, 12, 16],
  minMidi: 52, // E3
  maxMidi: 84, // C6
  sharpNote: TRUMPET_SHARP,
})

export const TROMBONE_NOTES = buildBrass({
  // Concert pitch. Tenor trombone, 2nd partial Bb2, fundamental Bb1.
  fundamental: 34,
  partials: [2, 3, 4, 5, 6, 8, 9, 10, 12],
  minMidi: 40, // E2
  maxMidi: 77, // F5
  slide: true,
  annotate(midi, choice, text) {
    const position = choice.delta + 1
    const bits = []
    if (text) bits.push(text)
    if (position >= 6) {
      bits.push(`Position ${position} — slide well out. Extend the arm and keep the shoulder loose.`)
    }
    const pc = ((midi % 12) + 12) % 12
    if (pc === 8 && position === 3) {
      bits.push('In-tune A♭. The same note in 1st position is the 7th partial and sits flat.')
    }
    return bits.join(' ') || null
  },
})

export const TUBA_NOTES = buildBrass({
  // Concert pitch. BBb tuba, 2nd partial Bb1, fundamental Bb0.
  fundamental: 22,
  partials: [2, 3, 4, 5, 6, 8, 9, 10, 12],
  minMidi: 28, // E1
  maxMidi: 65, // F4
  sharpNote: TUBA_SHARP,
})

export const getTrumpetNotesByOctave = (octave) => byOctave(TRUMPET_NOTES, octave)
export const getHornNotesByOctave = (octave) => byOctave(HORN_NOTES, octave)
export const getTromboneNotesByOctave = (octave) => byOctave(TROMBONE_NOTES, octave)
export const getTubaNotesByOctave = (octave) => byOctave(TUBA_NOTES, octave)
