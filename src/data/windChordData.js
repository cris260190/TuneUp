import { noteToMidi } from './windFingeringHelpers'
import { WIND_FINGERING } from './windFingeringConfig'

const LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
const LETTER_PC = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }
const INTERVAL_DEGREE = { 0: 0, 2: 1, 3: 2, 4: 2, 5: 3, 6: 4, 7: 4, 8: 4, 9: 5, 10: 6, 11: 6 }
const NICE = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B']

function t(map, lang) {
  return (map && (map[lang] || map.en)) || ''
}

export const CHORD_ROOTS = [
  { pc: 0, name: 'C' },
  { pc: 1, name: 'C#' },
  { pc: 2, name: 'D' },
  { pc: 3, name: 'Eb' },
  { pc: 4, name: 'E' },
  { pc: 5, name: 'F' },
  { pc: 6, name: 'F#' },
  { pc: 7, name: 'G' },
  { pc: 8, name: 'Ab' },
  { pc: 9, name: 'A' },
  { pc: 10, name: 'Bb' },
  { pc: 11, name: 'B' },
]

const DEGREE = {
  0:  { en: 'Root', ro: 'Rădăcină', es: 'Fundamental', pt: 'Fundamental', de: 'Grundton', fr: 'Fondamentale' },
  2:  { en: 'Major 2nd', ro: 'Secundă mare', es: '2ª mayor', pt: '2ª maior', de: 'große Sekunde', fr: 'seconde majeure' },
  3:  { en: 'Minor 3rd', ro: 'Terță mică', es: '3ª menor', pt: '3ª menor', de: 'kleine Terz', fr: 'tierce mineure' },
  4:  { en: 'Major 3rd', ro: 'Terță mare', es: '3ª mayor', pt: '3ª maior', de: 'große Terz', fr: 'tierce majeure' },
  5:  { en: 'Perfect 4th', ro: 'Cvartă perfectă', es: '4ª justa', pt: '4ª justa', de: 'reine Quarte', fr: 'quarte juste' },
  6:  { en: 'Diminished 5th', ro: 'Cvintă micșorată', es: '5ª disminuida', pt: '5ª diminuta', de: 'verminderte Quinte', fr: 'quinte diminuée' },
  7:  { en: 'Perfect 5th', ro: 'Cvintă perfectă', es: '5ª justa', pt: '5ª justa', de: 'reine Quinte', fr: 'quinte juste' },
  8:  { en: 'Augmented 5th', ro: 'Cvintă mărită', es: '5ª aumentada', pt: '5ª aumentada', de: 'übermäßige Quinte', fr: 'quinte augmentée' },
  9:  { en: 'Major 6th', ro: 'Sextă mare', es: '6ª mayor', pt: '6ª maior', de: 'große Sexte', fr: 'sixte majeure' },
  10: { en: 'Minor 7th', ro: 'Septimă mică', es: '7ª menor', pt: '7ª menor', de: 'kleine Septime', fr: 'septième mineure' },
  11: { en: 'Major 7th', ro: 'Septimă mare', es: '7ª mayor', pt: '7ª maior', de: 'große Septime', fr: 'septième majeure' },
}

