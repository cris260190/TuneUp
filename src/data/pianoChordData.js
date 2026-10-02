import { CHORD_ROOTS, CHORD_TYPES, intervalDegree, spellChordTone } from './windChordData'

// Degree marks match the chord formulas (1, ♭3, 5…).
const MARK = {
  0: '1', 2: '2', 3: '♭3', 4: '3', 5: '4', 6: '♭5', 7: '5', 8: '♯5', 9: '6', 10: '♭7', 11: '7',
}

// Keyboard shows C3–C6. The bass stays in octave 3; the right hand starts at C4.
export const PIANO_LOW = 48
export const PIANO_HIGH = 84

export const INVERSIONS = [
  { en: 'Root position', ro: 'Stare directă', es: 'Estado fundamental', pt: 'Estado fundamental', de: 'Grundstellung', fr: 'État fondamental' },
  { en: '1st inversion', ro: 'Răsturnarea 1', es: '1ª inversión', pt: '1ª inversão', de: '1. Umkehrung', fr: '1er renversement' },
  { en: '2nd inversion', ro: 'Răsturnarea 2', es: '2ª inversión', pt: '2ª inversão', de: '2. Umkehrung', fr: '2e renversement' },
  { en: '3rd inversion', ro: 'Răsturnarea 3', es: '3ª inversión', pt: '3ª inversão', de: '3. Umkehrung', fr: '3e renversement' },
]

const UI = {
  en: {
    kicker: 'Chords',
    intro: 'A piano holds the whole chord at once. The left hand plays the bass, and that lowest note is the inversion. The right hand plays the other notes close together, then the bass note again an octave higher. Press both hands together.',
    play: 'Play chord',
    arp: 'One by one',
    how: 'What this chord is',
    hands: 'On the keyboard',
    left: 'Left hand',
    right: 'Right hand',
    inversion: 'Inversion',
    bassLine: '{degree} in the bass',
    formula: 'Formula',
    tuner: 'Piano tuner',
    tap: 'Coloured keys are the chord. Teal is the left hand, gold is the right. Tap any key to hear it.',
    concert: 'Concert pitch. The key you press is the note you hear.',
  },
  ro: {
    kicker: 'Acorduri',
    intro: 'Pianul ține acordul întreg deodată. Mâna stângă cântă basul, iar nota cea mai joasă este răsturnarea. Mâna dreaptă cântă celelalte note apropiate, apoi din nou nota de bas, cu o octavă mai sus. Apasă ambele mâini împreună.',
    play: 'Cântă acordul',
    arp: 'Pe rând',
    how: 'Ce este acordul ăsta',
    hands: 'Pe claviatură',
    left: 'Mâna stângă',
    right: 'Mâna dreaptă',
    inversion: 'Răsturnare',
    bassLine: '{degree} la bas',
    formula: 'Formulă',
    tuner: 'Acordor pian',
    tap: 'Clapele colorate sunt acordul. Turcoaz este mâna stângă, auriu mâna dreaptă. Atinge orice clapă ca s-o auzi.',
    concert: 'Înălțime reală. Clapa pe care o apeși este nota pe care o auzi.',
  },
  es: {
    kicker: 'Acordes',
    intro: 'El piano sostiene el acorde entero a la vez. La mano izquierda toca el bajo, y esa nota más grave es la inversión. La mano derecha toca las demás notas juntas, y otra vez el bajo una octava más arriba. Pulsa las dos manos a la vez.',
    play: 'Tocar el acorde',
    arp: 'De una en una',
    how: 'Qué es este acorde',
    hands: 'En el teclado',
    left: 'Mano izquierda',
    right: 'Mano derecha',
    inversion: 'Inversión',
    bassLine: '{degree} en el bajo',
    formula: 'Fórmula',
    tuner: 'Afinador de piano',
    tap: 'Las teclas de color son el acorde. El turquesa es la mano izquierda, el dorado la derecha. Toca cualquier tecla para oírla.',
    concert: 'Sonido real. La tecla que pulsas es la nota que oyes.',
  },
  pt: {
    kicker: 'Acordes',
    intro: 'O piano segura o acorde inteiro de uma vez. A mão esquerda toca o baixo, e essa nota mais grave é a inversão. A mão direita toca as outras notas juntas, e de novo o baixo uma oitava acima. Toque as duas mãos ao mesmo tempo.',
    play: 'Tocar o acorde',
    arp: 'Uma a uma',
    how: 'O que é este acorde',
    hands: 'No teclado',
    left: 'Mão esquerda',
    right: 'Mão direita',
    inversion: 'Inversão',
    bassLine: '{degree} no baixo',
    formula: 'Fórmula',
    tuner: 'Afinador de piano',
    tap: 'As teclas coloridas são o acorde. O turquesa é a mão esquerda, o dourado a direita. Toque qualquer tecla para a ouvir.',
    concert: 'Altura real. A tecla que tocas é a nota que ouves.',
  },
  de: {
    kicker: 'Akkorde',
    intro: 'Das Klavier hält den ganzen Akkord auf einmal. Die linke Hand spielt den Basston, und dieser tiefste Ton ist die Umkehrung. Die rechte Hand spielt die übrigen Töne eng beieinander und den Basston noch einmal eine Oktave höher. Drücke beide Hände zusammen.',
    play: 'Akkord spielen',
    arp: 'Nacheinander',
    how: 'Was dieser Akkord ist',
    hands: 'Auf der Tastatur',
    left: 'Linke Hand',
    right: 'Rechte Hand',
    inversion: 'Umkehrung',
    bassLine: '{degree} im Bass',
    formula: 'Formel',
    tuner: 'Klavier-Stimmgerät',
    tap: 'Die farbigen Tasten sind der Akkord. Türkis ist die linke Hand, gold die rechte. Tippe eine Taste, um sie zu hören.',
    concert: 'Kammerton. Die Taste, die du drückst, ist der Ton, den du hörst.',
  },
  fr: {
    kicker: 'Accords',
    intro: 'Le piano tient l’accord entier en même temps. La main gauche joue la basse, et cette note la plus grave est le renversement. La main droite joue les autres notes serrées, puis encore la basse une octave plus haut. Appuie des deux mains ensemble.',
    play: 'Jouer l’accord',
    arp: 'Une par une',
    how: 'Ce qu’est cet accord',
    hands: 'Sur le clavier',
    left: 'Main gauche',
    right: 'Main droite',
    inversion: 'Renversement',
    bassLine: '{degree} à la basse',
    formula: 'Formule',
    tuner: 'Accordeur de piano',
    tap: 'Les touches colorées sont l’accord. Le turquoise est la main gauche, l’or la main droite. Touche une touche pour l’entendre.',
    concert: 'Diapason réel. La touche que tu enfonces est la note que tu entends.',
  },
}

