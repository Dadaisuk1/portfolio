# Portfolio — VIEWFINDER

Darwin Largoza's portfolio. React + TypeScript + Tailwind CSS v4, built on the VIEWFINDER
design system (see `.claude/design.md` for the full spec: color, type, spacing, components).

## Stack

- [Vite](https://vite.dev/) + React 19 + TypeScript
- Tailwind CSS v4 (tokens defined in `src/index.css` via `@theme`)
- `oxlint` for linting

## Structure

```
src/
  data/resume.ts       content pulled from public/resume.md — edit this to update copy
  components/          Hud.tsx, Button.tsx, Tag.tsx, LoadingScreen.tsx, PhotoPanel.tsx, Nav.tsx
  sections/             Work.tsx, About.tsx, Skills.tsx, Education.tsx, Contact.tsx
  App.tsx               loading screen -> split-screen home -> sections
```

The split-screen layout uses a custom `split:` breakpoint at 700px (defined in `index.css`)
matching the design spec's mobile/desktop cutoff.

## Getting started

```
npm install
npm run dev      # http://localhost:5173
npm run build
npm run lint
```

## Notes for extending

- `PhotoPanel.tsx` has a placeholder viewfinder — swap in a real photo per the spec ("colors
  sampled directly from the portfolio owner's own photos, not invented").
- `Nav.tsx` links (`#work`, `#about`, `#skills`, `#contact`) scroll to sections in `App.tsx`.
- Update `src/data/resume.ts` as the single source of truth for name, projects, skills, etc.
