import { SEO } from './seoData'
import { FLUTE_NOTES, getFluteNotesByOctave } from './fluteFingeringData'
import { CLARINET_NOTES, getClarinetNotesByOctave } from './clarinetFingeringData'
import { OBOE_NOTES, getOboeNotesByOctave } from './oboeFingeringData'
import { SAXOPHONE_NOTES, getSaxophoneNotesByOctave } from './saxophoneFingeringData'
import { RECORDER_NOTES, getRecorderNotesByOctave } from './recorderFingeringData'
import {
  TRUMPET_NOTES, getTrumpetNotesByOctave,
  HORN_NOTES, getHornNotesByOctave,
  TROMBONE_NOTES, getTromboneNotesByOctave,
  TUBA_NOTES, getTubaNotesByOctave,
} from './brassFingeringData'
import { HARMONICA_NOTES, getHarmonicaNotesByOctave, HARMONICA_LAYOUT } from './harmonicaFingeringData'

const gold = 'var(--gold)'
const teal = 'var(--teal)'
const red  = 'var(--red)'

const g = (en, ro) => ({ en, ro })

export const WIND_FINGERING = {
  Flute: {
    title: 'Flute Fingering Chart',
    subtitle: 'Concert flute fingerings for all notes — C4 to D7. Select a note to see the key diagram.',
    notes: FLUTE_NOTES,
    getByOctave: getFluteNotesByOctave,
    octaves: [4, 5, 6, 7],
    seo: SEO.fluteFingering,
    chordSeo: SEO.fluteChords,
    path: '/flute-fingering',
    chordPath: '/chords/flute',
    tunerPath: '/wind/Flute',
    tunerLabel: 'Flute Tuner',
    timbre: 'flute',
    diagram: 'keys',
    thumbLabel: 'Thumb',
    showRegister: false,
    showEmbouchure: true,
    concertShift: 0,
    registerInfo: (note) => {
      if (note.register === 'third') return { label: 'High register', color: red }
      if (note.register === 'second') return { label: 'Middle register', color: gold }
      return { label: 'Low register', color: teal }
    },
    guide: g(
      'Gold circles are pressed keys. In the low register the thumb mark stays open. From the middle register up, this chart turns the thumb mark on and the fingers often repeat a lower pattern — those notes come from a faster airstream.',
      'Cercurile aurii sunt clape apăsate. În registrul grav semnul degetului mare rămâne liber. De la registrul mediu în sus, diagrama aprinde semnul degetului mare și degetele repetă adesea o poziție de jos — notele ies dintr-un jet de aer mai rapid.',
    ),
  },
  Clarinet: {
    title: 'Clarinet Fingering Chart',
    subtitle: 'Boehm-system Bb clarinet, written pitch (sounds a whole tone lower). Select a note to see the key diagram.',
    notes: CLARINET_NOTES,
    getByOctave: getClarinetNotesByOctave,
    octaves: [3, 4, 5, 6],
    seo: SEO.clarinetFingering,
    chordSeo: SEO.clarinetChords,
    path: '/clarinet-fingering',
    chordPath: '/chords/clarinet',
    tunerPath: '/wind/Clarinet',
    tunerLabel: 'Clarinet Tuner',
    timbre: 'reed',
    diagram: 'keys',
    thumbLabel: 'Thumb hole',
    showRegister: true,
    registerLabel: 'Register',
    showEmbouchure: false,
    concertShift: -2,
    registerInfo: (note) => {
      if (note.register && note.octave >= 6) return { label: 'Altissimo', color: red }
      if (note.register) return { label: 'Clarion — register key (12th)', color: gold }
      if (!note.thumb && note.octave === 4) return { label: 'Throat tones', color: teal }
      return { label: 'Chalumeau — low register', color: teal }
    },
    legendExtra: 'Register = speaker key on the back',
    guide: g(
      'Gold means covered. The thumb hole is on the back, and the register key beside it lifts most fingerings by a twelfth. Throat tones around the staff use side keys — when the line under the diagram names one, that key is what changes the pitch.',
      'Auriu înseamnă acoperit. Orificiul degetului mare este pe spate, iar clapa de registru de lângă el urcă majoritatea digitațiilor cu o duodecimă. Sunetele de gât folosesc clape laterale — când rândul de sub diagramă numește una, clapa aceea schimbă înălțimea.',
    ),
  },
  Oboe: {
    title: 'Oboe Fingering Chart',
    subtitle: 'Conservatoire (French) oboe, concert pitch. Select a note to see the key diagram.',
    notes: OBOE_NOTES,
    getByOctave: getOboeNotesByOctave,
    octaves: [3, 4, 5, 6],
    seo: SEO.oboeFingering,
    chordSeo: SEO.oboeChords,
    path: '/oboe-fingering',
    chordPath: '/chords/oboe',
    tunerPath: '/wind/Oboe',
    tunerLabel: 'Oboe Tuner',
    timbre: 'double',
    diagram: 'keys',
    thumbLabel: 'Octave',
    showRegister: false,
    registerLabel: 'Octave',
    showEmbouchure: false,
    concertShift: 0,
    registerInfo: (note) => {
      if (note.thumb && note.octave >= 6) return { label: 'High register — 2nd octave key', color: red }
      if (note.thumb) return { label: 'Middle register — octave key', color: gold }
      return { label: 'Low register', color: teal }
    },
    guide: g(
      'Gold means covered. The thumb mark is the first octave key: off for the low notes, on from C5 up, where the fingers repeat. Half-hole, forked F and the second octave key are named in the line under the diagram.',
      'Auriu înseamnă acoperit. Semnul degetului mare este prima clapă de octavă: liberă la notele grave, apăsată de la C5 în sus, unde degetele se repetă. Semi-orificiul, Fa-ul în furculiță și a doua clapă de octavă sunt numite în rândul de sub diagramă.',
    ),
  },
  Saxophone: {
    title: 'Saxophone Fingering Chart',
    subtitle: 'Alto saxophone, written pitch (sounds a major 6th lower). Same written fingerings on tenor and baritone. Select a note to see the key diagram.',
    notes: SAXOPHONE_NOTES,
    getByOctave: getSaxophoneNotesByOctave,
    octaves: [3, 4, 5, 6],
    seo: SEO.saxophoneFingering,
    chordSeo: SEO.saxophoneChords,
    path: '/saxophone-fingering',
    chordPath: '/chords/saxophone',
    tunerPath: '/wind/Saxophone',
    tunerLabel: 'Saxophone Tuner',
    timbre: 'reed',
    diagram: 'keys',
    thumbLabel: 'Octave',
    showRegister: false,
    registerLabel: 'Octave',
    showEmbouchure: false,
    concertShift: -9,
    registerInfo: (note) => {
      if (note.octave >= 6) return { label: 'Palm keys — simplified', color: red }
      if (note.thumb) return { label: 'Upper register — octave key', color: gold }
      return { label: 'Lower register', color: teal }
    },
    guide: g(
      'Gold means covered. The thumb mark is the octave key, pressed in the upper register, where the fingers repeat the lower octave. Palm keys above high C are simplified here — the line under the diagram names them. Tenor and baritone read the same written fingerings.',
      'Auriu înseamnă acoperit. Semnul degetului mare este clapa de octavă, apăsată în registrul acut, unde degetele repetă octava de jos. Clapele palmă de deasupra lui Do acut sunt simplificate — rândul de sub diagramă le numește. Tenorul și baritonul citesc aceleași digitații scrise.',
    ),
  },
  Recorder: {
    title: 'Recorder Fingering Chart',
    subtitle: 'Soprano (descant) recorder, Baroque/English fingering, concert pitch. Select a note to see the hole diagram.',
    notes: RECORDER_NOTES,
    getByOctave: getRecorderNotesByOctave,
    octaves: [5, 6, 7],
    seo: SEO.recorderFingering,
    chordSeo: SEO.recorderChords,
    path: '/recorder-fingering',
    chordPath: '/chords/recorder',
    tunerPath: '/wind/Recorder',
    tunerLabel: 'Recorder Tuner',
    timbre: 'recorder',
    diagram: 'keys',
    thumbLabel: 'Thumb',
    thumbPinch: true,
    showRegister: false,
    registerLabel: 'Pinch',
    showEmbouchure: false,
    concertShift: 0,
    registerInfo: (note) => {
      if (note.register) return { label: 'Upper register — pinched thumb', color: gold }
      return { label: 'Lower register', color: teal }
    },
    legendExtra: 'LH4 is unused on recorder (7 front holes)',
    guide: g(
      'Gold means the hole is covered. The thumb hole is on the back. In the upper register it is pinched, half covered, drawn as a half-filled circle. Forked fingerings leave one hole open between covered ones. This is Baroque fingering, also called English.',
      'Auriu înseamnă orificiu acoperit. Degetul mare stă pe spate. În registrul acut se ciupește, pe jumătate, desenat ca un cerc pe jumătate plin. Digitațiile în furculiță lasă un orificiu deschis între două acoperite. Este digitația barocă, numită și englezească.',
    ),
  },
  Trumpet: {
    title: 'Trumpet Fingering Chart',
    subtitle: 'Bb trumpet, written pitch (sounds a whole tone lower). The same fingers work on cornet and flugelhorn. Select a note to see the valves.',
    notes: TRUMPET_NOTES,
    getByOctave: getTrumpetNotesByOctave,
    octaves: [3, 4, 5, 6],
    seo: SEO.trumpetFingering,
    chordSeo: SEO.trumpetChords,
    path: '/trumpet-fingering',
    chordPath: '/chords/trumpet',
    tunerPath: '/wind/Trumpet',
    tunerLabel: 'Trumpet Tuner',
    timbre: 'brass',
    diagram: 'valves',
    valveCount: 3,
    concertShift: -2,
    registerInfo: (note) => {
      if (!note.valves?.length) return { label: 'Open — no valves', color: teal }
      return { label: `Valves ${note.valves.join(' + ')}`, color: gold }
    },
    guide: g(
      'Three valves lower an open note. Valve 2 drops one semitone, valve 1 drops two, 1+2 drops three, 2+3 drops four, 1+3 drops five, and 1+2+3 drops six. The open notes you keep meeting are C, G, C, E, G and C. Valve 1 is the one nearest your mouth.',
      'Cele trei pistoane coboară o notă deschisă. Pistonul 2 coboară un semiton, pistonul 1 coboară două, 1+2 coboară trei, 2+3 coboară patru, 1+3 coboară cinci, iar 1+2+3 coboară șase. Notele deschise care revin sunt Do, Sol, Do, Mi, Sol și Do. Pistonul 1 este cel mai aproape de gură.',
    ),
  },
  'French Horn': {
    title: 'French Horn Fingering Chart',
    subtitle: 'Horn in F, written pitch (sounds a perfect fifth lower). These are the F-side fingerings of a double horn. Select a note to see the valves.',
    notes: HORN_NOTES,
    getByOctave: getHornNotesByOctave,
    octaves: [3, 4, 5, 6],
    seo: SEO.hornFingering,
    chordSeo: SEO.hornChords,
    path: '/french-horn-fingering',
    chordPath: '/chords/french-horn',
    tunerPath: '/wind/French Horn',
    tunerLabel: 'French Horn Tuner',
    timbre: 'brass',
    diagram: 'valves',
    valveCount: 3,
    concertShift: -7,
    registerInfo: (note) => {
      if (!note.valves?.length) return { label: 'Open — no valves', color: teal }
      return { label: `Valves ${note.valves.join(' + ')}`, color: gold }
    },
    guide: g(
      'F-horn fingerings, written pitch: the F side of a double horn. The thumb valve that switches onto the Bb side has its own chart. The three rotary valves work like a trumpet: 2 is one semitone down, 1 is two, 1+2 is three, 2+3 is four, 1+3 is five, and all three are six.',
      'Digitații de corn în Fa, la înălțime scrisă: partea de Fa a cornului dublu. Clapa de deget mare care trece pe partea de Si♭ are o diagramă separată. Cele trei pistoane rotative merg ca la trompetă: 2 coboară un semiton, 1 coboară două, 1+2 trei, 2+3 patru, 1+3 cinci, iar toate trei șase.',
    ),
  },
  Trombone: {
    title: 'Trombone Slide Chart',
    subtitle: 'Tenor trombone, concert pitch, no F attachment. Position 1 is the slide all the way in. Select a note to see the position.',
    notes: TROMBONE_NOTES,
    getByOctave: getTromboneNotesByOctave,
    octaves: [2, 3, 4, 5],
    seo: SEO.tromboneFingering,
    chordSeo: SEO.tromboneChords,
    path: '/trombone-fingering',
    chordPath: '/chords/trombone',
    tunerPath: '/wind/Trombone',
    tunerLabel: 'Trombone Tuner',
    timbre: 'brass',
    diagram: 'slide',
    concertShift: 0,
    registerInfo: (note) => ({ label: `Position ${note.position}`, color: note.position === 1 ? teal : gold }),
    guide: g(
      'Position 1 is the slide all the way in. Each higher number is about one semitone lower, out to position 7. The same position plays several notes — air speed and the lip choose which one. An F attachment adds another set of positions; this chart is the open horn.',
      'Poziția 1 este culisa complet înăuntru. Fiecare număr mai mare coboară cam un semiton, până la poziția 7. Aceeași poziție cântă mai multe note — viteza aerului și buza aleg nota. Un cvart-ventil adaugă alt set de poziții; diagrama aceasta este pentru trombonul deschis.',
    ),
  },
  Tuba: {
    title: 'Tuba Fingering Chart',
    subtitle: 'BBb tuba, concert pitch, three valves. E1 to F4. Select a note to see the valves.',
    notes: TUBA_NOTES,
    getByOctave: getTubaNotesByOctave,
    octaves: [1, 2, 3, 4],
    seo: SEO.tubaFingering,
    chordSeo: SEO.tubaChords,
    path: '/tuba-fingering',
    chordPath: '/chords/tuba',
    tunerPath: '/wind/Tuba',
    tunerLabel: 'Tuba Tuner',
    timbre: 'brass',
    diagram: 'valves',
    valveCount: 3,
    concertShift: 0,
    registerInfo: (note) => {
      if (!note.valves?.length) return { label: 'Open — no valves', color: teal }
      return { label: `Valves ${note.valves.join(' + ')}`, color: gold }
    },
    guide: g(
      'Same seven combinations as the trumpet, much lower, and in concert pitch. Open, then 2, 1, 1+2, 2+3, 1+3, and 1+2+3. Notes that use valves 1 and 3 together sit sharp. A fourth valve, when you have one, replaces 1+3.',
      'Aceleași șapte combinații ca la trompetă, mult mai jos, la înălțime reală. Deschis, apoi 2, 1, 1+2, 2+3, 1+3 și 1+2+3. Notele cu pistoanele 1 și 3 împreună ies sus ca intonație. Al patrulea piston, când există, ține locul lui 1+3.',
    ),
  },
  Harmonica: {
    title: 'Harmonica Chart',
    subtitle: 'Diatonic harmonica in C, Richter tuning, holes 1–10. C4 to C6, including the bends and overblows a chromatic line needs.',
    notes: HARMONICA_NOTES,
    getByOctave: getHarmonicaNotesByOctave,
    octaves: [4, 5, 6],
    seo: SEO.harmonicaFingering,
    chordSeo: SEO.harmonicaChords,
    path: '/harmonica-fingering',
    chordPath: '/chords/harmonica',
    tunerPath: '/wind/Harmonica',
    tunerLabel: 'Harmonica Tuner',
    timbre: 'harmonica',
    diagram: 'harmonica',
    layout: HARMONICA_LAYOUT,
    concertShift: 0,
    registerInfo: (note) => {
      const breath = note.breath === 'blow' ? 'Blow' : 'Draw'
      if (note.technique === 'overblow') return { label: `Overblow · hole ${note.hole}`, color: red }
      if (note.technique === 'bend') return { label: `${breath} bend · hole ${note.hole}`, color: gold }
      return { label: `${breath} · hole ${note.hole}`, color: teal }
    },
    guide: g(
      'Blow is air out, draw is air in. Hole 1 is on the left, the low end. A bend lowers a draw on holes 1–6. An overblow is marked when a bend cannot reach the note — give it time, it is a separate technique. Letters in the circles are the natural notes of a C harmonica.',
      'Suflat înseamnă aer afară, tras înseamnă aer înăuntru. Orificiul 1 este în stânga, capătul grav. Un bend coboară o notă trasă la orificiile 1–6. Overblow-ul este marcat când bend-ul nu ajunge la notă — cere timp, este o tehnică separată. Literele din cercuri sunt notele naturale ale unei muzicuțe în Do.',
    ),
  },
}

export const FINGERING_ROUTES = Object.fromEntries(
  Object.entries(WIND_FINGERING).map(([name, cfg]) => [name, cfg.path])
)

export const CHORD_ROUTES = Object.fromEntries(
  Object.entries(WIND_FINGERING).map(([name, cfg]) => [name, cfg.chordPath])
)
