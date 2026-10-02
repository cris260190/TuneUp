import { useEffect, useState } from 'react'

const PLAY_MS = 3600
let openingNotesDanced = false

function EighthNote({ className }) {
  return (
    <svg className={className} viewBox="0 0 56 88" fill="currentColor" aria-hidden="true">
      <ellipse cx="18" cy="74" rx="14" ry="8.5" transform="rotate(-24 18 74)" />
      <rect x="29" y="10" width="3.4" height="64" rx="1.2" />
      <path d="M32.4 10c16 4 20 20 2 22 8-1 14-8 14-14 0-6-8-10-16-8z" />
    </svg>
  )
}

function QuarterNote({ className }) {
  return (
    <svg className={className} viewBox="0 0 56 88" fill="currentColor" aria-hidden="true">
      <ellipse cx="18" cy="74" rx="14" ry="8.5" transform="rotate(-24 18 74)" />
      <rect x="29" y="12" width="3.4" height="62" rx="1.2" />
    </svg>
  )
}

const REST = [
  'translateY(0) rotate(-8deg)',
  'translateY(-8px) rotate(7deg)',
  'translateY(3px) rotate(-3deg)',
  'translateY(-4px) rotate(9deg)',
]

export default function OpeningNotes() {
  const [phase, setPhase] = useState('hidden')

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || openingNotesDanced) {
      openingNotesDanced = true
      setPhase('rest')
      return
    }
    setPhase('dance')
    const id = window.setTimeout(() => {
      openingNotesDanced = true
    }, PLAY_MS)
    return () => window.clearTimeout(id)
  }, [])

  if (phase === 'hidden') return null

  return (
    <div className={`opening-notes${phase === 'rest' ? ' is-rest' : ''}`} aria-hidden="true">
      <style>{`
        .opening-notes {
          position: absolute;
          left: 54%;
          top: 9.4rem;
          transform: translateX(-50%);
          display: flex;
          align-items: flex-end;
          gap: 1.15rem;
          pointer-events: none;
          z-index: 2;
        }
        .opening-notes svg {
          display: block;
          overflow: visible;
          color: var(--gold);
          transform-origin: 50% 85%;
          filter: drop-shadow(0 8px 14px rgba(0, 0, 0, .28));
        }
        .opening-note-1 { width: 44px; height: 70px; animation: openingNote1 3.6s ease-in-out forwards; }
        .opening-note-2 { width: 36px; height: 58px; animation: openingNote2 3.6s ease-in-out forwards; }
        .opening-note-3 { width: 40px; height: 64px; animation: openingNote3 3.6s ease-in-out forwards; }
        .opening-note-4 { width: 32px; height: 52px; animation: openingNote4 3.6s ease-in-out forwards; }
        .opening-notes.is-rest .opening-note-1 { animation: none; opacity: 1; transform: ${REST[0]}; }
        .opening-notes.is-rest .opening-note-2 { animation: none; opacity: 1; transform: ${REST[1]}; }
        .opening-notes.is-rest .opening-note-3 { animation: none; opacity: 1; transform: ${REST[2]}; }
        .opening-notes.is-rest .opening-note-4 { animation: none; opacity: 1; transform: ${REST[3]}; }
        @keyframes openingNote1 {
          0%   { transform: translateY(12px) rotate(-16deg); opacity: 0; }
          8%   { transform: translateY(0) rotate(-8deg); opacity: 1; }
          26%  { transform: translateY(-24px) rotate(10deg); }
          44%  { transform: translateY(-2px) rotate(-12deg); }
          62%  { transform: translateY(-18px) rotate(6deg); }
          80%  { transform: translateY(2px) rotate(-6deg); }
          100% { transform: ${REST[0]}; opacity: 1; }
        }
        @keyframes openingNote2 {
          0%   { transform: translateY(8px) rotate(14deg); opacity: 0; }
          8%   { transform: translateY(-12px) rotate(4deg); opacity: 1; }
          26%  { transform: translateY(2px) rotate(-10deg); }
          44%  { transform: translateY(-22px) rotate(12deg); }
          62%  { transform: translateY(-4px) rotate(-6deg); }
          80%  { transform: translateY(-14px) rotate(8deg); }
          100% { transform: ${REST[1]}; opacity: 1; }
        }
        @keyframes openingNote3 {
          0%   { transform: translateY(16px) rotate(-8deg); opacity: 0; }
          8%   { transform: translateY(4px) rotate(6deg); opacity: 1; }
          26%  { transform: translateY(-20px) rotate(-12deg); }
          44%  { transform: translateY(0) rotate(8deg); }
          62%  { transform: translateY(-14px) rotate(-6deg); }
          80%  { transform: translateY(2px) rotate(4deg); }
          100% { transform: ${REST[2]}; opacity: 1; }
        }
        @keyframes openingNote4 {
          0%   { transform: translateY(6px) rotate(12deg); opacity: 0; }
          8%   { transform: translateY(-8px) rotate(-4deg); opacity: 1; }
          26%  { transform: translateY(4px) rotate(11deg); }
          44%  { transform: translateY(-18px) rotate(-8deg); }
          62%  { transform: translateY(-2px) rotate(7deg); }
          80%  { transform: translateY(-12px) rotate(-5deg); }
          100% { transform: ${REST[3]}; opacity: 1; }
        }
        @media (max-width: 767px) {
          .opening-notes {
            position: fixed;
            left: auto;
            right: 1.1rem;
            top: 44%;
            transform: none;
            gap: .4rem;
            z-index: 5;
          }
          .opening-note-1 { width: 28px; height: 44px; }
          .opening-note-2 { width: 24px; height: 38px; }
          .opening-note-3 { width: 26px; height: 42px; }
          .opening-note-4 { width: 22px; height: 34px; }
        }
      `}</style>
      <EighthNote className="opening-note-1" />
      <QuarterNote className="opening-note-2" />
      <EighthNote className="opening-note-3" />
      <QuarterNote className="opening-note-4" />
    </div>
  )
}
