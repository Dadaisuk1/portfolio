# VIEWFINDER — DESIGN SPEC
### Portfolio design system — color, type, spacing, sizing, components

---

## 00. Concept

Digicam HUD aesthetic meets frontend/UI-UX developer identity. A 3D digicam loading screen shutter-cuts into a split-screen home: photo panel with viewfinder HUD on one side, big Fraunces type + paper-grain menu on the other. Colors are sampled directly from the portfolio owner's own photos, not invented.

---

## 01. Color

| Token | Hex | Usage |
|---|---|---|
| `--ink` | `#11100B` | Primary background |
| `--ink-blue` | `#151C23` | Cards, panels, alt surfaces |
| `--paper` | `#F5F2EA` | Menu panel, light surfaces (warm white, not pink) |
| `--orange` | `#EE5D00` | Primary accent — REC dot, active states, hover text. Use sparingly |
| `--orange-deep` | `#A33E00` | Orange on a fill that needs 4.5:1 with light text (primary button fill, orange text on paper) — plain `--orange` fails WCAG AA in both cases |
| `--orange-muted` | `#753229` | Secondary accent, muted labels, tag borders |
| `--teal` | `#175669` | Cool counterweight, dark accent panels |
| `--ash` | `#848D94` | Secondary text, borders, HUD labels — **ink backgrounds only** (5.64:1) |
| `--ash-deep` | `#5C6570` | Same role as `--ash`, on **paper backgrounds** — plain `--ash` on paper is 3.02:1, fails WCAG AA at small sizes |

```css
:root {
  --ink: #11100B;
  --ink-blue: #151C23;
  --paper: #F5F2EA;
  --orange: #EE5D00;
  --orange-deep: #A33E00;
  --orange-muted: #753229;
  --teal: #175669;
  --ash: #848D94;
  --ash-deep: #5C6570;
}
```

**Rule:** orange is the one hot color — at most 2–3 uses per screen. Everything else runs on ink, ash, and the two dark/light panel tones.

---

## 02. Typography

| Role | Typeface | Weight / Style | Size | Line-height | Usage |
|---|---|---|---|---|---|
| Hero | Fraunces | italic 340 | `5rem` (`--text-3xl`) | 0.95 | Hero only |
| H1 | Fraunces | 580 | `3.5rem` (`--text-2xl`) | 1 | Section titles |
| H2 | Fraunces | 580 | `2.5rem` (`--text-xl`) | 1.05 | Subsections, nav items |
| H3 | Fraunces | 460 | `1.75rem` (`--text-lg`) | 1.1 | Card titles |
| Body large | Manrope | 400 | `1.25rem` (`--text-md`) | 1.5 | Intros, pull quotes |
| Body | Manrope | 400 | `1rem` (`--text-base`) | 1.6 | Body copy |
| Mono / HUD | JetBrains Mono | 500 | `0.85rem` (`--text-sm`), +0.08em tracking | 1.4 | Labels, timestamps, nav numbers |

```css
:root {
  --font-display: "Fraunces", Georgia, serif;
  --font-body: "Manrope", -apple-system, sans-serif;
  --font-hud: "JetBrains Mono", monospace;

  --text-xs: 0.72rem;
  --text-sm: 0.85rem;
  --text-base: 1rem;
  --text-md: 1.25rem;
  --text-lg: 1.75rem;
  --text-xl: 2.5rem;
  --text-2xl: 3.5rem;
  --text-3xl: 5rem;
}
```

---

## 03. Spacing

Single 4px-based scale — no one-off margins.

| Token | Value | Typical use |
|---|---|---|
| `--sp-1` | 4px | Icon/text micro-gaps |
| `--sp-2` | 8px | Tag padding, tight gaps |
| `--sp-3` | 12px | Button padding, small gaps |
| `--sp-4` | 16px | **Base unit** — default padding |
| `--sp-5` | 24px | Card padding, row gaps |
| `--sp-6` | 32px | Card padding (large), grid gaps |
| `--sp-7` | 48px | Component spacing |
| `--sp-8` | 64px | **Section padding** |
| `--sp-9` | 96px | Large section breaks |
| `--sp-10` | 128px | Hero top padding |

```css
:root {
  --sp-1: 4px;  --sp-2: 8px;   --sp-3: 12px;  --sp-4: 16px;  --sp-5: 24px;
  --sp-6: 32px; --sp-7: 48px;  --sp-8: 64px;  --sp-9: 96px;  --sp-10: 128px;
}
```

---

## 04. Sizes — radii, borders, breakpoints

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | 2px | Buttons, tags, small UI |
| `--radius-md` | 6px | Cards, panels, image frames |
| `--border-hair` | 1px | Dividers, card outlines |
| `--border-thick` | 2px | Corner brackets, primary button border |
| HUD dot | 6–7px diameter | REC indicator |
| Corner bracket | 16–22px, 2px stroke | Viewfinder corners on photo panels |
| Breakpoint — mobile | `< 700px` | Stack split-screen to single column |
| Breakpoint — desktop | `≥ 700px` | Two-column split screen |
| Max content width | 1400px | Body copy / long-form sections |

