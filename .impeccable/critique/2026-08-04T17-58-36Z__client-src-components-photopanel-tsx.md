---
target: PhotoPanel component
total_score: 10
max_score: 32
na_heuristics: 7,10
p0_count: 2
p1_count: 2
timestamp: 2026-08-04T17-58-36Z
slug: client-src-components-photopanel-tsx
---
Method: dual-agent (A: a933ebdc4ee989b88 · B: ad017e1019a8cdc4a)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 1/4 | No loading/error feedback for the headshot; on touch devices the mask never leaves `-999px`, so there is never any status to see. |
| 2 | Match System / Real World | 3/4 | Darkroom/film motif lands, but REC (video) + FRAME (photo) mixes two camera metaphors. |
| 3 | User Control and Freedom | 1/4 | Only one way to see the photo — mouse hover. No tap, no click, no keyboard path. |
| 4 | Consistency and Standards | 1/4 | `bg-gray-800` (PhotoPanel.tsx:47) isn't a theme token; the site defines `ink`/`ink-blue`/`paper`/`orange`/`ash` in `index.css` and this component ignores all of them. Image handling also ignores the codebase's own `ImageWithSkeleton` pattern. |
| 5 | Error Prevention | 1/4 | A comment claims a fallback to `/assets/cit.png` if `me.jpg` is missing; no such fallback exists in code. |
| 6 | Recognition Rather Than Recall | 0/4 | Nothing signals a photo exists at rest — no dim preview, no cursor change, no label. Discovery is accidental. |
| 7 | Flexibility and Efficiency | n/a | No repeated expert task on a Persuade-mode hero panel. |
| 8 | Aesthetic and Minimalist Design | 3/4 | HUD typography is clean when visible; undercut by the default "empty gray box" resting state. |
| 9 | Error Recovery | 0/4 | No error path for a failed image load — silent no-op, nothing shown or logged. |
| 10 | Help and Documentation | n/a | Not applicable to a marketing hero surface. |
| **Total** | | **10/32** | **Poor (31%)** |

## Design Specificity Verdict

**LLM assessment**: The HUD chrome — corner brackets, REC dot, monospace timestamp, and a frame counter that's actually wired to live nav-hover state — is genuinely authored for this product's film/darkroom identity. But the mechanism underneath that chrome, a flat dark rectangle with a cursor-following spotlight mask, is a portfolio-cliché "reveal" effect that would drop into any dark-themed site unchanged. Worse, it actively fights the site's own system: `bg-gray-800` isn't one of the site's defined tokens (`ink`, `ink-blue`, `paper`, `orange*`, `ash*`), and the image is a CSS `background-image` instead of the `<img>` + skeleton pattern this same codebase already uses elsewhere (`ImageWithSkeleton.tsx`). The bespoke layer is chrome; the load-bearing mechanic underneath is generic and self-inconsistent.

**Deterministic scan**: `detect.mjs` ran clean (exit 0, zero findings) against `PhotoPanel.tsx`, `Hud.tsx`, and `GrainFlicker.tsx`. That's expected, not reassuring — the issues here (touch-unreachable content, an off-palette color, a missing `alt`, a dead fallback comment) are semantic/product-context judgments a pattern-matching scanner isn't built to catch. No false positives to flag since nothing fired.

**Visual overlays**: Not available this run. The Claude-in-Chrome extension wasn't connected in this session, so no live screenshot or hover-state evidence could be captured at desktop or 390px mobile width. Confirmed instead by direct source read: only `onMouseEnter`/`onMouseLeave`/`onMouseMove` are wired (PhotoPanel.tsx:25-40) — there is no touch/pointer equivalent, so on any touch device the mask stays parked at `-999px` permanently.

## Overall Impression

