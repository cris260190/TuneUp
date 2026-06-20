// 5-String Banjo Chord Data
// Standard tuning: Open G — g D G B d  (5th string is a short drone string, highest pitched after the 1st)
//
// String order in arrays: [5th(g), 4th(D), 3rd(G), 2nd(B), 1st(D)]
//   index 0 = 5th string (short drone string — physically starts at fret 5, not fret 0)
//   index 1 = 4th string (D, lowest/thickest)
//   index 2 = 3rd string (G)
//   index 3 = 2nd string (B)
//   index 4 = 1st string (D, highest of the "full length" strings)
//
// IMPORTANT — 5th string quirk:
//   The 5th string is a short drone string that physically starts at the 5th fret (it has no
//   fret positions below that). In most shapes it's simply left open (frets[0] = 0, meaning
//   "open 5th string", which sounds the note G). If a chord needs the 5th string fretted,
//   the fret number given is the ACTUAL fret on the instrument (e.g. 7, not relative to baseFret),
//   since the 5th string's playable range starts at fret 5. The `fifthStringNote` field is given
//   for reference/display.
//
// frets: -1 = muted/not played, 0 = open, n = fret n (relative to baseFret, EXCEPT index 0 — see above)
// fingers: 0 = no finger, 1-4 = finger number
// barre: optional { fret, fromString, toString } — fromString/toString use indices 1-4 (the 4 full-length strings); the 5th string (index 0) is never part of a barre

export const BANJO_CHORD_ROOTS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
export const BANJO_CHORD_TYPES = ['Major', 'Minor', '7', 'maj7', 'm7', 'sus2', 'sus4', '6', 'm6', 'add9', 'dim', 'aug', '9']