export const CHORD_TYPES = [
  {
    id: 'Major', suffix: '', formula: '1 – 3 – 5', intervals: [0, 4, 7],
    label: { en: 'Major', ro: 'major', es: 'mayor', pt: 'maior', de: 'Dur', fr: 'majeur' },
    explain: {
      en: 'A major chord is the root, a major third (4 semitones up) and a perfect fifth (7 semitones up). It sounds bright and settled. Play the notes from lowest to highest — that line is the arpeggio — or land on them while the band holds this chord.',
      ro: 'Acordul major este rădăcina, terța mare (4 semitonuri mai sus) și cvinta perfectă (7 semitonuri). Sună luminos și stabil. Cântă notele de jos în sus — linia asta este arpegiul — sau oprește-te pe ele cât timp formația ține acordul.',
      es: 'Un acorde mayor es la fundamental, una tercera mayor (4 semitonos) y una quinta justa (7 semitonos). Suena brillante y estable. Toca las notas de grave a agudo: eso es el arpegio.',
      pt: 'Um acorde maior é a fundamental, uma terça maior (4 semitons) e uma quinta justa (7 semitons). Soa brilhante e estável. Toque as notas de baixo para cima: isso é o arpejo.',
      de: 'Ein Dur-Akkord ist Grundton, große Terz (4 Halbtöne) und reine Quinte (7 Halbtöne). Er klingt hell und ruhig. Spiele die Töne von unten nach oben — das ist der Arpeggio.',
      fr: 'Un accord majeur, c’est la fondamentale, une tierce majeure (4 demi-tons) et une quinte juste (7 demi-tons). Il sonne clair et stable. Joue les notes du grave à l’aigu : c’est l’arpège.',
    },
  },
  {
    id: 'Minor', suffix: 'm', formula: '1 – ♭3 – 5', intervals: [0, 3, 7],
    label: { en: 'Minor', ro: 'minor', es: 'menor', pt: 'menor', de: 'Moll', fr: 'mineur' },
    explain: {
      en: 'A minor chord is the root, a minor third (3 semitones up) and a perfect fifth. The third sits one semitone lower than in a major chord, so the colour is darker, and the chord is just as stable.',
      ro: 'Acordul minor este rădăcina, terța mică (3 semitonuri mai sus) și cvinta perfectă. Terța stă cu un semiton mai jos decât la major, deci culoarea este mai întunecată, iar acordul rămâne la fel de stabil.',
      es: 'Un acorde menor es la fundamental, una tercera menor (3 semitonos) y una quinta justa. La tercera está un semitono más baja que en el mayor, así que el color es más oscuro.',
      pt: 'Um acorde menor é a fundamental, uma terça menor (3 semitons) e uma quinta justa. A terça fica um semitom abaixo da maior, por isso a cor é mais escura.',
      de: 'Ein Moll-Akkord ist Grundton, kleine Terz (3 Halbtöne) und reine Quinte. Die Terz liegt einen Halbton tiefer als in Dur, der Klang ist dunkler und trotzdem stabil.',
      fr: 'Un accord mineur, c’est la fondamentale, une tierce mineure (3 demi-tons) et une quinte juste. La tierce est un demi-ton plus bas qu’en majeur, donc la couleur est plus sombre.',
    },
  },
  {
    id: '7', suffix: '7', formula: '1 – 3 – 5 – ♭7', intervals: [0, 4, 7, 10],
    label: { en: 'Dominant 7th', ro: 'dominant cu septimă', es: 'séptima de dominante', pt: 'sétima da dominante', de: 'Dominantseptakkord', fr: 'septième de dominante' },
    explain: {
      en: 'A dominant 7th is a major chord plus a minor seventh. It leans forward: in most songs it pulls toward the chord a perfect fifth below, or a perfect fourth above. Jazz, blues and cadences live on this sound.',
      ro: 'Dominantul cu septimă este un acord major plus o septimă mică. Înclină înainte: în cele mai multe piese trage spre acordul cu o cvintă perfectă mai jos, sau o cvartă perfectă mai sus. Jazz-ul, blues-ul și cadențele stau pe sunetul ăsta.',
      es: 'Una séptima de dominante es un acorde mayor más una séptima menor. Empuja hacia el acorde que está una quinta justa por debajo, o una cuarta justa por encima. El jazz, el blues y las cadencias viven de este sonido.',
      pt: 'Uma sétima da dominante é um acorde maior mais uma sétima menor. Empurra para o acorde uma quinta justa abaixo, ou uma quarta justa acima. O jazz, o blues e as cadências vivem desse som.',
      de: 'Ein Dominantseptakkord ist ein Dur-Akkord plus kleine Septime. Er will weiter: meist zum Akkord eine reine Quinte tiefer oder eine reine Quarte höher. Jazz, Blues und Kadenzen leben von diesem Klang.',
      fr: 'Une septième de dominante est un accord majeur plus une septième mineure. Elle pousse vers l’accord une quinte juste plus bas, ou une quarte juste plus haut. Le jazz, le blues et les cadences reposent sur ce son.',
    },
  },
  {
    id: 'maj7', suffix: 'maj7', formula: '1 – 3 – 5 – 7', intervals: [0, 4, 7, 11],
    label: { en: 'Major 7th', ro: 'major cu septimă mare', es: 'séptima mayor', pt: 'sétima maior', de: 'großer Septakkord', fr: 'septième majeure' },
    explain: {
      en: 'A major 7th is a major chord plus a major seventh, one semitone under the next root. It sounds open and luminous. It rests where it is, where a dominant 7th would keep walking.',
      ro: 'Majorul cu septimă mare este un acord major plus septima mare, la un semiton sub rădăcina următoare. Sună deschis și luminos. Stă pe loc, acolo unde un dominant ar continua drumul.',
      es: 'Una séptima mayor es un acorde mayor más una séptima mayor, a un semitono de la siguiente fundamental. Suena abierta y luminosa, y se queda donde está.',
      pt: 'Uma sétima maior é um acorde maior mais uma sétima maior, a um semitom da próxima fundamental. Soa aberta e luminosa, e fica onde está.',
      de: 'Ein großer Septakkord ist ein Dur-Akkord plus große Septime, einen Halbton unter dem nächsten Grundton. Er klingt offen und leuchtend und bleibt liegen.',
      fr: 'Une septième majeure est un accord majeur plus une septième majeure, un demi-ton sous la fondamentale suivante. Elle sonne ouverte et lumineuse, et elle reste en place.',
    },
  },
  {
    id: 'm7', suffix: 'm7', formula: '1 – ♭3 – 5 – ♭7', intervals: [0, 3, 7, 10],
    label: { en: 'Minor 7th', ro: 'minor cu septimă', es: 'séptima menor', pt: 'sétima menor', de: 'Mollseptakkord', fr: 'septième mineure' },
    explain: {
      en: 'A minor 7th is a minor chord plus a minor seventh. Soft, and very common as the ii chord of a major key (Dm7 when the song is in C). It can rest, or it can move on to the dominant.',
      ro: 'Minorul cu septimă este un acord minor plus o septimă mică. Moale, și foarte des este acordul ii dintr-o tonalitate majoră (REm7 când piesa este în Do). Poate sta, sau poate merge mai departe spre dominant.',
      es: 'Una séptima menor es un acorde menor más una séptima menor. Suave, y muy habitual como acorde ii de una tonalidad mayor (Rem7 si la pieza está en Do).',
      pt: 'Uma sétima menor é um acorde menor mais uma sétima menor. Suave, e muito comum como acorde ii de um tom maior (Rém7 quando a música está em Dó).',
      de: 'Ein Mollseptakkord ist ein Moll-Akkord plus kleine Septime. Weich, und sehr oft die ii. Stufe einer Dur-Tonart (Dm7, wenn das Stück in C steht).',
      fr: 'Une septième mineure est un accord mineur plus une septième mineure. Douce, et très souvent l’accord ii d’une tonalité majeure (Rém7 quand le morceau est en Do).',
    },
  },
  {
    id: 'sus2', suffix: 'sus2', formula: '1 – 2 – 5', intervals: [0, 2, 7],
    label: { en: 'Suspended 2nd', ro: 'sus2', es: 'sus2', pt: 'sus2', de: 'sus2', fr: 'sus2' },
    explain: {
      en: 'A suspended 2nd keeps the root and the fifth, and puts the major second where the third would be. There is no major or minor colour yet. The second sits right next to the root, so the chord sounds open and a little unfinished.',
      ro: 'Sus2 păstrează rădăcina și cvinta, și pune secunda mare în locul terței. Încă nu are culoare de major sau de minor. Secunda stă lipită de rădăcină, așa că acordul sună deschis și puțin neîncheiat.',
      es: 'Un sus2 conserva la fundamental y la quinta, y pone la segunda mayor donde iría la tercera. Aún no es mayor ni menor. Suena abierto y un poco sin resolver.',
      pt: 'Um sus2 guarda a fundamental e a quinta, e põe a segunda maior no lugar da terça. Ainda não é maior nem menor. Soa aberto e um pouco sem resolver.',
      de: 'Ein sus2 behält Grundton und Quinte und setzt die große Sekunde an die Stelle der Terz. Noch kein Dur oder Moll. Der Klang ist offen und etwas unfertig.',
      fr: 'Un sus2 garde la fondamentale et la quinte, et met la seconde majeure à la place de la tierce. Pas encore majeur ni mineur. Le son est ouvert et un peu en suspens.',
    },
  },
  {
    id: 'sus4', suffix: 'sus4', formula: '1 – 4 – 5', intervals: [0, 5, 7],
    label: { en: 'Suspended 4th', ro: 'sus4', es: 'sus4', pt: 'sus4', de: 'sus4', fr: 'sus4' },
    explain: {
      en: 'A suspended 4th replaces the third with the perfect fourth. The chord hangs in the air. In countless songs the fourth then steps down to the major third and the chord becomes major.',
      ro: 'Sus4 înlocuiește terța cu cvarta perfectă. Acordul rămâne suspendat. În nenumărate piese, cvarta coboară apoi pe terța mare și acordul devine major.',
      es: 'Un sus4 sustituye la tercera por la cuarta justa. El acorde queda colgado. En muchísimas canciones la cuarta baja después a la tercera mayor y el acorde se vuelve mayor.',
      pt: 'Um sus4 troca a terça pela quarta justa. O acorde fica suspenso. Em muitas canções a quarta desce depois para a terça maior e o acorde vira maior.',
      de: 'Ein sus4 ersetzt die Terz durch die reine Quarte. Der Akkord hängt. In unzähligen Songs tritt die Quarte danach zur großen Terz hinunter und der Akkord wird Dur.',
      fr: 'Un sus4 remplace la tierce par la quarte juste. L’accord reste suspendu. Dans d’innombrables chansons, la quarte descend ensuite sur la tierce majeure et l’accord devient majeur.',
    },
  },
  {
    id: '6', suffix: '6', formula: '1 – 3 – 5 – 6', intervals: [0, 4, 7, 9],
    label: { en: 'Major 6th', ro: 'major cu sextă', es: 'sexta mayor', pt: 'sexta maior', de: 'Dur mit Sexte', fr: 'sixte majeure' },
    explain: {
      en: 'A major 6th is a major chord plus the major sixth. Warm and finished — swing tunes and older pop sit on it for a long time. The sixth is also the same pitches as a minor 7th stacked on the third (C6 contains the notes of Am7).',
      ro: 'Majorul cu sextă este un acord major plus sexta mare. Cald și așezat — piesele de swing și pop-ul mai vechi stau mult pe el. Sexta dă aceleași înălțimi ca un minor cu septimă construit pe terță (C6 conține notele din Lam7).',
      es: 'Una sexta mayor es un acorde mayor más la sexta mayor. Cálida y estable: el swing y el pop antiguo se quedan mucho rato en ella. C6 contiene las mismas notas que Lam7.',
      pt: 'Uma sexta maior é um acorde maior mais a sexta maior. Quente e estável: o swing e o pop antigo descansam nela. Dó6 contém as mesmas notas de Lám7.',
      de: 'Ein Dur-Akkord mit Sexte ist ein Dur-Akkord plus große Sexte. Warm und fertig — Swing und älterer Pop bleiben lange darauf. C6 enthält dieselben Töne wie Am7.',
      fr: 'Une sixte majeure est un accord majeur plus la sixte majeure. Chaude et stable : le swing et la pop ancienne s’y installent. Do6 contient les mêmes notes que Lam7.',
    },
  },
  {
    id: 'dim', suffix: 'dim', formula: '1 – ♭3 – ♭5', intervals: [0, 3, 6],
    label: { en: 'Diminished', ro: 'diminuate', es: 'disminuido', pt: 'diminuto', de: 'vermindert', fr: 'diminué' },
    explain: {
      en: 'A diminished chord stacks two minor thirds: root, minor third, diminished fifth. Both gaps are small, so the chord sounds tight and restless. It usually steps away by a semitone or two — up into a major chord, or down into a minor one.',
      ro: 'Acordul diminuat este două terțe mici una peste alta: rădăcină, terță mică, cvintă micșorată. Ambele distanțe sunt mici, așa că acordul sună strâns și neliniștit. De obicei pleacă la un semiton sau două — în sus spre un major, sau în jos spre un minor.',
      es: 'Un acorde disminuido apila dos terceras menores: fundamental, tercera menor, quinta disminuida. Suena tenso e inestable, y suele resolver subiendo o bajando un semitono o dos.',
      pt: 'Um acorde diminuto empilha duas terças menores: fundamental, terça menor, quinta diminuta. Soa tenso e instável, e costuma resolver subindo ou descendo um semitom ou dois.',
      de: 'Ein verminderter Akkord stapelt zwei kleine Terzen: Grundton, kleine Terz, verminderte Quinte. Er klingt eng und unruhig und löst sich meist einen oder zwei Halbtöne höher oder tiefer auf.',
      fr: 'Un accord diminué empile deux tierces mineures : fondamentale, tierce mineure, quinte diminuée. Il sonne serré et instable, et il se résout en général un ou deux demi-tons plus haut ou plus bas.',
    },
  },
  {
    id: 'aug', suffix: 'aug', formula: '1 – 3 – ♯5', intervals: [0, 4, 8],
    label: { en: 'Augmented', ro: 'mărit', es: 'aumentado', pt: 'aumentado', de: 'übermäßig', fr: 'augmenté' },
    explain: {
      en: 'An augmented chord is a major third plus another major third: root, major third, augmented fifth. The fifth is one semitone higher than in a major chord. The top note wants to keep climbing, which is why the chord feels like it is leaning upward.',
      ro: 'Acordul mărit este o terță mare plus încă o terță mare: rădăcină, terță mare, cvintă mărită. Cvinta este cu un semiton mai sus decât la major. Nota de sus vrea să urce în continuare, de aceea acordul pare că se înclină în sus.',
      es: 'Un acorde aumentado es una tercera mayor más otra tercera mayor: fundamental, tercera mayor, quinta aumentada. La quinta está un semitono más alta que en el mayor, y la nota aguda quiere seguir subiendo.',
      pt: 'Um acorde aumentado é uma terça maior mais outra terça maior: fundamental, terça maior, quinta aumentada. A quinta fica um semitom acima da maior, e a nota aguda quer continuar a subir.',
      de: 'Ein übermäßiger Akkord ist eine große Terz plus eine weitere große Terz: Grundton, große Terz, übermäßige Quinte. Die Quinte liegt einen Halbton höher als in Dur, und der obere Ton will weiter steigen.',
      fr: 'Un accord augmenté est une tierce majeure plus une autre tierce majeure : fondamentale, tierce majeure, quinte augmentée. La quinte est un demi-ton plus haut qu’en majeur, et la note aiguë veut continuer à monter.',
    },
  },
  {
    id: '5', suffix: '5', formula: '1 – 5', intervals: [0, 7],
    label: { en: 'Power chord', ro: 'de cinci (power)', es: 'de quinta', pt: 'de quinta (power)', de: 'Powerchord', fr: 'power chord' },
    explain: {
      en: 'A power chord is only the root and the perfect fifth. With no third, it is neither major nor minor. Sections use it when they want the harmony to sound strong and open, and the third can come from another player.',
      ro: 'Acordul de cinci este doar rădăcina și cvinta perfectă. Fără terță, nu este nici major, nici minor. Formațiile îl folosesc când vor un sunet puternic și deschis, iar terța poate veni de la alt instrumentist.',
      es: 'Un acorde de quinta es solo la fundamental y la quinta justa. Sin tercera, no es mayor ni menor. Suena fuerte y abierto, y la tercera puede venir de otro músico.',
      pt: 'Um acorde de quinta é só a fundamental e a quinta justa. Sem terça, não é maior nem menor. Soa forte e aberto, e a terça pode vir de outro músico.',
      de: 'Ein Powerchord ist nur Grundton und reine Quinte. Ohne Terz ist er weder Dur noch Moll. Er klingt kräftig und offen, die Terz kann von einem anderen Spieler kommen.',
      fr: 'Un power chord, c’est seulement la fondamentale et la quinte juste. Sans tierce, il n’est ni majeur ni mineur. Il sonne fort et ouvert, et la tierce peut venir d’un autre musicien.',
    },
  },
]

