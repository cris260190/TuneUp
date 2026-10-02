import { keys as k, note as n, byOctave } from './windFingeringHelpers'

// Alto saxophone, written pitch. Concert sounds a major 6th lower.
// thumb = octave key. LH4 = G# / low C# / B, RH4 = low Eb / C / Bb.
// Same fingerings apply to tenor/bari; they read the same written notes.

export const SAXOPHONE_NOTES = [
  n('A#3', k(1,1,1,1, 1,1,1,1), { thumb: false, notes: 'Low Bb — all keys + both pinkies (Bb cluster)' }),
  n('B3',  k(1,1,1,1, 1,1,1,0), { thumb: false, notes: 'Low B pinky' }),
  n('C4',  k(1,1,1,0, 1,1,1,1), { thumb: false, notes: 'Low C — right pinky C key' }),
  n('C#4', k(1,1,1,1, 1,1,1,0), { thumb: false, notes: 'Low C# — left pinky' }),
  n('D4',  k(1,1,1,0, 1,1,1,0), { thumb: false }),
  n('D#4', k(1,1,1,0, 1,1,0,1), { thumb: false, notes: 'Eb key (right pinky)' }),
  n('E4',  k(1,1,1,0, 1,1,0,0), { thumb: false }),
  n('F4',  k(1,1,1,0, 1,0,0,0), { thumb: false }),
  n('F#4', k(1,1,1,0, 0,1,0,0), { thumb: false, notes: 'F# — RH2, or all RH open' }),
  n('G4',  k(1,1,0,0, 0,0,0,0), { thumb: false }),
  n('G#4', k(1,1,0,1, 0,0,0,0), { thumb: false }),
  n('A4',  k(1,0,0,0, 0,0,0,0), { thumb: false }),
  n('A#4', k(1,0,0,0, 1,0,0,0), { thumb: false, notes: 'Bb — bis key (LH1) or LH1 + RH1' }),
  n('B4',  k(0,0,0,0, 0,0,0,0), { thumb: false, notes: 'Middle B — left hand open' }),
  n('C5',  k(0,1,0,0, 0,0,0,0), { thumb: false, notes: 'Middle C — LH2 only, or side C' }),

  // Octave key on — same as D4–C5 an octave higher
  n('C#5', k(1,1,1,1, 1,1,1,0), { notes: 'Octave key + low C# fingering' }),
  n('D5',  k(1,1,1,0, 1,1,1,0)),
  n('D#5', k(1,1,1,0, 1,1,0,1)),
  n('E5',  k(1,1,1,0, 1,1,0,0)),
  n('F5',  k(1,1,1,0, 1,0,0,0)),
  n('F#5', k(1,1,1,0, 0,1,0,0)),
  n('G5',  k(1,1,0,0, 0,0,0,0)),
  n('G#5', k(1,1,0,1, 0,0,0,0)),
  n('A5',  k(1,0,0,0, 0,0,0,0)),
  n('A#5', k(1,0,0,0, 1,0,0,0), { notes: 'High Bb — bis or 1+1' }),
  n('B5',  k(0,0,0,0, 0,0,0,0)),
  n('C6',  k(0,1,0,0, 0,0,0,0), { notes: 'High C — LH2 or front F / side C' }),

  n('C#6', k(0,0,0,1, 0,0,0,0), { notes: 'Palm / high C# — palm keys; diagram is simplified' }),
  n('D6',  k(0,0,0,0, 0,0,0,0), { notes: 'Palm D — left-hand palm keys' }),
  n('D#6', k(0,0,0,1, 0,0,0,0), { notes: 'Palm Eb' }),
  n('E6',  k(1,0,0,0, 0,0,0,0), { notes: 'Palm E' }),
  n('F6',  k(1,0,0,1, 0,0,0,0), { notes: 'Palm F — top written F on most altos' }),
]

export function getSaxophoneNotesByOctave(octave) {
  return byOctave(SAXOPHONE_NOTES, octave)
}
