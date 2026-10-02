import { keys as k, note as n, byOctave } from './windFingeringHelpers'

// Conservatoire (French) oboe — written = concert pitch.
// thumb = first octave key. Second-octave notes are marked in notes.
// LH4 = G#/C#/Eb left pinky, RH4 = C/Eb/F right pinky / low Bb.

const low = { thumb: false }
const oct = { thumb: true }

export const OBOE_NOTES = [
  n('A#3', k(1,1,1,0, 1,1,1,1), { ...low, notes: 'Lowest Bb — both pinkies on low Bb/B keys' }),
  n('B3',  k(1,1,1,0, 1,1,1,1), { ...low, notes: 'Low B pinky' }),
  n('C4',  k(1,1,1,0, 1,1,1,0), low),
  n('C#4', k(1,1,1,0, 1,1,1,1), { ...low, notes: 'Right pinky C#' }),
  n('D4',  k(1,1,1,0, 1,1,0,0), low),
  n('D#4', k(1,1,1,0, 1,0,0,1), { ...low, notes: 'Eb key' }),
  n('E4',  k(1,1,1,0, 1,0,0,0), low),
  n('F4',  k(1,1,1,0, 0,1,0,0), { ...low, notes: 'Fork F (RH2) — standard on conservatoire oboe' }),
  n('F#4', k(1,1,0,0, 1,0,0,0), { ...low, notes: 'Left F# or 12 | 1' }),
  n('G4',  k(1,1,0,0, 0,0,0,0), low),
  n('G#4', k(1,1,0,1, 0,0,0,0), low),
  n('A4',  k(1,0,0,0, 0,0,0,0), low),
  n('A#4', k(1,0,0,0, 1,0,0,0), { ...low, notes: 'Bb — LH1 + RH1, or half-hole LH1' }),
  n('B4',  k(0,0,0,0, 0,0,0,0), { ...low, notes: 'Open B — octave key off' }),

  n('C5',  k(1,1,1,0, 1,1,1,0), { ...oct, notes: '1st octave key' }),
  n('C#5', k(1,1,1,0, 1,1,1,1), { ...oct, notes: 'Octave key + C# pinky' }),
  n('D5',  k(1,1,1,0, 1,1,0,0), oct),
  n('D#5', k(1,1,1,0, 1,0,0,1), oct),
  n('E5',  k(1,1,1,0, 1,0,0,0), oct),
  n('F5',  k(1,1,1,0, 0,1,0,0), { ...oct, notes: 'Fork F' }),
  n('F#5', k(1,1,0,0, 1,0,0,0), oct),
  n('G5',  k(1,1,0,0, 0,0,0,0), oct),
  n('G#5', k(1,1,0,1, 0,0,0,0), oct),
  n('A5',  k(1,0,0,0, 0,0,0,0), { ...oct, notes: '2nd octave key / half-hole as needed' }),
  n('A#5', k(1,0,0,0, 1,0,0,0), oct),
  n('B5',  k(0,0,0,0, 0,0,0,0), { ...oct, notes: '2nd octave key' }),

  n('C6',  k(1,0,0,0, 0,0,0,0), { ...oct, notes: 'High C — 2nd octave key, LH1 only on many instruments' }),
  n('C#6', k(1,1,0,1, 0,0,0,0), { ...oct, notes: 'High C# — voicing required' }),
  n('D6',  k(1,1,0,0, 1,0,0,0), { ...oct, notes: 'High D' }),
  n('D#6', k(1,1,0,0, 0,1,0,0), { ...oct, notes: 'High Eb' }),
  n('E6',  k(1,0,1,0, 0,0,0,0), { ...oct, notes: 'High E — alternate fingerings common' }),
  n('F6',  k(1,1,0,0, 0,0,0,0), { ...oct, notes: 'High F' }),
  n('F#6', k(1,0,0,0, 1,0,0,0), { ...oct, notes: 'Altissimo F#' }),
  n('G6',  k(0,1,0,0, 0,0,0,0), { ...oct, notes: 'Altissimo G — tight embouchure' }),
]

export function getOboeNotesByOctave(octave) {
  return byOctave(OBOE_NOTES, octave)
}