const UI = {
  en: {
    chords: 'Chords',
    fingering: 'Fingering',
    play: 'Play arpeggio',
    playNote: 'Play',
    how: 'What this chord is',
    tones: 'Notes to play, low to high',
    formula: 'Formula',
    concertSame: 'Concert pitch. The note you read is the note you hear.',
    concertLine: '{written} on the page sounds {concert} concert.',
    missing: 'This chord does not fit the practical range of this instrument.',
    tuner: 'Tuner',
    intro: 'A wind instrument plays one note at a time. A chord here is the set of notes it is made of. Play them from the lowest to the highest — an arpeggio — or treat them as the notes that fit while that chord is sounding.',
  },
  ro: {
    chords: 'Acorduri',
    fingering: 'Digitație',
    play: 'Cântă arpegiul',
    playNote: 'Cântă',
    how: 'Ce este acordul',
    tones: 'Notele de cântat, de jos în sus',
    formula: 'Formulă',
    concertSame: 'Înălțime reală. Nota pe care o citești este nota pe care o auzi.',
    concertLine: '{written} pe pagină sună {concert} în concert.',
    missing: 'Acordul acesta nu încape în ambitusul practic al instrumentului.',
    tuner: 'Acordor',
    intro: 'Un instrument de suflat cântă o singură notă odată. Un acord, aici, este setul de note din care este făcut. Cântă-le de la cea mai joasă la cea mai înaltă — un arpegiu — sau folosește-le ca note care se potrivesc cât timp acordul sună.',
  },
  es: {
    chords: 'Acordes',
    fingering: 'Digitación',
    play: 'Tocar el arpegio',
    playNote: 'Tocar',
    how: 'Qué es este acorde',
    tones: 'Notas para tocar, de grave a agudo',
    formula: 'Fórmula',
    concertSame: 'Tono de concierto. La nota que lees es la nota que suena.',
    concertLine: '{written} en la página suena {concert} en concierto.',
    missing: 'Este acorde no cabe en el registro práctico del instrumento.',
    tuner: 'Afinador',
    intro: 'Un instrumento de viento toca una nota cada vez. Un acorde, aquí, es el conjunto de notas que lo forman. Tócalas de la más grave a la más aguda — un arpegio — o úsalas como las notas que encajan mientras suena ese acorde.',
  },
  pt: {
    chords: 'Acordes',
    fingering: 'Digitação',
    play: 'Tocar o arpejo',
    playNote: 'Tocar',
    how: 'O que é este acorde',
    tones: 'Notas para tocar, de baixo para cima',
    formula: 'Fórmula',
    concertSame: 'Altura real. A nota que lês é a nota que ouves.',
    concertLine: '{written} na página soa {concert} em concert.',
    missing: 'Este acorde não cabe na extensão prática do instrumento.',
    tuner: 'Afinador',
    intro: 'Um instrumento de sopro toca uma nota de cada vez. Um acorde, aqui, é o conjunto de notas de que ele é feito. Toca-as da mais grave à mais aguda — um arpejo — ou usa-as como as notas que servem enquanto o acorde soa.',
  },
  de: {
    chords: 'Akkorde',
    fingering: 'Griffe',
    play: 'Arpeggio spielen',
    playNote: 'Spielen',
    how: 'Was dieser Akkord ist',
    tones: 'Töne, von unten nach oben',
    formula: 'Formel',
    concertSame: 'Kammerton. Der gelesene Ton ist der gehörte Ton.',
    concertLine: '{written} auf der Seite klingt als {concert} im Kammerton.',
    missing: 'Dieser Akkord passt nicht in den praktischen Umfang des Instruments.',
    tuner: 'Stimmgerät',
    intro: 'Ein Blasinstrument spielt immer einen Ton. Ein Akkord ist hier die Menge seiner Töne. Spiele sie vom tiefsten zum höchsten — ein Arpeggio — oder nutze sie als die Töne, die passen, solange der Akkord liegt.',
  },
  fr: {
    chords: 'Accords',
    fingering: 'Doigtés',
    play: 'Jouer l’arpège',
    playNote: 'Jouer',
    how: 'Ce qu’est cet accord',
    tones: 'Notes à jouer, du grave à l’aigu',
    formula: 'Formule',
    concertSame: 'Diapason réel. La note lue est la note entendue.',
    concertLine: '{written} sur la page sonne {concert} en son réel.',
    missing: 'Cet accord ne tient pas dans l’étendue pratique de l’instrument.',
    tuner: 'Accordeur',
    intro: 'Un instrument à vent joue une note à la fois. Un accord, ici, est l’ensemble des notes qui le composent. Joue-les de la plus grave à la plus aiguë — un arpège — ou prends-les comme les notes justes pendant que l’accord sonne.',
  },
}

