export const CATS = {
  guitar: {
    icon: '🎸',
    label: 'Guitar',
    subs: {
      'Standard': {
        desc: 'Standard Tuning — E A D G B e',
        type: 'strings',
        strings: [{n:'E2',f:82.41},{n:'A2',f:110.00},{n:'D3',f:146.83},{n:'G3',f:196.00},{n:'B3',f:246.94},{n:'e4',f:329.63}]
      },
      'Drop D': {
        desc: 'Drop D Tuning — D A D G B e',
        type: 'strings',
        strings: [{n:'D2',f:73.42},{n:'A2',f:110.00},{n:'D3',f:146.83},{n:'G3',f:196.00},{n:'B3',f:246.94},{n:'e4',f:329.63}]
      },
      'Open G': {
        desc: 'Open G Tuning — D G D G B D',
        type: 'strings',
        strings: [{n:'D2',f:73.42},{n:'G2',f:98.00},{n:'D3',f:146.83},{n:'G3',f:196.00},{n:'B3',f:246.94},{n:'D4',f:293.66}]
      },
      'Open D': {
        desc: 'Open D Tuning — D A D F# A D',
        type: 'strings',
        strings: [{n:'D2',f:73.42},{n:'A2',f:110.00},{n:'D3',f:146.83},{n:'F#3',f:185.00},{n:'A3',f:220.00},{n:'D4',f:293.66}]
      },
      'DADGAD': {
        desc: 'DADGAD Celtic Tuning',
        type: 'strings',
        strings: [{n:'D2',f:73.42},{n:'A2',f:110.00},{n:'D3',f:146.83},{n:'G3',f:196.00},{n:'A3',f:220.00},{n:'D4',f:293.66}]
      },
      'Half Step ↓': {
        desc: 'Eb Ab Db Gb Bb eb',
        type: 'strings',
        strings: [{n:'Eb2',f:77.78},{n:'Ab2',f:103.83},{n:'Db3',f:138.59},{n:'Gb3',f:185.00},{n:'Bb3',f:233.08},{n:'eb4',f:311.13}]
      },
      'Classical': {
        desc: 'Classical / Nylon String — Standard',
        type: 'strings',
        strings: [{n:'E2',f:82.41},{n:'A2',f:110.00},{n:'D3',f:146.83},{n:'G3',f:196.00},{n:'B3',f:246.94},{n:'e4',f:329.63}]
      },
      '7-String': {
        desc: '7-String Standard — B E A D G B e',
        type: 'strings',
        strings: [{n:'B1',f:61.74},{n:'E2',f:82.41},{n:'A2',f:110.00},{n:'D3',f:146.83},{n:'G3',f:196.00},{n:'B3',f:246.94},{n:'e4',f:329.63}]
      },
    }
  },
  bass: {
    icon: '🎸',
    label: 'Bass',
    subs: {
      '4-String': {
        desc: 'Standard Bass — E A D G',
        type: 'strings',
        strings: [{n:'E1',f:41.20},{n:'A1',f:55.00},{n:'D2',f:73.42},{n:'G2',f:98.00}]
      },
      '5-String': {
        desc: '5-String Bass — B E A D G',
        type: 'strings',
        strings: [{n:'B0',f:30.87},{n:'E1',f:41.20},{n:'A1',f:55.00},{n:'D2',f:73.42},{n:'G2',f:98.00}]
      },
      'Drop D': {
        desc: 'Drop D Bass — D A D G',
        type: 'strings',
        strings: [{n:'D1',f:36.71},{n:'A1',f:55.00},{n:'D2',f:73.42},{n:'G2',f:98.00}]
      },
    }
  },
  strings: {
    icon: '🎻',
    label: 'Strings',
    subs: {
      'Violin': {
        desc: 'Violin — G D A E',
        type: 'strings',
        strings: [{n:'G3',f:196.00},{n:'D4',f:293.66},{n:'A4',f:440.00},{n:'E5',f:659.25}]
      },
      'Viola': {
        desc: 'Viola — C G D A',
        type: 'strings',
        strings: [{n:'C3',f:130.81},{n:'G3',f:196.00},{n:'D4',f:293.66},{n:'A4',f:440.00}]
      },
      'Cello': {
        desc: 'Cello — C G D A',
        type: 'strings',
        strings: [{n:'C2',f:65.41},{n:'G2',f:98.00},{n:'D3',f:146.83},{n:'A3',f:220.00}]
      },
      'Double Bass': {
        desc: 'Double Bass — E A D G',
        type: 'strings',
        strings: [{n:'E1',f:41.20},{n:'A1',f:55.00},{n:'D2',f:73.42},{n:'G2',f:98.00}]
      },
      'Ukulele': {
        desc: 'Ukulele — G C E A',
        type: 'strings',
        strings: [{n:'G4',f:392.00},{n:'C4',f:261.63},{n:'E4',f:329.63},{n:'A4',f:440.00}]
      },
      'Mandolin': {
        desc: 'Mandolin — G D A E',
        type: 'strings',
        strings: [{n:'G3',f:196.00},{n:'D4',f:293.66},{n:'A4',f:440.00},{n:'E5',f:659.25}]
      },
      'Banjo 5-str': {
        desc: '5-String Banjo — G D G B D',
        type: 'strings',
        strings: [{n:'G4',f:392.00},{n:'D3',f:146.83},{n:'G3',f:196.00},{n:'B3',f:246.94},{n:'D4',f:293.66}]
      },
    }
  },
  wind: {
    icon: '🎺',
    label: 'Wind',
    subs: {
      'Flute': {
        desc: 'Concert Flute — C4 to D7',
        type: 'chromatic',
        range: [{n:'C4',f:261.63},{n:'D4',f:293.66},{n:'E4',f:329.63},{n:'F4',f:349.23},{n:'G4',f:392.00},{n:'A4',f:440.00},{n:'B4',f:493.88},{n:'C5',f:523.25},{n:'D5',f:587.33},{n:'E5',f:659.25},{n:'F5',f:698.46},{n:'G5',f:783.99}]
      },
      'Clarinet': {
        desc: 'Clarinet in Bb — D3 to A6 (concert)',
        type: 'chromatic',
        range: [{n:'D3',f:146.83},{n:'E3',f:164.81},{n:'F3',f:174.61},{n:'G3',f:196.00},{n:'A3',f:220.00},{n:'B3',f:246.94},{n:'C4',f:261.63},{n:'D4',f:293.66},{n:'E4',f:329.63},{n:'F4',f:349.23},{n:'G4',f:392.00},{n:'A4',f:440.00}]
      },
      'Oboe': {
        desc: 'Oboe — Bb3 to G6',
        type: 'chromatic',
        range: [{n:'Bb3',f:233.08},{n:'C4',f:261.63},{n:'D4',f:293.66},{n:'E4',f:329.63},{n:'F4',f:349.23},{n:'G4',f:392.00},{n:'A4',f:440.00},{n:'B4',f:493.88},{n:'C5',f:523.25},{n:'D5',f:587.33},{n:'E5',f:659.25},{n:'F5',f:698.46}]
      },
      'Saxophone': {
        desc: 'Alto Saxophone in Eb — concert pitch',
        type: 'chromatic',
        range: [{n:'Db3',f:138.59},{n:'Eb3',f:155.56},{n:'F3',f:174.61},{n:'G3',f:196.00},{n:'Ab3',f:207.65},{n:'Bb3',f:233.08},{n:'C4',f:261.63},{n:'Db4',f:277.18},{n:'Eb4',f:311.13},{n:'F4',f:349.23},{n:'G4',f:392.00},{n:'Ab4',f:415.30}]
      },
      'Trumpet': {
        desc: 'Trumpet in Bb — concert pitch',
        type: 'chromatic',
        range: [{n:'E3',f:164.81},{n:'F3',f:174.61},{n:'G3',f:196.00},{n:'A3',f:220.00},{n:'Bb3',f:233.08},{n:'C4',f:261.63},{n:'D4',f:293.66},{n:'E4',f:329.63},{n:'F4',f:349.23},{n:'G4',f:392.00},{n:'A4',f:440.00},{n:'Bb4',f:466.16}]
      },
      'French Horn': {
        desc: 'French Horn in F — concert pitch',
        type: 'chromatic',
        range: [{n:'B2',f:123.47},{n:'C3',f:130.81},{n:'D3',f:146.83},{n:'E3',f:164.81},{n:'F3',f:174.61},{n:'G3',f:196.00},{n:'A3',f:220.00},{n:'B3',f:246.94},{n:'C4',f:261.63},{n:'D4',f:293.66},{n:'E4',f:329.63},{n:'F4',f:349.23}]
      },
      'Trombone': {
        desc: 'Trombone — Bb1 to F5',
        type: 'chromatic',
        range: [{n:'Bb1',f:58.27},{n:'C2',f:65.41},{n:'D2',f:73.42},{n:'E2',f:82.41},{n:'F2',f:87.31},{n:'G2',f:98.00},{n:'A2',f:110.00},{n:'Bb2',f:116.54},{n:'C3',f:130.81},{n:'D3',f:146.83},{n:'E3',f:164.81},{n:'F3',f:174.61}]
      },
      'Tuba': {
        desc: 'Tuba — D1 to F4',
        type: 'chromatic',
        range: [{n:'D1',f:36.71},{n:'E1',f:41.20},{n:'F1',f:43.65},{n:'G1',f:49.00},{n:'A1',f:55.00},{n:'Bb1',f:58.27},{n:'C2',f:65.41},{n:'D2',f:73.42},{n:'E2',f:82.41},{n:'F2',f:87.31},{n:'G2',f:98.00},{n:'A2',f:110.00}]
      },
      'Recorder': {
        desc: 'Soprano Recorder — C5 to D7',
        type: 'chromatic',
        range: [{n:'C5',f:523.25},{n:'D5',f:587.33},{n:'E5',f:659.25},{n:'F5',f:698.46},{n:'G5',f:783.99},{n:'A5',f:880.00},{n:'B5',f:987.77},{n:'C6',f:1046.50},{n:'D6',f:1174.66},{n:'E6',f:1318.51},{n:'F6',f:1396.91},{n:'G6',f:1567.98}]
      },
      'Harmonica': {
        desc: 'Diatonic Harmonica in C',
        type: 'chromatic',
        range: [{n:'C4',f:261.63},{n:'D4',f:293.66},{n:'E4',f:329.63},{n:'F4',f:349.23},{n:'G4',f:392.00},{n:'A4',f:440.00},{n:'B4',f:493.88},{n:'C5',f:523.25},{n:'D5',f:587.33},{n:'E5',f:659.25},{n:'F5',f:698.46},{n:'G5',f:783.99}]
      },
    }
  },
  percussion: {
    icon: '🎹',
    label: 'Other',
    subs: {
      'Piano': {
        desc: 'Piano — Chromatic reference A0–C8',
        type: 'chromatic',
        range: [{n:'A3',f:220.00},{n:'Bb3',f:233.08},{n:'B3',f:246.94},{n:'C4',f:261.63},{n:'C#4',f:277.18},{n:'D4',f:293.66},{n:'Eb4',f:311.13},{n:'E4',f:329.63},{n:'F4',f:349.23},{n:'F#4',f:369.99},{n:'G4',f:392.00},{n:'Ab4',f:415.30}]
      },
      'Chromatic': {
        desc: 'Universal Chromatic Tuner',
        type: 'chromatic',
        range: [{n:'A3',f:220.00},{n:'Bb3',f:233.08},{n:'B3',f:246.94},{n:'C4',f:261.63},{n:'C#4',f:277.18},{n:'D4',f:293.66},{n:'Eb4',f:311.13},{n:'E4',f:329.63},{n:'F4',f:349.23},{n:'F#4',f:369.99},{n:'G4',f:392.00},{n:'Ab4',f:415.30}]
      },
    }
  }
}