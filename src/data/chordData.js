// frets/fingers arrays are ordered low E → high e (6 strings).
// frets: -1 = muted, 0 = open, n = fretted at fret n (relative to baseFret)
// fingers: 0 = no finger (open/muted), 1-4 = finger number
// barre: optional { fret, fromString, toString } for full/partial barre chords

export const GUITAR_CHORDS = [
  {
    name: 'C',
    fullName: 'C Major',
    baseFret: 1,
    frets: [-1, 3, 2, 0, 1, 0],
    fingers: [0, 3, 2, 0, 1, 0],
  },
  {
    name: 'G',
    fullName: 'G Major',
    baseFret: 1,
    frets: [3, 2, 0, 0, 0, 3],
    fingers: [2, 1, 0, 0, 0, 3],
  },
  {
    name: 'D',
    fullName: 'D Major',
    baseFret: 1,
    frets: [-1, -1, 0, 2, 3, 2],
    fingers: [0, 0, 0, 1, 3, 2],
  },
  {
    name: 'Em',
    fullName: 'E Minor',
    baseFret: 1,
    frets: [0, 2, 2, 0, 0, 0],
    fingers: [0, 2, 3, 0, 0, 0],
  },
  {
    name: 'Am',
    fullName: 'A Minor',
    baseFret: 1,
    frets: [-1, 0, 2, 2, 1, 0],
    fingers: [0, 0, 2, 3, 1, 0],
  },
  {
    name: 'A',
    fullName: 'A Major',
    baseFret: 1,
    frets: [-1, 0, 2, 2, 2, 0],
    fingers: [0, 0, 1, 2, 3, 0],
  },
  {
    name: 'E',
    fullName: 'E Major',
    baseFret: 1,
    frets: [0, 2, 2, 1, 0, 0],
    fingers: [0, 2, 3, 1, 0, 0],
  },
  {
    name: 'F',
    fullName: 'F Major',
    baseFret: 1,
    frets: [1, 3, 3, 2, 1, 1],
    fingers: [1, 3, 4, 2, 1, 1],
    barre: { fret: 1, fromString: 0, toString: 5 },
  },
  {
    name: 'Dm',
    fullName: 'D Minor',
    baseFret: 1,
    frets: [-1, -1, 0, 2, 3, 1],
    fingers: [0, 0, 0, 2, 3, 1],
  },
  {
    name: 'B7',
    fullName: 'B Dominant 7th',
    baseFret: 1,
    frets: [-1, 2, 1, 2, 0, 2],
    fingers: [0, 2, 1, 3, 0, 4],
  },
]

export function getChordBySlug(slug) {
  return GUITAR_CHORDS.find(c => c.name.toLowerCase() === slug.toLowerCase())
}