export function chordUi(lang) {
  return UI[lang] || UI.en
}

const ROOT_PC = { C: 0, 'C#': 1, D: 2, Eb: 3, E: 4, F: 5, 'F#': 6, G: 7, Ab: 8, A: 9, Bb: 10, B: 11 }
const ACC_VALUE = { '': 0, '#': 1, '##': 2, 'b': -1, 'bb': -2 }

function spelledPc(rootName, interval) {
  const rootLetter = rootName[0]
  const rootPc = ROOT_PC[rootName]
  const letter = LETTERS[(LETTERS.indexOf(rootLetter) + INTERVAL_DEGREE[interval]) % 7]
  let acc = ((rootPc + interval) % 12) - LETTER_PC[letter]
  if (acc > 6) acc -= 12
  if (acc < -6) acc += 12
  const accStr = acc === 0 ? '' : acc === 1 ? '#' : acc === -1 ? 'b' : acc === 2 ? '##' : 'bb'
  return letter + accStr
}

// Octave number belongs to the letter (Cb4 sounds as B3), so it is not copied from the fingering.
function spelledWithOctave(rootName, interval, midi) {
  const pcName = spelledPc(rootName, interval)
  const letter = pcName[0]
  const acc = ACC_VALUE[pcName.slice(1)]
  const approx = Math.floor(midi / 12) - 1
  for (let oct = approx - 1; oct <= approx + 1; oct++) {
    let pc = LETTER_PC[letter] + acc
    let soundingOct = oct
    while (pc < 0) { pc += 12; soundingOct -= 1 }
    while (pc > 11) { pc -= 12; soundingOct += 1 }
    if (pc + (soundingOct + 1) * 12 === midi) return pcName + oct
  }
  return pcName + approx
}

