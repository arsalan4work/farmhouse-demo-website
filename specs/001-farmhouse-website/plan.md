# Implementation Plan: Farmhouse Website

**Branch**: `001-farmhouse-website` | **Date**: 2026-06-10 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-farmhouse-website/spec.md`

## Summary

Build a static multi-page Farmhouse Website using Next.js 16 App Router with static export. The site includes 5 main pages (Home, About, Facilities, Booking, Contact) plus a Privacy Policy page, with WhatsApp integration for inquiries, responsive pricing display with three-tier rates, and Google Maps integration. No auth, no CMS, no database, no payment gateway - purely frontend static output.

## Technical Context

**Language/Version**: TypeScript 5, React 19  
**Primary Dependencies**: Next.js 16 (App Router), Tailwind CSS 4, Framer Motion (scroll animations), lucide-react (icons), shadcn/ui (component primitives), Vitest + React Testing Library  
**Storage**: None (static site, no database, no client-side data persistence)  
**Testing**: Vitest for utility functions, React Testing Library for components  
**Target Platform**: Static HTML/CSS/JS for web browsers (mobile-first, tested at 375px/768px/1280px)  
**Project Type**: Single project (web)  
**Performance Goals**: Pages load within 3 seconds on 3G, FAQ interactions under 200ms, smooth scroll animations at 60fps  
**Constraints**: No server-side rendering for production (static export), no API keys exposed (Google Maps iframe-only), no client-side PII storage  
**Scale/Scope**: 6 pages, ~20 components, ~1500 lines of code (estimated), static export compatible

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Check | Status |
|-----------|-------|--------|
| **I. Code Quality - TypeScript Strict** | tsconfig.json has `strict: true` | ✅ PASS |
| **I. Code Quality - Functional Components** | All React components will be functional | ✅ PASS (planned) |
| **I. Code Quality - Naming Conventions** | PascalCase for components, camelCase for vars, UPPER_SNAKE for constants | ✅ PASS (planned) |
| **I. Code Quality - Single Responsibility** | Components designed for single purpose | ✅ PASS (planned) |
| **II. Test-First Development** | Tests written before implementation, Vitest + RTL | ✅ PASS (planned) |
| **III. Privacy & Legal - No Client-Side PII** | No localStorage/sessionStorage for PII | ✅ PASS (verified - static site) |
| **III. Privacy & Legal - WhatsApp Links** | Links use only phone + pre-filled text | ✅ PASS (no tracking params) |
| **III. Privacy & Legal - Google Maps iframe** | iframe-only, no Maps JS API key | ✅ PASS (verified) |
| **III. Privacy & Legal - Privacy Policy** | /privacy route required | ✅ PASS (included) |
| **IV. Git Discipline** | feat|fix|chore format, one feature per commit | ✅ PASS (branch: 001-farmhouse-website) |

**Gates Status**: ALL PASS - No violations, no Complexity Tracking needed

## Project Structure

### Documentation (this feature)

```text
specs/001-farmhouse-website/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output - technology decisions
├── data-model.md        # Phase 1 output - data entities
├── quickstart.md        # Phase 1 output - setup instructions
├── contracts/           # Phase 1 output - API/contract specs (N/A for static site)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
website/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Navbar + Footer + FloatingWA
│   │   ├── page.tsx            # Home
│   │   ├── about/page.tsx
│   │   ├── facilities/page.tsx
│   │   ├── booking/page.tsx
│   │   ├── contact/page.tsx
│   │   └── privacy/page.tsx
│   ├── components/
│   │   ├── layout/             # Navbar, Footer
│   │   ├── ui/                 # PricingCard, FacilityCard, SectionCTA
│   │   └── shared/             # WhatsAppButton, MapEmbed, StatsCounter
│   └── lib/
│       ├── constants.ts        # PHONE, PRICES, FACILITIES, MAP_URL
│       └── wa.ts               # buildWhatsAppURL(phone, msg): string
├── tests/
│   ├── wa.test.ts
│   └── constants.test.ts
└── public/                     # Static assets (images, favicon)
```

**Structure Decision**: Single project structure selected because this is a standalone Next.js static website. No backend/api separation needed since the site is fully static with no server-side functionality beyond Next.js static export. Components organized by domain (layout, ui, shared) following single responsibility principle from constitution.

## Complexity Tracking

> **No violations - all constitution principles satisfied**