export const BANJO_CHORDS = [

  // ─── C ───────────────────────────────────────────────────
  { name: 'C',      fullName: 'C Major',           root: 'C', type: 'Major', baseFret: 1, frets: [0, 2, 1, 0, 0], fingers: [0, 2, 1, 0, 0] },
  { name: 'Cm',     fullName: 'C Minor',            root: 'C', type: 'Minor', baseFret: 1, frets: [0, 1, 1, 0, 1], fingers: [0, 1, 1, 0, 2], barre: { fret: 1, fromString: 1, toString: 2 } },
  { name: 'C7',     fullName: 'C Dominant 7th',     root: 'C', type: '7',    baseFret: 1, frets: [0, 2, 1, 3, 0], fingers: [0, 2, 1, 3, 0] },
  { name: 'Cmaj7',  fullName: 'C Major 7th',        root: 'C', type: 'maj7', baseFret: 1, frets: [0, 2, 0, 0, 0], fingers: [0, 2, 0, 0, 0] },
  { name: 'Cm7',    fullName: 'C Minor 7th',        root: 'C', type: 'm7',   baseFret: 1, frets: [0, 1, 1, 3, 1], fingers: [0, 1, 1, 4, 2], barre: { fret: 1, fromString: 1, toString: 2 } },
  { name: 'Csus2',  fullName: 'C Suspended 2nd',    root: 'C', type: 'sus2', baseFret: 1, frets: [0, 0, 1, 0, 0], fingers: [0, 0, 1, 0, 0] },
  { name: 'Csus4',  fullName: 'C Suspended 4th',    root: 'C', type: 'sus4', baseFret: 1, frets: [0, 3, 1, 0, 1], fingers: [0, 3, 1, 0, 2] },
  { name: 'C6',     fullName: 'C Major 6th',        root: 'C', type: '6',    baseFret: 1, frets: [0, 2, 1, 2, 0], fingers: [0, 3, 1, 2, 0] },
  { name: 'Cm6',    fullName: 'C Minor 6th',        root: 'C', type: 'm6',   baseFret: 1, frets: [0, 1, 1, 2, 1], fingers: [0, 1, 1, 3, 2], barre: { fret: 1, fromString: 1, toString: 2 } },
  { name: 'Cadd9',  fullName: 'C Add 9',            root: 'C', type: 'add9', baseFret: 1, frets: [0, 2, 1, 0, 3], fingers: [0, 2, 1, 0, 4] },
  { name: 'Cdim',   fullName: 'C Diminished',       root: 'C', type: 'dim',  baseFret: 1, frets: [0, 1, 1, 2, 4], fingers: [0, 1, 1, 2, 4], barre: { fret: 1, fromString: 1, toString: 2 } },
  { name: 'Caug',   fullName: 'C Augmented',        root: 'C', type: 'aug',  baseFret: 1, frets: [0, 2, 1, 1, 0], fingers: [0, 3, 1, 2, 0] },
  { name: 'C9',     fullName: 'C Dominant 9th',     root: 'C', type: '9',   baseFret: 1, frets: [0, 2, 1, 3, 3], fingers: [0, 1, 0, 2, 3] },

  // ─── C# ──────────────────────────────────────────────────
  { name: 'C#',      fullName: 'C# Major',          root: 'C#', type: 'Major', baseFret: 1, frets: [0, 3, 2, 1, 1], fingers: [0, 4, 3, 1, 2] },
  { name: 'C#m',     fullName: 'C# Minor',           root: 'C#', type: 'Minor', baseFret: 1, frets: [0, 2, 2, 1, 2], fingers: [0, 2, 3, 1, 4], barre: { fret: 2, fromString: 1, toString: 2 } },
  { name: 'C#7',     fullName: 'C# Dominant 7th',    root: 'C#', type: '7',    baseFret: 1, frets: [0, 3, 2, 4, 1], fingers: [0, 3, 2, 4, 1] },
  { name: 'C#maj7',  fullName: 'C# Major 7th',       root: 'C#', type: 'maj7', baseFret: 1, frets: [0, 3, 1, 1, 1], fingers: [0, 4, 1, 1, 1], barre: { fret: 1, fromString: 2, toString: 4 } },
  { name: 'C#m7',    fullName: 'C# Minor 7th',       root: 'C#', type: 'm7',   baseFret: 1, frets: [0, 2, 2, 4, 2], fingers: [0, 1, 1, 4, 2], barre: { fret: 2, fromString: 1, toString: 2 } },
  { name: 'C#sus2',  fullName: 'C# Suspended 2nd',   root: 'C#', type: 'sus2', baseFret: 1, frets: [0, 1, 2, 1, 1], fingers: [0, 1, 3, 1, 1], barre: { fret: 1, fromString: 1, toString: 4 } },
  { name: 'C#sus4',  fullName: 'C# Suspended 4th',   root: 'C#', type: 'sus4', baseFret: 1, frets: [0, 4, 2, 1, 2], fingers: [0, 4, 2, 1, 3] },
  { name: 'C#6',     fullName: 'C# Major 6th',       root: 'C#', type: '6',    baseFret: 1, frets: [0, 3, 2, 3, 1], fingers: [0, 3, 2, 4, 1] },
  { name: 'C#m6',    fullName: 'C# Minor 6th',       root: 'C#', type: 'm6',   baseFret: 1, frets: [0, 2, 2, 3, 2], fingers: [0, 1, 1, 4, 2], barre: { fret: 2, fromString: 1, toString: 2 } },
  { name: 'C#add9',  fullName: 'C# Add 9',           root: 'C#', type: 'add9', baseFret: 1, frets: [0, 3, 2, 1, 4], fingers: [0, 3, 2, 1, 4] },
  { name: 'C#dim',   fullName: 'C# Diminished',      root: 'C#', type: 'dim',  baseFret: 1, frets: [0, 2, 2, 3, 5], fingers: [0, 1, 1, 3, 4], barre: { fret: 2, fromString: 1, toString: 2 } },
  { name: 'C#aug',   fullName: 'C# Augmented',       root: 'C#', type: 'aug',  baseFret: 1, frets: [0, 3, 2, 2, 1], fingers: [0, 4, 2, 3, 1] },
  { name: 'C#9',     fullName: 'C# Dominant 9th',    root: 'C#', type: '9',   baseFret: 1, frets: [0, 3, 2, 4, 4], fingers: [0, 1, 0, 2, 3] },

  // ─── D ───────────────────────────────────────────────────
  { name: 'D',      fullName: 'D Major',            root: 'D', type: 'Major', baseFret: 1, frets: [0, 0, 2, 1, 2], fingers: [0, 0, 2, 1, 3] },
  { name: 'Dm',     fullName: 'D Minor',             root: 'D', type: 'Minor', baseFret: 1, frets: [0, 0, 2, 1, 1], fingers: [0, 0, 3, 1, 1], barre: { fret: 1, fromString: 3, toString: 4 } },
  { name: 'D7',     fullName: 'D Dominant 7th',      root: 'D', type: '7',    baseFret: 1, frets: [0, 0, 2, 1, 0], fingers: [0, 0, 2, 1, 0] },
  { name: 'Dmaj7',  fullName: 'D Major 7th',         root: 'D', type: 'maj7', baseFret: 1, frets: [0, 0, 2, 2, 2], fingers: [0, 0, 1, 1, 1], barre: { fret: 2, fromString: 2, toString: 4 } },
  { name: 'Dm7',    fullName: 'D Minor 7th',         root: 'D', type: 'm7',   baseFret: 1, frets: [0, 0, 2, 1, 3], fingers: [0, 0, 2, 1, 3] },
  { name: 'Dsus2',  fullName: 'D Suspended 2nd',     root: 'D', type: 'sus2', baseFret: 1, frets: [0, 0, 2, 0, 0], fingers: [0, 0, 1, 0, 0] },
  { name: 'Dsus4',  fullName: 'D Suspended 4th',     root: 'D', type: 'sus4', baseFret: 1, frets: [0, 0, 0, 1, 3], fingers: [0, 0, 0, 1, 3] },
  { name: 'D6',     fullName: 'D Major 6th',         root: 'D', type: '6',    baseFret: 1, frets: [0, 0, 2, 1, 4], fingers: [0, 0, 2, 1, 4] },
  { name: 'Dm6',    fullName: 'D Minor 6th',         root: 'D', type: 'm6',   baseFret: 1, frets: [0, 0, 2, 1, 1], fingers: [0, 0, 3, 1, 2] },
  { name: 'Dadd9',  fullName: 'D Add 9',             root: 'D', type: 'add9', baseFret: 1, frets: [0, 0, 2, 0, 0], fingers: [0, 0, 1, 0, 0] },
  { name: 'Ddim',   fullName: 'D Diminished',        root: 'D', type: 'dim',  baseFret: 1, frets: [0, 0, 2, 1, 0], fingers: [0, 0, 2, 1, 0] },
  { name: 'Daug',   fullName: 'D Augmented',         root: 'D', type: 'aug',  baseFret: 1, frets: [0, 0, 2, 2, 2], fingers: [0, 0, 1, 2, 3] },
  { name: 'D9',     fullName: 'D Dominant 9th',      root: 'D', type: '9',   baseFret: 1, frets: [0, 0, 2, 1, 0], fingers: [0, 0, 2, 1, 0] },

  // ─── D# ──────────────────────────────────────────────────
  { name: 'D#',      fullName: 'D# Major',           root: 'D#', type: 'Major', baseFret: 1, frets: [0, 1, 3, 2, 3], fingers: [0, 1, 3, 2, 4] },
  { name: 'D#m',     fullName: 'D# Minor',            root: 'D#', type: 'Minor', baseFret: 1, frets: [0, 1, 3, 2, 2], fingers: [0, 1, 4, 2, 3] },
  { name: 'D#7',     fullName: 'D# Dominant 7th',     root: 'D#', type: '7',    baseFret: 1, frets: [0, 1, 3, 2, 1], fingers: [0, 1, 3, 2, 1], barre: { fret: 1, fromString: 1, toString: 4 } },
  { name: 'D#maj7',  fullName: 'D# Major 7th',        root: 'D#', type: 'maj7', baseFret: 1, frets: [0, 1, 3, 3, 3], fingers: [0, 1, 2, 2, 2], barre: { fret: 3, fromString: 2, toString: 4 } },
  { name: 'D#m7',    fullName: 'D# Minor 7th',        root: 'D#', type: 'm7',   baseFret: 1, frets: [0, 1, 3, 2, 4], fingers: [0, 1, 3, 2, 4] },
  { name: 'D#sus2',  fullName: 'D# Suspended 2nd',    root: 'D#', type: 'sus2', baseFret: 1, frets: [0, 1, 3, 1, 1], fingers: [0, 1, 4, 1, 1], barre: { fret: 1, fromString: 1, toString: 4 } },
  { name: 'D#sus4',  fullName: 'D# Suspended 4th',    root: 'D#', type: 'sus4', baseFret: 1, frets: [0, 1, 1, 2, 4], fingers: [0, 1, 1, 2, 4], barre: { fret: 1, fromString: 1, toString: 2 } },
  { name: 'D#6',     fullName: 'D# Major 6th',        root: 'D#', type: '6',    baseFret: 1, frets: [0, 1, 3, 2, 5], fingers: [0, 1, 3, 2, 4] },
  { name: 'D#m6',    fullName: 'D# Minor 6th',        root: 'D#', type: 'm6',   baseFret: 1, frets: [0, 1, 3, 2, 2], fingers: [0, 1, 4, 2, 3] },
  { name: 'D#add9',  fullName: 'D# Add 9',            root: 'D#', type: 'add9', baseFret: 1, frets: [0, 1, 3, 1, 1], fingers: [0, 1, 4, 1, 1], barre: { fret: 1, fromString: 1, toString: 4 } },
  { name: 'D#dim',   fullName: 'D# Diminished',       root: 'D#', type: 'dim',  baseFret: 1, frets: [0, 1, 3, 2, 1], fingers: [0, 1, 4, 3, 1], barre: { fret: 1, fromString: 1, toString: 4 } },
  { name: 'D#aug',   fullName: 'D# Augmented',        root: 'D#', type: 'aug',  baseFret: 1, frets: [0, 1, 3, 3, 3], fingers: [0, 1, 2, 3, 4] },
  { name: 'D#9',     fullName: 'D# Dominant 9th',     root: 'D#', type: '9',   baseFret: 1, frets: [0, 1, 3, 2, 1], fingers: [0, 1, 3, 2, 1], barre: { fret: 1, fromString: 1, toString: 4 } },

  // ─── E ───────────────────────────────────────────────────
  { name: 'E',      fullName: 'E Major',            root: 'E', type: 'Major', baseFret: 1, frets: [0, 2, 4, 3, 0], fingers: [0, 1, 3, 2, 0] },
  { name: 'Em',     fullName: 'E Minor',             root: 'E', type: 'Minor', baseFret: 1, frets: [0, 2, 4, 3, 3], fingers: [0, 1, 4, 2, 3] },
  { name: 'E7',     fullName: 'E Dominant 7th',      root: 'E', type: '7',    baseFret: 1, frets: [0, 2, 1, 3, 0], fingers: [0, 2, 1, 3, 0] },
  { name: 'Emaj7',  fullName: 'E Major 7th',         root: 'E', type: 'maj7', baseFret: 1, frets: [0, 2, 4, 4, 0], fingers: [0, 1, 2, 3, 0] },
  { name: 'Em7',    fullName: 'E Minor 7th',         root: 'E', type: 'm7',   baseFret: 1, frets: [0, 2, 0, 3, 0], fingers: [0, 2, 0, 3, 0] },
  { name: 'Esus2',  fullName: 'E Suspended 2nd',     root: 'E', type: 'sus2', baseFret: 1, frets: [0, 2, 4, 1, 0], fingers: [0, 2, 4, 1, 0] },
  { name: 'Esus4',  fullName: 'E Suspended 4th',     root: 'E', type: 'sus4', baseFret: 1, frets: [0, 2, 4, 3, 5], fingers: [0, 1, 3, 2, 4] },
  { name: 'E6',     fullName: 'E Major 6th',         root: 'E', type: '6',    baseFret: 1, frets: [0, 2, 1, 3, 2], fingers: [0, 2, 1, 4, 3] },
  { name: 'Em6',    fullName: 'E Minor 6th',         root: 'E', type: 'm6',   baseFret: 1, frets: [0, 2, 1, 0, 2], fingers: [0, 3, 1, 0, 4] },
  { name: 'Eadd9',  fullName: 'E Add 9',             root: 'E', type: 'add9', baseFret: 1, frets: [0, 2, 4, 3, 2], fingers: [0, 1, 4, 3, 1], barre: { fret: 2, fromString: 1, toString: 4 } },
  { name: 'Edim',   fullName: 'E Diminished',        root: 'E', type: 'dim',  baseFret: 1, frets: [0, 2, 0, 3, 2], fingers: [0, 2, 0, 4, 1], barre: { fret: 2, fromString: 1, toString: 4 } },
  { name: 'Eaug',   fullName: 'E Augmented',         root: 'E', type: 'aug',  baseFret: 1, frets: [0, 2, 4, 4, 1], fingers: [0, 1, 3, 4, 1], barre: { fret: 1, fromString: 1, toString: 4 } },
  { name: 'E9',     fullName: 'E Dominant 9th',      root: 'E', type: '9',   baseFret: 1, frets: [0, 2, 1, 1, 2], fingers: [0, 3, 1, 1, 4], barre: { fret: 1, fromString: 2, toString: 3 } },

  // ─── F ───────────────────────────────────────────────────
  { name: 'F',      fullName: 'F Major',            root: 'F', type: 'Major', baseFret: 1, frets: [0, 3, 2, 1, 1], fingers: [0, 4, 3, 1, 1], barre: { fret: 1, fromString: 3, toString: 4 } },
  { name: 'Fm',     fullName: 'F Minor',             root: 'F', type: 'Minor', baseFret: 1, frets: [0, 3, 1, 1, 1], fingers: [0, 4, 1, 1, 1], barre: { fret: 1, fromString: 2, toString: 4 } },
  { name: 'F7',     fullName: 'F Dominant 7th',      root: 'F', type: '7',    baseFret: 1, frets: [0, 3, 2, 4, 1], fingers: [0, 2, 1, 4, 1], barre: { fret: 1, fromString: 1, toString: 4 } },
  { name: 'Fmaj7',  fullName: 'F Major 7th',         root: 'F', type: 'maj7', baseFret: 1, frets: [0, 3, 2, 0, 1], fingers: [0, 3, 2, 0, 1] },
  { name: 'Fm7',    fullName: 'F Minor 7th',         root: 'F', type: 'm7',   baseFret: 1, frets: [0, 3, 1, 4, 1], fingers: [0, 2, 1, 4, 1], barre: { fret: 1, fromString: 1, toString: 4 } },
  { name: 'Fsus2',  fullName: 'F Suspended 2nd',     root: 'F', type: 'sus2', baseFret: 1, frets: [0, 3, 0, 1, 1], fingers: [0, 3, 0, 1, 1], barre: { fret: 1, fromString: 3, toString: 4 } },
  { name: 'Fsus4',  fullName: 'F Suspended 4th',     root: 'F', type: 'sus4', baseFret: 1, frets: [0, 3, 3, 1, 1], fingers: [0, 3, 4, 1, 1], barre: { fret: 1, fromString: 3, toString: 4 } },
  { name: 'F6',     fullName: 'F Major 6th',         root: 'F', type: '6',    baseFret: 1, frets: [0, 3, 2, 3, 1], fingers: [0, 3, 1, 4, 1], barre: { fret: 1, fromString: 2, toString: 4 } },
  { name: 'Fm6',    fullName: 'F Minor 6th',         root: 'F', type: 'm6',   baseFret: 1, frets: [0, 3, 1, 3, 1], fingers: [0, 3, 1, 4, 1], barre: { fret: 1, fromString: 2, toString: 4 } },
  { name: 'Fadd9',  fullName: 'F Add 9',             root: 'F', type: 'add9', baseFret: 1, frets: [0, 3, 2, 1, 3], fingers: [0, 3, 2, 1, 4] },
  { name: 'Fdim',   fullName: 'F Diminished',        root: 'F', type: 'dim',  baseFret: 1, frets: [0, 3, 1, 4, 1], fingers: [0, 3, 1, 4, 1], barre: { fret: 1, fromString: 2, toString: 4 } },
  { name: 'Faug',   fullName: 'F Augmented',         root: 'F', type: 'aug',  baseFret: 1, frets: [0, 3, 2, 1, 2], fingers: [0, 4, 3, 1, 2], barre: { fret: 1, fromString: 3, toString: 4 } },
  { name: 'F9',     fullName: 'F Dominant 9th',      root: 'F', type: '9',   baseFret: 1, frets: [0, 3, 2, 4, 4], fingers: [0, 1, 0, 3, 4] },

  // ─── F# ──────────────────────────────────────────────────
  { name: 'F#',      fullName: 'F# Major',           root: 'F#', type: 'Major', baseFret: 1, frets: [0, 4, 3, 2, 2], fingers: [0, 4, 3, 1, 1], barre: { fret: 2, fromString: 3, toString: 4 } },
  { name: 'F#m',     fullName: 'F# Minor',            root: 'F#', type: 'Minor', baseFret: 1, frets: [0, 4, 2, 2, 2], fingers: [0, 4, 1, 1, 1], barre: { fret: 2, fromString: 2, toString: 4 } },
  { name: 'F#7',     fullName: 'F# Dominant 7th',     root: 'F#', type: '7',    baseFret: 1, frets: [0, 4, 3, 5, 2], fingers: [0, 2, 1, 4, 1], barre: { fret: 2, fromString: 1, toString: 4 } },
  { name: 'F#maj7',  fullName: 'F# Major 7th',        root: 'F#', type: 'maj7', baseFret: 1, frets: [0, 4, 3, 1, 2], fingers: [0, 4, 3, 1, 2] },
  { name: 'F#m7',    fullName: 'F# Minor 7th',        root: 'F#', type: 'm7',   baseFret: 1, frets: [0, 4, 2, 5, 2], fingers: [0, 2, 1, 4, 1], barre: { fret: 2, fromString: 1, toString: 4 } },
  { name: 'F#sus2',  fullName: 'F# Suspended 2nd',    root: 'F#', type: 'sus2', baseFret: 1, frets: [0, 4, 1, 2, 2], fingers: [0, 4, 1, 2, 2], barre: { fret: 2, fromString: 3, toString: 4 } },
  { name: 'F#sus4',  fullName: 'F# Suspended 4th',    root: 'F#', type: 'sus4', baseFret: 1, frets: [0, 4, 4, 2, 2], fingers: [0, 3, 4, 1, 1], barre: { fret: 2, fromString: 3, toString: 4 } },
  { name: 'F#6',     fullName: 'F# Major 6th',        root: 'F#', type: '6',    baseFret: 1, frets: [0, 4, 3, 4, 2], fingers: [0, 3, 1, 4, 1], barre: { fret: 2, fromString: 2, toString: 4 } },
  { name: 'F#m6',    fullName: 'F# Minor 6th',        root: 'F#', type: 'm6',   baseFret: 1, frets: [0, 4, 2, 4, 2], fingers: [0, 3, 1, 4, 1], barre: { fret: 2, fromString: 2, toString: 4 } },
  { name: 'F#add9',  fullName: 'F# Add 9',            root: 'F#', type: 'add9', baseFret: 1, frets: [0, 4, 3, 2, 4], fingers: [0, 3, 2, 1, 4] },
  { name: 'F#dim',   fullName: 'F# Diminished',       root: 'F#', type: 'dim',  baseFret: 1, frets: [0, 4, 2, 5, 2], fingers: [0, 3, 1, 4, 1], barre: { fret: 2, fromString: 1, toString: 4 } },
  { name: 'F#aug',   fullName: 'F# Augmented',        root: 'F#', type: 'aug',  baseFret: 1, frets: [0, 4, 3, 2, 3], fingers: [0, 4, 2, 1, 3], barre: { fret: 2, fromString: 3, toString: 4 } },
  { name: 'F#9',     fullName: 'F# Dominant 9th',     root: 'F#', type: '9',   baseFret: 1, frets: [0, 4, 3, 5, 5], fingers: [0, 1, 0, 3, 4] },

  // ─── G ───────────────────────────────────────────────────
  { name: 'G',      fullName: 'G Major',            root: 'G', type: 'Major', baseFret: 1, frets: [0, 0, 0, 0, 0], fingers: [0, 0, 0, 0, 0] },
  { name: 'Gm',     fullName: 'G Minor',             root: 'G', type: 'Minor', baseFret: 1, frets: [0, 0, 3, 3, 3], fingers: [0, 0, 1, 1, 1], barre: { fret: 3, fromString: 2, toString: 4 } },
  { name: 'G7',     fullName: 'G Dominant 7th',      root: 'G', type: '7',    baseFret: 1, frets: [0, 0, 0, 0, 1], fingers: [0, 0, 0, 0, 1] },
  { name: 'Gmaj7',  fullName: 'G Major 7th',         root: 'G', type: 'maj7', baseFret: 1, frets: [0, 0, 0, 0, 2], fingers: [0, 0, 0, 0, 1] },
  { name: 'Gm7',    fullName: 'G Minor 7th',         root: 'G', type: 'm7',   baseFret: 1, frets: [0, 0, 3, 3, 1], fingers: [0, 0, 3, 4, 1] },
  { name: 'Gsus2',  fullName: 'G Suspended 2nd',     root: 'G', type: 'sus2', baseFret: 1, frets: [0, 0, 0, 0, 0], fingers: [0, 0, 0, 0, 0] },
  { name: 'Gsus4',  fullName: 'G Suspended 4th',     root: 'G', type: 'sus4', baseFret: 1, frets: [0, 0, 0, 1, 3], fingers: [0, 0, 0, 1, 3] },
  { name: 'G6',     fullName: 'G Major 6th',         root: 'G', type: '6',    baseFret: 1, frets: [0, 2, 0, 0, 0], fingers: [0, 1, 0, 0, 0] },
  { name: 'Gm6',    fullName: 'G Minor 6th',         root: 'G', type: 'm6',   baseFret: 1, frets: [0, 0, 3, 0, 0], fingers: [0, 0, 1, 0, 0] },
  { name: 'Gadd9',  fullName: 'G Add 9',             root: 'G', type: 'add9', baseFret: 1, frets: [0, 0, 0, 0, 2], fingers: [0, 0, 0, 0, 1] },
  { name: 'Gdim',   fullName: 'G Diminished',        root: 'G', type: 'dim',  baseFret: 1, frets: [0, 0, 3, 0, 1], fingers: [0, 0, 2, 0, 1] },
  { name: 'Gaug',   fullName: 'G Augmented',         root: 'G', type: 'aug',  baseFret: 1, frets: [0, 0, 0, 0, 1], fingers: [0, 0, 0, 0, 1] },
  { name: 'G9',     fullName: 'G Dominant 9th',      root: 'G', type: '9',   baseFret: 1, frets: [0, 0, 0, 0, 1], fingers: [0, 0, 0, 0, 1] },

  // ─── G# ──────────────────────────────────────────────────
  { name: 'G#',      fullName: 'G# Major',           root: 'G#', type: 'Major', baseFret: 1, frets: [0, 1, 1, 1, 1], fingers: [0, 1, 1, 1, 1], barre: { fret: 1, fromString: 1, toString: 4 } },
  { name: 'G#m',     fullName: 'G# Minor',            root: 'G#', type: 'Minor', baseFret: 1, frets: [0, 1, 4, 4, 4], fingers: [0, 1, 2, 2, 2], barre: { fret: 4, fromString: 2, toString: 4 } },
  { name: 'G#7',     fullName: 'G# Dominant 7th',     root: 'G#', type: '7',    baseFret: 1, frets: [0, 1, 1, 1, 2], fingers: [0, 1, 1, 1, 2], barre: { fret: 1, fromString: 1, toString: 3 } },
  { name: 'G#maj7',  fullName: 'G# Major 7th',        root: 'G#', type: 'maj7', baseFret: 1, frets: [0, 1, 1, 1, 3], fingers: [0, 1, 1, 1, 4], barre: { fret: 1, fromString: 1, toString: 3 } },
  { name: 'G#m7',    fullName: 'G# Minor 7th',        root: 'G#', type: 'm7',   baseFret: 1, frets: [0, 1, 4, 4, 2], fingers: [0, 1, 4, 4, 2], barre: { fret: 4, fromString: 2, toString: 3 } },
  { name: 'G#sus2',  fullName: 'G# Suspended 2nd',    root: 'G#', type: 'sus2', baseFret: 1, frets: [0, 1, 1, 1, 1], fingers: [0, 1, 1, 1, 1], barre: { fret: 1, fromString: 1, toString: 4 } },
  { name: 'G#sus4',  fullName: 'G# Suspended 4th',    root: 'G#', type: 'sus4', baseFret: 1, frets: [0, 1, 1, 2, 4], fingers: [0, 1, 1, 2, 4], barre: { fret: 1, fromString: 1, toString: 2 } },
  { name: 'G#6',     fullName: 'G# Major 6th',        root: 'G#', type: '6',    baseFret: 1, frets: [0, 3, 1, 1, 1], fingers: [0, 4, 1, 1, 1], barre: { fret: 1, fromString: 2, toString: 4 } },
  { name: 'G#m6',    fullName: 'G# Minor 6th',        root: 'G#', type: 'm6',   baseFret: 1, frets: [0, 1, 4, 1, 1], fingers: [0, 1, 4, 1, 1], barre: { fret: 1, fromString: 1, toString: 4 } },
  { name: 'G#add9',  fullName: 'G# Add 9',            root: 'G#', type: 'add9', baseFret: 1, frets: [0, 1, 1, 1, 3], fingers: [0, 1, 1, 1, 4], barre: { fret: 1, fromString: 1, toString: 3 } },
  { name: 'G#dim',   fullName: 'G# Diminished',       root: 'G#', type: 'dim',  baseFret: 1, frets: [0, 1, 4, 1, 2], fingers: [0, 1, 4, 1, 2], barre: { fret: 1, fromString: 1, toString: 3 } },
  { name: 'G#aug',   fullName: 'G# Augmented',        root: 'G#', type: 'aug',  baseFret: 1, frets: [0, 1, 1, 1, 2], fingers: [0, 1, 1, 1, 2], barre: { fret: 1, fromString: 1, toString: 3 } },
  { name: 'G#9',     fullName: 'G# Dominant 9th',     root: 'G#', type: '9',   baseFret: 1, frets: [0, 1, 1, 1, 2], fingers: [0, 1, 1, 1, 2], barre: { fret: 1, fromString: 1, toString: 3 } },

  // ─── A ───────────────────────────────────────────────────
  { name: 'A',      fullName: 'A Major',            root: 'A', type: 'Major', baseFret: 1, frets: [0, 2, 2, 2, 2], fingers: [0, 1, 1, 1, 1], barre: { fret: 2, fromString: 1, toString: 4 } },
  { name: 'Am',     fullName: 'A Minor',             root: 'A', type: 'Minor', baseFret: 1, frets: [0, 2, 2, 1, 0], fingers: [0, 2, 3, 1, 0] },
  { name: 'A7',     fullName: 'A Dominant 7th',      root: 'A', type: '7',    baseFret: 1, frets: [0, 2, 2, 2, 3], fingers: [0, 1, 1, 1, 4], barre: { fret: 2, fromString: 1, toString: 3 } },
  { name: 'Amaj7',  fullName: 'A Major 7th',         root: 'A', type: 'maj7', baseFret: 1, frets: [0, 2, 2, 2, 4], fingers: [0, 1, 1, 1, 4], barre: { fret: 2, fromString: 1, toString: 3 } },
  { name: 'Am7',    fullName: 'A Minor 7th',         root: 'A', type: 'm7',   baseFret: 1, frets: [0, 2, 2, 1, 3], fingers: [0, 2, 3, 1, 4] },
  { name: 'Asus2',  fullName: 'A Suspended 2nd',     root: 'A', type: 'sus2', baseFret: 1, frets: [0, 2, 2, 0, 0], fingers: [0, 1, 1, 0, 0], barre: { fret: 2, fromString: 1, toString: 2 } },
  { name: 'Asus4',  fullName: 'A Suspended 4th',     root: 'A', type: 'sus4', baseFret: 1, frets: [0, 2, 2, 3, 0], fingers: [0, 1, 1, 2, 0], barre: { fret: 2, fromString: 1, toString: 2 } },
  { name: 'A6',     fullName: 'A Major 6th',         root: 'A', type: '6',    baseFret: 1, frets: [0, 2, 4, 2, 2], fingers: [0, 1, 4, 1, 1], barre: { fret: 2, fromString: 1, toString: 4 } },
  { name: 'Am6',    fullName: 'A Minor 6th',         root: 'A', type: 'm6',   baseFret: 1, frets: [0, 2, 4, 1, 2], fingers: [0, 2, 4, 1, 3] },
  { name: 'Aadd9',  fullName: 'A Add 9',             root: 'A', type: 'add9', baseFret: 1, frets: [0, 2, 2, 2, 0], fingers: [0, 2, 3, 4, 0] },
  { name: 'Adim',   fullName: 'A Diminished',        root: 'A', type: 'dim',  baseFret: 1, frets: [0, 2, 2, 1, 1], fingers: [0, 3, 4, 1, 1], barre: { fret: 1, fromString: 3, toString: 4 } },
  { name: 'Aaug',   fullName: 'A Augmented',         root: 'A', type: 'aug',  baseFret: 1, frets: [0, 2, 2, 2, 3], fingers: [0, 1, 1, 1, 4], barre: { fret: 2, fromString: 1, toString: 3 } },
  { name: 'A9',     fullName: 'A Dominant 9th',      root: 'A', type: '9',   baseFret: 1, frets: [0, 2, 2, 2, 0], fingers: [0, 2, 3, 4, 0] },

  // ─── A# ──────────────────────────────────────────────────
  { name: 'A#',      fullName: 'A# Major',           root: 'A#', type: 'Major', baseFret: 1, frets: [0, 3, 3, 3, 3], fingers: [0, 1, 1, 1, 1], barre: { fret: 3, fromString: 1, toString: 4 } },
  { name: 'A#m',     fullName: 'A# Minor',            root: 'A#', type: 'Minor', baseFret: 1, frets: [0, 3, 3, 2, 1], fingers: [0, 4, 4, 2, 1], barre: { fret: 3, fromString: 1, toString: 2 } },
  { name: 'A#7',     fullName: 'A# Dominant 7th',     root: 'A#', type: '7',    baseFret: 1, frets: [0, 3, 3, 3, 4], fingers: [0, 1, 1, 1, 4], barre: { fret: 3, fromString: 1, toString: 3 } },
  { name: 'A#maj7',  fullName: 'A# Major 7th',        root: 'A#', type: 'maj7', baseFret: 1, frets: [0, 3, 3, 3, 5], fingers: [0, 1, 1, 1, 4], barre: { fret: 3, fromString: 1, toString: 3 } },
  { name: 'A#m7',    fullName: 'A# Minor 7th',        root: 'A#', type: 'm7',   baseFret: 1, frets: [0, 3, 3, 2, 4], fingers: [0, 2, 3, 1, 4] },
  { name: 'A#sus2',  fullName: 'A# Suspended 2nd',    root: 'A#', type: 'sus2', baseFret: 1, frets: [0, 3, 3, 1, 1], fingers: [0, 3, 4, 1, 1], barre: { fret: 1, fromString: 3, toString: 4 } },
  { name: 'A#sus4',  fullName: 'A# Suspended 4th',    root: 'A#', type: 'sus4', baseFret: 1, frets: [0, 3, 3, 4, 1], fingers: [0, 2, 3, 4, 1] },
  { name: 'A#6',     fullName: 'A# Major 6th',        root: 'A#', type: '6',    baseFret: 1, frets: [0, 3, 5, 3, 3], fingers: [0, 1, 4, 1, 1], barre: { fret: 3, fromString: 1, toString: 4 } },
  { name: 'A#m6',    fullName: 'A# Minor 6th',        root: 'A#', type: 'm6',   baseFret: 1, frets: [0, 3, 5, 2, 3], fingers: [0, 2, 4, 1, 3] },
  { name: 'A#add9',  fullName: 'A# Add 9',            root: 'A#', type: 'add9', baseFret: 1, frets: [0, 3, 3, 3, 1], fingers: [0, 3, 4, 4, 1] },
  { name: 'A#dim',   fullName: 'A# Diminished',       root: 'A#', type: 'dim',  baseFret: 1, frets: [0, 3, 3, 2, 2], fingers: [0, 3, 4, 1, 1], barre: { fret: 2, fromString: 3, toString: 4 } },
  { name: 'A#aug',   fullName: 'A# Augmented',        root: 'A#', type: 'aug',  baseFret: 1, frets: [0, 3, 3, 3, 4], fingers: [0, 1, 1, 1, 4], barre: { fret: 3, fromString: 1, toString: 3 } },
  { name: 'A#9',     fullName: 'A# Dominant 9th',     root: 'A#', type: '9',   baseFret: 1, frets: [0, 3, 3, 3, 1], fingers: [0, 3, 4, 4, 1] },

  // ─── B ───────────────────────────────────────────────────
  { name: 'B',      fullName: 'B Major',            root: 'B', type: 'Major', baseFret: 1, frets: [0, 4, 4, 4, 4], fingers: [0, 1, 1, 1, 1], barre: { fret: 4, fromString: 1, toString: 4 } },
  { name: 'Bm',     fullName: 'B Minor',             root: 'B', type: 'Minor', baseFret: 1, frets: [0, 4, 4, 3, 2], fingers: [0, 4, 4, 2, 1], barre: { fret: 4, fromString: 1, toString: 2 } },
  { name: 'B7',     fullName: 'B Dominant 7th',      root: 'B', type: '7',    baseFret: 1, frets: [0, 1, 0, 2, 0], fingers: [0, 2, 0, 1, 0] },
  { name: 'Bmaj7',  fullName: 'B Major 7th',         root: 'B', type: 'maj7', baseFret: 1, frets: [0, 4, 4, 4, 6], fingers: [0, 1, 1, 1, 4], barre: { fret: 4, fromString: 1, toString: 3 } },
  { name: 'Bm7',    fullName: 'B Minor 7th',         root: 'B', type: 'm7',   baseFret: 1, frets: [0, 2, 0, 0, 2], fingers: [0, 1, 0, 0, 2] },
  { name: 'Bsus2',  fullName: 'B Suspended 2nd',     root: 'B', type: 'sus2', baseFret: 1, frets: [0, 4, 4, 2, 2], fingers: [0, 3, 4, 1, 1], barre: { fret: 2, fromString: 3, toString: 4 } },
  { name: 'Bsus4',  fullName: 'B Suspended 4th',     root: 'B', type: 'sus4', baseFret: 1, frets: [0, 4, 4, 5, 2], fingers: [0, 2, 3, 4, 1] },
  { name: 'B6',     fullName: 'B Major 6th',         root: 'B', type: '6',    baseFret: 1, frets: [0, 4, 6, 4, 4], fingers: [0, 1, 4, 1, 1], barre: { fret: 4, fromString: 1, toString: 4 } },
  { name: 'Bm6',    fullName: 'B Minor 6th',         root: 'B', type: 'm6',   baseFret: 1, frets: [0, 4, 6, 3, 4], fingers: [0, 2, 4, 1, 3] },
  { name: 'Badd9',  fullName: 'B Add 9',             root: 'B', type: 'add9', baseFret: 1, frets: [0, 4, 4, 4, 2], fingers: [0, 3, 4, 4, 1] },
  { name: 'Bdim',   fullName: 'B Diminished',        root: 'B', type: 'dim',  baseFret: 1, frets: [0, 1, 0, 0, 1], fingers: [0, 1, 0, 0, 2] },
  { name: 'Baug',   fullName: 'B Augmented',         root: 'B', type: 'aug',  baseFret: 1, frets: [0, 4, 4, 4, 5], fingers: [0, 1, 1, 1, 4], barre: { fret: 4, fromString: 1, toString: 3 } },
  { name: 'B9',     fullName: 'B Dominant 9th',      root: 'B', type: '9',   baseFret: 1, frets: [0, 1, 0, 2, 2], fingers: [0, 1, 0, 2, 3] },
]

export function getBanjoChordBySlug(slug) {
  return BANJO_CHORDS.find(c => c.name.toLowerCase() === slug.toLowerCase())
}

export function getBanjoChordsForRoot(root) {
  return BANJO_CHORDS.filter(c => c.root === root)
}
