import { useEffect, useState } from 'react'

const PLAY_MS = 3600
let openingNotesFinished = false

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

export default function OpeningNotes() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (openingNotesFinished) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      openingNotesFinished = true
      return
    }
    setShow(true)
    const id = window.setTimeout(() => {
      openingNotesFinished = true
      setShow(false)
    }, PLAY_MS)
    return () => window.clearTimeout(id)
  }, [])

  if (!show) return null

  return (
    <div className="opening-notes" aria-hidden="true">
      <style>{`
        .opening-notes {
          position: absolute;
          left: 54%;
          top: 9.4rem;
          transform: translateX(-50%);
          display: flex;
          align-items: flex-end;
          gap: 1.6rem;
          pointer-events: none;
          z-index: 2;
        }
        .opening-notes svg {
          display: block;
          overflow: visible;
          filter: drop-shadow(0 8px 14px rgba(0, 0, 0, .28));
        }
        .opening-note-a {
          width: 46px;
          height: 72px;
          color: var(--gold);
          transform-origin: 50% 85%;
          animation: openingNoteA 3.6s ease-in-out forwards;
        }
        .opening-note-b {
          width: 38px;
          height: 60px;
          color: var(--teal);
          transform-origin: 50% 85%;
          animation: openingNoteB 3.6s ease-in-out forwards;
        }
        @keyframes openingNoteA {
          0%   { transform: translateY(12px) rotate(-14deg); opacity: 0; }
          8%   { transform: translateY(0) rotate(-6deg); opacity: 1; }
          24%  { transform: translateY(-26px) rotate(10deg); }
          40%  { transform: translateY(-2px) rotate(-12deg); }
          56%  { transform: translateY(-20px) rotate(8deg); }
          72%  { transform: translateY(2px) rotate(-8deg); }
          86%  { transform: translateY(-14px) rotate(4deg); opacity: 1; }
          100% { transform: translateY(-30px) rotate(0deg); opacity: 0; }
        }
        @keyframes openingNoteB {
          0%   { transform: translateY(8px) rotate(12deg); opacity: 0; }
          8%   { transform: translateY(-10px) rotate(4deg); opacity: 1; }
          24%  { transform: translateY(2px) rotate(-10deg); }
          40%  { transform: translateY(-24px) rotate(12deg); }
          56%  { transform: translateY(-4px) rotate(-6deg); }
          72%  { transform: translateY(-18px) rotate(9deg); }
          86%  { transform: translateY(-6px) rotate(-3deg); opacity: 1; }
          100% { transform: translateY(-28px) rotate(0deg); opacity: 0; }
        }
        @media (max-width: 767px) {
          .opening-notes {
            position: fixed;
            left: auto;
            right: 1.15rem;
            top: 46%;
            transform: none;
            gap: .75rem;
            z-index: 5;
          }
          .opening-note-a { width: 34px; height: 54px; }
          .opening-note-b { width: 28px; height: 44px; }
        }
      `}</style>
      <EighthNote className="opening-note-a" />
      <QuarterNote className="opening-note-b" />
    </div>
  )
}
