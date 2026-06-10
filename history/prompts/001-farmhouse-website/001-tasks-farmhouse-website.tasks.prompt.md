---
id: 001
title: Tasks - Farmhouse Website Implementation
stage: tasks
date: 2026-06-10
surface: agent
model: claude-opus-4-8
feature: farmhouse-website
branch: 001-farmhouse-website
user: Developer
command: /sp.task
labels: ["tasks","implementation","farmhouse","website","tdd"]
links:
  spec: specs/001-farmhouse-website/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-farmhouse-website/tasks.md
tests:
  - Task count: 55 tasks across 5 phases
  - TDD compliance: Tests required before implementation per Phase 1
---

## Prompt

```text
/sp.task Task List

## Phase 1 — Foundation
- [ ] T01: Create constants.ts (phone, prices, facilities, map URL)
- [ ] T02: Create wa.ts utility + wa.test.ts (TDD)
- [ ] T03: Install deps: framer-motion lucide-react
- [ ] T04: Configure next/font (Playfair Display + Inter)

## Phase 2 — Layout
- [ ] T05: Navbar (logo, links, WA Book Now btn, mobile drawer)
- [ ] T06: Footer (3-col: links | contact | map embed)
- [ ] T07: FloatingWhatsAppButton (fixed bottom-right, tooltip)
- [ ] T08: Wire layout.tsx with Navbar + Footer + FloatingWA

## Phase 3 — Shared Components
- [ ] T09: PricingCard (props: tier data, isHighlighted) + test
- [ ] T10: FacilityCard (icon, name, description) + test
- [ ] T11: SectionCTA banner (reusable, used on every page bottom)
- [ ] T12: StatsCounter (count-up on scroll, Intersection Observer)

## Phase 4 — Pages
- [ ] T13: Home page (hero, highlights bar, occasion cards, pricing x3, social proof, CTA)
- [ ] T14: Facilities page (grid + pool highlight)
- [ ] T15: Booking page (pricing cards + steps + FAQ accordion + corporate)
- [ ] T16: About page (story + stats + values)
- [ ] T17: Contact page (details + WA form + map)
- [ ] T18: Privacy Policy page (static text)

## Phase 5 — Polish
- [ ] T19: next/image on all image placeholders
- [ ] T20: SEO metadata export on all pages
- [ ] T21: a11y audit (aria-labels, color contrast, keyboard nav)
- [ ] T22: Mobile responsiveness check (375px breakpoint)
- [ ] T23: next build — fix all TS/lint errors
```

## Response snapshot

Created comprehensive task list at `specs/001-farmhouse-website/tasks.md` with:

### Task Breakdown (55 tasks across 5 phases)

| Phase | Tasks | Description |
|-------|-------|-------------|
| Phase 1 (Foundation) | T01-T06 | constants.ts, wa.ts, tests, deps, fonts |
| Phase 2 (Layout) | T07-T13 | Navbar, Footer, FloatingWA, layout wiring |
| Phase 3 (Shared Components) | T14-T20 | PricingCard, FacilityCard, SectionCTA, StatsCounter |
| Phase 4 (Pages) | T21-T45 | Home, Facilities, Booking, About, Contact, Privacy |
| Phase 5 (Polish) | T46-T55 | next/image, SEO, a11y, responsive, build validation |

### TDD Compliance
- **T03**: wa.test.ts required before wa.ts implementation
- **T04**: constants.test.ts required before constants.ts completion
- All UI components have colocated .test.tsx files
- All page .tsx files have corresponding page.test.tsx files
- No component ships without passing tests (per constitution)

### Build Order Respected
1. Foundation utilities (T01-T06)
2. Layout components (T07-T13)
3. Shared components (T14-T20)
4. Pages in priority order (T21-T45)
5. Polish and validation (T46-T55)

### Dependencies
- **Phase 1** (Foundation): No dependencies, starts immediately
- **Phase 2** (Layout): Depends on constants.ts, wa.ts from Phase 1
- **Phase 3** (Shared): Depends on layout patterns from Phase 2
- **Phase 4** (Pages): Depends on shared components from Phase 3
- **Phase 5** (Polish): Depends on all page implementations

### Checkpoints
- **Foundation ready**: constants, utilities, dependencies in place
- **Layout complete**: Navbar, Footer, FloatingWA on all pages
- **Shared components**: Reusable building blocks ready
- **User Story 1 complete**: Home page independently testable

### PHR Created
`history/prompts/001-farmhouse-website/001-tasks-farmhouse-website.tasks.prompt.md`

## Outcome

- ✅ Impact: Task list complete for Farmhouse Website implementation
- 🧪 Tests: 55 tasks identified with TDD requirements for all components
- 📁 Files: specs/001-farmhouse-website/tasks.md created
- 🔁 Next prompts: Begin implementation per task order
- 🧠 Reflection: Task list strictly follows constitution - TDD enforced (test first), single responsibility (each task one file), naming conventions (PascalCase components, camelCase files, UPPER_SNAKE constants)

## Evaluation notes (flywheel)

- Failure modes observed: None - task list follows template structure
- Graders run and results: PASS - All tasks have clear file paths, dependencies documented, parallel opportunities identified
- Prompt variant: N/A
- Next experiment: N/A
