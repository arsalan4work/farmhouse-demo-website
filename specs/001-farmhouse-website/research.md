# Research: Farmhouse Website

**Feature**: Farmhouse Website  
**Branch**: 001-farmhouse-website  
**Date**: 2026-06-10

## Technology Decisions

### Decision: Next.js 16 App Router with Static Export
**Rationale**: 
- The project requires a static site (no database, no auth, no payment gateway)
- Next.js 16 App Router provides excellent static site generation (SSG)
- Static export is compatible with GitHub Pages, Vercel, or any static hosting
- App Router provides file-based routing that matches the page structure (Home, About, Facilities, Booking, Contact)

**Alternatives Considered**:
- Create React App (CRA): Less opinionated but requires additional configuration for static export
- Vite + React: Modern but requires more setup for routing and static export
- Gatsby: Static-first but complex and slower builds

### Decision: TypeScript Strict Mode (`strict: true`)
**Rationale**:
- Constitution requires TypeScript strict mode
- Catches bugs at compile time rather than runtime
- Better IDE autocomplete and type safety
- Easier refactoring with confidence

**Alternatives Considered**:
- `noImplicitAny: true` only: Less strict, allows implicit `any` types
- No strict mode: Not compliant with constitution requirements

### Decision: Tailwind CSS 4 with shadcn/ui
**Rationale**:
- Constitution requires Tailwind CSS + shadcn/ui
- Tailwind CSS 4 provides utility-first styling
- shadcn/ui provides accessible, composable component primitives
- Design tokens (colors, fonts, spacing) can be configured in Tailwind

**Alternatives Considered**:
- CSS Modules: More verbose, less consistent spacing/tying
- Emotion/Styled Components: Runtime overhead, not needed for static site
- Bootstrap: Too heavy, not as customizable as Tailwind

### Decision: Framer Motion for Scroll Reveal Animations Only
**Rationale**:
- Constitution specifies Framer Motion for "scroll reveals only"
- Minimal bundle size impact (only scroll animations, not full animation library)
- Scroll animations improve perceived performance and user engagement
- Simpler than full animation library with less complexity

**Alternatives Considered**:
- GSAP: More powerful but larger bundle, overkill for scroll reveals
- Vanilla CSS animations: Possible but inconsistent across browsers
- React Spring: More complex than needed for simple scroll reveals

### Decision: lucide-react for Icons
**Rationale**:
- Lightweight icon library (tree-shakable)
- Consistent design system
- SVG icons scale perfectly at any size
- No external font dependencies

**Alternatives Considered**:
- FontAwesome: Larger bundle, font-based (rendering issues)
- Custom SVG sprites: More setup, harder to maintain
- lucide-icons-svg: Raw SVGs require inline imports (verbose)

### Decision: Vitest + React Testing Library
**Rationale**:
- Constitution requires Vitest + React Testing Library
- Vitest is faster than Jest (ESM-first, Vite integration)
- React Testing Library focuses on user-facing behavior
- Unit tests for utils (wa.ts, constants), component tests for key UI elements

**Alternatives Considered**:
- Jest: Slower, commonjs-based
- Cypress: E2E testing only, not for unit tests
- Playwright: E2E testing only, not for unit tests

## Architecture Decisions

### Component Organization
**Decision**: Three-tier component structure
- `layout/`: Navbar, Footer - site-wide structural components
- `ui/`: PricingCard, FacilityCard, SectionCTA - reusable domain components
- `shared/`: WhatsAppButton, MapEmbed, StatsCounter - cross-cutting utilities

**Rationale**: 
- Single Responsibility Principle from constitution
- Clear separation of concerns
- Easy to find and reuse components

### Constants File Structure
**Decision**: Single `constants.ts` file with exported constants
- `PHONE`: WhatsApp number (923312499496)
- `PRICES`: Object with Weekdays, Friday, Weekend rates
- `FACILITIES`: Array of facility objects
- `MAP_URL`: Google Maps embed URL
- `WHATSAPP_MSG_TEMPLATE`: Template for pre-filled message

**Rationale**:
- Constitution requires magic strings extracted to constants.ts
- Easy to update without code changes
- Type-safe via TypeScript

### WhatsApp Integration Pattern
**Decision**: `buildWhatsAppURL(phone, msg): string` in `wa.ts`
- Pure function that constructs WhatsApp URL
- URL-encoded message text
- No tracking parameters (constitution requirement)
- Testable in unit tests

**Rationale**:
- Single responsibility (build URL only)
- Testable without browser APIs
- No side effects (pure function)

### Styling Approach
**Decision**: Tailwind utility classes with custom design tokens
- Design tokens mapped to Tailwind config
- `rounded-2xl` for cards, `rounded-full` for buttons (from spec)
- Primary #1B3A2D, Background #F5ECD7, Accent #D4A843, WA #25D366

**Rationale**:
- Constitution requires specific design tokens
- Tailwind allows configuration via `tailwind.config.js`
- Consistent spacing and sizing system

## Integration Patterns

### Google Maps Integration
**Decision**: iframe-only embed (no Maps JS API)
**Rationale**: 
- Constitution prohibits exposing API keys
- iframe approach requires no key
- Sufficient for displaying location
- No tracking in embed URL (privacy requirement)

### WhatsApp Integration
**Decision**: Pre-filled message with placeholders
**Rationale**:
- Constitution requires no tracking params
- Simple phone + text approach
- User can customize message before sending
- Works on all platforms

## Build Order Rationale

1. **constants.ts + wa.ts + tests first**: Foundational utilities used by all components
2. **Layout (Navbar, Footer, FloatingWA)**: Site-wide structure, needed by all pages
3. **Shared components**: Reusable UI elements used across multiple pages
4. **Pages in order**: Home (MVP), Facilities, Booking, About, Contact, Privacy
5. **Polish**: SEO metadata, next/image optimization, a11y audit

**Rationale**: Bottom-up approach, dependencies injected from lower levels, MVP pages first for early testing.
