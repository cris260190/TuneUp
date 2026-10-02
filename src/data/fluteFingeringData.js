// Flute Fingering Data
// Covers the standard concert flute range: C4 to D7 (approximately 3 octaves)
//
// Each fingering object:
//   name        - note name (e.g. "C4", "F#5")
//   display     - display name with octave (e.g. "C4")
//   label       - solmization label (e.g. "Do")
//   octave      - octave number (4, 5, 6, 7)
//   keys        - object with boolean values for each key/hole:
//                 LH1, LH2, LH3, LH4 = left hand index/middle/ring/little
//                 RH1, RH2, RH3, RH4 = right hand index/middle/ring/little
//                 true  = covered/pressed
//                 false = open/not pressed
//   thumb       - left thumb key pressed (true/false)
//   register    - "normal", "second" (second octave key / pinch), "third"
//   trill       - optional trill key (e.g. "tr1", "tr2") — null if not needed
//   notes       - optional string for special technique notes

export const FLUTE_NOTES = [

  // ─── OCTAVE 4 (low register) ─────────────────────────────
  {
    name: 'C4', display: 'C4', label: 'Do', octave: 4,
    keys: { LH1: true, LH2: true, LH3: true, LH4: true, RH1: true, RH2: true, RH3: true, RH4: true },
    thumb: false, register: 'normal', trill: null,
    notes: 'All keys covered'
  },
  {
    name: 'C#4', display: 'C#4', label: 'Do#', octave: 4,
    keys: { LH1: true, LH2: true, LH3: true, LH4: false, RH1: true, RH2: true, RH3: true, RH4: true },
    thumb: false, register: 'normal', trill: null, notes: null
  },
  {
    name: 'D4', display: 'D4', label: 'Re', octave: 4,
    keys: { LH1: true, LH2: true, LH3: true, LH4: false, RH1: true, RH2: true, RH3: true, RH4: false },
    thumb: false, register: 'normal', trill: null, notes: null
  },
  {
    name: 'D#4', display: 'D#4', label: 'Re#', octave: 4,
    keys: { LH1: true, LH2: true, LH3: true, LH4: false, RH1: true, RH2: true, RH3: false, RH4: true },
    thumb: false, register: 'normal', trill: null, notes: null
  },
  {
    name: 'E4', display: 'E4', label: 'Mi', octave: 4,
    keys: { LH1: true, LH2: true, LH3: true, LH4: false, RH1: true, RH2: true, RH3: false, RH4: false },
    thumb: false, register: 'normal', trill: null, notes: null
  },
  {
    name: 'F4', display: 'F4', label: 'Fa', octave: 4,
    keys: { LH1: true, LH2: true, LH3: true, LH4: false, RH1: true, RH2: false, RH3: false, RH4: false },
    thumb: false, register: 'normal', trill: null, notes: null
  },
  {
    name: 'F#4', display: 'F#4', label: 'Fa#', octave: 4,
    keys: { LH1: true, LH2: true, LH3: true, LH4: false, RH1: false, RH2: false, RH3: false, RH4: false },
    thumb: false, register: 'normal', trill: null, notes: null
  },
  {
    name: 'G4', display: 'G4', label: 'Sol', octave: 4,
    keys: { LH1: true, LH2: true, LH3: false, LH4: false, RH1: false, RH2: false, RH3: false, RH4: false },
    thumb: false, register: 'normal', trill: null, notes: null
  },
  {
    name: 'G#4', display: 'G#4', label: 'Sol#', octave: 4,
    keys: { LH1: true, LH2: true, LH3: false, LH4: true, RH1: false, RH2: false, RH3: false, RH4: false },
    thumb: false, register: 'normal', trill: null, notes: null
  },
  {
    name: 'A4', display: 'A4', label: 'La', octave: 4,
    keys: { LH1: true, LH2: false, LH3: false, LH4: false, RH1: false, RH2: false, RH3: false, RH4: false },
    thumb: false, register: 'normal', trill: null, notes: null
  },
  {
    name: 'A#4', display: 'A#4', label: 'La#', octave: 4,
    keys: { LH1: true, LH2: false, LH3: false, LH4: true, RH1: false, RH2: false, RH3: false, RH4: false },
    thumb: false, register: 'normal', trill: null, notes: null
  },
  {
    name: 'B4', display: 'B4', label: 'Si', octave: 4,
    keys: { LH1: false, LH2: false, LH3: false, LH4: false, RH1: false, RH2: false, RH3: false, RH4: false },
    thumb: false, register: 'normal', trill: null, notes: null
  },

  // ─── OCTAVE 5 (middle register) ──────────────────────────
  {
    name: 'C5', display: 'C5', label: 'Do', octave: 5,
    keys: { LH1: true, LH2: true, LH3: true, LH4: true, RH1: true, RH2: true, RH3: true, RH4: true },
    thumb: true, register: 'second', trill: null,
    notes: 'Thumb key (register key) pressed'
  },
  {
    name: 'C#5', display: 'C#5', label: 'Do#', octave: 5,
    keys: { LH1: true, LH2: true, LH3: true, LH4: false, RH1: true, RH2: true, RH3: true, RH4: true },
    thumb: true, register: 'second', trill: null, notes: null
  },
  {
    name: 'D5', display: 'D5', label: 'Re', octave: 5,
    keys: { LH1: true, LH2: true, LH3: true, LH4: false, RH1: true, RH2: true, RH3: true, RH4: false },
    thumb: true, register: 'second', trill: null, notes: null
  },
  {
    name: 'D#5', display: 'D#5', label: 'Re#', octave: 5,
    keys: { LH1: true, LH2: true, LH3: true, LH4: false, RH1: true, RH2: true, RH3: false, RH4: true },
    thumb: true, register: 'second', trill: null, notes: null
  },
  {
    name: 'E5', display: 'E5', label: 'Mi', octave: 5,
    keys: { LH1: true, LH2: true, LH3: true, LH4: false, RH1: true, RH2: true, RH3: false, RH4: false },
    thumb: true, register: 'second', trill: null, notes: null
  },
  {
    name: 'F5', display: 'F5', label: 'Fa', octave: 5,
    keys: { LH1: true, LH2: true, LH3: true, LH4: false, RH1: true, RH2: false, RH3: false, RH4: false },
    thumb: true, register: 'second', trill: null, notes: null
  },
  {
    name: 'F#5', display: 'F#5', label: 'Fa#', octave: 5,
    keys: { LH1: true, LH2: true, LH3: true, LH4: false, RH1: false, RH2: false, RH3: false, RH4: false },
    thumb: true, register: 'second', trill: null, notes: null
  },
  {
    name: 'G5', display: 'G5', label: 'Sol', octave: 5,
    keys: { LH1: true, LH2: true, LH3: false, LH4: false, RH1: false, RH2: false, RH3: false, RH4: false },
    thumb: true, register: 'second', trill: null, notes: null
  },
  {
    name: 'G#5', display: 'G#5', label: 'Sol#', octave: 5,
    keys: { LH1: true, LH2: true, LH3: false, LH4: true, RH1: false, RH2: false, RH3: false, RH4: false },
    thumb: true, register: 'second', trill: null, notes: null
  },
  {
    name: 'A5', display: 'A5', label: 'La', octave: 5,
    keys: { LH1: true, LH2: false, LH3: false, LH4: false, RH1: false, RH2: false, RH3: false, RH4: false },
    thumb: true, register: 'second', trill: null, notes: null
  },
  {
    name: 'A#5', display: 'A#5', label: 'La#', octave: 5,
    keys: { LH1: true, LH2: false, LH3: false, LH4: true, RH1: false, RH2: false, RH3: false, RH4: false },
    thumb: true, register: 'second', trill: null, notes: null
  },
  {
    name: 'B5', display: 'B5', label: 'Si', octave: 5,
    keys: { LH1: false, LH2: false, LH3: false, LH4: false, RH1: false, RH2: false, RH3: false, RH4: false },
    thumb: true, register: 'second', trill: null, notes: null
  },

  // ─── OCTAVE 6 (high register) ────────────────────────────
  {
    name: 'C6', display: 'C6', label: 'Do', octave: 6,
    keys: { LH1: true, LH2: true, LH3: true, LH4: true, RH1: true, RH2: true, RH3: false, RH4: false },
    thumb: true, register: 'third', trill: null,
    notes: 'Overblown — embouchure adjustment needed'
  },
  {
    name: 'C#6', display: 'C#6', label: 'Do#', octave: 6,
    keys: { LH1: true, LH2: true, LH3: false, LH4: false, RH1: true, RH2: true, RH3: false, RH4: false },
    thumb: true, register: 'third', trill: null, notes: null
  },
  {
    name: 'D6', display: 'D6', label: 'Re', octave: 6,
    keys: { LH1: true, LH2: true, LH3: false, LH4: false, RH1: true, RH2: false, RH3: false, RH4: false },
    thumb: true, register: 'third', trill: null, notes: null
  },
  {
    name: 'D#6', display: 'D#6', label: 'Re#', octave: 6,
    keys: { LH1: true, LH2: true, LH3: false, LH4: false, RH1: false, RH2: true, RH3: false, RH4: false },
    thumb: true, register: 'third', trill: null, notes: null
  },
  {
    name: 'E6', display: 'E6', label: 'Mi', octave: 6,
    keys: { LH1: true, LH2: false, LH3: true, LH4: false, RH1: false, RH2: false, RH3: false, RH4: false },
    thumb: true, register: 'third', trill: null, notes: null
  },
  {
    name: 'F6', display: 'F6', label: 'Fa', octave: 6,
    keys: { LH1: true, LH2: true, LH3: false, LH4: false, RH1: false, RH2: false, RH3: false, RH4: false },
    thumb: true, register: 'third', trill: null, notes: null
  },
  {
    name: 'F#6', display: 'F#6', label: 'Fa#', octave: 6,
    keys: { LH1: true, LH2: false, LH3: false, LH4: false, RH1: true, RH2: false, RH3: false, RH4: false },
    thumb: true, register: 'third', trill: null, notes: null
  },
  {
    name: 'G6', display: 'G6', label: 'Sol', octave: 6,
    keys: { LH1: false, LH2: true, LH3: false, LH4: false, RH1: false, RH2: false, RH3: false, RH4: false },
    thumb: true, register: 'third', trill: null, notes: null
  },
  {
    name: 'G#6', display: 'G#6', label: 'Sol#', octave: 6,
    keys: { LH1: true, LH2: false, LH3: false, LH4: true, RH1: false, RH2: false, RH3: false, RH4: false },
    thumb: true, register: 'third', trill: null,
    notes: 'Alternate fingering — may vary by instrument'
  },
  {
    name: 'A6', display: 'A6', label: 'La', octave: 6,
    keys: { LH1: true, LH2: false, LH3: false, LH4: false, RH1: false, RH2: false, RH3: true, RH4: false },
    thumb: true, register: 'third', trill: null, notes: null
  },
  {
    name: 'A#6', display: 'A#6', label: 'La#', octave: 6,
    keys: { LH1: true, LH2: true, LH3: false, LH4: false, RH1: false, RH2: false, RH3: false, RH4: true },
    thumb: true, register: 'third', trill: null, notes: null
  },
  {
    name: 'B6', display: 'B6', label: 'Si', octave: 6,
    keys: { LH1: true, LH2: false, LH3: true, LH4: false, RH1: false, RH2: false, RH3: true, RH4: false },
    thumb: true, register: 'third', trill: null, notes: null
  },

  // ─── OCTAVE 7 (altissimo — top notes) ────────────────────
  {
    name: 'C7', display: 'C7', label: 'Do', octave: 7,
    keys: { LH1: true, LH2: true, LH3: true, LH4: false, RH1: true, RH2: true, RH3: true, RH4: true },
    thumb: true, register: 'third', trill: null,
    notes: 'Altissimo — requires tight embouchure'
  },
  {
    name: 'D7', display: 'D7', label: 'Re', octave: 7,
    keys: { LH1: true, LH2: true, LH3: true, LH4: false, RH1: true, RH2: true, RH3: true, RH4: false },
    thumb: true, register: 'third', trill: null,
    notes: 'Altissimo — requires tight embouchure'
  },
]

// Helper: get fingering by note name (e.g. "C4", "F#5")
export function getFluteFingeringByNote(noteName) {
  return FLUTE_NOTES.find(n => n.name === noteName) || null
}

// Helper: get all notes for a given octave
export function getFluteNotesByOctave(octave) {
  return FLUTE_NOTES.filter(n => n.octave === octave)
}

// Helper: get all note names in order
export const FLUTE_NOTE_NAMES = FLUTE_NOTES.map(n => n.name)

// Note display order for keyboard/selector UI
export const CHROMATIC_SCALE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