function text(map, lang) {
  return (map && (map[lang] || map.en)) || ''
}

export function pianoUi(lang) {
  return UI[lang] || UI.en
}

export function inversionLabel(index, lang) {
  return text(INVERSIONS[index], lang)
}

function tone(rootName, interval, midi, hand) {
  const spelled = spellChordTone(rootName, interval, midi)
  return {
    interval,
    midi,
    hand,
    degree: intervalDegree(interval),
    spelled,
    name: spelled.replace(/\d+$/, ''),
    mark: MARK[interval],
  }
}

// Left hand plays only the bass, in octave 3, so the lowest note names the inversion.
// Right hand restacks every chord tone from C4 and puts that bass note back on top.
export function buildPianoChord(rootName, typeId, inversion = 0) {
  const root = CHORD_ROOTS.find(r => r.name === rootName) || CHORD_ROOTS[0]
  const type = CHORD_TYPES.find(tp => tp.id === typeId) || CHORD_TYPES[0]
  const intervals = type.intervals
  const inv = Math.min(Math.max(0, inversion), intervals.length - 1)
  const bassInterval = intervals[inv]
  const bassMidi = PIANO_LOW + ((root.pc + bassInterval) % 12)

  const right = []
  let cursor = 60
  for (let i = 1; i <= intervals.length; i++) {
    const interval = intervals[(inv + i) % intervals.length]
    const pc = (root.pc + interval) % 12
    while (((cursor % 12) + 12) % 12 !== pc) cursor += 1
    right.push({ interval, midi: cursor })
    cursor += 1
  }

  return {
    root,
    type,
    inversion: inv,
    symbol: root.name + type.suffix,
    tones: [
      tone(root.name, bassInterval, bassMidi, 'L'),
      ...right.map(n => tone(root.name, n.interval, n.midi, 'R')),
    ],
  }
}
