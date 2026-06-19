// frets/fingers arrays: low E → high e (6 strings)
// frets: -1 = muted, 0 = open, n = fret n (relative to baseFret)
// fingers: 0 = no finger, 1-4 = finger number
// barre: optional { fret, fromString, toString }

export const CHORD_ROOTS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
export const CHORD_TYPES = ['Major', 'Minor', '7', 'maj7', 'm7', 'sus2', 'sus4', '6', 'm6', 'add9', 'dim', 'aug', '5', '9', 'm9', '7sus4', 'maj9']

export const GUITAR_CHORDS = [
  // ─── C ───────────────────────────────────────────────
  {
    name: 'C', fullName: 'C Major', root: 'C', type: 'Major',
    baseFret: 1,
    frets:   [-1, 3, 2, 0, 1, 0],
    fingers: [ 0, 3, 2, 0, 1, 0],
  },
  {
    name: 'Cm', fullName: 'C Minor', root: 'C', type: 'Minor',
    baseFret: 1,
    frets:   [-1, 3, 5, 5, 4, 3],
    fingers: [ 0, 1, 3, 4, 2, 1],
    barre: { fret: 3, fromString: 1, toString: 5 },
  },
  {
    name: 'C7', fullName: 'C Dominant 7th', root: 'C', type: '7',
    baseFret: 1,
    frets:   [-1, 3, 2, 3, 1, 0],
    fingers: [ 0, 3, 2, 4, 1, 0],
  },
  {
    name: 'Cmaj7', fullName: 'C Major 7th', root: 'C', type: 'maj7',
    baseFret: 1,
    frets:   [-1, 3, 2, 0, 0, 0],
    fingers: [ 0, 3, 2, 0, 0, 0],
  },
  {
    name: 'Cm7', fullName: 'C Minor 7th', root: 'C', type: 'm7',
    baseFret: 1,
    frets:   [-1, 3, 5, 3, 4, 3],
    fingers: [ 0, 1, 3, 1, 2, 1],
    barre: { fret: 3, fromString: 1, toString: 5 },
  },
  {
    name: 'Csus2', fullName: 'C Suspended 2nd', root: 'C', type: 'sus2',
    baseFret: 1,
    frets:   [-1, 3, 0, 0, 3, 3],
    fingers: [ 0, 1, 0, 0, 2, 3],
  },
  {
    name: 'Csus4', fullName: 'C Suspended 4th', root: 'C', type: 'sus4',
    baseFret: 1,
    frets:   [-1, 3, 3, 0, 1, 1],
    fingers: [ 0, 3, 4, 0, 1, 2],
  },

  // ─── D ───────────────────────────────────────────────
  {
    name: 'D', fullName: 'D Major', root: 'D', type: 'Major',
    baseFret: 1,
    frets:   [-1, -1, 0, 2, 3, 2],
    fingers: [ 0,  0, 0, 1, 3, 2],
  },
  {
    name: 'Dm', fullName: 'D Minor', root: 'D', type: 'Minor',
    baseFret: 1,
    frets:   [-1, -1, 0, 2, 3, 1],
    fingers: [ 0,  0, 0, 2, 3, 1],
  },
  {
    name: 'D7', fullName: 'D Dominant 7th', root: 'D', type: '7',
    baseFret: 1,
    frets:   [-1, -1, 0, 2, 1, 2],
    fingers: [ 0,  0, 0, 2, 1, 3],
  },
  {
    name: 'Dmaj7', fullName: 'D Major 7th', root: 'D', type: 'maj7',
    baseFret: 1,
    frets:   [-1, -1, 0, 2, 2, 2],
    fingers: [ 0,  0, 0, 1, 2, 3],
  },
  {
    name: 'Dm7', fullName: 'D Minor 7th', root: 'D', type: 'm7',
    baseFret: 1,
    frets:   [-1, -1, 0, 2, 1, 1],
    fingers: [ 0,  0, 0, 2, 1, 1],
  },
  {
    name: 'Dsus2', fullName: 'D Suspended 2nd', root: 'D', type: 'sus2',
    baseFret: 1,
    frets:   [-1, -1, 0, 2, 3, 0],
    fingers: [ 0,  0, 0, 1, 3, 0],
  },
  {
    name: 'Dsus4', fullName: 'D Suspended 4th', root: 'D', type: 'sus4',
    baseFret: 1,
    frets:   [-1, -1, 0, 2, 3, 3],
    fingers: [ 0,  0, 0, 1, 3, 4],
  },

  // ─── E ───────────────────────────────────────────────
  {
    name: 'Esus2', fullName: 'E Suspended 2nd', root: 'E', type: 'sus2',
    baseFret: 1,
    frets:   [0, 2, 4, 4, 0, 0],
    fingers: [0, 1, 3, 4, 0, 0],
  },
  {
    name: 'Esus4', fullName: 'E Suspended 4th', root: 'E', type: 'sus4',
    baseFret: 1,
    frets:   [0, 2, 2, 2, 0, 0],
    fingers: [0, 1, 2, 3, 0, 0],
  },
  {
    name: 'E', fullName: 'E Major', root: 'E', type: 'Major',
    baseFret: 1,
    frets:   [0, 2, 2, 1, 0, 0],
    fingers: [0, 2, 3, 1, 0, 0],
  },
  {
    name: 'Em', fullName: 'E Minor', root: 'E', type: 'Minor',
    baseFret: 1,
    frets:   [0, 2, 2, 0, 0, 0],
    fingers: [0, 2, 3, 0, 0, 0],
  },
  {
    name: 'E7', fullName: 'E Dominant 7th', root: 'E', type: '7',
    baseFret: 1,
    frets:   [0, 2, 0, 1, 0, 0],
    fingers: [0, 2, 0, 1, 0, 0],
  },
  {
    name: 'Emaj7', fullName: 'E Major 7th', root: 'E', type: 'maj7',
    baseFret: 1,
    frets:   [0, 2, 1, 1, 0, 0],
    fingers: [0, 3, 2, 1, 0, 0],
  },
  {
    name: 'Em7', fullName: 'E Minor 7th', root: 'E', type: 'm7',
    baseFret: 1,
    frets:   [0, 2, 0, 0, 0, 0],
    fingers: [0, 2, 0, 0, 0, 0],
  },

  // ─── F ───────────────────────────────────────────────
  {
    name: 'F', fullName: 'F Major', root: 'F', type: 'Major',
    baseFret: 1,
    frets:   [1, 3, 3, 2, 1, 1],
    fingers: [1, 3, 4, 2, 1, 1],
    barre: { fret: 1, fromString: 0, toString: 5 },
  },
  {
    name: 'Fm', fullName: 'F Minor', root: 'F', type: 'Minor',
    baseFret: 1,
    frets:   [1, 3, 3, 1, 1, 1],
    fingers: [1, 3, 4, 1, 1, 1],
    barre: { fret: 1, fromString: 0, toString: 5 },
  },
  {
    name: 'F7', fullName: 'F Dominant 7th', root: 'F', type: '7',
    baseFret: 1,
    frets:   [1, 3, 1, 2, 1, 1],
    fingers: [1, 4, 1, 2, 1, 1],
    barre: { fret: 1, fromString: 0, toString: 5 },
  },
  {
    name: 'Fmaj7', fullName: 'F Major 7th', root: 'F', type: 'maj7',
    baseFret: 1,
    frets:   [-1, -1, 3, 2, 1, 0],
    fingers: [ 0,  0, 3, 2, 1, 0],
  },
  {
    name: 'Fm7', fullName: 'F Minor 7th', root: 'F', type: 'm7',
    baseFret: 1,
    frets:   [1, 3, 1, 1, 1, 1],
    fingers: [1, 3, 1, 1, 1, 1],
    barre: { fret: 1, fromString: 0, toString: 5 },
  },
  {
    name: 'Fsus2', fullName: 'F Suspended 2nd', root: 'F', type: 'sus2',
    baseFret: 1,
    frets:   [-1, -1, 3, 0, 1, 1],
    fingers: [ 0,  0, 3, 0, 1, 2],
  },
  {
    name: 'Fsus4', fullName: 'F Suspended 4th', root: 'F', type: 'sus4',
    baseFret: 1,
    frets:   [1, 1, 3, 3, 1, 1],
    fingers: [1, 1, 3, 4, 1, 1],
    barre: { fret: 1, fromString: 0, toString: 5 },
  },

  // ─── G ───────────────────────────────────────────────
  {
    name: 'G', fullName: 'G Major', root: 'G', type: 'Major',
    baseFret: 1,
    frets:   [3, 2, 0, 0, 0, 3],
    fingers: [2, 1, 0, 0, 0, 3],
  },
  {
    name: 'Gm', fullName: 'G Minor', root: 'G', type: 'Minor',
    baseFret: 1,
    frets:   [3, 5, 5, 3, 3, 3],
    fingers: [1, 3, 4, 1, 1, 1],
    barre: { fret: 3, fromString: 0, toString: 5 },
  },
  {
    name: 'G7', fullName: 'G Dominant 7th', root: 'G', type: '7',
    baseFret: 1,
    frets:   [3, 2, 0, 0, 0, 1],
    fingers: [3, 2, 0, 0, 0, 1],
  },
  {
    name: 'Gmaj7', fullName: 'G Major 7th', root: 'G', type: 'maj7',
    baseFret: 1,
    frets:   [-1, 2, 0, 0, 0, 2],
    fingers: [ 0, 1, 0, 0, 0, 2],
  },
  {
    name: 'Gm7', fullName: 'G Minor 7th', root: 'G', type: 'm7',
    baseFret: 1,
    frets:   [3, 5, 3, 3, 3, 3],
    fingers: [1, 3, 1, 1, 1, 1],
    barre: { fret: 3, fromString: 0, toString: 5 },
  },
  {
    name: 'Gsus2', fullName: 'G Suspended 2nd', root: 'G', type: 'sus2',
    baseFret: 1,
    frets:   [-1, 0, 0, 0, 3, 3],
    fingers: [ 0, 0, 0, 0, 2, 3],
  },
  {
    name: 'Gsus4', fullName: 'G Suspended 4th', root: 'G', type: 'sus4',
    baseFret: 1,
    frets:   [-1, -1, 0, 0, 1, 3],
    fingers: [ 0,  0, 0, 0, 1, 3],
  },

  // ─── A ───────────────────────────────────────────────
  {
    name: 'A', fullName: 'A Major', root: 'A', type: 'Major',
    baseFret: 1,
    frets:   [-1, 0, 2, 2, 2, 0],
    fingers: [ 0, 0, 1, 2, 3, 0],
  },
  {
    name: 'Am', fullName: 'A Minor', root: 'A', type: 'Minor',
    baseFret: 1,
    frets:   [-1, 0, 2, 2, 1, 0],
    fingers: [ 0, 0, 2, 3, 1, 0],
  },
  {
    name: 'A7', fullName: 'A Dominant 7th', root: 'A', type: '7',
    baseFret: 1,
    frets:   [-1, 0, 2, 0, 2, 0],
    fingers: [ 0, 0, 2, 0, 3, 0],
  },
  {
    name: 'Amaj7', fullName: 'A Major 7th', root: 'A', type: 'maj7',
    baseFret: 1,
    frets:   [-1, 0, 2, 1, 2, 0],
    fingers: [ 0, 0, 2, 1, 3, 0],
  },
  {
    name: 'Am7', fullName: 'A Minor 7th', root: 'A', type: 'm7',
    baseFret: 1,
    frets:   [-1, 0, 2, 0, 1, 0],
    fingers: [ 0, 0, 2, 0, 1, 0],
  },
  {
    name: 'Asus2', fullName: 'A Suspended 2nd', root: 'A', type: 'sus2',
    baseFret: 1,
    frets:   [-1, 0, 2, 2, 0, 0],
    fingers: [ 0, 0, 1, 2, 0, 0],
  },
  {
    name: 'Asus4', fullName: 'A Suspended 4th', root: 'A', type: 'sus4',
    baseFret: 1,
    frets:   [-1, 0, 2, 2, 3, 0],
    fingers: [ 0, 0, 1, 2, 3, 0],
  },
  {
    name: 'A6', fullName: 'A Major 6th', root: 'A', type: '6',
    baseFret: 1,
    frets:   [-1, 0, 2, 2, 2, 2],
    fingers: [ 0, 0, 1, 1, 1, 1],
    barre: { fret: 2, fromString: 2, toString: 5 },
  },

  // ─── B ───────────────────────────────────────────────
  {
    name: 'B', fullName: 'B Major', root: 'B', type: 'Major',
    baseFret: 1,
    frets:   [-1, 2, 4, 4, 4, 2],
    fingers: [ 0, 1, 3, 4, 2, 1],
    barre: { fret: 2, fromString: 1, toString: 5 },
  },
  {
    name: 'Bm', fullName: 'B Minor', root: 'B', type: 'Minor',
    baseFret: 1,
    frets:   [-1, 2, 4, 4, 3, 2],
    fingers: [ 0, 1, 3, 4, 2, 1],
    barre: { fret: 2, fromString: 1, toString: 5 },
  },
  {
    name: 'B7', fullName: 'B Dominant 7th', root: 'B', type: '7',
    baseFret: 1,
    frets:   [-1, 2, 1, 2, 0, 2],
    fingers: [ 0, 2, 1, 3, 0, 4],
  },
  {
    name: 'Bmaj7', fullName: 'B Major 7th', root: 'B', type: 'maj7',
    baseFret: 1,
    frets:   [-1, 2, 4, 3, 4, 2],
    fingers: [ 0, 1, 3, 2, 4, 1],
    barre: { fret: 2, fromString: 1, toString: 5 },
  },
  {
    name: 'Bm7', fullName: 'B Minor 7th', root: 'B', type: 'm7',
    baseFret: 1,
    frets:   [-1, 2, 4, 2, 3, 2],
    fingers: [ 0, 1, 3, 1, 2, 1],
    barre: { fret: 2, fromString: 1, toString: 5 },
  },
  {
    name: 'Bsus2', fullName: 'B Suspended 2nd', root: 'B', type: 'sus2',
    baseFret: 1,
    frets:   [-1, 2, 4, 4, 2, 2],
    fingers: [ 0, 1, 3, 4, 1, 1],
    barre: { fret: 2, fromString: 1, toString: 5 },
  },
  {
    name: 'Bsus4', fullName: 'B Suspended 4th', root: 'B', type: 'sus4',
    baseFret: 2,
    frets:   [-1, 1, 3, 3, 4, 1],
    fingers: [ 0, 1, 3, 4, 2, 1],
    barre: { fret: 1, fromString: 1, toString: 5 },
  },
  // ─── C# / Db  (A-shape barre, baseFret 4) ────────────
  {
    name: 'C#', fullName: 'C# Major', root: 'C#', type: 'Major',
    baseFret: 4,
    frets:   [-1, 1, 3, 3, 3, 1],
    fingers: [ 0, 1, 3, 4, 2, 1],
    barre: { fret: 1, fromString: 1, toString: 5 },
  },
  {
    name: 'C#m', fullName: 'C# Minor', root: 'C#', type: 'Minor',
    baseFret: 4,
    frets:   [-1, 1, 3, 3, 2, 1],
    fingers: [ 0, 1, 3, 4, 2, 1],
    barre: { fret: 1, fromString: 1, toString: 5 },
  },
  {
    name: 'C#7', fullName: 'C# Dominant 7th', root: 'C#', type: '7',
    baseFret: 4,
    frets:   [-1, 1, 3, 1, 3, 1],
    fingers: [ 0, 1, 3, 1, 4, 1],
    barre: { fret: 1, fromString: 1, toString: 5 },
  },
  {
    name: 'C#maj7', fullName: 'C# Major 7th', root: 'C#', type: 'maj7',
    baseFret: 4,
    frets:   [-1, 1, 3, 2, 3, 1],
    fingers: [ 0, 1, 3, 2, 4, 1],
    barre: { fret: 1, fromString: 1, toString: 5 },
  },

  {
    name: 'C#m7', fullName: 'C# Minor 7th', root: 'C#', type: 'm7',
    baseFret: 4,
    frets:   [-1, 1, 3, 1, 2, 1],
    fingers: [ 0, 1, 3, 1, 2, 1],
    barre: { fret: 1, fromString: 1, toString: 5 },
  },
  {
    name: 'C#sus2', fullName: 'C# Suspended 2nd', root: 'C#', type: 'sus2',
    baseFret: 4,
    frets:   [-1, 1, 3, 3, 1, 1],
    fingers: [ 0, 1, 3, 4, 1, 2],
    barre: { fret: 1, fromString: 1, toString: 5 },
  },
  {
    name: 'C#sus4', fullName: 'C# Suspended 4th', root: 'C#', type: 'sus4',
    baseFret: 4,
    frets:   [-1, 1, 3, 3, 4, 1],
    fingers: [ 0, 1, 3, 4, 2, 1],
    barre: { fret: 1, fromString: 1, toString: 5 },
  },

  // ─── D# / Eb  (A-shape barre, baseFret 6) ────────────
  {
    name: 'D#', fullName: 'D# Major', root: 'D#', type: 'Major',
    baseFret: 6,
    frets:   [-1, 1, 3, 3, 3, 1],
    fingers: [ 0, 1, 3, 4, 2, 1],
    barre: { fret: 1, fromString: 1, toString: 5 },
  },
  {
    name: 'D#m', fullName: 'D# Minor', root: 'D#', type: 'Minor',
    baseFret: 6,
    frets:   [-1, 1, 3, 3, 2, 1],
    fingers: [ 0, 1, 3, 4, 2, 1],
    barre: { fret: 1, fromString: 1, toString: 5 },
  },
  {
    name: 'D#7', fullName: 'D# Dominant 7th', root: 'D#', type: '7',
    baseFret: 6,
    frets:   [-1, 1, 3, 1, 3, 1],
    fingers: [ 0, 1, 3, 1, 4, 1],
    barre: { fret: 1, fromString: 1, toString: 5 },
  },
  {
    name: 'D#maj7', fullName: 'D# Major 7th', root: 'D#', type: 'maj7',
    baseFret: 6,
    frets:   [-1, 1, 3, 2, 3, 1],
    fingers: [ 0, 1, 3, 2, 4, 1],
    barre: { fret: 1, fromString: 1, toString: 5 },
  },

  {
    name: 'D#m7', fullName: 'D# Minor 7th', root: 'D#', type: 'm7',
    baseFret: 6,
    frets:   [-1, 1, 3, 1, 2, 1],
    fingers: [ 0, 1, 3, 1, 2, 1],
    barre: { fret: 1, fromString: 1, toString: 5 },
  },
  {
    name: 'D#sus2', fullName: 'D# Suspended 2nd', root: 'D#', type: 'sus2',
    baseFret: 6,
    frets:   [-1, 1, 3, 3, 1, 1],
    fingers: [ 0, 1, 3, 4, 1, 2],
    barre: { fret: 1, fromString: 1, toString: 5 },
  },
  {
    name: 'D#sus4', fullName: 'D# Suspended 4th', root: 'D#', type: 'sus4',
    baseFret: 6,
    frets:   [-1, 1, 3, 3, 4, 1],
    fingers: [ 0, 1, 3, 4, 2, 1],
    barre: { fret: 1, fromString: 1, toString: 5 },
  },

  // ─── F# / Gb  (E-shape barre, baseFret 2) ────────────
  {
    name: 'F#', fullName: 'F# Major', root: 'F#', type: 'Major',
    baseFret: 2,
    frets:   [1, 3, 3, 2, 1, 1],
    fingers: [1, 3, 4, 2, 1, 1],
    barre: { fret: 1, fromString: 0, toString: 5 },
  },
  {
    name: 'F#m', fullName: 'F# Minor', root: 'F#', type: 'Minor',
    baseFret: 2,
    frets:   [1, 3, 3, 1, 1, 1],
    fingers: [1, 3, 4, 1, 1, 1],
    barre: { fret: 1, fromString: 0, toString: 5 },
  },
  {
    name: 'F#7', fullName: 'F# Dominant 7th', root: 'F#', type: '7',
    baseFret: 2,
    frets:   [1, 3, 1, 2, 1, 1],
    fingers: [1, 4, 1, 2, 1, 1],
    barre: { fret: 1, fromString: 0, toString: 5 },
  },
  {
    name: 'F#maj7', fullName: 'F# Major 7th', root: 'F#', type: 'maj7',
    baseFret: 2,
    frets:   [1, 3, 2, 2, 1, 1],
    fingers: [1, 4, 2, 3, 1, 1],
    barre: { fret: 1, fromString: 0, toString: 5 },
  },

  {
    name: 'F#m7', fullName: 'F# Minor 7th', root: 'F#', type: 'm7',
    baseFret: 2,
    frets:   [1, 3, 1, 1, 1, 1],
    fingers: [1, 3, 1, 1, 1, 1],
    barre: { fret: 1, fromString: 0, toString: 5 },
  },
  {
    name: 'F#sus4', fullName: 'F# Suspended 4th', root: 'F#', type: 'sus4',
    baseFret: 2,
    frets:   [1, 3, 3, 3, 1, 1],
    fingers: [1, 3, 3, 3, 1, 1],
    barre: { fret: 1, fromString: 0, toString: 5 },
  },

  // ─── G# / Ab  (E-shape barre, baseFret 4) ────────────
  {
    name: 'G#', fullName: 'G# Major', root: 'G#', type: 'Major',
    baseFret: 4,
    frets:   [1, 3, 3, 2, 1, 1],
    fingers: [1, 3, 4, 2, 1, 1],
    barre: { fret: 1, fromString: 0, toString: 5 },
  },
  {
    name: 'G#m', fullName: 'G# Minor', root: 'G#', type: 'Minor',
    baseFret: 4,
    frets:   [1, 3, 3, 1, 1, 1],
    fingers: [1, 3, 4, 1, 1, 1],
    barre: { fret: 1, fromString: 0, toString: 5 },
  },
  {
    name: 'G#7', fullName: 'G# Dominant 7th', root: 'G#', type: '7',
    baseFret: 4,
    frets:   [1, 3, 1, 2, 1, 1],
    fingers: [1, 4, 1, 2, 1, 1],
    barre: { fret: 1, fromString: 0, toString: 5 },
  },
  {
    name: 'G#maj7', fullName: 'G# Major 7th', root: 'G#', type: 'maj7',
    baseFret: 4,
    frets:   [1, 3, 2, 2, 1, 1],
    fingers: [1, 4, 2, 3, 1, 1],
    barre: { fret: 1, fromString: 0, toString: 5 },
  },

  {
    name: 'G#m7', fullName: 'G# Minor 7th', root: 'G#', type: 'm7',
    baseFret: 4,
    frets:   [1, 3, 1, 1, 1, 1],
    fingers: [1, 3, 1, 1, 1, 1],
    barre: { fret: 1, fromString: 0, toString: 5 },
  },
  {
    name: 'G#sus4', fullName: 'G# Suspended 4th', root: 'G#', type: 'sus4',
    baseFret: 4,
    frets:   [1, 3, 3, 3, 1, 1],
    fingers: [1, 3, 3, 3, 1, 1],
    barre: { fret: 1, fromString: 0, toString: 5 },
  },

  // ─── A# / Bb  (A-shape barre, baseFret 1) ────────────
  {
    name: 'A#', fullName: 'A# Major', root: 'A#', type: 'Major',
    baseFret: 1,
    frets:   [-1, 1, 3, 3, 3, 1],
    fingers: [ 0, 1, 3, 4, 2, 1],
    barre: { fret: 1, fromString: 1, toString: 5 },
  },
  {
    name: 'A#m', fullName: 'A# Minor', root: 'A#', type: 'Minor',
    baseFret: 1,
    frets:   [-1, 1, 3, 3, 2, 1],
    fingers: [ 0, 1, 3, 4, 2, 1],
    barre: { fret: 1, fromString: 1, toString: 5 },
  },
  {
    name: 'A#7', fullName: 'A# Dominant 7th', root: 'A#', type: '7',
    baseFret: 1,
    frets:   [-1, 1, 3, 1, 3, 1],
    fingers: [ 0, 1, 3, 1, 4, 1],
    barre: { fret: 1, fromString: 1, toString: 5 },
  },
  {
    name: 'A#maj7', fullName: 'A# Major 7th', root: 'A#', type: 'maj7',
    baseFret: 1,
    frets:   [-1, 1, 3, 2, 3, 1],
    fingers: [ 0, 1, 3, 2, 4, 1],
    barre: { fret: 1, fromString: 1, toString: 5 },
  },
  {
    name: 'A#m7', fullName: 'A# Minor 7th', root: 'A#', type: 'm7',
    baseFret: 1,
    frets:   [-1, 1, 3, 1, 2, 1],
    fingers: [ 0, 1, 3, 1, 2, 1],
    barre: { fret: 1, fromString: 1, toString: 5 },
  },
  {
    name: 'A#sus2', fullName: 'A# Suspended 2nd', root: 'A#', type: 'sus2',
    baseFret: 1,
    frets:   [-1, 1, 3, 3, 1, 1],
    fingers: [ 0, 1, 3, 4, 1, 2],
    barre: { fret: 1, fromString: 1, toString: 5 },
  },
  {
    name: 'A#sus4', fullName: 'A# Suspended 4th', root: 'A#', type: 'sus4',
    baseFret: 1,
    frets:   [-1, 1, 3, 3, 4, 1],
    fingers: [ 0, 1, 3, 4, 2, 1],
    barre: { fret: 1, fromString: 1, toString: 5 },
  },

  // ─── F# / G# sus2 (partial voicing, 4 strings) ───────
  {
    name: 'F#sus2', fullName: 'F# Suspended 2nd', root: 'F#', type: 'sus2',
    baseFret: 1,
    frets:   [-1, -1, 4, 1, 2, 2],
    fingers: [ 0,  0, 4, 1, 2, 3],
  },
  {
    name: 'G#sus2', fullName: 'G# Suspended 2nd', root: 'G#', type: 'sus2',
    baseFret: 3,
    frets:   [-1, -1, 4, 1, 2, 2],
    fingers: [ 0,  0, 4, 1, 2, 3],
  },

  // ─── Extensions — natural roots ──────────────────────
  {
    name: 'C6', fullName: 'C Major 6th', root: 'C', type: '6',
    baseFret: 1,
    frets:   [-1, 3, 2, 2, 1, 0],
    fingers: [ 0, 3, 2, 4, 1, 0],
  },
  {
    name: 'Cadd9', fullName: 'C Add 9', root: 'C', type: 'add9',
    baseFret: 1,
    frets:   [-1, 3, 2, 0, 3, 0],
    fingers: [ 0, 3, 2, 0, 4, 0],
  },
  {
    name: 'Em6', fullName: 'E Minor 6th', root: 'E', type: 'm6',
    baseFret: 1,
    frets:   [0, 2, 2, 0, 2, 0],
    fingers: [0, 1, 1, 0, 2, 0],
  },
  {
    name: 'G6', fullName: 'G Major 6th', root: 'G', type: '6',
    baseFret: 1,
    frets:   [3, 2, 0, 0, 0, 0],
    fingers: [2, 1, 0, 0, 0, 0],
  },
  {
    name: 'Gadd9', fullName: 'G Add 9', root: 'G', type: 'add9',
    baseFret: 1,
    frets:   [3, 2, 0, 2, 0, 3],
    fingers: [2, 1, 0, 3, 0, 4],
  },
  {
    name: 'Am6', fullName: 'A Minor 6th', root: 'A', type: 'm6',
    baseFret: 1,
    frets:   [-1, 0, 2, 2, 1, 2],
    fingers: [ 0, 0, 2, 3, 1, 4],
  },
  {
    name: 'Aadd9', fullName: 'A Add 9', root: 'A', type: 'add9',
    baseFret: 1,
    frets:   [-1, 0, 2, 4, 2, 0],
    fingers: [ 0, 0, 1, 4, 3, 0],
  },

  // ─── dim ─────────────────────────────────────────────
  {
    name: 'Cdim', fullName: 'C Diminished', root: 'C', type: 'dim',
    baseFret: 1,
    frets:   [-1, -1, 1, 2, 1, 2],
    fingers: [ 0,  0, 1, 3, 2, 4],
  },
  {
    name: 'Ddim', fullName: 'D Diminished', root: 'D', type: 'dim',
    baseFret: 1,
    frets:   [-1, -1, 0, 1, 0, 1],
    fingers: [ 0,  0, 0, 1, 0, 2],
  },
  {
    name: 'Edim', fullName: 'E Diminished', root: 'E', type: 'dim',
    baseFret: 1,
    frets:   [0, 1, 2, 3, 2, 0],
    fingers: [0, 1, 2, 4, 3, 0],
  },
  {
    name: 'Fdim', fullName: 'F Diminished', root: 'F', type: 'dim',
    baseFret: 1,
    frets:   [-1, -1, 3, 4, 3, 4],
    fingers: [ 0,  0, 1, 3, 2, 4],
  },
  {
    name: 'Gdim', fullName: 'G Diminished', root: 'G', type: 'dim',
    baseFret: 5,
    frets:   [-1, -1, 1, 2, 1, 2],
    fingers: [ 0,  0, 1, 3, 2, 4],
  },
  {
    name: 'Adim', fullName: 'A Diminished', root: 'A', type: 'dim',
    baseFret: 1,
    frets:   [-1, 0, 1, 2, 1, 2],
    fingers: [ 0, 0, 1, 3, 2, 4],
  },
  {
    name: 'Bdim', fullName: 'B Diminished', root: 'B', type: 'dim',
    baseFret: 1,
    frets:   [-1, 2, 0, 1, 0, 1],
    fingers: [ 0, 3, 0, 1, 0, 2],
  },

  // ─── aug ─────────────────────────────────────────────
  {
    name: 'Caug', fullName: 'C Augmented', root: 'C', type: 'aug',
    baseFret: 1,
    frets:   [-1, 3, 2, 1, 1, 0],
    fingers: [ 0, 4, 3, 1, 1, 0],
  },
  {
    name: 'Daug', fullName: 'D Augmented', root: 'D', type: 'aug',
    baseFret: 1,
    frets:   [-1, -1, 0, 3, 3, 2],
    fingers: [ 0,  0, 0, 2, 3, 1],
  },
  {
    name: 'Eaug', fullName: 'E Augmented', root: 'E', type: 'aug',
    baseFret: 1,
    frets:   [0, 3, 2, 1, 1, 0],
    fingers: [0, 4, 3, 1, 1, 0],
  },
  {
    name: 'Gaug', fullName: 'G Augmented', root: 'G', type: 'aug',
    baseFret: 1,
    frets:   [3, 2, 1, 0, 0, 3],
    fingers: [3, 2, 1, 0, 0, 4],
  },
  {
    name: 'Aaug', fullName: 'A Augmented', root: 'A', type: 'aug',
    baseFret: 1,
    frets:   [-1, 0, 3, 2, 2, 1],
    fingers: [ 0, 0, 4, 2, 2, 1],
  },

  // ─── 5 (power chords) ────────────────────────────────
  {
    name: 'C5', fullName: 'C Power Chord', root: 'C', type: '5',
    baseFret: 3,
    frets:   [-1, 1, 3, 3, -1, -1],
    fingers: [ 0, 1, 3, 4,  0,  0],
  },
  {
    name: 'D5', fullName: 'D Power Chord', root: 'D', type: '5',
    baseFret: 5,
    frets:   [-1, 1, 3, 3, -1, -1],
    fingers: [ 0, 1, 3, 4,  0,  0],
  },
  {
    name: 'E5', fullName: 'E Power Chord', root: 'E', type: '5',
    baseFret: 1,
    frets:   [0, 2, 2, -1, -1, -1],
    fingers: [0, 1, 2,  0,  0,  0],
  },
  {
    name: 'G5', fullName: 'G Power Chord', root: 'G', type: '5',
    baseFret: 3,
    frets:   [1, 3, 3, -1, -1, -1],
    fingers: [1, 3, 4,  0,  0,  0],
  },
  {
    name: 'A5', fullName: 'A Power Chord', root: 'A', type: '5',
    baseFret: 1,
    frets:   [-1, 0, 2, 2, -1, -1],
    fingers: [ 0, 0, 1, 2,  0,  0],
  },
  {
    name: 'B5', fullName: 'B Power Chord', root: 'B', type: '5',
    baseFret: 1,
    frets:   [-1, 2, 4, 4, -1, -1],
    fingers: [ 0, 1, 3, 4,  0,  0],
  },

  // ─── Missing aug & 5 ─────────────────────────────────
  {
    name: 'Faug', fullName: 'F Augmented', root: 'F', type: 'aug',
    baseFret: 1,
    frets:   [-1, -1, 3, 2, 2, 1],
    fingers: [ 0,  0, 4, 2, 2, 1],
  },
  {
    name: 'F5', fullName: 'F Power Chord', root: 'F', type: '5',
    baseFret: 1,
    frets:   [1, 3, 3, -1, -1, -1],
    fingers: [1, 3, 4,  0,  0,  0],
  },
  {
    name: 'Baug', fullName: 'B Augmented', root: 'B', type: 'aug',
    baseFret: 1,
    frets:   [-1, 2, 1, 0, 0, 3],
    fingers: [ 0, 2, 1, 0, 0, 3],
  },

  // ─── 6th chords ──────────────────────────────────────
  {
    name: 'D6', fullName: 'D Major 6th', root: 'D', type: '6',
    baseFret: 1,
    frets:   [-1, -1, 0, 4, 3, 2],
    fingers: [ 0,  0, 0, 4, 3, 2],
  },
  {
    name: 'E6', fullName: 'E Major 6th', root: 'E', type: '6',
    baseFret: 1,
    frets:   [0, 2, 2, 1, 2, 0],
    fingers: [0, 2, 3, 1, 4, 0],
  },
  {
    name: 'B6', fullName: 'B Major 6th', root: 'B', type: '6',
    baseFret: 1,
    frets:   [-1, 2, 4, 4, 4, 4],
    fingers: [ 0, 1, 3, 4, 2, 2],
  },
  {
    name: 'Dm6', fullName: 'D Minor 6th', root: 'D', type: 'm6',
    baseFret: 1,
    frets:   [-1, -1, 0, 2, 0, 1],
    fingers: [ 0,  0, 0, 2, 0, 1],
  },
  {
    name: 'F6', fullName: 'F Major 6th', root: 'F', type: '6',
    baseFret: 1,
    frets:   [-1, -1, 3, 2, 3, 1],
    fingers: [ 0,  0, 3, 2, 4, 1],
  },

  // ─── add9 ────────────────────────────────────────────
  {
    name: 'Eadd9', fullName: 'E Add 9', root: 'E', type: 'add9',
    baseFret: 1,
    frets:   [0, 2, 2, 1, 0, 2],
    fingers: [0, 2, 3, 1, 0, 4],
  },
  {
    name: 'Dadd9', fullName: 'D Add 9', root: 'D', type: 'add9',
    baseFret: 1,
    frets:   [0, 0, 0, 2, 3, 2],
    fingers: [0, 0, 0, 1, 3, 2],
  },

  // ─── maj9 ────────────────────────────────────────────
  {
    name: 'Cmaj9', fullName: 'C Major 9th', root: 'C', type: 'maj9',
    baseFret: 1,
    frets:   [-1, 3, 0, 0, 0, 0],
    fingers: [ 0, 3, 0, 0, 0, 0],
  },
  {
    name: 'Gmaj9', fullName: 'G Major 9th', root: 'G', type: 'maj9',
    baseFret: 1,
    frets:   [3, 2, 0, 2, 0, 2],
    fingers: [3, 2, 0, 4, 0, 1],
  },

  // ─── 9th (dominant) ──────────────────────────────────
  {
    name: 'C9', fullName: 'C Dominant 9th', root: 'C', type: '9',
    baseFret: 1,
    frets:   [-1, 3, 2, 3, 3, 3],
    fingers: [ 0, 3, 2, 1, 1, 1],
    barre: { fret: 3, fromString: 3, toString: 5 },
  },
  {
    name: 'D9', fullName: 'D Dominant 9th', root: 'D', type: '9',
    baseFret: 4,
    frets:   [-1, 2, 1, 2, 2, 2],
    fingers: [ 0, 1, 2, 1, 1, 1],
    barre: { fret: 2, fromString: 1, toString: 5 },
  },
  {
    name: 'E9', fullName: 'E Dominant 9th', root: 'E', type: '9',
    baseFret: 1,
    frets:   [0, 2, 0, 1, 3, 2],
    fingers: [0, 2, 0, 1, 4, 3],
  },
  {
    name: 'G9', fullName: 'G Dominant 9th', root: 'G', type: '9',
    baseFret: 1,
    frets:   [3, 2, 0, 2, 0, 1],
    fingers: [3, 2, 0, 4, 0, 1],
  },

  // ─── m9 ──────────────────────────────────────────────
  {
    name: 'Am9', fullName: 'A Minor 9th', root: 'A', type: 'm9',
    baseFret: 1,
    frets:   [-1, 0, 2, 0, 0, 0],
    fingers: [ 0, 0, 1, 0, 0, 0],
  },

  // ─── 7sus4 ───────────────────────────────────────────
  {
    name: 'C7sus4', fullName: 'C Dominant 7 Sus4', root: 'C', type: '7sus4',
    baseFret: 1,
    frets:   [-1, 3, 3, 3, 1, 1],
    fingers: [ 0, 2, 3, 4, 1, 1],
  },
  {
    name: 'G7sus4', fullName: 'G Dominant 7 Sus4', root: 'G', type: '7sus4',
    baseFret: 1,
    frets:   [3, 3, 0, 0, 3, 1],
    fingers: [3, 4, 0, 0, 2, 1],
  },
  {
    name: 'A7sus4', fullName: 'A Dominant 7 Sus4', root: 'A', type: '7sus4',
    baseFret: 1,
    frets:   [-1, 0, 2, 0, 3, 0],
    fingers: [ 0, 0, 1, 0, 3, 0],
  },
  // ─── m6 chords ───────────────────────────────────────
  {
    name: 'Cm6', fullName: 'C Minor 6th', root: 'C', type: 'm6',
    baseFret: 1,
    frets:   [-1, 3, 1, 2, 4, -1],
    fingers: [ 0, 4, 1, 2, 3,  0],
  },
  {
    name: 'Gm6', fullName: 'G Minor 6th', root: 'G', type: 'm6',
    baseFret: 1,
    frets:   [3, 1, 0, 0, 3, 0],
    fingers: [3, 1, 0, 0, 4, 0],
  },
  {
    name: 'Bm6', fullName: 'B Minor 6th', root: 'B', type: 'm6',
    baseFret: 1,
    frets:   [-1, 2, 4, 1, 3, -1],
    fingers: [ 0, 2, 4, 1, 3,  0],
  },

  // ─── m9 chords ───────────────────────────────────────
  {
    name: 'Cm9', fullName: 'C Minor 9th', root: 'C', type: 'm9',
    baseFret: 1,
    frets:   [-1, 3, 1, 3, 3, 3],
    fingers: [ 0, 4, 1, 3, 3, 3],
    barre: { fret: 3, fromString: 3, toString: 5 },
  },
  {
    name: 'Em9', fullName: 'E Minor 9th', root: 'E', type: 'm9',
    baseFret: 1,
    frets:   [0, 2, 0, 0, 0, 2],
    fingers: [0, 1, 0, 0, 0, 2],
  },
  {
    name: 'Dm9', fullName: 'D Minor 9th', root: 'D', type: 'm9',
    baseFret: 1,
    frets:   [-1, -1, 0, 2, 1, 0],
    fingers: [ 0,  0, 0, 2, 1, 0],
  },
  {
    name: 'Bm9', fullName: 'B Minor 9th', root: 'B', type: 'm9',
    baseFret: 1,
    frets:   [-1, 2, 4, 2, 2, 2],
    fingers: [ 0, 1, 3, 1, 1, 1],
    barre: { fret: 2, fromString: 1, toString: 5 },
  },

  // ─── 9th (dominant) remaining ────────────────────────
  {
    name: 'A9', fullName: 'A Dominant 9th', root: 'A', type: '9',
    baseFret: 1,
    frets:   [-1, 0, 2, 4, 2, 3],
    fingers: [ 0, 0, 1, 4, 2, 3],
  },
  {
    name: 'B9', fullName: 'B Dominant 9th', root: 'B', type: '9',
    baseFret: 1,
    frets:   [-1, 2, 1, 2, 2, 2],
    fingers: [ 0, 1, 2, 1, 1, 1],
    barre: { fret: 2, fromString: 1, toString: 5 },
  },
  {
    name: 'F9', fullName: 'F Dominant 9th', root: 'F', type: '9',
    baseFret: 1,
    frets:   [-1, -1, 3, 2, 4, 3],
    fingers: [ 0,  0, 2, 1, 4, 3],
  },

  // ─── maj9 chords ─────────────────────────────────────
  {
    name: 'Amaj9', fullName: 'A Major 9th', root: 'A', type: 'maj9',
    baseFret: 1,
    frets:   [-1, 0, 2, 1, 0, 0],
    fingers: [ 0, 0, 2, 1, 0, 0],
  },
  {
    name: 'Dmaj9', fullName: 'D Major 9th', root: 'D', type: 'maj9',
    baseFret: 2,
    frets:   [-1, 4, 3, 1, 1, 0],
    fingers: [ 0, 4, 3, 1, 1, 0],
  },
  {
    name: 'Emaj9', fullName: 'E Major 9th', root: 'E', type: 'maj9',
    baseFret: 1,
    frets:   [0, 2, 1, 1, 0, 2],
    fingers: [0, 3, 2, 1, 0, 4],
  },
  {
    name: 'Fmaj9', fullName: 'F Major 9th', root: 'F', type: 'maj9',
    baseFret: 1,
    frets:   [1, 0, 3, 0, 1, 0],
    fingers: [2, 0, 4, 0, 1, 0],
  },
  {
    name: 'Bmaj9', fullName: 'B Major 9th', root: 'B', type: 'maj9',
    baseFret: 1,
    frets:   [-1, 2, 4, 3, 2, 2],
    fingers: [ 0, 2, 4, 3, 1, 1],
  },

  // ─── 7sus4 remaining ─────────────────────────────────
  {
    name: 'D7sus4', fullName: 'D Dominant 7 Sus4', root: 'D', type: '7sus4',
    baseFret: 1,
    frets:   [-1, -1, 0, 2, 1, 3],
    fingers: [ 0,  0, 0, 2, 1, 4],
  },
  {
    name: 'E7sus4', fullName: 'E Dominant 7 Sus4', root: 'E', type: '7sus4',
    baseFret: 1,
    frets:   [0, 2, 2, 2, 3, 0],
    fingers: [0, 1, 2, 3, 4, 0],
  },
  {
    name: 'F7sus4', fullName: 'F Dominant 7 Sus4', root: 'F', type: '7sus4',
    baseFret: 1,
    frets:   [-1, 1, 3, 3, 4, 1],
    fingers: [ 0, 1, 3, 4, 2, 1],
    barre: { fret: 1, fromString: 1, toString: 5 },
  },
  {
    name: 'B7sus4', fullName: 'B Dominant 7 Sus4', root: 'B', type: '7sus4',
    baseFret: 1,
    frets:   [-1, 2, 4, 2, 0, 0],
    fingers: [ 0, 1, 3, 2, 0, 0],
  },

  // ─── add9 remaining ──────────────────────────────────
  {
    name: 'Fadd9', fullName: 'F Add 9', root: 'F', type: 'add9',
    baseFret: 1,
    frets:   [-1, -1, 3, 2, 1, 3],
    fingers: [ 0,  0, 4, 3, 1, 2],
  },
  {
    name: 'Badd9', fullName: 'B Add 9', root: 'B', type: 'add9',
    baseFret: 1,
    frets:   [-1, 2, 1, -1, 2, 2],
    fingers: [ 0, 2, 1,  0, 3, 4],
  },

  // ─── Natural roots remaining ──────────────────────────
  {
    name: 'Fm6', fullName: 'F Minor 6th', root: 'F', type: 'm6',
    baseFret: 1,
    frets:   [-1, -1, 3, 1, 3, 1],
    fingers: [ 0,  0, 3, 1, 4, 2],
  },
  {
    name: 'Fm9', fullName: 'F Minor 9th', root: 'F', type: 'm9',
    baseFret: 1,
    frets:   [1, 3, 1, 0, 4, 1],
    fingers: [1, 3, 1, 0, 4, 2],
    barre: { fret: 1, fromString: 0, toString: 5 },
  },
  {
    name: 'Gm9', fullName: 'G Minor 9th', root: 'G', type: 'm9',
    baseFret: 1,
    frets:   [3, 1, 3, 2, 3, 3],
    fingers: [3, 1, 3, 2, 3, 3],
    barre: { fret: 3, fromString: 0, toString: 5 },
  },

  // ─── Accidental power chords (5) ─────────────────────
  {
    name: 'A#5', fullName: 'A# Power Chord', root: 'A#', type: '5',
    baseFret: 1,
    frets:   [-1, 1, 3, 3, -1, -1],
    fingers: [ 0, 1, 3, 4,  0,  0],
  },
  {
    name: 'C#5', fullName: 'C# Power Chord', root: 'C#', type: '5',
    baseFret: 4,
    frets:   [-1, 1, 3, 3, -1, -1],
    fingers: [ 0, 1, 3, 4,  0,  0],
  },
  {
    name: 'D#5', fullName: 'D# Power Chord', root: 'D#', type: '5',
    baseFret: 6,
    frets:   [-1, 1, 3, 3, -1, -1],
    fingers: [ 0, 1, 3, 4,  0,  0],
  },
  {
    name: 'F#5', fullName: 'F# Power Chord', root: 'F#', type: '5',
    baseFret: 2,
    frets:   [1, 3, 3, -1, -1, -1],
    fingers: [1, 3, 4,  0,  0,  0],
  },
  {
    name: 'G#5', fullName: 'G# Power Chord', root: 'G#', type: '5',
    baseFret: 4,
    frets:   [1, 3, 3, -1, -1, -1],
    fingers: [1, 3, 4,  0,  0,  0],
  },

  // ─── Accidental dim chords ────────────────────────────
  {
    name: 'C#dim', fullName: 'C# Diminished', root: 'C#', type: 'dim',
    baseFret: 1,
    frets:   [-1, -1, 2, 3, 2, 3],
    fingers: [ 0,  0, 1, 3, 2, 4],
  },
  {
    name: 'D#dim', fullName: 'D# Diminished', root: 'D#', type: 'dim',
    baseFret: 1,
    frets:   [-1, -1, 1, 2, 1, 2],
    fingers: [ 0,  0, 1, 3, 2, 4],
  },
  {
    name: 'F#dim', fullName: 'F# Diminished', root: 'F#', type: 'dim',
    baseFret: 3,
    frets:   [-1, -1, 2, 3, 2, 3],
    fingers: [ 0,  0, 1, 3, 2, 4],
  },
  {
    name: 'G#dim', fullName: 'G# Diminished', root: 'G#', type: 'dim',
    baseFret: 1,
    frets:   [-1, -1, 0, 1, 0, 1],
    fingers: [ 0,  0, 0, 1, 0, 2],
  },
  {
    name: 'A#dim', fullName: 'A# Diminished', root: 'A#', type: 'dim',
    baseFret: 1,
    frets:   [-1, 1, 2, 0, 2, 3],
    fingers: [ 0, 1, 2, 0, 3, 4],
  },

  // ─── Accidental aug chords ────────────────────────────
  // All use the same relative shape; baseFret shifts the root
  {
    name: 'C#aug', fullName: 'C# Augmented', root: 'C#', type: 'aug',
    baseFret: 1,
    frets:   [-1, -1, 3, 2, 2, 1],
    fingers: [ 0,  0, 4, 2, 2, 1],
  },
  {
    name: 'D#aug', fullName: 'D# Augmented', root: 'D#', type: 'aug',
    baseFret: 3,
    frets:   [-1, -1, 3, 2, 2, 1],
    fingers: [ 0,  0, 4, 2, 2, 1],
  },
  {
    name: 'F#aug', fullName: 'F# Augmented', root: 'F#', type: 'aug',
    baseFret: 2,
    frets:   [-1, -1, 3, 2, 2, 1],
    fingers: [ 0,  0, 4, 2, 2, 1],
  },
  {
    name: 'G#aug', fullName: 'G# Augmented', root: 'G#', type: 'aug',
    baseFret: 4,
    frets:   [-1, -1, 3, 2, 2, 1],
    fingers: [ 0,  0, 4, 2, 2, 1],
  },
  {
    name: 'A#aug', fullName: 'A# Augmented', root: 'A#', type: 'aug',
    baseFret: 6,
    frets:   [-1, -1, 3, 2, 2, 1],
    fingers: [ 0,  0, 4, 2, 2, 1],
  },

  // ─── Accidental 6th chords ────────────────────────────
  {
    name: 'A#6', fullName: 'A# Major 6th', root: 'A#', type: '6',
    baseFret: 1,
    frets:   [-1, 1, 3, 3, 3, 3],
    fingers: [ 0, 1, 3, 3, 3, 3],
    barre: { fret: 3, fromString: 2, toString: 5 },
  },
  {
    name: 'C#6', fullName: 'C# Major 6th', root: 'C#', type: '6',
    baseFret: 4,
    frets:   [-1, 1, 3, 3, 3, 3],
    fingers: [ 0, 1, 3, 3, 3, 3],
    barre: { fret: 3, fromString: 2, toString: 5 },
  },
  {
    name: 'D#6', fullName: 'D# Major 6th', root: 'D#', type: '6',
    baseFret: 6,
    frets:   [-1, 1, 3, 3, 3, 3],
    fingers: [ 0, 1, 3, 3, 3, 3],
    barre: { fret: 3, fromString: 2, toString: 5 },
  },
  {
    name: 'F#6', fullName: 'F# Major 6th', root: 'F#', type: '6',
    baseFret: 2,
    frets:   [1, 3, 3, 2, 3, 1],
    fingers: [1, 3, 3, 2, 4, 1],
    barre: { fret: 1, fromString: 0, toString: 5 },
  },
  {
    name: 'G#6', fullName: 'G# Major 6th', root: 'G#', type: '6',
    baseFret: 4,
    frets:   [1, 3, 3, 2, 3, 1],
    fingers: [1, 3, 3, 2, 4, 1],
    barre: { fret: 1, fromString: 0, toString: 5 },
  },

  // ─── Accidental add9 chords ───────────────────────────
  {
    name: 'A#add9', fullName: 'A# Add 9', root: 'A#', type: 'add9',
    baseFret: 1,
    frets:   [-1, 1, 0, 3, 1, 1],
    fingers: [ 0, 1, 0, 4, 2, 2],
  },
  {
    name: 'C#add9', fullName: 'C# Add 9', root: 'C#', type: 'add9',
    baseFret: 1,
    frets:   [-1, 4, 3, 1, 4, -1],
    fingers: [ 0, 3, 2, 1, 4,  0],
  },
  {
    name: 'D#add9', fullName: 'D# Add 9', root: 'D#', type: 'add9',
    baseFret: 3,
    frets:   [-1, 4, 1, 0, 2, -1],
    fingers: [ 0, 4, 1, 0, 2,  0],
  },
  {
    name: 'F#add9', fullName: 'F# Add 9', root: 'F#', type: 'add9',
    baseFret: 1,
    frets:   [-1, -1, 4, 3, 2, 4],
    fingers: [ 0,  0, 4, 3, 2, 1],
  },
  {
    name: 'G#add9', fullName: 'G# Add 9', root: 'G#', type: 'add9',
    baseFret: 4,
    frets:   [-1, -1, 3, 2, 1, 3],
    fingers: [ 0,  0, 4, 3, 1, 2],
  },

  // ─── Accidental dominant 9th chords ──────────────────
  {
    name: 'A#9', fullName: 'A# Dominant 9th', root: 'A#', type: '9',
    baseFret: 1,
    frets:   [-1, 1, 0, 1, 1, 1],
    fingers: [ 0, 1, 0, 1, 1, 1],
    barre: { fret: 1, fromString: 1, toString: 5 },
  },
  {
    name: 'C#9', fullName: 'C# Dominant 9th', root: 'C#', type: '9',
    baseFret: 3,
    frets:   [-1, 2, 1, 2, 2, -1],
    fingers: [ 0, 2, 1, 3, 4,  0],
  },
  {
    name: 'D#9', fullName: 'D# Dominant 9th', root: 'D#', type: '9',
    baseFret: 5,
    frets:   [-1, 2, 1, 2, 2, -1],
    fingers: [ 0, 2, 1, 3, 4,  0],
  },
  // E-shape 9th: barre at fret1, middle on G, ring on A, pinky on e
  {
    name: 'F#9', fullName: 'F# Dominant 9th', root: 'F#', type: '9',
    baseFret: 2,
    frets:   [1, 3, 1, 2, 1, 3],
    fingers: [1, 3, 1, 2, 1, 4],
    barre: { fret: 1, fromString: 0, toString: 5 },
  },
  {
    name: 'G#9', fullName: 'G# Dominant 9th', root: 'G#', type: '9',
    baseFret: 4,
    frets:   [1, 3, 1, 2, 1, 3],
    fingers: [1, 3, 1, 2, 1, 4],
    barre: { fret: 1, fromString: 0, toString: 5 },
  },

  // ─── Accidental m6 chords ─────────────────────────────
  {
    name: 'A#m6', fullName: 'A# Minor 6th', root: 'A#', type: 'm6',
    baseFret: 1,
    frets:   [-1, 1, 3, 0, 2, 3],
    fingers: [ 0, 1, 3, 0, 2, 4],
  },
  // A-shape m6: ring barre on D+G strings, pinky on e
  {
    name: 'C#m6', fullName: 'C# Minor 6th', root: 'C#', type: 'm6',
    baseFret: 4,
    frets:   [-1, 1, 3, 3, 2, 3],
    fingers: [ 0, 1, 3, 3, 2, 4],
  },
  {
    name: 'D#m6', fullName: 'D# Minor 6th', root: 'D#', type: 'm6',
    baseFret: 6,
    frets:   [-1, 1, 3, 3, 2, 3],
    fingers: [ 0, 1, 3, 3, 2, 4],
  },
  // E-shape m6: barre at fret1, ring barre on A+D, pinky on B
  {
    name: 'F#m6', fullName: 'F# Minor 6th', root: 'F#', type: 'm6',
    baseFret: 2,
    frets:   [1, 3, 3, 1, 3, 1],
    fingers: [1, 3, 3, 1, 4, 1],
    barre: { fret: 1, fromString: 0, toString: 5 },
  },
  {
    name: 'G#m6', fullName: 'G# Minor 6th', root: 'G#', type: 'm6',
    baseFret: 4,
    frets:   [1, 3, 3, 1, 3, 1],
    fingers: [1, 3, 3, 1, 4, 1],
    barre: { fret: 1, fromString: 0, toString: 5 },
  },

  // ─── m9 / 7sus4 / maj9 — accidental roots ────────────────────────────────

  // A# m9: root(A#), b7(G#), 9th(C), 5th(F) — shell voicing, m3 omitted
  {
    name: 'A#m9', fullName: 'A# Minor 9th', root: 'A#', type: 'm9',
    baseFret: 1,
    frets:   [-1, 1, 3, 1, 1, 1],
    fingers: [ 0, 1, 3, 1, 1, 1],
    barre: { fret: 1, fromString: 1, toString: 5 },
  },
  // A# 7sus4: root(A#), sus4(D#), 5th(F), b7(G#)
  {
    name: 'A#7sus4', fullName: 'A# Dominant 7 Sus4', root: 'A#', type: '7sus4',
    baseFret: 1,
    frets:   [-1, 1, 1, 1, 4, 1],
    fingers: [ 0, 1, 1, 1, 4, 1],
    barre: { fret: 1, fromString: 1, toString: 5 },
  },
  // A# maj9: root(A#), 3rd(D open), 5th(F), maj7(A), 9th(C)
  {
    name: 'A#maj9', fullName: 'A# Major 9th', root: 'A#', type: 'maj9',
    baseFret: 1,
    frets:   [-1, 1, 0, 2, 1, 1],
    fingers: [ 0, 1, 0, 2, 3, 3],
  },

  // C# m9: root(C#), 5th(G#), b7(B), 9th(D#), m3(E open)
  {
    name: 'C#m9', fullName: 'C# Minor 9th', root: 'C#', type: 'm9',
    baseFret: 4,
    frets:   [-1, 1, 3, 1, 1, 0],
    fingers: [ 0, 1, 3, 1, 2, 0],
    barre: { fret: 1, fromString: 1, toString: 4 },
  },
  // C# 7sus4: root(C#), sus4(F#), 5th(G#), b7(B)
  {
    name: 'C#7sus4', fullName: 'C# Dominant 7 Sus4', root: 'C#', type: '7sus4',
    baseFret: 4,
    frets:   [-1, 1, 1, 1, 4, 1],
    fingers: [ 0, 1, 1, 1, 4, 1],
    barre: { fret: 1, fromString: 1, toString: 5 },
  },
  // C# maj9: root(C#), 3rd(F), maj7(C), 9th(D#) — 5th omitted
  {
    name: 'C#maj9', fullName: 'C# Major 9th', root: 'C#', type: 'maj9',
    baseFret: 3,
    frets:   [-1, 2, 1, 3, 2, -1],
    fingers: [ 0, 2, 1, 3, 4,  0],
  },

  // D# m9: root(D#), 5th(A#), b7(C#), 9th(F) — shell voicing, m3 omitted
  {
    name: 'D#m9', fullName: 'D# Minor 9th', root: 'D#', type: 'm9',
    baseFret: 6,
    frets:   [-1, 1, 3, 1, 1, 1],
    fingers: [ 0, 1, 3, 1, 1, 1],
    barre: { fret: 1, fromString: 1, toString: 5 },
  },
  // D# 7sus4: root(D#), sus4(G#), b7(C#), 5th(A#)
  {
    name: 'D#7sus4', fullName: 'D# Dominant 7 Sus4', root: 'D#', type: '7sus4',
    baseFret: 6,
    frets:   [-1, 1, 1, 1, 4, 1],
    fingers: [ 0, 1, 1, 1, 4, 1],
    barre: { fret: 1, fromString: 1, toString: 5 },
  },
  // D# maj9: root(D#), 3rd(G open), maj7(D), 9th(F) — 5th omitted
  {
    name: 'D#maj9', fullName: 'D# Major 9th', root: 'D#', type: 'maj9',
    baseFret: 1,
    frets:   [-1, -1, 1, 0, 3, 1],
    fingers: [  0,  0, 1, 0, 3, 2],
  },

  // F# m9: root(F#), m3(A), 5th(C#), b7(E), 9th(G#)
  {
    name: 'F#m9', fullName: 'F# Minor 9th', root: 'F#', type: 'm9',
    baseFret: 2,
    frets:   [1, 3, 1, 1, 1, 3],
    fingers: [1, 3, 1, 1, 1, 4],
    barre: { fret: 1, fromString: 0, toString: 5 },
  },
  // F# 7sus4: root(F#), sus4(B), 5th(C#), b7(E)
  {
    name: 'F#7sus4', fullName: 'F# Dominant 7 Sus4', root: 'F#', type: '7sus4',
    baseFret: 2,
    frets:   [1, 3, 3, 3, 4, 1],
    fingers: [1, 3, 3, 3, 4, 1],
    barre: { fret: 1, fromString: 0, toString: 5 },
  },
  // F# maj9: root(F#), 3rd(A#), 5th(C#), maj7(F), 9th(G#)
  {
    name: 'F#maj9', fullName: 'F# Major 9th', root: 'F#', type: 'maj9',
    baseFret: 2,
    frets:   [1, 3, 2, 2, 1, 3],
    fingers: [1, 3, 2, 2, 1, 4],
    barre: { fret: 1, fromString: 0, toString: 5 },
  },

  // G# m9: root(G#), m3(B), 5th(D#), b7(F#), 9th(A#)
  {
    name: 'G#m9', fullName: 'G# Minor 9th', root: 'G#', type: 'm9',
    baseFret: 4,
    frets:   [1, 3, 1, 1, 1, 3],
    fingers: [1, 3, 1, 1, 1, 4],
    barre: { fret: 1, fromString: 0, toString: 5 },
  },
  // G# 7sus4: root(G#), sus4(C#), 5th(D#), b7(F#)
  {
    name: 'G#7sus4', fullName: 'G# Dominant 7 Sus4', root: 'G#', type: '7sus4',
    baseFret: 4,
    frets:   [1, 3, 3, 3, 4, 1],
    fingers: [1, 3, 3, 3, 4, 1],
    barre: { fret: 1, fromString: 0, toString: 5 },
  },
  // G# maj9: root(G#), 3rd(C), 5th(D#), maj7(G), 9th(A#)
  {
    name: 'G#maj9', fullName: 'G# Major 9th', root: 'G#', type: 'maj9',
    baseFret: 4,
    frets:   [1, 3, 2, 2, 1, 3],
    fingers: [1, 3, 2, 2, 1, 4],
    barre: { fret: 1, fromString: 0, toString: 5 },
  },
]

export function getChordBySlug(slug) {
  return GUITAR_CHORDS.find(c => c.name.toLowerCase() === slug.toLowerCase())
}

export function getChordsForRoot(root) {
  return GUITAR_CHORDS.filter(c => c.root === root)
}
