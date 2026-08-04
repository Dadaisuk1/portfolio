# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Recruiters and hiring managers screening for technical internships. They land on the site to quickly decide whether to reach out — scanning for real ownership on real projects, not just a skills list.

## Product Purpose

A personal portfolio for Darwin Darryl Jean E. Largoza, a 4th-year IT student (Cebu Institute of Technology – University), built to win a technical internship. Success is a recruiter reaching out for an interview.

## Positioning

An AI-native builder, not just a student who uses AI tools: fluency pairing Claude Code, Cursor, Lovable, and Windsurf with real end-to-end ownership — designing full UIs in Figma and shipping them as production React, including a capstone (Ally, an AI-powered legal platform) where he owned frontend/UI-UX across a multi-user, role-based product on a Firebase backend.

## Operating Context

Content is driven by `src/data/resume.ts`, structured into sections (`Work`, `About`, `Skills`, `Education`, `Contact`) each rendered via `src/sections/*.tsx`. The current visual system uses a film/darkroom "develop" motif — numbered frame markers (`[01]`–`[04]`), a `FRAME n/04` tag on project cards, a REC dot, and a hud/display type pairing over an ink-blue/paper/orange palette — carried through a `useDevelopReveal` scroll-reveal hook and a `useSmoothScroll` wrapper.

## Capabilities and Constraints

- Stack: React 19 + TypeScript + Vite, TailwindCSS v4, GSAP (`@gsap/react`) for scroll/reveal animation.
- `src/data/resume.ts` (sourced from `public/resume.md`) is the single source of truth for project, skill, education, and contact content. Design and content work must trace claims back to it — no invented metrics, testimonials, or case studies.
- Featured projects (from resume): Ally (AI-powered legal platform, capstone), Notes App (Web2/Web3 hybrid with Cardano), CampusXperience (campus event platform), CrediGo (system integration project).
- No live deployment/hosting target confirmed yet.

## Evidence on Hand

- `public/resume.md` — full resume text (summary, skills, projects, education, certifications, languages).
- `src/data/resume.ts` — structured resume data consumed by the sections.
- No testimonials, press, or third-party proof exist; do not fabricate them.

## Product Principles

1. Every claim on the site must be traceable to the resume data — credibility over embellishment.
2. Design should demonstrate the "designs in Figma, ships in React" positioning through its own craft, not just state it.
3. Optimize for a recruiter's fast scan: clear project ownership, stack, and outcome per project over dense prose.
4. Preserve the film/darkroom visual identity (frame numbering, REC dot, develop-reveal motion) as the site's differentiating mechanism unless a redesign is explicitly requested.
