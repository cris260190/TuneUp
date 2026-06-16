# TuneUp

Free, browser-based instrument tuner (freetuner.app). React + Vite SPA, no backend. Deployed on Netlify.

## Stack
- React 19 + react-router-dom 7 (client-side routing only)
- Vite 8, ESLint 10
- `pitchy` for pitch detection (autocorrelation via `PitchDetector.forFloat32Array`)
- Plain CSS (`App.css`, `index.css`, `styles/index.css`) + inline styles — no CSS framework
- No test suite, no TypeScript (uses `@types/react` only for editor hints)

## Commands
- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm run preview` — preview prod build

## Architecture
- `src/App.jsx` — all routes live here (`/`, `/:category`, `/:category/:sub`, `/metronome`, `/pitch-pipe`, `/about`, `/contact`, `/privacy`). `TunerPage` is the main route component; falls back to `guitar` category if the URL param is invalid.
- `src/data/instruments.js` — `CATS`: the single source of truth for instrument categories, sub-tunings, and reference string frequencies (e.g. guitar Standard/Drop D/Open G/DADGAD/etc., bass, strings, wind, percussion).
- `src/data/seoData.js` — per-route `<title>`/description/blurb/H1, consumed by `useSEO`.
- `src/data/translations.js` — i18n strings keyed by language code.
- `src/hooks/usePitchDetection.js` — mic capture + pitch detection loop (setTimeout-based, ~80ms interval, clarity threshold 0.85, ignores pitch outside 25–2500 Hz).
- `src/hooks/useAudioContext.js` — **shared singleton AudioContext** across pitch detection, metronome, and pitch pipe. This exists specifically to work around iOS Safari audio quirks — see "iOS audio" below.
- `src/hooks/useMetronome.js`, `usePitchPipe`-equivalent logic in `PitchPipePage.jsx` — both consume the shared AudioContext.
- `src/hooks/useLanguage.js` — persists language choice to `localStorage`.
- `src/hooks/useTheme.jsx` — dark/light mode.
- `public/_redirects` — Netlify SPA fallback (needed for react-router client routing to work on Netlify).

## iOS audio — known pain point
A large fraction of git history is iOS Safari audio fixes (silent mode, AudioContext resume/unlock, shared context sync between metronome and pitch pipe). If touching audio code:
- Always go through `getSharedAudioCtx()` / `unlockSharedAudioCtx()` in `useAudioContext.js` rather than creating a new `AudioContext`.
- iOS requires the AudioContext to be resumed/unlocked from within a user-gesture handler (tap), and is picky about silent-mode playback — a silent-buffer-unlock trick is used for this.
- Test fixes against actual iOS Safari, not just desktop Chrome, before considering them done.

## Conventions
- Components are plain `.jsx` files under `src/components/`, one component per file, mostly using inline `style={{...}}` objects rather than CSS classes.
- New instrument categories/tunings go in `src/data/instruments.js`; new routes need a matching entry in `src/data/seoData.js` for SEO metadata.