function spellChord(notes, rootPc, intervals) {
  const pool = notes.map(n => ({ note: n, midi: noteToMidi(n.name), ease: n.ease ?? 0 }))
  const maxMidi = Math.max(...pool.map(n => n.midi))
  const roots = pool.filter(n => ((n.midi % 12) + 12) % 12 === rootPc)
  let best = null

  for (const start of roots) {
    const chosen = [start]
    let ok = true
    for (let i = 1; i < intervals.length; i++) {
      const want = (rootPc + intervals[i]) % 12
      const prev = chosen[chosen.length - 1].midi
      const rest = intervals[intervals.length - 1] - intervals[i]
      const cands = pool.filter(n => ((n.midi % 12) + 12) % 12 === want && n.midi > prev && n.midi - start.midi <= 19)
      cands.sort((a, b) => {
        const aFits = a.midi + rest <= maxMidi ? 0 : 1
        const bFits = b.midi + rest <= maxMidi ? 0 : 1
        return aFits - bFits || a.ease - b.ease || a.midi - b.midi
      })
      if (!cands.length) { ok = false; break }
      chosen.push(cands[0])
    }
    if (!ok) continue
    const ease = chosen.reduce((sum, n) => sum + n.ease, 0)
    const span = chosen[chosen.length - 1].midi - start.midi
    const rank = ease * 100 + span + start.midi * 0.01
    if (!best || rank < best.rank) best = { chosen, rank }
  }
  return best ? best.chosen : null
}

