---
target: the whole page
total_score: 19
max_score: 24
na_heuristics: 5,7,9,10
p0_count: 0
p1_count: 2
timestamp: 2026-08-04T14-07-29Z
slug: client-src-pages-homepage-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Frame counter and hero toggle give clear feedback; no "you are here" cue once scrolled past the hero |
| 2 | Match System / Real World | 4 | Camera/darkroom metaphor is intuitive and sustained everywhere |
| 3 | User Control and Freedom | 2 | No persistent nav or back-to-top past the hero; long manual scroll to move between sections |
| 4 | Consistency and Standards | 4 | Nav numbering, section eyebrows, spacing, and font application all in sync after the polish pass |
| 5 | Error Prevention | n/a | No user input exists on this surface |
| 6 | Recognition Rather Than Recall | 3 | Nav only lives in the hero; scrolled-down visitors must remember section order |
| 7 | Flexibility and Efficiency | n/a | Persuade/Experience surface, no power-user path expected |
| 8 | Aesthetic and Minimalist Design | 3 | Clean, but Tech Stack → Education → Credentials in a row is three grid/spec-sheet layouts back to back |
| 9 | Error Recovery | n/a | No error states possible on a static portfolio |
| 10 | Help and Documentation | n/a | Persuade/Experience surface |
| **Total** | | **19/24** | **79% — Good** |

## Design Specificity Verdict

**Assessment**: Real specificity. The camera/darkroom motif (REC dot, frame counters, viewfinder, developing-photo loading sequence, iris-wipe shutter transition, film-grain hover) is unusual and carried consistently through every surface, not just the hero. This isn't a generic dev-portfolio template. The information architecture underneath it (Featured Work / Tech Stack / Education / Credentials / Footer CTA), though, is conventional — the differentiation lives entirely in the visual/motion language, not the content structure. That's a reasonable trade for a portfolio, worth naming rather than treating as a gap.

**Deterministic scan**: `detect.mjs` run against all 14 homepage-related source files returned zero findings (clean).

**Visual overlays**: Not run this pass — skipped by request to control cost. No user-visible overlay exists in the browser from this critique.

## Overall Impression

The site is well-crafted and internally consistent — this session's polish pass genuinely fixed real defects (Education's dead grid column, invisible Cursor icon, nav/section numbering drift). The biggest opportunity isn't visual polish at this point, it's navigational: once a visitor scrolls past the hero, there's no way back to any section without a long manual scroll, and the "who is this person" bio that used to live in About is now gone entirely from the page.

## What's Working

1. **The motif is genuinely sustained, not decorative.** Frame counters, REC dots, and the developing/shutter loading sequence aren't a one-off hero flourish — they recur meaningfully across the loading screen, hero HUD chrome, and hover states.
2. **Content is scrupulously grounded.** Every claim traces to real resume data; nothing fabricated (project links go to real repos, cert types match how those credentialing programs actually work). That directly serves the audience — recruiters evaluating credibility.
3. **Evidence of real iteration.** Nav numbering, section eyebrows, spacing rhythm, and font application are all in sync after this session's fixes — the codebase reads as actively refined, not first-draft-shipped.

## Priority Issues

**[P1] No persistent navigation past the hero**
- Why it matters: Nav only exists inside the hero `<section>`; scrolling into Featured Work, Tech Stack, Education, or Credentials leaves no way to jump elsewhere except a long manual scroll back up. This is worse on mobile, where per-section scroll distance is longer. Directly weakens heuristics 3 and 6.
- Fix: a minimal sticky corner nav, a scroll-progress indicator, or at minimum a back-to-top affordance.
- Note: a scroll-to-top icon was proposed and then explicitly declined earlier this session — so this may be a known, accepted trade-off rather than a surprise. Flagging it here so it's a deliberate choice, not a silent gap.
- Suggested command: `/impeccable layout` or `/impeccable animate`

**[P1] The "About" narrative is gone**
- Why it matters: After removing About.tsx per direction, there's no prose bio anywhere on the page. A recruiter has to reconstruct "who is this and why should I care" from a list of projects/skills/credentials rather than reading it directly. The hero subhead ("building interfaces end-to-end, from Figma to production React") carries some of this, but it's a fragment, not a pitch.
- Fix: either extend the hero subhead with one more sentence of positioning, or add a short bio line to the Footer before the CTA — doesn't need a dedicated section to close the gap.
- Suggested command: `/impeccable clarify`

**[P2] Ash-on-paper contrast is unverified**
- Why it matters: Small-caps HUD labels (Certifications' "TRAINING BADGE · DEC 2025", Education's "DEGREE"/"LANGUAGES") use `text-ash` (#848D94) on `bg-paper` (#F5F2EA) at `text-tag` size (~11.5px). That's a light gray-blue on near-white at small text — a plausible AA risk that hasn't been measured. The codebase already has precedent for this exact problem (the `--color-orange-deep` token exists specifically because plain orange fails AA on paper) but no equivalent exists for ash yet.
- Fix: measure the actual ratio; if it fails, introduce an `ash-deep` token mirroring the orange-deep pattern.
- Suggested command: `/impeccable audit`

**[P2] Three grid/spec-sheet sections in a row**
- Why it matters: Tech Stack → Education → Credentials are all "label + columns of cards/list items." After the editorial, row-based Featured Work section, the back half of the page reads more like a structured resume dump than a crafted narrative — weakening the build toward the Footer's CTA.
- Fix: break the pattern once — Education is the best candidate since it's already the flattest/most de-emphasized section.
- Suggested command: `/impeccable layout`

**[P3] /notes is a live nav promise with no content yet**
- Why it matters: "Notes & Inspiration" sits in the primary 5-item nav, but all four category tabs currently show "coming soon" by design. A visitor who clicks it hits an intentional dead end.
- Fix: either fill it soon or hold it out of primary nav until it has real content.
- Suggested command: `/impeccable onboard`

## Persona Red Flags

**Jordan (first-timer / recruiter)**: Lands on the hero, understands name/role immediately — good. But may scroll expecting to find a bio/About section further down and never find one, since it's genuinely gone rather than relocated. Ties directly to the P1 above.

**Casey (distracted mobile user)**: Hero CTAs are reachable one-handed. But interrupted mid-scroll and returning later, there's no quick way back to a specific section — the missing persistent nav (P1) costs more on mobile, where scroll distance per section is longest.

## Minor Observations

- Footer repeats the hero's GitHub/LinkedIn/Email links — a deliberate, explicitly requested choice this session, not an oversight, but worth naming as a repeated-CTA pattern if it's ever reconsidered.
- Windsurf/Lovable now correctly render as separate Tech Stack rows since both have distinct icons — no issue, just confirming the earlier fix held.
- AWS/IBM/CIT-U credential icon contrast fixes from this session are holding correctly; no regression found.

## Questions to Consider

- Could the "About" gap close without a new dedicated section — one more sentence in the hero subhead, or a short line opening the Footer?
- Now that Education and Credentials are both grid-heavy, would breaking Education into a single-column editorial list (matching Featured Work's row style) tighten the back half's pacing?
- Is /notes meant to stay in the primary nav indefinitely while empty, or is there a target date to fill it in?