---

## 05. Components

**Buttons**
- Primary: `background: var(--orange-deep)`, `color: var(--paper)`, `border: 2px solid var(--orange-deep)` (not plain `--orange` — fails AA with light text, see color table), padding `12px 24px`, `--radius-sm`, JetBrains Mono **medium (500)**, uppercase, +0.06em tracking
- Ghost: transparent background, `1px solid var(--paper)` border, same padding/type
- All variants use JetBrains Mono medium (500) — the 400 weight reads too thin at this size/tracking

**Nav / menu item**
- Fraunces 580, `1.75rem`, flex row with a JetBrains Mono frame number prefix (`[01]`) in `--orange`
- 1px bottom border in `rgba(ash, 0.25)`; hover shifts text color to `--orange`

**Tag**
- JetBrains Mono, `0.72rem`, uppercase, +0.08em tracking, `4px 12px` padding, pill radius (`999px`), `1px solid var(--orange-muted)` border, `--orange` text

**HUD overlay (on photo panels)**
- Corner brackets: 4 L-shaped marks, 16–22px, 2px stroke, `rgba(paper, 0.8)`, positioned 12–24px from each edge
- REC indicator: 6px dot (pulsing, 1.6s ease-in-out) + "REC" label, top-left or top-right, JetBrains Mono, `--orange`
- Timestamp: bottom-left, JetBrains Mono, `--orange`, format `'YY MM DD · HH:MM`
- Frame counter: JetBrains Mono, `--paper` or `--ash`, format `FRAME 001/012`

---

## 06. Grain — two textures, not one

Photographic grain and paper grain are physically different materials — don't reuse one noise asset for both.

| | Photo grain | Paper grain |
|---|---|---|
| SVG `feTurbulence` baseFrequency | 0.8 | 0.9 |
| numOctaves | 2 | 3 |
| Opacity | 4–6% (UI) / up to 15% (demo/hero) | 8–10% (UI) / up to 35% (demo) |
| Blend mode | `overlay` | `multiply` |
| Color character | Neutral, slightly cool in shadows | Warmer, coarser |

```css
.grain {
  background-image: url("data:image/svg+xml,...feTurbulence baseFrequency='0.8' numOctaves='2'...");
  opacity: 0.05;
  mix-blend-mode: overlay;
}
.paper-grain {
  background-image: url("data:image/svg+xml,...feTurbulence baseFrequency='0.9' numOctaves='3'...");
  opacity: 0.09;
  mix-blend-mode: multiply;
}
```

---

## 07. Motion

- Loading screen: 3D camera idles with a slow continuous rotation (7s linear loop); "developing" progress bar fills over ~2.6s
- Transition: single white shutter-flash cut (0.28s) — a cut, not a fade, matches the "camera" logic
- Hover states: hard color swaps (button/nav), not eased fades
- REC dot: 1.6s ease-in-out opacity pulse
- Section reveal ("developing print"): `opacity 0→1`, `y 28→0`, `blur(6px) saturate(0.5) → blur(0) saturate(1)`, 0.9s `power2.out`, GSAP ScrollTrigger `start: "top 82%"`, plays once — implemented in `useDevelopReveal`
- All animated elements have a `prefers-reduced-motion: reduce` fallback — camera stops rotating (static angle), REC dot goes static, progress bar completes instantly

---

## 08. Interaction Additions

**Scroll engine**
- Lenis drives the actual smoothing, in its default window-scroll mode (no wrapper/content div split — simpler than the GSAP ScrollSmoother setup it replaced, and avoids a class of width-normalization bugs that setup had). `duration: 1.2s`, `smoothWheel: true`; both drop to near-zero under `prefers-reduced-motion` (native-feeling instant scroll instead).
- GSAP ScrollTrigger stays the trigger system for everything scroll-position-based (section reveal, back-to-top visibility) — synced to Lenis via `lenis.on('scroll', ScrollTrigger.update)` and `gsap.ticker.add(time => lenis.raf(time * 1000))`. Don't reach for `window.addEventListener('scroll')` directly; go through this pairing.
- `scrollToTarget(selector)` / `scrollToTop()` in `lib/smoothScroll.ts` wrap `lenis.scrollTo(...)` — every nav/CTA scroll action goes through these, not a raw DOM API.

**Back-to-top**
- Fixed bottom-right (mirrors any future bottom-left floating trigger, e.g. a contact launcher), circular, `bg-ink`/`text-paper`, appears via `ScrollTrigger` boundary at the hero's bottom edge (`onEnter`/`onLeaveBack`).
- Also hides itself immediately in its own `onClick`, rather than relying solely on the ScrollTrigger callback catching up with an animated scroll — that lag is real and was verified live, not assumed.