export function buildWindChord(instrumentKey, rootName, typeId) {
  const config = WIND_FINGERING[instrumentKey]
  const root = CHORD_ROOTS.find(r => r.name === rootName) || CHORD_ROOTS[0]
  const type = CHORD_TYPES.find(tp => tp.id === typeId) || CHORD_TYPES[0]
  const line = spellChord(config.notes, root.pc, type.intervals)
  if (!line) return { config, root, type, tones: null, symbol: root.name + type.suffix }

  const tones = line.map((item, i) => {
    const interval = type.intervals[i]
    return {
      note: item.note,
      interval,
      degree: DEGREE[interval],
      spelled: spelledWithOctave(root.name, interval, item.midi),
    }
  })

  const shift = config.concertShift || 0
  const concertPc = (root.pc + shift + 120) % 12
  const concertSymbol = NICE[concertPc] + type.suffix

  return {
    config,
    root,
    type,
    tones,
    symbol: root.name + type.suffix,
    concertSymbol,
    transposed: shift !== 0,
  }
}

export function degreeText(degree, lang) {
  return t(degree, lang)
}

export function explainText(type, lang) {
  return t(type.explain, lang)
}

export function typeLabel(type, lang) {
  return t(type.label, lang)
}

export function spellChordTone(rootName, interval, midi) {
  return spelledWithOctave(rootName, interval, midi)
}

export function intervalDegree(interval) {
  return DEGREE[interval]
}
