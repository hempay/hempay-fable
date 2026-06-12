# Hempay Fable — "Midnight Cacao"

An award-style reimagining of the Hempay landing experience for
**HEMPAY TECH INNOVATIONS LIMITED** (RC - 9198815).

Dark cocoa & copper theme drawn from the brand logo, with a GSAP-driven
scroll narrative:

- **Preloader** — counter + wordmark reveal, curtain lift
- **Hero** — split-text headline, mouse-parallax 3D virtual cards, floating currency glyphs, infinite FX ticker
- **Card Fan** *(signature moment)* — pinned scene where all **11 currency cards** fan out of a single stack as you scroll, counter ticking 01 → 11
- **Why Hempay** — editorial index rows (all 7 features)
- **Bank in your chats** — animated WhatsApp/Telegram bot conversation in a phone mockup
- **Services** — pinned horizontal-scroll gallery (vertical stack on mobile)
- **How It Works** — 4 steps along a scroll-drawn spine
- **App Download** — copper panel with App Store / Google Play / bot links
- **FAQ** — animated accordion (all 7 questions)
- **CTA + Footer** — giant parallax wordmark, full link columns & legal

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4
- GSAP 3.15 (ScrollTrigger, SplitText, matchMedia) — all plugins now free
- Lenis smooth scroll (driven by the GSAP ticker)
- Fonts: Clash Display + Satoshi (Fontshare), Instrument Serif (Google)

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build → dist/
```

## Verification scripts

Headless-Chrome checks used during development (require `playwright` devDep):

```bash
node scripts/verify.mjs    # console errors, overflow audit, full-page screenshots (desktop + mobile)
node scripts/interact.mjs  # mobile menu, FAQ accordion, anchor-nav smoke tests
```

## Notes

- Custom cursor & mouse parallax are desktop-only (`pointer: fine`); touch devices skip them.
- `prefers-reduced-motion` disables grain, CSS transitions, and Lenis smoothing.
- Bot/app links in `src/data/content.ts` carry the placeholder URLs from the
  reference site (`wa.me/your-number`, `t.me/your-bot`) — swap in the real ones before launch.