**Magnetic elements** (`hooks/useMagnetic.ts`)
- Cursor-follow pull via `gsap.quickTo` on `x`/`y`, relative offset from element center clamped to `±maxOffset` and scaled by a `0.4` pull-strength factor, eased back to `(0, 0)` on `mouseleave`.
- No-ops under `prefers-reduced-motion` **and** under `(hover: none)` (touch-only devices have no persistent cursor to follow) — both checked inside the effect, not at the call site.
- Ship as an opt-in `magnetic` prop on `Button`/`LinkButton` (default `12px` offset) rather than wrapping call sites; applied to the hero and Footer CTAs. Certifications cards use the same hook directly at a smaller `6px` offset (subtle pull, not a full button-style magnet) — see `sections/Certifications.tsx`'s `CredentialCard` for the pattern when a hook needs to run per-item inside a `.map()` (extract a sub-component, since hooks can't be called inside a loop callback).
- Note: GSAP's `quickTo` on `x`/`y` writes to the independent CSS `translate` property, not the `transform` shorthand — check `getComputedStyle(el).translate` (or the element's `style.cssText`), not `.transform`, when inspecting or debugging this in devtools.

**Hover-only underlines**
- Links get `hover:underline` (no base `underline`), `underline-offset-2`. Group-scoped titles (e.g. Certifications card names) use `group` on the container + `group-hover:underline` on the title. Applies to the CIT link in Education and the Certifications card titles.

**Entrance / stagger reveals**
- `hooks/useTextReveal.ts`: staggers the ref's direct children in on mount (not scroll-triggered) — used for the hero headline, pre-split into per-word `<span>`s. `opacity 0→1`, `y 16→0`, `blur(6px)→blur(0)`, 0.06s stagger.
- `hooks/useStaggerReveal.ts`: scroll-triggered version of the same motif for a *group* of items (no y-shift, since items sit in a grid rather than sliding into place like a print). Takes an optional `childSelector` to target nested items instead of direct children — used on the Tech Stack icon grid via a `data-reveal-item` attribute on each icon row, since the grid's direct children are the column wrappers, not the icons themselves.

**Reduced-motion convention**
- Every new animated element checks `window.matchMedia("(prefers-reduced-motion: reduce)").matches` and either no-ops or jumps to the end state — never partially animates. See `GrainFlicker`, `LoadingScreen`, `useDevelopReveal`, and the hooks above for the pattern to copy.

**Credential card links**
- Each `CredentialCard` is now the `<a>` itself (not a `<div>` with a link inside) — `useMagnetic<HTMLAnchorElement>` on the whole card, `target="_blank" rel="noreferrer"`, real verification URLs on `certifications[].url` in `resume.ts` (2 Credly, 1 Credly, 1 Credential.net — mapping confirmed by the site owner, not guessed). Title gets a trailing `↗` inside the same underlined `<p>` so "Name ↗" reads as one clickable unit.

---

## 09. Interaction Batch (Phase C) — shipped

Phase A (scroll engine, CIT/Tech-Stack fixes, download spinner, button contrast), Phase B (magnetic elements, hover-underlines, entrance/stagger reveals, credential card links), and Phase C (below) are all shipped.

**Image skeletons** (`components/ImageWithSkeleton.tsx`)
- Pulsing placeholder (`bg-ash/20 animate-pulse`) sized to explicit `width`/`height` props, cross-fades via opacity transition to the real `<img>` on its `onLoad` event. Width/height are also set as real HTML attributes for CLS prevention. Applied to the CIT crest in both Education and Certifications — the only real network-latency content on an otherwise static-data page.

**Contact modal** (`components/ContactModal.tsx`)
- Floating trigger bottom-left (mirrors back-to-top's bottom-right, same `z-40`), opens a chat-panel-styled form (name/email/message) in the site's HUD/paper-grain visual language. Supplements the Footer's `mailto:` button rather than replacing it.
- Submits via `fetch` to web3forms' API, access key read from `VITE_WEB3FORMS_ACCESS_KEY` (see `client/.env.example`). With no key configured, submission fails gracefully with an inline message pointing to the real email instead — the UI doesn't require the key to ship.
- **Outside-click-to-close gotcha**: the `mousedown` listener that closes the panel on an outside click must explicitly exclude the trigger button itself (a `triggerRef`, checked alongside `panelRef`), not just the panel. `mousedown` fires before the button's own `onClick` toggle — without the exclusion, clicking the trigger to close it fires "outside click → close" first, then the button's own toggle immediately reopens it, so the panel never closes via its own button.
- **`paper-grain` + `fixed` conflict**: `.paper-grain` (and `.grain`) set `position: relative` and live in `@layer utilities` — the same layer as Tailwind's own utilities. Combined on one element, whichever rule comes later in the compiled stylesheet wins by source order, not by the `fixed`/`relative` token's "specialness" — in practice `.paper-grain` won and silently downgraded `position: fixed` to `relative`. Every prior use of `paper-grain` in this codebase paired it with `relative` anyway, so this never surfaced before the contact modal tried to pair it with `fixed`. Don't combine `paper-grain`/`grain` with `fixed` (or `absolute`) on the same element — apply the grain texture to a non-positioned descendant instead if both are needed.
