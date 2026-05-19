# Dhavala Sourabh · dsignosour

A cinematic product marketing portfolio built around editorial pacing, oversized
typography, and immersive scrolling. Designed as one continuous experience
rather than a collection of pages.

## Stack

- React 18 + Vite + TypeScript
- Tailwind CSS with HSL token system
- shadcn/ui primitives (utility layer)
- Framer Motion for cinematic reveals
- React Router for case study routing

## Routes

| Route                        | Page                |
| ---------------------------- | ------------------- |
| `/`                          | Home                |
| `/work/fss-transformation`   | FSS Transformation  |
| `/work/gtm-narratives`       | GTM Narratives      |
| `/work/simply-payments`      | Simply Payments     |
| `/work/innovation-lab`       | Innovation Lab      |

## Design system

### Typography
- Display: `Instrument Serif` (oversized headings, italics for emphasis pairs)
- Body: `Inter` 400 / 500

### Color tokens (HSL via CSS variables)
- `--background: 201 100% 13%` (deep cinematic navy)
- `--foreground: 0 0% 100%`
- `--muted-foreground: 240 4% 66%`
- `--border: 0 0% 18%`

### Signature surfaces
- `.liquid-glass`: restrained gradient-bordered glass surface used for the CTA pill and primary buttons
- `.editorial-placeholder`: cinematic media slot with corner marks, used everywhere image content would otherwise appear

### Motion
- `animate-fade-rise` (and `-delay`, `-delay-2`, `-delay-3`) for staggered hero entrance
- Framer Motion `whileInView` reveals for case study sections (1s, custom ease `[0.16, 1, 0.3, 1]`)

## Setup

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Architecture notes

- **No card grids.** Case study previews are full-width editorial scenes with alternating alignment.
- **No bordered containers.** Outcomes use oversized numerals separated by thin top rules only.
- **No overlays on the hero video.** The video carries all atmosphere by design.
- **Em dashes are not used anywhere** in copy. Colons, periods, and middle dots are used instead.
