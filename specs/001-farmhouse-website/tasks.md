---
description: "Task list for Farmhouse Website implementation"
---

# Tasks: Farmhouse Website

**Input**: Design documents from `/specs/001-farmhouse-website/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: Tests are required per constitution - TDD discipline enforced (write tests first, verify they fail, then implement)

**Organization**: Tasks organized by phase following the build order in plan.md

## Path Conventions

- **Single project**: `website/src/`, `website/tests/` at repository root
- Paths assume Next.js 16 App Router structure

---

## Phase 1: Foundation

**Purpose**: Core infrastructure and utilities that MUST be complete before any components

**⚠️ CRITICAL**: No component work can begin until this phase is complete

- [x] T01 Create `website/src/lib/constants.ts` with PHONE, PRICES, FACILITIES, MAP_URL (extract magic strings)
- [x] T02 [P] Create `website/src/lib/wa.ts` with `buildWhatsAppURL(phone, msg)` function
- [x] T03 [P] Create `website/tests/wa.test.ts` with happy path, edge case, null/empty state coverage
- [x] T04 [P] Create `website/tests/constants.test.ts` for pricing/facilities validation
- [x] T05 [P] Install dependencies: `framer-motion`, `lucide-react`, `@types/lucide-react`
- [x] T06 [P] Configure `next/font` in `website/src/lib/fonts.ts` with Playfair Display (display) + Inter (body)

**Checkpoint**: Foundation ready - constants, utilities, and dependencies in place

---

## Phase 2: Layout Components

**Purpose**: Site-wide structural components used on every page

- [x] T07 Create `website/src/components/layout/Navbar.tsx` with logo, nav links, WA "Book Now" button, mobile drawer
- [x] T08 [P] Create `website/src/components/layout/Navbar.test.tsx` testing desktop/mobile rendering and click interactions
- [x] T09 Create `website/src/components/layout/Footer.tsx` with 3-column layout (links | contact | map embed)
- [x] T10 [P] Create `website/src/components/layout/Footer.test.tsx` testing contact display and map iframe
- [x] T11 Create `website/src/components/shared/FloatingWhatsAppButton.tsx` (fixed bottom-right, tooltip on hover)
- [x] T12 [P] Create `website/src/components/shared/FloatingWhatsAppButton.test.tsx` testing visibility, tooltip, click handler
- [x] T13 Create `website/src/app/layout.tsx` wiring Navbar, Footer, FloatingWA around children

**Checkpoint**: Layout complete - all pages share consistent navigation and footer

---

## Phase 3: Shared Components

**Purpose**: Reusable UI components used across multiple pages

- [x] T14 Create `website/src/components/ui/PricingCard.tsx` (props: tier data, isHighlighted) + test
- [x] T15 [P] Create `website/src/components/ui/PricingCard.test.tsx` testing weekday/Friday/weekend display, highlighting
- [x] T16 Create `website/src/components/ui/FacilityCard.tsx` (icon, name, description) + test
- [x] T17 [P] Create `website/src/components/ui/FacilityCard.test.tsx` testing icon rendering and responsive layout
- [x] T18 Create `website/src/components/shared/SectionCTA.tsx` (reusable banner for page bottoms) + test
- [x] T19 [P] Create `website/src/components/shared/StatsCounter.tsx` (count-up on scroll, Intersection Observer) + test
- [x] T20 [P] Create `website/src/components/shared/StatsCounter.test.tsx` testing scroll detection and count-up animation

**Checkpoint**: Shared components complete - reusable building blocks ready for pages

---

## Phase 4: Pages

**Purpose**: Main page implementations in order of priority (P1 → P2 → P3)

### Home Page (Priority: P1) 🎯 MVP

- [ ] T21 Create `website/src/app/page.tsx` with hero section (main image, headline, WA CTA)
- [ ] T22 [P] Create `website/src/app/page.test.tsx` - happy path testing hero display and CTA click
- [ ] T23 Create highlights bar component (capacity, facilities, location)
- [ ] T24 Create occasion cards (wedding, banquet, corporate, photoshoot)
- [ ] T25 Create pricing preview (3 tier cards from constants)
- [ ] T26 Create social proof section (testimonials)

### Facilities Page (Priority: P2)

- [ ] T27 Create `website/src/app/facilities/page.tsx` with grid of 8-9 facility cards
- [ ] T28 [P] Create `website/src/app/facilities/page.test.tsx` testing grid layout and mobile responsiveness
- [ ] T29 Create pool highlight section component
- [ ] T30 Create category filter (indoor/outdoor/pool)

### Booking Page (Priority: P1)

- [ ] T31 Create `website/src/app/booking/page.tsx` with full pricing cards (Weekdays, Friday, Weekend)
- [ ] T32 [P] Create `website/src/app/booking/page.test.tsx` testing pricing display and FAQ accordion
- [ ] T33 Create 3-step how-to section
- [ ] T34 Create FAQ accordion component (click to expand/collapse)
- [ ] T35 Create corporate inquiry callout component

### About Page (Priority: P2)

- [ ] T36 Create `website/src/app/about/page.tsx` with story section
- [ ] T37 [P] Create `website/src/app/about/page.test.tsx` testing story content and stats display
- [ ] T38 Create stats counter (years active, events hosted, satisfaction %)
- [ ] T39 Create values cards (3-4 core values with icons)

### Contact Page (Priority: P1)

- [ ] T40 Create `website/src/app/contact/page.tsx` with contact details
- [ ] T41 [P] Create `website/src/app/contact/page.test.tsx` testing WhatsApp form and map iframe
- [ ] T42 Create WhatsApp contact form (name, date, guests, message)
- [ ] T43 Create full-width Google Maps iframe embed

### Privacy Policy Page (Priority: P1)

- [ ] T44 Create `website/src/app/privacy/page.tsx` with static privacy policy content
- [ ] T45 [P] Create `website/src/app/privacy/page.test.tsx` testing content rendering

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements affecting multiple pages

- [ ] T46 [P] Replace image placeholders with `next/image` on all pages
- [ ] T47 [P] Add SEO metadata export to each page (title, description, open graph tags)
- [ ] T48 [P] Run a11y audit: aria-labels, color contrast (#1B3A2D on #F5ECD7, #D4A843), keyboard navigation
- [ ] T49 [P] Test mobile responsiveness at 375px breakpoint on all pages
- [ ] T50 [P] Test responsive behavior at 768px and 1280px viewports
- [ ] T51 Run `next build` and fix all TypeScript errors
- [ ] T52 Run `npm run lint` and fix all linting errors
- [ ] T53 Verify `next/font` fonts (Playfair Display, Inter) load correctly
- [ ] T54 Verify Framer Motion animations perform well (60fps scroll reveals)
- [ ] T55 Test WhatsApp CTA on all pages (opens pre-filled message correctly)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Foundation (Phase 1)**: No dependencies - can start immediately
- **Layout (Phase 2)**: Depends on Foundation (constants.ts, wa.ts)
- **Shared Components (Phase 3)**: Depends on Layout (can reuse Navbar/Footer patterns)
- **Pages (Phase 4)**: Depends on Shared Components (can use PricingCard, FacilityCard)
- **Polish (Phase 5)**: Depends on all page implementations

### Parallel Opportunities

- All Phase 1 tasks marked [P] can run in parallel
- Layout components can be developed in parallel with shared components
- Pages can be developed in parallel (Home, Facilities, Booking, About, Contact, Privacy)
- T46-T49 (polish) can run in parallel

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Foundation
2. Complete Phase 2: Layout
3. Implement Home page (MVP) with just what's needed for User Story 1
4. **STOP and VALIDATE**: Test Home page independently
5. Deploy/demo if ready

### Incremental Delivery

1. Foundation + Layout → Base site ready
2. Home page (P1) → Test independently → Deploy
3. Facilities + Booking pages (P1+P2) → Test independently → Deploy
4. About + Contact pages (P1+P2) → Test independently → Deploy
5. Privacy + Polish → Final deploy

### Parallel Team Strategy

- Developer A: Phase 1 + Phase 2 (Foundation + Layout)
- Developer B: Phase 3 (Shared components) + Home page
- Developer C: Facilities + Booking pages
- Developer D: About + Contact + Privacy pages
- Team converges on Polish phase
