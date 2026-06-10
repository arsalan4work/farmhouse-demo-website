---
id: 001
title: Specification - Farmhouse Website
stage: spec
date: 2026-06-10
surface: agent
model: claude-opus-4-8
feature: farmhouse-website
branch: 001-farmhouse-website
user: Developer
command: sp.specify
labels: ["specification","farmhouse","website","pages","whatsapp","pricing"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-farmhouse-website/spec.md
  - specs/001-farmhouse-website/checklists/requirements.md
tests:
  - Spec validation: No placeholder tokens remaining
  - Checklist validation: All quality checks passed
---

## Prompt

```text
## Pages
1. Home — hero, highlights bar, occasion cards, pricing preview, social proof, CTA
2. About — story, stats counter, values cards
3. Facilities — grid of 8 to 9 facility cards, pool highlight section
4. Booking — full pricing cards, 3-step how-to, FAQ accordion, corporate callout
5. Contact — contact details + WhatsApp form, full-width map

## Core Features
- WhatsApp CTA: const message = `
Assalamualaikum,

Mujhe apka farmhouse book krwana ha

Date: ${date}
Guests: ${guests}

Ap details bata skty hn?
`;

window.open(
  `https://wa.me/923312499496?text=${encodeURIComponent(message)}`
);
- Pricing tiers (from constants.ts):
  - Weekdays: Day 45k | Night 55k | Day+Night 85k
  - Friday:   Day 55k | Night 60k | Day+Night 95k
  - Weekend:  Day 60k | Night 70k | Day+Night 110k
- Floating WhatsApp button (all pages, bottom-right)
- Google Maps iframe embed in footer + contact page
- Responsive: mobile-first, tested at 375px/768px/1280px

## Design Tokens
- Primary: #1B3A2D | Background: #F5ECD7 | Accent: #D4A843 | WA: #25D366
- Display font: Playfair Display | Body: Inter | Mono: Inter Mono (prices)
- Cards: rounded-2xl | Buttons: rounded-full

## Out of Scope
- No auth, no CMS, no database, no payment gateway
- No admin dashboard
- Static site only (Next.js export compatible)
```

## Response snapshot

Created the feature specification at `specs/001-farmhouse-website/spec.md` with:

**User Stories (6 total)**:
1. **P1** - Browse Homepage Hero and Key Highlights (first impression page)
2. **P2** - Learn About Farmhouse Story and Values (trust building)
3. **P2** - Explore Available Facilities (visual confirmation of spaces)
4. **P1** - View Pricing and Booking Information (transparent pricing)
5. **P1** - Contact Farmhouse and Start Booking (conversion goal)
6. **P3** - Navigate Between Pages (supporting functionality)

**Key Requirements**:
- FR-001 to FR-022: Functional requirements covering all 5 pages
- WhatsApp CTA with pre-filled message to 923312499496
- Pricing tiers in constants.ts (Weekdays/Friday/Weekend with Day/Night/Day+Night)
- Google Maps iframe embed (no API key exposure)
- Responsive at 375px, 768px, 1280px viewports
- No auth, no CMS, no database, no payment gateway, no admin dashboard
- Design tokens applied (Primary #1B3A2D, Background #F5ECD7, Accent #D4A843, WA #25D366)

**Success Criteria**:
- SC-001 to SC-010: 10 measurable outcomes (navigation time, load time, WhatsApp CTA, responsive rendering, perceived performance, image size, map display, button visibility, mobile menu, design consistency)

**Out of Scope**:
- Auth, CMS, database, payment gateway, admin dashboard, email notifications, search, blog, user accounts, reservation system, image lightbox, multilingual, analytics, reviews, newsletter

**Assumptions**:
- A1-A8: WhatsApp number, Day+Night pricing, Friday as separate tier, Google Maps location, social proof approach, stats counters, occasion cards, 3-step booking process

**Quality Checklist**:
- Created at `specs/001-farmhouse-website/checklists/requirements.md`
- All 19 validation items passed
- No implementation details in spec
- No NEEDS CLARIFICATION markers
- All requirements testable and unambiguous

**Branch Created**: `001-farmhouse-website`
**Spec File**: `specs/001-farmhouse-website/spec.md`

## Outcome

- ✅ Impact: Feature specification complete and ready for planning phase
- 🧪 Tests: Spec validation passed - no placeholder tokens, quality checklist passed - all items validated
- 📁 Files: specs/001-farmhouse-website/spec.md, specs/001-farmhouse-website/checklists/requirements.md
- 🔁 Next prompts: Run `/sp.plan` to create implementation plan
- 🧠 Reflection: Specification follows "NON-NEGOTIABLE" patterns from constitution - TDD requirements mapped to acceptance scenarios, privacy constraints documented in Out of Scope

## Evaluation notes (flywheel)

- Failure modes observed: None - template placeholders successfully replaced
- Graders run and results: PASS - Validated no unexplained bracket tokens remain, all quality checklist items passed
- Prompt variant: N/A
- Next experiment: N/A
