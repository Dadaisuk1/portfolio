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
| `--orange` | `#EE5D00` | Primary accent — REC dot, active states, one CTA per screen. Use sparingly |
| `--orange-muted` | `#753229` | Secondary accent, hover states, muted labels |
| `--teal` | `#175669` | Cool counterweight, dark accent panels |
| `--ash` | `#848D94` | Secondary text, borders, HUD labels |

```css
:root {
  --ink: #11100B;
  --ink-blue: #151C23;
  --paper: #F5F2EA;
  --orange: #EE5D00;
  --orange-muted: #753229;
  --teal: #175669;
  --ash: #848D94;
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
- Primary: `background: var(--orange)`, `color: var(--ink)`, `border: 2px solid var(--orange)`, padding `12px 24px`, `--radius-sm`, JetBrains Mono, uppercase, +0.06em tracking
- Ghost: transparent background, `1px solid var(--paper)` border, same padding/type

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
- All animated elements have a `prefers-reduced-motion: reduce` fallback — camera stops rotating (static angle), REC dot goes static, progress bar completes instantly
