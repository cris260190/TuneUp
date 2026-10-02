import { keys as k, note as n, byOctave } from './windFingeringHelpers'

// Soprano (descant) recorder, Baroque/English fingering. Written = concert.
// 7 front holes: LH1–3, RH1–4 (LH4 unused). thumb = back hole.
// register = thumb pinched (half-hole) for the upper register.

export const RECORDER_NOTES = [
  n('C5',  k(1,1,1,0, 1,1,1,1), { notes: 'All holes covered' }),
  n('C#5', k(1,1,1,0, 1,1,1,0), { notes: 'RH4 half-hole on many instruments' }),
  n('D5',  k(1,1,1,0, 1,1,1,0)),
  n('D#5', k(1,1,1,0, 1,1,0,1), { notes: 'RH3 half-hole / fork' }),
  n('E5',  k(1,1,1,0, 1,1,0,0)),
  n('F5',  k(1,1,1,0, 1,0,1,1), { notes: 'Baroque fork F — RH2 open, RH3+4 covered. German fingering uses RH2 covered instead.' }),
  n('F#5', k(1,1,1,0, 0,1,1,0), { notes: 'Fork F#' }),
  n('G5',  k(1,1,1,0, 0,0,0,0)),
  n('G#5', k(1,1,0,0, 1,1,0,1), { notes: 'Fork G#' }),
  n('A5',  k(1,1,0,0, 0,0,0,0)),
  n('A#5', k(1,0,1,0, 0,0,0,0), { notes: 'Bb — LH2 fork, or LH1 + RH1' }),
  n('B5',  k(1,0,0,0, 0,0,0,0)),

  n('C6',  k(0,1,0,0, 0,0,0,0), { thumb: false, notes: 'Thumb open, LH2 only' }),
  n('C#6', k(0,0,1,0, 1,0,0,0), { register: true, notes: 'Pinched thumb (half-hole)' }),
  n('D6',  k(1,1,1,0, 1,1,1,0), { register: true, notes: 'Pinched thumb + D fingering' }),
  n('D#6', k(1,1,1,0, 1,1,0,1), { register: true }),
  n('E6',  k(1,1,1,0, 1,1,0,0), { register: true }),
  n('F6',  k(1,1,1,0, 1,0,0,0), { register: true, notes: 'Upper F — not the low fork F' }),
  n('F#6', k(1,1,1,0, 0,0,0,0), { register: true }),
  n('G6',  k(1,1,0,0, 0,0,0,0), { register: true }),
  n('G#6', k(1,0,0,0, 1,0,0,0), { register: true, notes: 'Alternate fingerings common' }),
  n('A6',  k(1,0,0,0, 0,0,0,0), { register: true }),
  n('A#6', k(1,0,1,0, 0,0,1,0), { register: true }),
  n('B6',  k(1,0,1,0, 0,1,0,0), { register: true }),
  n('C7',  k(0,1,1,0, 1,0,0,0), { register: true, notes: 'High C' }),
  n('D7',  k(0,1,0,0, 1,0,1,0), { register: true, notes: 'High D — firm air' }),
]

export function getRecorderNotesByOctave(octave) {
  return byOctave(RECORDER_NOTES, octave)
}