The chrome is doing real work; the photo isn't. This panel spends `h-[70vh]` (full-screen on wide viewports) of the single most valuable real estate on the site — a recruiter's first five seconds — on a mechanic that hides the one asset built to create a human connection (the candidate's face) behind an interaction most visitors will never perform, and that touch users physically *cannot* perform at all. The biggest opportunity: make the photo visible by default and treat the cursor-spotlight as a desktop-only enhancement layered on top, not the sole means of access.

## What's Working

1. **`FrameCounter` bound to live nav-hover state** (`hoveredFrame ?? 0` in `HomePage.tsx:53`) — "FRAME 01/05" isn't decorative filler, it tracks real navigation state. A detail-level payoff of the brand concept that most portfolio sites wouldn't bother wiring up.
2. **`GrainFlicker` respects `prefers-reduced-motion`** (`GrainFlicker.tsx:16`), checked before the interval even starts — more careful than most decorative-motion code.
3. **The collapsed-state Menu button is properly built** (`PhotoPanel.tsx:78-94`): real `<button>`, icon *and* text label (not icon-only), visible `focus-visible` ring in brand orange. It's the one part of this component that clears the accessibility bar the rest of it misses.

## Priority Issues

**[P0] Photo is unreachable on touch devices**
- **Why it matters**: Only `onMouseEnter`/`onMouseLeave`/`onMouseMove` are wired (PhotoPanel.tsx:25-40); there's no pointer/touch equivalent, so the mask never moves off `-999px` on any touch device. This isn't degraded — it's total content loss for every phone/tablet visitor, and for any desktop visitor who never happens to hover that exact panel.
- **Fix**: Show the photo (full or lightly treated) by default, and gate the cursor-spotlight mask behind a `(hover: hover) and (pointer: fine)` media query so it's a desktop-only enhancement layered on an already-visible image, not the only way in.
- **Suggested command**: `/impeccable adapt`

**[P0] No affordance that a photo exists at all**
- **Why it matters**: Heuristic 6 scores 0/4 — no dimmed preview, no cursor change, no hint text signals there's a person to find. Discovery is pure accident, and the resting state (a flat gray box) reads as broken or empty rather than "waiting to be explored."
- **Fix**: Show the headshot at low opacity/desaturated by default; hover sharpens it to full clarity. Converts "empty box" into a legible photo that's simply enhanced on interaction, and doubles as the fix for the mobile case above.
- **Suggested command**: `/impeccable clarify`

**[P1] `bg-gray-800` is off-palette**
- **Why it matters**: `index.css` defines `--color-ink`, `--color-ink-blue`, `--color-paper`, `--color-orange*`, `--color-ash*` — no `gray-800` anywhere in the system. It's the dominant fill of the highest-visibility surface on the page and breaks the token system exactly where it's most visible.
- **Fix**: Replace with `bg-ink-blue` or `bg-ink`.
- **Suggested command**: `/impeccable colorize`

**[P1] Headshot is a CSS background-image, not an `<img>`**
- **Why it matters**: No `alt` text, invisible to screen readers and to SEO/image indexing. Every sibling HUD element is also `aria-hidden`, so a screen reader announces nothing in this panel at all — no name, no photo, no context. It's also inconsistent with `ImageWithSkeleton.tsx`, this codebase's own established pattern (sized skeleton, real `<img>`, `onLoad` cross-fade, CLS-safe).
- **Fix**: Render a real `<img src="/assets/me.jpg" alt="…">`, apply the mask to the img element, and reuse `ImageWithSkeleton` for consistent loading/failure handling.
- **Suggested command**: `/impeccable harden`

**[P2] No loading/error state; stale fallback comment**
- **Why it matters**: The comment at PhotoPanel.tsx:53 ("fallback to existing /assets/cit.png if me.jpg missing") describes behavior that doesn't exist — `background-image` can't fire `onError`. If the asset 404s, the panel silently shows nothing, no signal to user or developer.
- **Fix**: Implement the described fallback once it's a real `<img>` (an `onError` handler swapping `src`), or delete the misleading comment.
- **Suggested command**: `/impeccable harden`

## Persona Red Flags

**Casey (Distracted Mobile User)**: Below the `split` breakpoint, Casey gets a flat `bg-gray-800` block at `h-[70vh]` — nearly the entire first screen — with zero way to ever trigger the reveal, since no touch handlers exist at all. Casey scrolls past a gray box with tiny corner labels before reaching any real content.

**Sam (Accessibility-Dependent User)**: Every element in the panel is `aria-hidden="true"` (Hud.tsx — CornerBrackets, RecDot, Timestamp, FrameCounter), and the photo itself has no alt text since it's a CSS background, not an `<img>`. A screen reader announces nothing here. Compounding it, the reveal is mouse-only with no focusable element and no keyboard equivalent — a keyboard-only user (not necessarily even a screen-reader user) has no way to trigger it. This is a keyboard-accessibility failure, not just a screen-reader one.

**Riley (Deliberate Stress Tester)**: `onMouseMove` calls `getBoundingClientRect()` and writes two CSS custom properties on every raw mousemove event with no throttling or `requestAnimationFrame` batching (PhotoPanel.tsx:33-40), concurrently with `GrainFlicker`'s 120ms `setInterval` re-rolling SVG turbulence during the same hover. Fast mouse movement or a lower-end device stacks unthrottled layout reads against a running animation timer — a plausible jank source.

## Minor Observations

- No `cursor` change on hover to hint interactivity, even for the desktop users who do get the mechanic.
- `["--mx" as any]` typing hack for CSS custom properties — code smell, not a design issue.
- The mask circle is a fixed `14rem` (~448px diameter) regardless of viewport — moot today since mobile can't trigger it, but would need reconsidering once touch support is added.
- REC dot (video signifier) + "FRAME 03/05" (bound to nav-hover, not actual photo frames) mixes photography and camcorder metaphors in a way that's cute but not fully self-consistent.

## Questions to Consider

- If the headshot is meant to build trust with a recruiter in the first 5 seconds, why is it gated behind an interaction that most of your traffic — mobile, touch, and keyboard-only visitors — cannot physically perform?
- Is the hidden-photo mechanic actually part of the "developing film" story (an image emerging under light), or does it just read as a broken/empty image to the majority of visitors who never discover it?
- Would this component still feel "designed" if the mouse never touched it — should the resting state itself carry the brand, instead of only the interaction doing so?
