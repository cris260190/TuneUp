import { keys as k, note as n, byOctave } from './windFingeringHelpers'

// Bb clarinet (Boehm), written pitch. Concert sounds a whole tone lower.
// Keys: LH1–3 tone holes, LH4 = left pinky (G#/C#), RH1–3 tone holes, RH4 = right pinky (E/F/Eb).
// thumb = thumb hole, register = register (speaker) key.

export const CLARINET_NOTES = [
  // ─── Octave 3 — chalumeau ───
  n('E3',  k(1,1,1,0, 1,1,1,1), { notes: 'Lowest written E — right pinky E/B key' }),
  n('F3',  k(1,1,1,0, 1,1,1,1), { notes: 'Right pinky F/C key' }),
  n('F#3', k(1,1,1,0, 1,1,1,1), { notes: 'Right pinky F#/C# key' }),
  n('G3',  k(1,1,1,0, 1,1,1,0)),
  n('G#3', k(1,1,1,1, 1,1,1,0), { notes: 'Left pinky G#/C#/Ab' }),
  n('A3',  k(1,1,1,0, 1,1,0,0)),
  n('A#3', k(1,1,1,0, 1,0,0,0), { notes: 'Written Bb' }),
  n('B3',  k(1,1,1,0, 0,0,0,0)),

  // ─── Octave 4 ───
  n('C4',  k(1,1,0,0, 0,0,0,0)),
  n('C#4', k(1,0,0,0, 0,0,0,0)),
  n('D4',  k(0,0,0,0, 0,0,0,0), { notes: 'Thumb hole only' }),
  n('D#4', k(0,0,0,0, 0,0,0,1), { notes: 'Thumb + right sliver / Eb key' }),
  n('E4',  k(1,0,0,0, 0,0,0,0), { thumb: false, notes: 'Throat E — cover LH1 only, no thumb; tune carefully' }),
  n('F4',  k(0,0,0,0, 0,0,0,0), { thumb: false, notes: 'Throat F — A key (LH first-finger side key)' }),
  n('F#4', k(0,0,0,1, 0,0,0,0), { thumb: false, notes: 'Throat F# — G# key' }),
  n('G4',  k(0,0,0,0, 0,0,0,0), { thumb: false, notes: 'Throat G — all open' }),
  n('G#4', k(0,0,0,1, 0,0,0,0), { thumb: false, notes: 'Throat G#' }),
  n('A4',  k(0,0,0,0, 0,0,0,0), { thumb: false, notes: 'Throat A — A key' }),
  n('A#4', k(0,0,0,0, 0,0,0,0), { thumb: false, notes: 'Throat Bb — A key + register, or side Bb' }),
  n('B4',  k(1,1,1,0, 1,1,1,1), { register: true, notes: 'Clarion B = low E + register key (12th)' }),

  // ─── Octave 5 — clarion ───
  n('C5',  k(1,1,1,0, 1,1,1,1), { register: true, notes: 'Low F + register' }),
  n('C#5', k(1,1,1,0, 1,1,1,1), { register: true, notes: 'Low F# + register' }),
  n('D5',  k(1,1,1,0, 1,1,1,0), { register: true }),
  n('D#5', k(1,1,1,1, 1,1,1,0), { register: true }),
  n('E5',  k(1,1,1,0, 1,1,0,0), { register: true }),
  n('F5',  k(1,1,1,0, 1,0,0,0), { register: true }),
  n('F#5', k(1,1,1,0, 0,0,0,0), { register: true }),
  n('G5',  k(1,1,0,0, 0,0,0,0), { register: true }),
  n('G#5', k(1,0,0,0, 0,0,0,0), { register: true }),
  n('A5',  k(0,0,0,0, 0,0,0,0), { register: true, notes: 'Thumb hole + register' }),
  n('A#5', k(0,0,0,0, 0,0,0,1), { register: true }),
  n('B5',  k(1,0,0,0, 0,0,0,0), { thumb: false, register: true, notes: 'High B — LH1, no thumb hole' }),

  // ─── Octave 6 — high clarion / altissimo ───
  n('C6',  k(0,0,0,0, 0,0,0,0), { thumb: false, register: true, notes: 'High C — A key + register' }),
  n('C#6', k(0,0,0,1, 0,0,0,0), { thumb: false, register: true, notes: 'Altissimo — G# + register' }),
  n('D6',  k(1,1,0,0, 1,0,0,0), { register: true, notes: 'Altissimo D — embouchure and voicing' }),
  n('D#6', k(1,1,1,0, 1,1,0,0), { register: true, notes: 'Altissimo — may vary by instrument' }),
  n('E6',  k(1,0,1,0, 0,1,0,0), { register: true, notes: 'Altissimo' }),
  n('F6',  k(1,1,0,0, 0,0,0,0), { register: true, notes: 'Altissimo' }),
  n('G6',  k(0,1,0,0, 0,0,0,0), { register: true, notes: 'Altissimo — tight embouchure' }),
  n('A6',  k(1,0,0,0, 0,0,1,0), { register: true, notes: 'Altissimo' }),
]

export function getClarinetNotesByOctave(octave) {
  return byOctave(CLARINET_NOTES, octave)
}
