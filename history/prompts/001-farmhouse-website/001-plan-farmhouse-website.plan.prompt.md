---
id: 001
title: Plan - Farmhouse Website Implementation
stage: plan
date: 2026-06-10
surface: agent
model: claude-opus-4-8
feature: farmhouse-website
branch: 001-farmhouse-website
user: Developer
command: sp.plan
labels: ["planning","architecture","farmhouse","website","nextjs","tdd"]
links:
  spec: specs/001-farmhouse-website/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-farmhouse-website/plan.md
  - specs/001-farmhouse-website/research.md
  - specs/001-farmhouse-website/data-model.md
  - specs/001-farmhouse-website/quickstart.md
tests:
  - Constitution Check: All 8 principle checks passed
  - Plan validation: All template sections filled
---

## Prompt

```text
## Stack
- Framework: Next.js 16 App Router (static export)
- Styling: Tailwind CSS + shadcn/ui
- Animation: Framer Motion (scroll reveals only)
- Icons: lucide-react
- Testing: Vitest + React Testing Library
- Fonts: next/font (Playfair Display + Inter)

## File Structure
src/
  app/
    layout.tsx          # Navbar + Footer + FloatingWA
    page.tsx            # Home
    about/page.tsx
    facilities/page.tsx
    booking/page.tsx
    contact/page.tsx
    privacy/page.tsx
  components/
    layout/             # Navbar, Footer
    ui/                 # PricingCard, FacilityCard, SectionCTA
    shared/             # WhatsAppButton, MapEmbed, StatsCounter
  lib/
    constants.ts        # PHONE, PRICES, FACILITIES, MAP_URL
    wa.ts               # buildWhatsAppURL(phone, msg): string
  tests/
    wa.test.ts
    constants.test.ts

## Build Order
1. constants.ts + wa.ts + tests
2. Layout (Navbar, Footer, FloatingWA)
3. Shared components (PricingCard, FacilityCard)
4. Pages in order: Home → Facilities → Booking → About → Contact → Privacy
5. Polish: SEO metadata, next/image, a11y audit
```

## Response snapshot

Created the implementation plan and Phase 0/1 artifacts:

### Files Created/Updated:
1. **plan.md** - Implementation plan with:
   - Technical Context: TypeScript 5, React 19, Next.js 16, Tailwind CSS 4, Framer Motion, lucide-react, Vitest + RTL
   - Constitution Check: All 8 principles passed (no violations)
   - Project Structure: Single project (web) with app/, components/, lib/ structure
   - Build Order: utilities first → layout → shared components → pages → polish

2. **research.md** - Technology decisions:
   - Next.js 16 App Router with static export
   - TypeScript strict mode
   - Tailwind CSS 4 + shadcn/ui
   - Framer Motion for scroll reveals only
   - lucide-react for icons
   - Vitest + React Testing Library

3. **data-model.md** - Entity definitions:
   - PricingTier: day/night/dayAndNight rates, applicableDays
   - Facility: name, description, category, image, capacity, features
   - ContactInfo: phone, whatsApp, email, address, coordinates
   - FAQItem: question, answer, category, order
   - Page: id, title, route, navLabel, sections
   - Testimonial: name, eventDate, eventType, text, rating

4. **quickstart.md** - Development guide:
   - Prerequisites (Node.js 20+, npm/pnpm)
   - Project structure
   - Configuration files (next.config.ts, tailwind.config.ts, tsconfig.json)
   - Build order recommendations
   - Google Maps embed instructions
   - Testing strategy
   - Troubleshooting guide

### Constitution Compliance:
| Principle | Status |
|-----------|--------|
| I. Code Quality - TypeScript Strict | ✅ PASS |
| I. Code Quality - Functional Components | ✅ PASS (planned) |
| I. Code Quality - Naming Conventions | ✅ PASS (planned) |
| I. Code Quality - Single Responsibility | ✅ PASS (planned) |
| II. Test-First Development | ✅ PASS (planned) |
| III. Privacy - No Client-Side PII | ✅ PASS (static site) |
| III. Privacy - WhatsApp Links | ✅ PASS (no tracking) |
| III. Privacy - Google Maps iframe | ✅ PASS (no API key) |
| IV. Git Discipline | ✅ PASS (branch: 001-farmhouse-website) |

### Agent Context:
- Updated CLAUDE.md with feature tech stack

**Branch**: 001-farmhouse-website  
**Spec**: specs/001-farmhouse-website/spec.md  
**Ready for**: `/sp.tasks` command to create implementation tasks

## Outcome

- ✅ Impact: Implementation plan complete with all Phase 0 and Phase 1 artifacts
- 🧪 Tests: Constitution check passed (all 8 principles), plan validation passed
- 📁 Files: plan.md, research.md, data-model.md, quickstart.md created
- 🔁 Next prompts: Run `/sp.tasks` to create testable implementation tasks
- 🧠 Reflection: Plan follows constitution principles - static site approach avoids privacy violations (no auth/CMS/database), TypeScript strict mode enabled, testing stack specified (Vitest + RTL)

## Evaluation notes (flywheel)

- Failure modes observed: None - all constitution checks passed
- Graders run and results: PASS - Plan template fully filled, no NEEDS CLARIFICATION markers
- Prompt variant: N/A
- Next experiment: N/A
